import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";

export const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find();

        if (!recipes || recipes.length === 0) {
            res.status(404).json({ success: false, message: "No recipes found" });
        }

        res.status(200).json({ success: true, count: recipes.length, data: recipes });
    } catch (error) {
        next(error);
    }
}

export const getRecipeById = async (req, res, next) => {
    const { recipeId } = req.params;

    console.log(recipeId);


    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe || recipe.length === 0) {
        res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({ success: true, data: recipe });

    try {

    } catch (error) {
        next(error);
    }
}

export const createRecipe = async (req, res, next) => {

    console.log(req.user._id);


    const {
        title,
        description,
        ingredients,
        steps,
        image,
        tags,
        cookTime,
        difficulty,
    } = req.body;

    if (!title?.trim() ||
        !description?.trim() ||
        !Array.isArray(ingredients) ||
        ingredients.length === 0 ||
        !Array.isArray(steps) ||
        steps.length === 0 ||
        !cookTime) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const recipe = await Recipe.create({ ...req.body, author: req.user._id });

        res.status(201).json({
            success: true,
            message: "Recipe successfully created",
            data: recipe
        });
    } catch (error) {
        next(error);
    }
}

export const updateRecipe = async (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });

        if (!recipe || recipe.length === 0) {
            return res.status(404).json({ succees: false, message: "Recipe not found" });
        }

        res.status(200).json({ success: true, message: "Recipe updated successfully", data: recipe });

    } catch (error) {
        next(error);
    }
}

export const deleteRecipe = async (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        const recipe = await Recipe.findByIdAndDelete(recipeId);

        if (!recipe || recipe.length === 0) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        res.status(200).json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
        next(error);
    }
}