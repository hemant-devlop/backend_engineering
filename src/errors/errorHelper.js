// import { throwError } from "./throwError.js";

// export const sendSuccessResponse = (response, data = {}, message = "Success", statusCode = 200) => {
//     return response.status(statusCode).json({success: true, message, data});
// }

// export const sendErrorResponse = (response, error) => {
//     let statusCode = 400;
//     if (error instanceof throwError) statusCode = error.statusCode;
//     response.status(statusCode).json({success: false, message: error.message, data: error.data || {}});
// }

class ApiError extends Error {

    constructor(
        statusCode = 500,
        message = "Internal Server Error",
        error = null
    ) {

        super(message);

        this.statusCode = statusCode;

        this.error = error;

        Error.captureStackTrace(this, this.constructor);

    }

}

export default ApiError;