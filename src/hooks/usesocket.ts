import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { connectSocket, socket } from '../utils/socket'; // Assuming @utils/socket resolves correctly
import { setIsOptimistic, updateMsgConvo, updateTypingConvo } from '../redux/slices/chat.slice';
import { permissionSuccess, ShowSnackbar, updateOnlineUsers } from '../redux/slices/authSlice';
import { GetConversations, GetMessages } from '../redux/actions/chat.actions';
import { GetOnlineFriends } from '../redux/actions/userActions';

interface SocketError {
    status?: string;
    code?: string;
    message: string;
    context?: string;
    errorId?: string;
}

export const useSocketManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { accessToken, user } = useSelector((state: RootState) => state.auth);
    const { activeConversation } = useSelector((state: RootState) => state.chat);

    const handleConnect = useCallback(() => {
        console.log("Socket connected successfully");
        if (user?._id) {
            socket.emit("user_online", { user_id: user._id });
        }
        if (activeConversation?._id) {
            console.log("Syncing messages for active conversation:", activeConversation._id);
            dispatch(GetMessages(activeConversation._id));
        }
        dispatch(ShowSnackbar({ severity: "success", message: "Connected to chat server!" }));
    }, [user?._id, activeConversation?._id, dispatch]);

    const handleConnectionEstablished = useCallback((data: any) => {
        console.log("Received initial connection response from server:", data);
        // You might not need a snackbar for this specific event if 'connect' already shows one.
        // Or reserve this for more specific server-sent connection info.
        // dispatch(ShowSnackbar({ severity: "success", message: data.message || "Connection established" }));
    }, [dispatch]);

    const handleConnectError = useCallback((error: Error) => {
        console.error("Socket connection error:", error);
        dispatch(ShowSnackbar({ severity: "error", message: `Connection failed: ${error.message}` }));
    }, [dispatch]);

    const handleSocketError = useCallback((error: SocketError) => {
        console.error("Socket error:", error);
        dispatch(ShowSnackbar({
            severity: error.status === "error" ? "error" : "warning", // Use warning for non-critical, error for critical
            message: `Server Error (${error.code || 'UNKNOWN'}): ${error.message}${error.errorId ? ` (ID: ${error.errorId})` : ''}`,
        }));
    }, [dispatch]);

    const handleMessageReceived = useCallback((message: any) => {
        console.log("📨 New message received:", message);
        dispatch(updateMsgConvo(message));

        if (message.sender?._id !== user?._id) {
            dispatch(ShowSnackbar({
                severity: "info",
                message: `New message from ${message.sender?.firstName || 'Someone'}`,
            }));
        }
    }, [user?._id, dispatch]);

    // This event isn't in your server code, but you had `message_error` handler in client.
    // Ensure your server emits this or adjust client expectations.
    const handleMessageError = useCallback((error: any) => {
        console.error("❌ Message error:", error);
        dispatch(ShowSnackbar({
            severity: "error",
            message: `Failed to send message: ${error.message || error.error || "Unknown error"}`,
        }));
        // Optional: Implement logic to mark message as failed in UI/state
        // dispatch(updateMessageStatus({ tempId: error.tempId, status: 'failed' }));
    }, [dispatch]);

    const handleOnlineFriends = useCallback((friendData: any) => {
        console.log("👥 Online friends update:", friendData);
        dispatch(updateOnlineUsers(friendData));
    }, [dispatch]);

    const handleStartTyping = useCallback((typingData: any) => {
        console.log("✏️ User started typing:", typingData);
        dispatch(updateTypingConvo({ ...typingData, isTyping: true }));
    }, [dispatch]);

    const handleStopTyping = useCallback((typingData: any) => {
        console.log("✏️ User stopped typing:", typingData);
        dispatch(updateTypingConvo({ ...typingData, isTyping: false }));
    }, [dispatch]);

    const handleMessageSync = useCallback((messages: any) => {
        console.log("🔄 Syncing messages:", messages);
        if (Array.isArray(messages)) {
            messages.forEach(message => dispatch(updateMsgConvo(message)));
        } else if (messages) { // Handle single message case if server sends one
            dispatch(updateMsgConvo(messages));
        }
        dispatch(ShowSnackbar({ severity: "info", message: `Synced ${Array.isArray(messages) ? messages.length : 1} new message(s).` }));
    }, [dispatch]);

    const handleServerShutdown = useCallback(() => {
        console.warn("🚨 Server is shutting down!");
        dispatch(ShowSnackbar({
            severity: "warning",
            message: "Chat server is shutting down. You may be disconnected.",
            duration: 0 // Keep open indefinitely until user acknowledges or reconnects
        }));
    }, [dispatch]);

    const handlePermissionUpdted = useCallback((data) => {
        console.log("📤 Received updated permissions from server:", data);
        dispatch(permissionSuccess(data));
    }, [dispatch]);

    // --- Main Effect for Socket Management ---
    useEffect(() => {
        dispatch(setIsOptimistic({ isOptimistic: true }));

        // Only connect if not already connected and accessToken is available
        if (accessToken && (!socket || !socket.connected)) {
            console.log("Attempting to connect socket...");
            connectSocket(accessToken);
        }

        if (socket) {
            socket.on("connect", handleConnect);
            socket.on("connection_established", handleConnectionEstablished);
            socket.on("connect_error", handleConnectError);
            socket.on("error", handleSocketError); // General server-side errors
            socket.on("message_received", handleMessageReceived);
            socket.on("message_error", handleMessageError); // If your server sends this
            socket.on("online_friends", handleOnlineFriends);
            socket.on("start_typing", handleStartTyping);
            socket.on("stop_typing", handleStopTyping);
            socket.on("message_sync", handleMessageSync);
            socket.on("server_shutdown", handleServerShutdown); // For graceful shutdown
            socket.on("permissions_updated", handlePermissionUpdted); // For graceful shutdown

            return () => {
                console.log("Cleaning up socket listeners...");
                socket.off("connect", handleConnect);
                socket.off("connection_established", handleConnectionEstablished);
                socket.off("connect_error", handleConnectError);
                socket.off("error", handleSocketError);
                socket.off("message_received", handleMessageReceived);
                socket.off("message_error", handleMessageError);
                socket.off("online_friends", handleOnlineFriends);
                socket.off("start_typing", handleStartTyping);
                socket.off("stop_typing", handleStopTyping);
                socket.off("message_sync", handleMessageSync);
                socket.off("server_shutdown", handleServerShutdown);

                // Optional: Disconnect socket when MainLayout unmounts IF you want to force disconnect.
                // Be careful with this for single-page apps where MainLayout might remount.
                // A better approach for logout is to explicitly call socket.disconnect() then.
                // For now, let's assume socket connection persists until explicitly logged out.
            };
        }
    }, [
        accessToken,
        dispatch,
        user?._id,
        activeConversation?._id,
        handleConnect,
        handleConnectionEstablished,
        handleConnectError,
        handleSocketError,
        handleMessageReceived,
        handleMessageError,
        handleOnlineFriends,
        handleStartTyping,
        handleStopTyping,
        handleMessageSync,
        handleServerShutdown
    ]);
    
    return {
        // e.g., isSocketConnected: socket?.connected,
    };
};