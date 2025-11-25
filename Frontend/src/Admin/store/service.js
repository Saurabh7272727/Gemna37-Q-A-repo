
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const initialState = {
    studentList: [],
    uploadingList: [],
    loading: true
}
class Service {
    constructor() {
        this.studentList = [];
    }

    async requestToStudentForm() {
        try {
            const start = Date.now();
            const response = await fetch(`${BACKEND_URL}/student/get/all/gemidlog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const end = Date.now();
            console.log(end - start, "ms")
            const result = await response.json();
            await new Promise(resolve => setTimeout(resolve, 1600)); //forcefully pause the response 3sec
            return result;
        } catch (error) {
            console.log("Error service page requestToStudentForm", error);
            return error.message;
        }
    }

    async sendFormToServer(formData) {
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_VERCEL_BACKEND}/student/singup_with_gemna`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();
            return result;
        } catch (error) {
            console.log("Error service page sendFormToServer ============= ", error);
            return { success: false, message: "somrthing was wrong external-react" };
        }
    }
}



const service = new Service();
export { service, initialState };
