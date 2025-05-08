import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";

export const CreateRecipe = () => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [""],
    steps: [""],
    image: "",
    tags: [""],
    difficulty: "",
    cookTime: 0,
  });
  const { isAuthenticated, user } = authStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isAuthenticated) {
      toast.error("You don't have access to this page!");
      navigate("/");
    }
  }, [user])

  let response;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, name, value) => {
    setForm((prev) => {
      const updated = [...prev[name]];
      updated[index] = value;
      return { ...prev, [name]: updated };
    });
  };

  const addField = (name) => {
    setForm((prev) => ({ ...prev, [name]: [...prev[name], ""] }));
  };

  const removeField = (index, name) => {
    setForm((prev) => {
      const updated = [...prev[name]];
      updated.splice(index, 1);
      return { ...prev, [name]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    try {
      response = await axios.post("http://localhost:5500/api/v1/recipes", form);
      navigate("/recipes");
      toast.success(response.data.message);
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors && typeof errors === "object") {
        setFieldErrors(errors);
      } else {
        toast.error(err.response?.data?.message || "Failed to create recipe!");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto my-16 md:my-20 lg:my-24 bg-white p-8 rounded-2xl shadow-lg space-y-6 mt-20"
    >
      <h2 className="text-3xl font-bold text-gray-800">Create a Recipe</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {fieldErrors.title && (
          <p className="text-red-500 text-sm">{fieldErrors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {fieldErrors.description && (
          <p className="text-red-500 text-sm">{fieldErrors.description}</p>
        )}
      </div>

      {["ingredients", "steps", "tags"].map((field) => (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          {form[field].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(idx, field, e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeField(idx, field)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField(field)}
            className="text-blue-500 text-sm hover:underline"
          >
            + Add {field.slice(0, -1)}
          </button>
          {fieldErrors[field] && (
            <p className="text-red-500 text-sm">{fieldErrors[field]}</p>
          )}
        </div>
      ))}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Cook Time (minutes)
        </label>
        <input
          type="number"
          name="cookTime"
          value={form.cookTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {fieldErrors.cookTime && (
          <p className="text-red-500 text-sm">{fieldErrors.cookTime}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-2 h-40 w-auto rounded-md border"
          />
        )}
        {fieldErrors.image && (
          <p className="text-red-500 text-sm">{fieldErrors.image}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="difficulty"
          className="block text-sm font-medium text-gray-700"
        >
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option defaultChecked value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default CreateRecipe;
