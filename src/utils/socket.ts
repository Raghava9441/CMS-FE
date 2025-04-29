import io from "socket.io-client";

let socket;

// connecting to socket io server from backend
const connectSocket = (token: string) => {
    socket = io(import.meta.env.VITE_APP_API_ORIGIN_PROD.split("/api")[0], {
        query: {
            token
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });
};

export { socket, connectSocket };