// services/socketDebugger.ts
import { Socket } from 'socket.io-client';

export class SocketDebugger {
    private static isEnabled = import.meta.env.NODE_ENV === 'development';
    private static eventCounts: Map<string, number> = new Map();
    private static eventHistory: Array<{
        event: string;
        data: any;
        timestamp: Date;
        direction: 'in' | 'out';
    }> = [];
    private static maxHistorySize = 100;

    static enable(): void {
        this.isEnabled = true;
    }

    static disable(): void {
        this.isEnabled = false;
    }

    static monitorEvents(socket: Socket): void {
        if (!this.isEnabled || !socket) return;

        // Monitor all incoming events
        const originalOn = socket.on.bind(socket);
        socket.on = (event: string, listener: (...args: any[]) => void) => {
            const wrappedListener = (...args: any[]) => {
                this.logEvent(event, args[0], 'in');
                this.incrementEventCount(event);
                return listener(...args);
            };
            return originalOn(event, wrappedListener);
        };

        // Monitor all outgoing events
        const originalEmit = socket.emit.bind(socket);
        socket.emit = (event: string, ...args: any[]) => {
            this.logEvent(event, args[0], 'out');
            this.incrementEventCount(`${event}_out`);
            return originalEmit(event, ...args);
        };

        console.log('🔍 Socket event monitoring enabled');
    }

    static logEvent(event: string, data: any, direction: 'in' | 'out'): void {
        if (!this.isEnabled) return;

        const logEntry = {
            event,
            data,
            timestamp: new Date(),
            direction
        };

        this.eventHistory.push(logEntry);

        // Keep history size manageable
        if (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory.shift();
        }

        const emoji = direction === 'in' ? '📥' : '📤';
        console.log(`${emoji} Socket ${direction.toUpperCase()}: ${event}`, data);
    }

    static incrementEventCount(event: string): void {
        const current = this.eventCounts.get(event) || 0;
        this.eventCounts.set(event, current + 1);
    }

    static getEventCounts(): Map<string, number> {
        return new Map(this.eventCounts);
    }

    static getEventHistory(): typeof this.eventHistory {
        return [...this.eventHistory];
    }

    static clearHistory(): void {
        this.eventHistory = [];
        this.eventCounts.clear();
    }

    static testConnection(socket: Socket): void {
        if (!this.isEnabled || !socket) return;

        console.log('🧪 Testing socket connection...');
        
        const testData = {
            test: true,
            timestamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9)
        };

        socket.emit('test_connection', testData);
        
        // Listen for test response
        socket.once('test_connection_response', (response) => {
            console.log('✅ Connection test successful:', response);
        });

        // Timeout for test
        setTimeout(() => {
            console.log('⏰ Connection test timeout - no response received');
        }, 5000);
    }

    static checkConversationState(activeConversation: any, user: any): void {
        if (!this.isEnabled) return;

        console.log('📊 Current conversation state:', {
            hasActiveConversation: !!activeConversation,
            conversationId: activeConversation?._id,
            userId: user?._id,
            userName: user?.firstName
        });
    }

    static printConnectionStats(socket: Socket): void {
        if (!this.isEnabled || !socket) return;

        console.log('📈 Socket Connection Stats:', {
            connected: socket.connected,
            id: socket.id,
            transport: socket.io.engine?.transport?.name,
            eventCounts: Object.fromEntries(this.eventCounts),
            historyLength: this.eventHistory.length
        });
    }
}

// services/socketEvents.ts
export enum SocketEvents {
    // Connection events
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    CONNECT_ERROR = 'connect_error',
    CONNECTION_ESTABLISHED = 'connection_established',
    RECONNECT = 'reconnect',
    RECONNECT_ERROR = 'reconnect_error',
    RECONNECT_FAILED = 'reconnect_failed',

