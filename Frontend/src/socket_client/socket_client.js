import { io } from "socket.io-client";



const socket = io(import.meta.env.VITE_APP_BACKEND_URL, {
    auth: {
        token: localStorage.getItem("jwt_token")
    },
    autoConnect: false
});


export default socket;