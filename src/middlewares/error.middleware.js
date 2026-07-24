const errorMiddleware = ( err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({

        success: false,

        message: err.message || "Internal Server Error",

        error: process.env.NODE_ENV === "development"
                ? err.error || err.stack
                : statusCode >= 500
                    ? "Internal Server Error"
                    : err.error || null

    });

};

export default errorMiddleware;