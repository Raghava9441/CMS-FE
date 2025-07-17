// services/socketManager.ts
import { io, Socket } from 'socket.io-client';
// import { store } from '../store'; // Adjust path to your store
// import {
//     updateMsgConvo,
//     updateOnlineUsers,
//     updateTypingConvo,
//     GetMessages,
//     setIsOptimistic
// } from '../store/slices/chatSlice'; 
// import { ShowSnackbar } from '../store/slices/appSlice'; 
// import { SocketEvents } from './socketEvents';
import { SocketDebugger } from './socketDebugger';
import { ShowSnackbar, updateOnlineUsers } from '@redux/slices/authSlice';
import { updateMsgConvo, updateTypingConvo } from '@redux/slices/chat.slice';
import { GetMessages } from '@redux/actions/chat.actions';
import store from '@redux/store';

export interface SocketConfig {
    url: string;
    reconnection: boolean;
    reconnectionAttempts: number;
    reconnectionDelay: number;
    reconnectionDelayMax: number;
    timeout: number;
    forceNew: boolean;
}

export interface ConnectionState {
    isConnected: boolean;
    isConnecting: boolean;
    lastConnected: Date | null;
    reconnectAttempts: number;
    error: string | null;
}

class SocketManager {
    private socket: Socket | null = null;
    private config: SocketConfig;
    private connectionState: ConnectionState;
    private eventHandlers: Map<string, Function[]> = new Map();
    private connectionPromise: Promise<void> | null = null;
    private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private isDestroyed = false;

    constructor() {
        console.log(import.meta.env.VITE_APP_API_ORIGIN?.split("/api")[0])
        this.config = {
            url: import.meta.env.VITE_APP_API_ORIGIN?.split("/api")[0] || 'http://localhost:3001',
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            forceNew: false
        };

        this.connectionState = {
            isConnected: false,
            isConnecting: false,
            lastConnected: null,
            reconnectAttempts: 0,
            error: null
        };

        this.initializeEventHandlers();
    }

    /**
     * Initialize socket connection with authentication token
     */
    async connect(token: string): Promise<void> {
        if (this.isDestroyed) {
            throw new Error('SocketManager has been destroyed');
        }

        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = this.createConnection(token);
        return this.connectionPromise;
    }

