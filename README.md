<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366F1,50:8B5CF6,100:EC4899&height=230&section=header&text=Role-Based%20Auth&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Secure%20authentication%20and%20role-based%20access%20control&descAlignY=60&descSize=18" alt="Role-Based Auth banner" />

# 🔐 Role-Based Authentication System

**A full-stack MERN application where users register and log in, and what they can access depends on their role.**

<img src="https://skillicons.dev/icons?i=js,react,nodejs,express,mongodb" alt="tech icons" />

<br/><br/>

[![Last Commit](https://img.shields.io/github/last-commit/sourav-07-s/CompleteFullStack?path=RoleBasedAuth_project&style=for-the-badge&color=6366F1)](https://github.com/sourav-07-s/CompleteFullStack/commits/main/RoleBasedAuth_project)
[![Stars](https://img.shields.io/github/stars/sourav-07-s/CompleteFullStack?style=for-the-badge&color=F59E0B)](https://github.com/sourav-07-s/CompleteFullStack/stargazers)

### [🐛 Report Bug](https://github.com/sourav-07-s/CompleteFullStack/issues) &nbsp;•&nbsp; [💡 Request Feature](https://github.com/sourav-07-s/CompleteFullStack/issues)

</div>

---

## 📖 Overview

Many applications need to show different content to different people. A regular user should see their own dashboard, while an administrator should be able to reach restricted pages and data.

This project implements that with **role-based access control (RBAC)**. Users create an account and log in, the server issues a signed token, and every protected page and API route checks both the token and the user's role before allowing access.

It is part of my **CompleteFullStack** collection of full-stack practice projects and was built to practise authentication, authorization, and securing both the API and the frontend.

---

## ✨ Features

- 🔹 User registration and login
- 🔹 Passwords hashed with **bcrypt** before storage
- 🔹 Stateless authentication with **JSON Web Tokens (JWT)**
- 🔹 Role-based access control with `user` and `admin` roles
- 🔹 Protected routes on the **frontend** (React) that redirect unauthorised visitors
- 🔹 Protected endpoints on the **backend** using authentication and role-check middleware
- 🔹 MongoDB persistence through Mongoose

---

## 🔑 Roles and Access

| Role | Can do | Cannot do |
|---|---|---|
| **User** | Register, log in, view their own profile and dashboard | Open admin pages or call admin-only endpoints |
| **Admin** | Everything a user can, plus open admin pages and view all users | Not applicable |
| **Visitor (not logged in)** | View the login and register pages | Open any protected page or endpoint |

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js, JavaScript | UI, routing, and protected routes |
| Backend | Node.js, Express.js | REST API and auth middleware |
| Database | MongoDB, Mongoose | Store users and their roles |
| Authentication | JWT, bcrypt | Session tokens and password hashing |

---

## 🔄 How Authentication Works

```text
Register / Login  ──►  Server verifies credentials  ──►  Server returns a signed JWT
        │
        ▼
Client sends the JWT with each request (Authorization: Bearer <token>)
        │
        ▼
Auth middleware verifies the token  ──►  Role middleware checks the user's role  ──►  Allow or deny (401 / 403)
```

---

## 📁 Project Structure

```text
RoleBasedAuth_project/
├── backend/
│   ├── controllers/     # Request handlers (register, login, users)
│   ├── middleware/      # JWT verification and role checks
│   ├── models/          # Mongoose User model
│   ├── routes/          # API route definitions
│   ├── .env.example     # Environment variable template
│   ├── package.json
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI and protected-route wrapper
    │   ├── pages/       # Login, Register, Dashboard, Admin
    │   └── App.jsx
    └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new account (default role: `user`) |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| GET | `/api/users/me` | Logged-in user | Get the current user's profile |
| GET | `/api/users` | Admin only | List all users |

**Status codes:** `401` means no valid token, and `403` means a valid token but insufficient role.

---

## 🚀 Quick Start

### ✅ Prerequisites
- [Node.js](https://nodejs.org) 18 or newer
- [MongoDB](https://www.mongodb.com/try/download/community) locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1️⃣ Clone
```bash
git clone https://github.com/sourav-07-s/CompleteFullStack.git
cd CompleteFullStack/RoleBasedAuth_project
```

### 2️⃣ Configure environment variables

```bash
cd backend
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the API runs on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string used to sign tokens |

> ⚠️ Never commit your real `.env` file. Only `.env.example` belongs in the repository.

### 3️⃣ Install and run

```bash
# Terminal 1: backend
cd backend
npm install
npm run dev

# Terminal 2: frontend
cd frontend
npm install
npm run dev
```

🎉 Open the local URL printed by the frontend terminal (Vite usually uses <http://localhost:5173>).

---

## 🧪 How to Test the Roles

1. Register a new account. It is created with the `user` role.
2. Log in and confirm you can open the user dashboard.
3. Try to open an admin page or call `GET /api/users`. You should be blocked.
4. To create an admin, change that user's `role` field to `admin` directly in MongoDB (Compass or Atlas), then log in again.
5. Confirm the admin page and `GET /api/users` now work.

---

## 🗺️ Roadmap

- [ ] Refresh tokens and token expiry handling
- [ ] Input validation on all routes
- [ ] Automated tests for the auth and role middleware
- [ ] Admin screen to change user roles from the UI
- [ ] Deploy the frontend and backend

---

## 🤝 Contributing

Issues and pull requests are welcome. Fork the repo, create a branch (`git checkout -b feat/my-feature`), commit, and open a PR.

---

## 👨‍💻 Author

<div align="center">

**Sourav Sahoo**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sourav-07-s)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sourav-sahoo-s/)
[![Portfolio](https://img.shields.io/badge/Portfolio-6366F1?style=for-the-badge)](https://portfolio-green-iota-64.vercel.app/)

⭐ If you found this useful, give it a star! ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366F1,50:8B5CF6,100:EC4899&height=100&section=footer" alt="footer wave" />

</div>
