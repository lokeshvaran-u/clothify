Clothify

A full-stack MERN-based clothing store management system for managing
products, inventory, users, and store activities.

🚀 Live Demo {#rocket-live-demo}

Open Clothify

📂 GitHub Repository {#open_file_folder-github-repository}

Clothify on GitHub

🛠️ Tech Stack {#hammer_and_wrench-tech-stack}

Frontend

React

Vite

JavaScript

React Router

Axios

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt.js

Services

MongoDB Atlas

Cloudinary

Render

Vercel

✨ Features {#sparkles-features}

Authentication & Authorization {#authentication--authorization}

User registration and login

Password hashing using bcrypt

JWT-based authentication

Role-based authorization

StoreAdmin and SalesAssistant roles

Protected frontend routes

StoreAdmin-only product management

Product Management

Create, read, update and delete products

Product image upload

Product search

Category filtering

Price and name sorting

Pagination

Inventory

Track product quantities

Low-stock product detection

Dashboard statistics

Total product count

Total stock count

Total brand count

Activity Logs

Logs product creation, updates and deletion

Records the user responsible for each action

Displays recent activities

🏗️ Architecture {#building_construction-architecture}

User
  │
  ▼
React / Vite
(Vercel)
  │
  │ REST API / Axios
  ▼
Node.js / Express
(Render)
  │
  │ Mongoose
  ▼
MongoDB Atlas

Image uploads → Cloudinary

📁 Project Structure {#file_folder-project-structure}

clothify/
├── controllers/
├── middleware/
├── models/
├── routes/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── data/
│       ├── pages/
│       ├── services/
│       └── utils/
├── .gitignore
├── package.json
├── server.js
└── README.md

🔐 Authentication Flow {#closed_lock_with_key-authentication-flow}

User registers or logs in.

Backend validates the credentials.

Passwords are hashed with bcrypt during registration.

Backend generates a JWT.

Frontend stores the JWT in local storage.

Axios sends the JWT in the Authorization header.

Backend middleware verifies the token.

Role middleware controls StoreAdmin-only operations.

👥 User Roles {#busts_in_silhouette-user-roles}

Role             Access

SalesAssistant   Dashboard, Products, Low Stock, Activity Logs
StoreAdmin       All SalesAssistant features + Create, Update and Delete Products

🌐 Deployment {#globe_with_meridians-deployment}

Component       Platform

Frontend        Vercel
Backend         Render
Database        MongoDB Atlas
Image Storage   Cloudinary

⚙️ Local Setup {#gear-local-setup}

1. Clone the repository {#1-clone-the-repository}

git clone https://github.com/lokeshvaran-u/clothify.git
cd clothify

2. Install backend dependencies {#2-install-backend-dependencies}

npm install

3. Configure environment variables {#3-configure-environment-variables}

Create a .env file in the project root:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_REGISTRATION_CODE=your_admin_registration_code

Never commit .env to GitHub.

4. Start the backend {#4-start-the-backend}

node server.js

5. Install frontend dependencies {#5-install-frontend-dependencies}

cd frontend
npm install

6. Start the frontend {#6-start-the-frontend}

npm run dev

🔒 Security {#lock-security}

Passwords are hashed with bcrypt.

JWT protects authenticated API requests.

Protected routes require authentication.

StoreAdmin operations require role authorization.

Environment variables are excluded using .gitignore.

Cloudinary secrets are not exposed in the frontend.

🎯 Project Purpose {#dart-project-purpose}

Clothify was developed as a practical MERN stack project demonstrating:

Full-stack application development

REST API design

MongoDB integration

Authentication and authorization

Role-based access control

CRUD operations

Inventory management

Frontend-backend integration

Cloud deployment

👨‍💻 Author 

Lokeshvaran U
