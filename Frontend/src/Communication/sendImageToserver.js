import { decryptData } from "../Auth/Encryption/jsondataEncryption"


const sendImageToServer = async (base64) => {

    try {
        const localData = localStorage.getItem("uploaded_log");
        const decyptedData = decryptData(localData);

        const payload = {
            ...decyptedData
        }

        // console.log(payload);
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/student/image/upload/gemid`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("sendImageToServer", error)
    }
}

export default sendImageToServer;