class NetworkManager {

    constructor() {
        this.isOnline = navigator.onLine;
        this.listeners();
    }

    listeners() {
        window.addEventListener("online", () => {
            this.isOnline = true;
            console.log("Online");
        });

        window.addEventListener("offline", () => {
            this.isOnline = false;
            console.log("Offline");
        });
    }

    getStatus() {
        return this.isOnline;
    }
}

export const networkManager = new NetworkManager();