    private async createConnection(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.connectionState.isConnecting = true;
                this.connectionState.error = null;

                // Disconnect existing socket if any
                if (this.socket) {
                    this.socket.disconnect();
                }

                this.socket = io(this.config.url, {
                    query: { token },
                    reconnection: this.config.reconnection,
                    reconnectionAttempts: this.config.reconnectionAttempts,
                    reconnectionDelay: this.config.reconnectionDelay,
                    reconnectionDelayMax: this.config.reconnectionDelayMax,
                    timeout: this.config.timeout,
                    forceNew: this.config.forceNew,
                    transports: ['websocket', 'polling']
                });

                this.attachEventListeners();

                // Handle connection success
                this.socket.on('connect', () => {
                    console.log('✅ Socket connected successfully');
                    this.connectionState.isConnected = true;
                    this.connectionState.isConnecting = false;
                    this.connectionState.lastConnected = new Date();
                    this.connectionState.reconnectAttempts = 0;
                    this.connectionState.error = null;

                    this.startHeartbeat();
                    this.connectionPromise = null;
                    resolve();
                });

                // Handle connection error
                this.socket.on('connect_error', (error) => {
                    console.error('❌ Socket connection error:', error);
                    this.connectionState.isConnecting = false;
                    this.connectionState.error = error.message;
                    this.connectionState.reconnectAttempts++;

                    store.dispatch(ShowSnackbar({
                        severity: 'error',
                        message: `Connection failed: ${error.message}`
                    }));

                    this.connectionPromise = null;
                    reject(error);
                });

                // Set connection timeout
                setTimeout(() => {
                    if (this.connectionState.isConnecting) {
                        this.connectionState.isConnecting = false;
                        this.connectionState.error = 'Connection timeout';
                        this.connectionPromise = null;
                        reject(new Error('Connection timeout'));
                    }
                }, this.config.timeout);

            } catch (error) {
                this.connectionState.isConnecting = false;
                this.connectionState.error = (error as Error).message;
                this.connectionPromise = null;
                reject(error);
            }
        });
    }

    /**
     * Attach all socket event listeners
     */
    private attachEventListeners(): void {
        if (!this.socket) return;

        // Connection events
        this.socket.on('disconnect', this.handleDisconnect.bind(this));
        this.socket.on('reconnect', this.handleReconnect.bind(this));
        this.socket.on('reconnect_error', this.handleReconnectError.bind(this));
        this.socket.on('reconnect_failed', this.handleReconnectFailed.bind(this));

        // Chat events
        this.socket.on('message_received', this.handleMessageReceived.bind(this));
        this.socket.on('message_sent_confirmation', this.handleMessageSentConfirmation.bind(this));
        this.socket.on('message_error', this.handleMessageError.bind(this));
        this.socket.on('message_sync', this.handleMessageSync.bind(this));

        // User events
        this.socket.on('online_friends', this.handleOnlineFriends.bind(this));
        this.socket.on('start_typing', this.handleStartTyping.bind(this));
        this.socket.on('stop_typing', this.handleStopTyping.bind(this));

        // System events
        this.socket.on('connection_established', this.handleConnectionEstablished.bind(this));
        this.socket.on('batch_events', this.handleBatchEvents.bind(this));
        this.socket.on('error', this.handleError.bind(this));

        // Debug events
        this.socket.on('message_from_server', this.handleServerMessage.bind(this));

        this.socket.on('permissions_updated', this.handleparmissionsupdated.bind(this));

        // Heartbeat
        this.socket.on('pong', this.handlePong.bind(this));
    }

    /**
     * Initialize custom event handlers for business logic
     */
    private initializeEventHandlers(): void {
        // You can add custom event handlers here that will be called
        // in addition to the default handlers
    }

    // Event Handlers
    private handleDisconnect(reason: string): void {
        console.log('🔌 Socket disconnected:', reason);
        this.connectionState.isConnected = false;
        this.connectionState.lastConnected = null;
        this.stopHeartbeat();

        store.dispatch(ShowSnackbar({
            severity: 'warning',
            message: 'Connection lost. Attempting to reconnect...'
        }));
    }

    private handleReconnect(attemptNumber: number): void {
        console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
        this.connectionState.reconnectAttempts = 0;

        // Re-sync data after reconnection
        this.syncAfterReconnect();

        store.dispatch(ShowSnackbar({
            severity: 'success',
            message: 'Connection restored'
        }));
    }

    private handleReconnectError(error: Error): void {
        console.error('🔄❌ Reconnection error:', error);
        this.connectionState.reconnectAttempts++;
    }

    private handleReconnectFailed(): void {
        console.error('🔄❌ Reconnection failed after maximum attempts');
        this.connectionState.error = 'Failed to reconnect after maximum attempts';

        store.dispatch(ShowSnackbar({
            severity: 'error',
            message: 'Unable to restore connection. Please refresh the page.'
        }));
    }

    private handleMessageReceived(message: any): void {
        console.log('📨 New message received:', message);
        store.dispatch(updateMsgConvo(message));

        const state = store.getState();
        const currentUser = state.auth.user;

        if (message.sender._id !== currentUser?._id) {
            store.dispatch(ShowSnackbar({
                severity: 'info',
                message: `New message from ${message.sender.firstName}`
            }));
        }

        this.emitCustomEvent('message_received', message);
    }

    private handleMessageSentConfirmation(data: any): void {
        console.log('✅ Message sent confirmation:', data);
        this.emitCustomEvent('message_sent_confirmation', data);
    }

    private handleMessageError(error: any): void {
        console.error('❌ Message error:', error);
        store.dispatch(ShowSnackbar({
            severity: 'error',
            message: `Failed to send message: ${error.error}`
        }));
        this.emitCustomEvent('message_error', error);
    }

    private handleMessageSync(messages: any): void {
        console.log('🔄 Syncing messages:', messages);
        if (Array.isArray(messages)) {
            messages.forEach(message => {
                store.dispatch(updateMsgConvo(message));
            });
        } else {
            store.dispatch(updateMsgConvo(messages));
        }
    }

    private handleOnlineFriends(friends: any): void {
        console.log('👥 Online friends update:', friends);
        store.dispatch(updateOnlineUsers(friends));
    }

    private handleStartTyping(typingData: any): void {
        console.log('✏️ User started typing:', typingData);
        store.dispatch(updateTypingConvo({ ...typingData, isTyping: true }));
    }

    private handleStopTyping(typingData: any): void {
        console.log('✏️ User stopped typing:', typingData);
        store.dispatch(updateTypingConvo({ ...typingData, isTyping: false }));
    }

    private handleConnectionEstablished(data: any): void {
        console.log('🤝 Connection established with server:', data);
        this.emitCustomEvent('connection_established', data);
    }

    private handleBatchEvents(events: any[]): void {
        console.log('📦 Batch events received:', events);
        events.forEach(event => {
            switch (event.event) {
                case 'message_received':
                    store.dispatch(updateMsgConvo(event.data));
                    break;
                case 'typing_status':
                    store.dispatch(updateTypingConvo(event.data));
                    break;
                default:
                    console.log('Unknown batch event:', event);
            }
        });
    }

    private handleError(error: any): void {
        console.error('🚨 Socket error:', error);
        store.dispatch(ShowSnackbar({
            severity: error.status || 'error',
            message: `Socket error: ${error.message}`
        }));
    }

    private handleServerMessage(data: any): void {
        console.log('📤 Received response from server:', data);
    }

    private handleparmissionsupdated(data: any): void {
        console.log('📤 Received updated permissions from server:', data);
    }

    private handlePong(): void {
        // Heartbeat response - connection is alive
    }

    /**
     * Sync data after reconnection
     */
    private syncAfterReconnect(): void {
        const state = store.getState();
        const { user } = state.auth;
        const { activeConversation } = state.chat;

        // Emit user online status
        if (user?._id) {
            this.emit('user_online', { userId: user._id });
        }

        // Sync messages for active conversation
        if (activeConversation) {
            console.log('Syncing messages for active conversation:', activeConversation._id);
            store.dispatch(GetMessages(activeConversation._id));
        }
    }

    /**
     * Start heartbeat to keep connection alive
     */
    private startHeartbeat(): void {
        this.stopHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            if (this.socket?.connected) {
                this.socket.emit('ping');
            }
        }, 30000); // Send ping every 30 seconds
    }

    /**
     * Stop heartbeat
     */
    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    /**
     * Emit event to server
     */
    emit(event: string, data?: any): boolean {
        if (!this.socket?.connected) {
            console.warn(`Cannot emit ${event}: Socket not connected`);
            return false;
        }

        try {
            this.socket.emit(event, data);
            return true;
        } catch (error) {
            console.error(`Error emitting ${event}:`, error);
            return false;
        }
    }

    /**
     * Add custom event listener
     */
    on(event: string, handler: Function): void {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event)?.push(handler);
    }

    /**
     * Remove custom event listener
     */
    off(event: string, handler?: Function): void {
        if (!handler) {
            this.eventHandlers.delete(event);
            return;
        }

        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    /**
     * Emit custom event to registered handlers
     */
    private emitCustomEvent(event: string, data?: any): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in custom event handler for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Get connection state
     */
    getConnectionState(): ConnectionState {
        return { ...this.connectionState };
    }

    /**
     * Check if socket is connected
     */
    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    /**
     * Get socket instance (use with caution)
     */
    getSocket(): Socket | null {
        return this.socket;
    }

    /**
     * Disconnect socket
     */
    disconnect(): void {
        this.stopHeartbeat();
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        this.connectionState.isConnected = false;
        this.connectionState.isConnecting = false;
    }

    /**
     * Destroy socket manager instance
     */
    destroy(): void {
        this.isDestroyed = true;
        this.disconnect();
        this.eventHandlers.clear();
        this.connectionPromise = null;
    }

    /**
     * Send a test message to server
     */
    testConnection(userId?: string): void {
        this.emit('message_from_client', {
            message: 'Hello from client',
            userId,
            timestamp: Date.now()
        });
    }
}

// Export singleton instance
export const socketManager = new SocketManager();