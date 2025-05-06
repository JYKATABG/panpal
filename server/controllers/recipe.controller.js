import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";
import User from "../models/user.model.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();

    if (!recipes || recipes.length === 0) {
      res.status(404).json({ success: false, message: "No recipes found" });
    }

    res
      .status(200)
      .json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid recipe ID format" });
  }

  const recipe = await Recipe.findById(recipeId).populate({
    path: "comments.user",
    select: "name email"
  });

  if (!recipe || recipe.length === 0) {
    res.status(404).json({ success: false, message: "Recipe not found" });
  }

  res.status(200).json({ success: true, data: recipe });

  try {
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({ ...req.body, author: req.user._id });

    res.status(201).json({
      success: true,
      message: "Recipe successfully created",
      data: recipe,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const fieldErrors = {};
      Object.keys(err.errors).forEach((field) => {
        fieldErrors[field] = err.errors[field].message;
      });

      return res.status(400).json({ errors: fieldErrors });
    }
    next(err);
  }
};

export const updateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid recipe ID format" });
  }

  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });

    if (!recipe || recipe.length === 0) {
      return res
        .status(404)
        .json({ succees: false, message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format" });
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);

    if (!recipe || recipe.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Comments

export const addComment = async (req, res, next) => {
  const { recipeId } = req.params;

  const { text } = req.body;

  try {
    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a comment",
      });
    }

    // Check for valid recipe ID
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $push: {
          comments: {
            user: req.user._id,
            text,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("comments.user", "name email");

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    const lastComment = updatedRecipe.comments.at(-1);

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: lastComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { recipeId, commentId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.user?.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "You can delete only your own comments",
      });
    }

    recipe.comments.pull(commentId);
    await recipe.save({ validateModifiedOnly: true });

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { recipeId, commentId } = req.params;
  const userId = req.user._id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe || recipe.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const hasLiked = comment.likes.includes(userId);
    if (hasLiked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await recipe.save();

    res.status(200).json({
      success: true,
      message: hasLiked
        ? "Comment unliked successfully"
        : "Comment liked successfully",
      data: {
        likes: comment.likes
      },
    });
  } catch (error) {
    next(error);
  }
};

// Favorites

export const addToFavorites = async (req, res, next) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid recipe ID format" });
    }

    const recipe = await Recipe.findById(recipeId);

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (recipe.author.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot add your own recipe to favorites",
      });
    }

    const hasAddedToFavorites = user.favorites.includes(recipeId);
    if (hasAddedToFavorites) {
      user.favorites.pull(recipeId);
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: hasAddedToFavorites
        ? "Recipe removed"
        : "Recipe added to favorites",
    });
  } catch (error) {
    next(error);
  }
};
