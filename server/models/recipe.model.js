import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required!"],
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every((str) => str.trim() !== "")
          );
        },
        message: "Please provide at least one ingredient",
      },
    },
    steps: {
      type: [String],
      required: [true, "Steps are required!"],
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every((str) => str.trim() !== "")
          );
        },
        message: "Please provide at least one step",
      },
    },
    image: {
      required: [true, "Image is required!"],
      type: String,
      match: [
        /\.(jpg|jpeg|png|gif|webp|svg)$/i,
        "Please provide a valid image URL ending with .jpg, .jpeg, .png, .gif, .webp, or .svg",
      ],
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    cookTime: {
      type: Number, // in minutes
      required: [true, "Cook Time is required!"],
      validate: {
        validator: (v) => typeof v == "number" && v > 0,
        message: "Cook time must be positive number",
      },
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required!"],
    },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: { type: Number, min: 1, max: 5 },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