    // Message events
    MESSAGE_RECEIVED = 'message_received',
    MESSAGE_SENT_CONFIRMATION = 'message_sent_confirmation',
    MESSAGE_ERROR = 'message_error',
    MESSAGE_SYNC = 'message_sync',
    SEND_MESSAGE = 'send_message',

    // Typing events
    START_TYPING = 'start_typing',
    STOP_TYPING = 'stop_typing',

    // User presence events
    USER_ONLINE = 'user_online',
    USER_OFFLINE = 'user_offline',
    ONLINE_FRIENDS = 'online_friends',

    // System events
    ERROR = 'error',
    BATCH_EVENTS = 'batch_events',
    HEARTBEAT = 'ping',
    HEARTBEAT_RESPONSE = 'pong',

    // Test events
    TEST_CONNECTION = 'test_connection',
    TEST_CONNECTION_RESPONSE = 'test_connection_response',
    MESSAGE_FROM_CLIENT = 'message_from_client',
    MESSAGE_FROM_SERVER = 'message_from_server'
}

// services/socketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { socketManager } from './socketManager';

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    // Handle specific actions that should trigger socket events
    switch (action.type) {
        case 'auth/loginSuccess':
            // Auto-connect socket on successful login
            if (action.payload.accessToken) {
                socketManager.connect(action.payload.accessToken);
            }
            break;

        case 'auth/logout':
            // Disconnect socket on logout
            socketManager.disconnect();
            break;

        case 'chat/setActiveConversation':
            // Join conversation room
            if (action.payload && socketManager.isConnected()) {
                socketManager.emit('join_conversation', {
                    conversationId: action.payload._id
                });
            }
            break;

        case 'chat/sendMessage':
            // Send message through socket
            if (socketManager.isConnected()) {
                socketManager.emit(SocketEvents.SEND_MESSAGE, action.payload);
            }
            break;

        default:
            break;
    }

    return result;
};

// services/socketRetry.ts
export class SocketRetryManager {
    private retryAttempts = 0;
    private maxRetries = 5;
    private baseDelay = 1000;
    private maxDelay = 30000;
    private backoffFactor = 2;

    constructor(maxRetries = 5, baseDelay = 1000) {
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
    }

    async executeWithRetry<T>(
        operation: () => Promise<T>,
        retryCondition?: (error: any) => boolean
    ): Promise<T> {
        this.retryAttempts = 0;

        while (this.retryAttempts < this.maxRetries) {
            try {
                const result = await operation();
                this.retryAttempts = 0; // Reset on success
                return result;
            } catch (error) {
                this.retryAttempts++;

                if (
                    this.retryAttempts >= this.maxRetries ||
                    (retryCondition && !retryCondition(error))
                ) {
                    throw error;
                }

                const delay = this.calculateDelay();
                console.log(`Retry attempt ${this.retryAttempts}/${this.maxRetries} in ${delay}ms`);
                
                await this.sleep(delay);
            }
        }

        throw new Error(`Operation failed after ${this.maxRetries} attempts`);
    }

    private calculateDelay(): number {
        const delay = this.baseDelay * Math.pow(this.backoffFactor, this.retryAttempts - 1);
        return Math.min(delay, this.maxDelay);
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset(): void {
        this.retryAttempts = 0;
    }
}

// services/socketHealth.ts
export class SocketHealthMonitor {
    private healthChecks: Map<string, boolean> = new Map();
    private lastHealthCheck: Date | null = null;
    private healthCheckInterval: NodeJS.Timeout | null = null;
    private onHealthChange?: (isHealthy: boolean) => void;

    constructor(onHealthChange?: (isHealthy: boolean) => void) {
        this.onHealthChange = onHealthChange;
    }

    startMonitoring(socket: any, intervalMs = 30000): void {
        this.stopMonitoring();
        
        this.healthCheckInterval = setInterval(() => {
            this.performHealthCheck(socket);
        }, intervalMs);

        // Initial health check
        this.performHealthCheck(socket);
    }

