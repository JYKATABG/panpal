import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => { res.send({ message: "Get all users" }) });

userRouter.get("/:userId", (req, res) => { res.send({ message: "Get user details" }) });

userRouter.put("/:userId", (req, res) => { res.send({ message: "Update user" }) });

userRouter.put("/:userId/password", (req, res) => { res.send({ message: "Update user password" }) });

// Favourites

userRouter.get("/favorites/:userId", (req, res) => { res.send({ message: "Get user favourites recipes" }) });

userRouter.post("/favorites/:userId", (req, res) => { res.send({ message: "Add recipe to favourites recipes" }) });

userRouter.delete("/favorites/:userId", (req, res) => { res.send({ message: "Add recipe to favourites recipes" }) });

// Comments

userRouter.get("/all/comments", (req, res) => { res.send({ message: "Get all comments" }) });

userRouter.get("/comments/:userId", (req, res) => { res.send({ message: "Get user comments" }) });

userRouter.delete("/comments/:userId", (req, res) => { res.send({ message: "Delete own comment" }) });

export default userRouter;