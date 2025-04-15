export const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId error
        if (err.name === "CastError") {
            error.message = 'Resource not found';
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            error.message = `Duplicate value for field: ${field}`;
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            error.message = new Error(messages.join(", "));
            error.statusCode = 400;
        }

        const status = error.statusCode || 500;

        res.status(status).json({
            success: false,
            message: error.message || 'Server Error'
        });

    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;