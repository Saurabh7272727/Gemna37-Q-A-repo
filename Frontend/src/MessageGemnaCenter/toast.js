import { toast } from "react-toastify";


class Message {
    constructor(response) {
        this.message = response;
    }

    setMessage() {
        if (this.message?.success) {
            return toast.success(this.message?.message);
        } else {
            return toast.error(this.message?.message)
        }
    }
}

export default Message;