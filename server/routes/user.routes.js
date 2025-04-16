import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:userId", getUserById);

userRouter.put("/:userId", authorize, updateUser);

userRouter.delete("/:userId", authorize, deleteUser);

// Favourites

userRouter.get("/favorites/:userId", (req, res) => { res.send({ message: "Get user favourites recipes" }) });

userRouter.post("/favorites/:userId", (req, res) => { res.send({ message: "Add recipe to favourites recipes" }) });

userRouter.delete("/favorites/:userId", (req, res) => { res.send({ message: "Add recipe to favourites recipes" }) });

// Comments

userRouter.get("/all/comments", (req, res) => { res.send({ message: "Get all comments" }) });

userRouter.get("/comments/:userId", (req, res) => { res.send({ message: "Get user comments" }) });

userRouter.delete("/comments/:userId", (req, res) => { res.send({ message: "Delete own comment" }) });

export default userRouter;