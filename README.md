# MERN Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with user authentication, CRUD operations, image uploads, comments, and category management.

---

## 📝 Project Overview

This application demonstrates a complete MERN stack integration:

- **Backend:** Express.js server with RESTful API, MongoDB for storage, and Mongoose for ORM.
- **Frontend:** React application built with Vite, including components, pages, and context API for state management.
- **Features:**
  - User registration and login with JWT authentication
  - CRUD operations for blog posts
  - Category management
  - Image uploads for blog posts
  - Commenting system
  - Pagination, search, and filtering
  - Role-based access control (user/admin)
  - Slug generation for SEO-friendly URLs

---

## 📂 Project Structure

mern-blog/
├── client/ # React front-end
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Page-level components
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # API services
│ │ ├── context/ # Context providers
│ │ └── App.jsx # Main React app
│ └── package.json
├── server/ # Express back-end
│ ├── config/ # MongoDB connection
│ ├── controllers/ # Route controllers
│ ├── models/ # Mongoose models (User, Post, Category)
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication, error handling, etc.
│ ├── utils/ # Utility functions
│ ├── server.js # Entry point
│ └── package.json
└── README.md # Documentation

yaml
Copy code

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+  
- MongoDB Atlas or local MongoDB  
- npm or yarn  

### 1. Clone Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-The-Williams.git
cd mern-stack-integration-The-Williams
2. Setup Server
bash
Copy code
cd server
npm install
Configure Environment Variables
Create a .env file in server/ with the following:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@mern1.sgloynp.mongodb.net/mern-blog?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_here
Replace <username> and <password> with your MongoDB Atlas credentials.

Example using your credentials (for local development do not commit this):

env
Copy code
MONGO_URI=mongodb+srv://edgeriowilliams_db_user:Edgerio3137@mern1.sgloynp.mongodb.net/mern-blog?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=mysecretjwt
3. Setup Client
bash
Copy code
cd ../client
npm install
4. Start Development Servers
bash
Copy code
# Start server
cd ../server
npm run dev

# Start client
cd ../client
npm run dev
The client will run on http://localhost:5173 (Vite default) and the API on http://localhost:5000/api.

🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current logged-in user

Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post by ID
POST	/api/posts	Create a new post (protected)
PUT	/api/posts/:id	Update a post (protected)
DELETE	/api/posts/:id	Delete a post (protected)
POST	/api/posts/:id/comments	Add comment to post (protected)

Categories
Method	Endpoint	Description
GET	/api/categories	Get all categories
POST	/api/categories	Create a new category (protected)

🛠️ Features
Authentication
Register and login with JWT

Protected routes for creating/updating/deleting posts

Role-based access control (user vs admin)

Blog Posts
Create, read, update, delete

Featured image uploads

Auto-generated slugs

Comments

Pagination, search, and category filters

Frontend
React + Vite

Components for post list, single post, create/edit forms

React Router for navigation

Context API for global state (user, posts, categories)

API integration with Axios

💡 Notes
Passwords are hashed using bcrypt before saving to MongoDB

Slugs are generated from post titles

isPublished field controls visibility of posts

Default post image is used if no image is uploaded

Ensure MongoDB Atlas IP whitelist includes your current IP

💾 Screenshots


🔗 Resources
MongoDB

Express.js

React

Node.js

Mongoose

License
This project is for educational purposes as part of the MERN Stack Integration assignment.
