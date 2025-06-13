import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        let token = null;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized: No token provided" });
        }

        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(payload.userId);
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in authorize middleware:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error in authorization" });
    }
};

export default authorize;
