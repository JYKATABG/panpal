# 🧁 PanPal

**PanPal** is a full-stack web application where users can share recipes, interact through comments, and manage their personal collection of favorites. It includes a custom authentication system, spam protection, and full CRUD functionality, all backed by robust error handling.

---

## 🚀 Features

- 🍽️ **Create & Share Recipes** — Users can create, edit, and delete their own recipes.
- 💾 **Favorites System** — Save and manage your favorite recipes from other users.
- 💬 **Commenting** — Each recipe has a comment section. Users can like or interact with comments. Owner of the comment can also delete or edit them.
- ✍️ **Comment Likes** — Engage by liking helpful or interesting comments.
- 👤 **Profile Page** — View your favorite recipes and your own submissions.
- 🛡️ **Custom Authentication** — Built from scratch using Node.js and Express (no Firebase/Passport).
- 🤖 **Spam & Bot Protection** — Integrated with Arcjet to stop automated spam.
- ❌ **Error Handling** — Both frontend and backend include clear, robust validation and error responses.

---

## 🛠️ Tech Stack

| Layer       | Tech                                 |
|-------------|--------------------------------------|
| **Frontend**| React, TailwindCSS                   |
| **Backend** | Node.js, Express.js, MongoDB         |
| **Auth**    | Custom (JWT), Arcjet for spam guard  |
| **State**   | Zustand                              |
| **Styling** | TailwindCSS + Framer Motion          |

---

## ⚙️ Installation

### 1. Prerequisites

- Node.js v18+
- MongoDB database (local or cloud)

### 2. Clone the Repo

git clone https://github.com/JYKATABG/panpal.git
cd panpal

### 3. Install Dependencies
cd client
npm install

# Backend
cd ../server
npm install

### 4. Set Env variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ARCJET_SECRET=your_arcjet_secret

### 5. Run the App

1. Start Backend
 - cd server
 - npm run dev
2. Start Frontend
   - cd client
   - npm run dev
Visit http://localhost:5173


# API Endpoints

### 🔐 Auth
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login user

### 📋 Recipes
- `GET /api/recipes` – Get all recipes
- `POST /api/recipes` – Create new recipe
- `PUT /api/recipes/:id` – Edit recipe (owner only)
- `DELETE /api/recipes/:id` – Delete recipe (owner only)

### 💬 Comments
- `POST /api/recipes/:id/comments` – Add comment
- `PUT /api/comments/:id` – Edit comment (owner only)
- `DELETE /api/comments/:id` – Delete comment (owner only)
- `POST /api/comments/:id/like` – Like or unlike a comment

### ❤️ Favorites
- `POST /api/recipes/:id/favorite` – Add to favorites
- `DELETE /api/recipes/:id/favorite` – Remove from favorites

🤝 Contributing
Pull requests are welcome. If you find a bug or want to suggest a feature, feel free to open an issue.

✨ Credits
Made with ❤️ by JYKATABG