    stopMonitoring(): void {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
            this.healthCheckInterval = null;
        }
    }

    private async performHealthCheck(socket: any): Promise<void> {
        const checks = {
            connected: socket?.connected || false,
            hasId: !!socket?.id,
            canEmit: this.testEmit(socket),
            latency: await this.measureLatency(socket)
        };

        this.healthChecks.set('connection', checks.connected);
        this.healthChecks.set('identification', checks.hasId);
        this.healthChecks.set('emit', checks.canEmit);
        this.healthChecks.set('latency', checks.latency < 5000); // Less than 5s

        this.lastHealthCheck = new Date();
        
        const isHealthy = this.isHealthy();
        this.onHealthChange?.(isHealthy);

        console.log('🏥 Socket Health Check:', {
            ...checks,
            overall: isHealthy ? '✅ Healthy' : '❌ Unhealthy'
        });
    }

    private testEmit(socket: any): boolean {
        try {
            socket?.emit('health_check', { timestamp: Date.now() });
            return true;
        } catch {
            return false;
        }
    }

    private async measureLatency(socket: any): Promise<number> {
        return new Promise((resolve) => {
            const start = Date.now();
            const timeout = setTimeout(() => resolve(10000), 5000); // 5s timeout

            socket?.emit('ping', { timestamp: start });
            
            const onPong = () => {
                clearTimeout(timeout);
                socket?.off('pong', onPong);
                resolve(Date.now() - start);
            };

            socket?.once('pong', onPong);
        });
    }

    isHealthy(): boolean {
        const checks = Array.from(this.healthChecks.values());
        return checks.length > 0 && checks.every(check => check);
    }

    getHealthStatus() {
        return {
            isHealthy: this.isHealthy(),
            checks: Object.fromEntries(this.healthChecks),
            lastCheck: this.lastHealthCheck
        };
    }
}

// services/socketQueue.ts
interface QueuedEvent {
    id: string;
    event: string;
    data: any;
    timestamp: Date;
    retries: number;
    maxRetries: number;
}

export class SocketEventQueue {
    private queue: QueuedEvent[] = [];
    private processing = false;
    private maxQueueSize = 100;
    private maxRetries = 3;

    constructor(maxQueueSize = 100, maxRetries = 3) {
        this.maxQueueSize = maxQueueSize;
        this.maxRetries = maxRetries;
    }

    enqueue(event: string, data: any, maxRetries = this.maxRetries): string {
        const id = this.generateId();
        
        const queuedEvent: QueuedEvent = {
            id,
            event,
            data,
            timestamp: new Date(),
            retries: 0,
            maxRetries
        };

        // Remove oldest events if queue is full
        if (this.queue.length >= this.maxQueueSize) {
            this.queue.shift();
        }

        this.queue.push(queuedEvent);
        return id;
    }

    async processQueue(socket: any): Promise<void> {
        if (this.processing || !socket?.connected || this.queue.length === 0) {
            return;
        }

        this.processing = true;

        while (this.queue.length > 0) {
            const event = this.queue.shift()!;
            
            try {
                socket.emit(event.event, event.data);
                console.log(`✅ Processed queued event: ${event.event}`);
            } catch (error) {
                console.error(`❌ Failed to process queued event: ${event.event}`, error);
                
                event.retries++;
                if (event.retries < event.maxRetries) {
                    // Re-queue for retry
                    this.queue.unshift(event);
                    await this.sleep(1000 * event.retries); // Exponential backoff
                } else {
                    console.error(`🚫 Giving up on event after ${event.maxRetries} retries: ${event.event}`);
                }
            }
        }

        this.processing = false;
    }

    clear(): void {
        this.queue = [];
        this.processing = false;
    }

    getQueueSize(): number {
        return this.queue.length;
    }

    getQueuedEvents(): QueuedEvent[] {
        return [...this.queue];
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}