import mongoose from "mongoose";
import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";

export const getAllUsers = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this resource",
    });
  }

  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format" });
  }

  if (userId.toString() !== req.user._id || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this resource",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ author: req.user._id });

    res
      .status(200)
      .json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format" });
  }

  try {
    if (
      userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this user",
      });
    }

    const allowedUpdates = ["name", "email"];
    const updates = Object.keys(req.body);
    const isValid = updates.every((key) => allowedUpdates.includes(key));

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid update fields" });
    }

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedData: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getFavouriteRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User can't be found!" });
    }

    if (req.user._id.toString() !== req.params.userId.toString()) {
      res.status(401).json({
        success: false,
        message: "Access denied! You are not allowed to access this data!",
      });
    }

    res.status(200).json({ success: true, recipes: user.favorites });
  } catch (error) {
    next(error);
  }
};
