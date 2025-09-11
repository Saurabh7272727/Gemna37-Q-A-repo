

const httpMap = new Map(
    [
        [200, "OK"],
        [201, "CREATED"],
        [202, "ACCEPTED"],
        [204, "NO_CONTENT"],
        [404, "NOT_FOUND"],
        [401, "UNAUTHORIZED"],
        [422, "VALIDATION_ERROR"],
        [500, "INTERNAL_ERROR"]
    ]
)

class stdentResponseSheet {
    constructor(message, status, status_message, success, redirect_path) {
        this.message = message;
        this.status = status;
        this.status_message = status_message;
        this.success = success;
        this.redirect_path = redirect_path;
        this.timestamp = new Date().toISOString();
    }


    static studentResponse(message, status, status_message = null, success, redirect_path) {
        status_message = httpMap.get(status)
        return new stdentResponseSheet(message, status, status_message, success, redirect_path)
    }
}

export { stdentResponseSheet };


