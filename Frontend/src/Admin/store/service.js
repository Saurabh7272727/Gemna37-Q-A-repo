
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
            const response = await fetch(`https://fakestoreapi.com/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const end = Date.now();
            console.log(end - start, "ms")
            const result = await response.json();
            await new Promise(resolve => setTimeout(resolve, 3000));//forcefully pause the response 3sec
            return result;
        } catch (error) {
            console.log("Error service page requestToStudentForm", error);
            return message;
        }
    }

    // async sendFormToServer(objData) {
    //     try {
    //         const response = await fetch(`${BACKEND_URL}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(objData)
    //         });

    //         const result = await response.json();
    //         const { message, success, data } = result;
    //         this.studentList = data;
    //         if (success) {
    //             initialState.studentList = [...initialState.studentList, data];
    //         }
    //         return success;
    //     } catch (error) {
    //         console.log("Error service page sendFormToServer", error.message);
    //         return success
    //     }
    // }
}



const service = new Service();
export { service, initialState };
