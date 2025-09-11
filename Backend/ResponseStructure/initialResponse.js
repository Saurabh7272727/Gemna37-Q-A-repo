

class response {
    constructor(message, status, success) {
        this.message = message;
        this.status = status;
        this.success = success
    }

    initialResponse(req, res) {
        return res.json({ ...this, path: req.path })
    }
}

export default response;