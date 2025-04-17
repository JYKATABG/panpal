import aj from "../config/arcjet.js";

const arjcetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) { return res.status(429).json({ message: "Rate limit exceeded" }) }
            if (decision.reason.isBot()) { return res.status(403).json({ message: "Bot detected" }) }

            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    }
    catch (error) {
        console.log(`Arjcet Middleware Error: ${error}`);
        next(error);
    }
}

export default arjcetMiddleware;