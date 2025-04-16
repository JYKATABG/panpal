import { Router } from "express";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from "../controllers/recipe.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const recipeRouter = Router();

recipeRouter.get("/", getAllRecipes);

recipeRouter.get("/:recipeId", getRecipeById);

recipeRouter.post("/", authorize, createRecipe);

recipeRouter.put("/:recipeId", authorize, updateRecipe);

recipeRouter.delete("/:recipeId", authorize, deleteRecipe)


export default recipeRouter;