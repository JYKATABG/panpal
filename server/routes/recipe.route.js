import { Router } from "express";

const recipeRouter = Router();

recipeRouter.get("/", (req, res) => { res.send({ message: "Get all recipes" }) })

recipeRouter.get("/:recipeId", (req, res) => { res.send({ message: "Get recipe details" }) })

recipeRouter.post("/", (req, res) => { res.send({ message: "Create recipe" }) })

recipeRouter.put("/:recipeId", (req, res) => { res.send({ message: "Update recipe" }) })

recipeRouter.delete("/:recipeId", (req, res) => { res.send({ message: "Delete recipe" }) })

export default recipeRouter;