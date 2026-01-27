
import { decryptData } from '../../../Auth/Encryption/jsondataEncryption.js';


class API {

    constructor(domain_url) {
        this.domain_url = domain_url;
    }

    async postRequest(endpoint, payload) {
        if (!endpoint || !this.domain_url || !payload) {
            return {
                message: "Payload are missing in API class",
                success: false,
                local: true
            }
        }
        this.endpoint = endpoint;
        try {
            let token = localStorage.getItem("jwt_token");
            token = decryptData(token);
            const response = await fetch(`${this.domain_url}${this.endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token?.jwt_token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.log("Error on API ======>", error);
            return {
                message: error.message,
                success: false,
                local: true
            }
        }
    }

}


export default API;