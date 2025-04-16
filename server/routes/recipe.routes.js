import { Router } from "express";
import { addComment, createRecipe, deleteComment, deleteRecipe, getAllRecipes, getRecipeById, likeComment, updateRecipe } from "../controllers/recipe.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const recipeRouter = Router();

recipeRouter.get("/", getAllRecipes);

recipeRouter.get("/:recipeId", getRecipeById);

recipeRouter.post("/", authorize, createRecipe);

recipeRouter.put("/:recipeId", authorize, updateRecipe);

recipeRouter.delete("/:recipeId", authorize, deleteRecipe)

// Comments

recipeRouter.post("/:recipeId/comments", authorize, addComment);

recipeRouter.post("/:recipeId/comments/:commentId/like", authorize, likeComment);

recipeRouter.delete("/:recipeId/comments/:commentId", authorize, deleteComment);


export default recipeRouter;