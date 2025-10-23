import Cookies from 'js-cookie';
import { decryptData } from '../../Auth/Encryption/jsondataEncryption.js';

class ApiEndPoints {
    constructor(message, success, data = "Not found") {
        this.message = message;
        this.success = success;
        this.data = data;
    }

    async fetchUserProfile(endPoint, auth_token) {
        if (!endPoint || !auth_token) {
            return new ApiEndPoints("Provide a valid endpoint or token", false);
        }

        try {
            const baseUrl = import.meta.env.VITE_APP_BACKEND_URL;

            const response = await fetch(`${baseUrl}/${endPoint}`, {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${auth_token}`,
                    "Content-Type": "application/json",
                },
            });



            const result = await response.json();
            if (!result.success) {
                return new ApiEndPoints(
                    `Request failed with status -  ${result.message}`,
                    false
                );
            }
            return new ApiEndPoints("User profile fetched successfully", result.success, result.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return new ApiEndPoints("Error fetching user profile", false, error.message);
        }
    }

    async UploadProfileImage(endPoint, payload) {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}${endPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${Cookies.get("GASID")}`
            },
            body: JSON.stringify(payload),
        });

        const result = response.json();
        return result;
    }

    async fetchAllActiveUser(endPoint) {
        try {
            let token = localStorage.getItem("jwt_token");
            token = decryptData(token);

            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}${endPoint}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token?.jwt_token}`
                },
            });

            const result = response.json();
            return result;
        } catch (error) {
            return { message: "External forntend Error - api - 70", success: false };
        }
    }


}

export default ApiEndPoints;
