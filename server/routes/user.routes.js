import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, getUserRecipes, updateUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);

userRouter.get("/:userId", authorize, getUserById);

userRouter.get("/me/recipes", authorize, getUserRecipes);

userRouter.put("/:userId", authorize, updateUser);

userRouter.delete("/:userId", authorize, deleteUser);

export default userRouter;