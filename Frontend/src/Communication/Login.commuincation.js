



const LoginCommunication = async (exportData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/student/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exportData)
        })

        const result = await response.json();
        return result
    } catch (error) {
        return { message: "something was wrong in frontend", success: false }
    }

}

export default LoginCommunication;