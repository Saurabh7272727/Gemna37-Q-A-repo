class NetworkManager {

    constructor(state) {
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
            this.state = false;
            console.log("Offline");
        });
    }

    get getStatus() {
        return this.isOnline;
    }
}

export const networkManager = new NetworkManager();