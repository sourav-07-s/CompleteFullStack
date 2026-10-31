<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=CompleteFullStack&fontSize=58&fontColor=ffffff&animation=fadeIn&desc=Full-stack%20projects%20%E2%80%A2%20React%20%C2%B7%20Express%20%C2%B7%20MongoDB%20%C2%B7%20Vercel&descSize=18&descAlignY=72" alt="CompleteFullStack banner" />

# 🎧 MusicFy &nbsp;·&nbsp; Role-Based Music Streaming App

**Log in as a listener or an admin, stream tracks, build albums, and upload songs straight to the cloud.**

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-111111?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![JWT](https://img.shields.io/badge/Auth-JWT%20Cookies-F59E0B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![ImageKit](https://img.shields.io/badge/Storage-ImageKit-0F172A?style=for-the-badge)](https://imagekit.io)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[![API Status](https://img.shields.io/badge/API-online-22C55E?style=for-the-badge&logo=vercel&logoColor=white)](https://musicfy-api-umber.vercel.app)
[![Last Commit](https://img.shields.io/github/last-commit/sourav-07-s/CompleteFullStack?style=for-the-badge&color=F43F5E)](https://github.com/sourav-07-s/CompleteFullStack/commits/main)
[![Stars](https://img.shields.io/github/stars/sourav-07-s/CompleteFullStack?style=for-the-badge&color=F59E0B)](https://github.com/sourav-07-s/CompleteFullStack/stargazers)
[![Repo Size](https://img.shields.io/github/repo-size/sourav-07-s/CompleteFullStack?style=for-the-badge&color=8B5CF6)](https://github.com/sourav-07-s/CompleteFullStack)

<!-- TODO: add your live frontend link, e.g. [🚀 Live Demo](https://your-frontend.vercel.app) -->

[✨ Features](#-features) &nbsp;•&nbsp; [🏗️ Architecture](#%EF%B8%8F-architecture) &nbsp;•&nbsp; [🚀 Quick Start](#-quick-start) &nbsp;•&nbsp; [📡 API](#-api-reference) &nbsp;•&nbsp; [☁️ Deploy](#%EF%B8%8F-deploy-to-vercel) &nbsp;•&nbsp; [🧰 Other Projects](#-other-projects-in-this-repo)

</div>

---

## 📚 Table of Contents

1. [🌈 About This Repository](#-about-this-repository)
2. [✨ Features](#-features)
3. [🧱 Tech Stack](#-tech-stack)
4. [🏗️ Architecture](#%EF%B8%8F-architecture)
5. [📁 Project Structure](#-project-structure)
6. [🚀 Quick Start](#-quick-start)
7. [🔑 Environment Variables](#-environment-variables)
8. [🛡️ Roles & Permissions](#%EF%B8%8F-roles--permissions)
9. [📡 API Reference](#-api-reference)
10. [☁️ Deploy to Vercel](#%EF%B8%8F-deploy-to-vercel)
11. [🧯 Troubleshooting](#-troubleshooting)
12. [🧰 Other Projects in This Repo](#-other-projects-in-this-repo)
13. [🔒 Security Notes](#-security-notes)
14. [🗺️ Roadmap Ideas](#%EF%B8%8F-roadmap-ideas)
15. [👨‍💻 Author](#-author)

---

## 🌈 About This Repository

**CompleteFullStack** is a collection of full-stack learning projects. The flagship project is **MusicFy**, a music app with **role-based authentication** where listeners browse and play music, and admins upload tracks and curate albums.

| | Project | What it is | Stack | Folder |
|:-:|---|---|---|---|
| 🎧 | **MusicFy** ⭐ | Role-based music streaming app (this README's main focus) | React · Express · MongoDB · ImageKit | [`RoleBasedAuth_project`](./RoleBasedAuth_project) |
| 🖼️ | **Image Post App** | Upload an image with a caption and see it in a feed | React Router · Express · Multer · ImageKit | [`Project_1`](./Project_1) |
| 🔐 | **Auth API Practice** | Register + cookie/JWT practice API | Express · Mongoose · cookie-parser | [`Project_2`](./Project_2) |

---

## ✨ Features

### 🎵 For Listeners
- 🔐 **Sign up & log in** with secure, HTTP-only cookie sessions
- 🏠 **Home & Explore** pages with the latest tracks
- 🔎 **Search bar** to filter tracks quickly
- 💿 **Albums** page and a detailed **album view** with every track inside
- ▶️ **Built-in audio player** with play / pause, next / previous, volume, **shuffle** and **repeat**

### 🛠️ For Admins
- ⬆️ **Upload tracks** straight from the browser to ImageKit (large files supported)
- 📀 **Create albums** by choosing from uploaded tracks
- 📊 **Creator workspace** showing library activity

### 🔒 Platform & Security
- 👥 **Role-based access control**: `user` and `admin`
- 🚫 Public sign-up **can never create an admin**; admins are promoted in the database
- 🍪 `httpOnly`, `secure`, `sameSite` cookies and **7-day expiring** JWT tokens
- ✅ Input validation with clear `400 / 401 / 403 / 404 / 409` responses
- ⚡ **Direct-to-ImageKit uploads** that bypass Vercel's 4.5 MB request limit

---

## 🧱 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| 🎨 **Frontend** | React 19, Vite 8, Tailwind CSS 4, lucide-react | Fast dev server, modern UI, tiny bundle |
| ⚙️ **Backend** | Node.js, Express 5 | Simple, fast REST API |
| 🗄️ **Database** | MongoDB Atlas + Mongoose 9 | Flexible documents, free cloud tier |
| 🔑 **Auth** | JWT in HTTP-only cookies + bcryptjs | Safe against XSS token theft |
| 🖼️ **Media storage** | ImageKit | CDN-backed uploads and delivery |
| ☁️ **Hosting** | Vercel (two projects: API + website) | Zero-config deploys from GitHub |

---

## 🏗️ Architecture

```mermaid
flowchart LR
    U["👤 Browser"] -->|"/api/* requests"| F["⚛️ Frontend<br/>React + Vite on Vercel"]
    F -->|"vercel.json rewrite"| B["🚀 Backend API<br/>Express 5 on Vercel"]
    B --> M[("🍃 MongoDB Atlas")]
    B -.->|"signed upload token"| U
    U -.->|"direct file upload"| I["🖼️ ImageKit CDN"]

    style U fill:#6366f1,color:#ffffff,stroke:#4338ca
    style F fill:#06b6d4,color:#ffffff,stroke:#0e7490
    style B fill:#22c55e,color:#ffffff,stroke:#15803d
    style M fill:#16a34a,color:#ffffff,stroke:#14532d
    style I fill:#f59e0b,color:#ffffff,stroke:#b45309
```

> 💡 The frontend forwards every `/api` call to the backend, so the browser sees **one origin**. That is what makes the login cookie work in production.

### ⬆️ How uploads work

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant FE as ⚛️ Frontend
    participant API as 🚀 Backend API
    participant IK as 🖼️ ImageKit
    participant DB as 🍃 MongoDB

    Admin->>FE: Choose audio file and title
    FE->>API: GET /api/admin/imagekit-auth
    API-->>FE: token, expire, signature, publicKey
    FE->>IK: Upload file directly
    IK-->>FE: Public file URL
    FE->>API: POST /api/admin/upload (title + url)
    API->>DB: Save track
    API-->>FE: 201 Created
```

Because the file never passes through the serverless function, uploads are not limited by Vercel's 4.5 MB body size.

---

## 📁 Project Structure

```text
CompleteFullStack/
├── 🎧 RoleBasedAuth_project/        ← MusicFy (main project)
│   ├── backend/
│   │   ├── server.js                # Entry point (exports the app for Vercel)
│   │   └── src/
│   │       ├── app.js               # Express app, routes, error handling
│   │       ├── db/db.js             # Cached MongoDB connection
│   │       ├── controllers/         # auth + admin logic
│   │       ├── middlewares/         # authUser / authAdmin (JWT)
│   │       ├── models/              # user, Musics, album
│   │       ├── routes/              # /api/auth and /api/admin
│   │       └── services/            # ImageKit signed-upload helper
│   └── frontend/
│       ├── vercel.json              # Rewrites /api to the backend
│       └── src/
│           ├── App.jsx              # Hash-based routing + session
│           ├── pages/               # Home, Explore, Albums, Auth, Admin
│           ├── components/          # AudioPlayer, MusicCard, Header, SearchBar
│           └── lib/                 # api.js (requests) + helpers
├── 🖼️ Project_1/                    ← Image post app
└── 🔐 Project_2/                    ← Auth API practice
```

---

## 🚀 Quick Start

### ✅ Prerequisites
- [Node.js](https://nodejs.org) **20 or newer**
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [ImageKit](https://imagekit.io) account (you need the **private** and **public** API keys)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sourav-07-s/CompleteFullStack.git
cd CompleteFullStack/RoleBasedAuth_project
```

### 2️⃣ Start the backend
```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment Variables](#-environment-variables)):
```dotenv
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
IMAGEKIT_P_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
PORT=3000
```

Generate a strong secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run the API:
```bash
npm start
```
✅ Open <http://localhost:3000> and you should see `MusicFy API is running 🎵`.

### 3️⃣ Start the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
🎉 Open the URL Vite prints (usually <http://localhost:5173>). The dev server proxies `/api` to `http://localhost:3000`, so no extra setup is needed.

### 4️⃣ Make yourself an admin
Public sign-up always creates a normal `user`. To become an admin:
1. 📝 Register on the site.
2. 🍃 Open **MongoDB Atlas → Browse Collections → `users`**.
3. ✏️ Change your user's `role` from `"user"` to `"admin"`.
4. 🔁 **Log out and log in again** (the role is stored inside your login token).

---

## 🔑 Environment Variables

All variables belong to the **backend**. The frontend needs none.

| Variable | Required | Example | Description |
|---|:-:|---|---|
| `MONGO_URI` | ✅ | `mongodb+srv://USER:PASS@cluster.mongodb.net/music-project` | MongoDB connection string. **No trailing space.** |
| `JWT_SECRET` | ✅ | 64-character random hex | Signs login tokens |
| `IMAGEKIT_P_KEY` | ✅ | `private_...` | ImageKit **private** key (server only) |
| `IMAGEKIT_PUBLIC_KEY` | ✅ | `public_...` | ImageKit **public** key (same account as above) |
| `PORT` | ➖ | `3000` | Local port (ignored on Vercel) |
| `NODE_ENV` | ➖ | `production` | Enables secure cookies (also auto-detected on Vercel) |

> ⚠️ Never commit a `.env` file. Keep it in `.gitignore`.

---

## 🛡️ Roles & Permissions

| Action | 🌐 Visitor | 👤 User | 👑 Admin |
|---|:-:|:-:|:-:|
| Register / log in | ✅ | ✅ | ✅ |
| Browse tracks and albums | ❌ | ✅ | ✅ |
| Play music | ❌ | ✅ | ✅ |
| Upload tracks | ❌ | ❌ | ✅ |
| Create albums | ❌ | ❌ | ✅ |
| Open the admin workspace | ❌ | ❌ | ✅ |

---

## 📡 API Reference

Base URL (production): `https://musicfy-api-umber.vercel.app`

### 🔐 Authentication

| Method | Endpoint | Access | Body | Description |
|:-:|---|:-:|---|---|
| `GET` | `/` | 🌐 Public | none | Health check |
| `POST` | `/api/auth/register` | 🌐 Public | `username`, `email`, `password` (min 8 chars) | Create a `user` account and log in |
| `POST` | `/api/auth/login` | 🌐 Public | `username` or `email`, `password` | Log in (sets cookie) |
| `POST` | `/api/auth/logout` | 🌐 Public | none | Clear the cookie |

### 🎶 Music & Albums

| Method | Endpoint | Access | Body | Description |
|:-:|---|:-:|---|---|
| `GET` | `/api/admin` | 👤 User / 👑 Admin | none | Latest tracks |
| `GET` | `/api/admin/albums` | 👤 User / 👑 Admin | none | All albums |
| `GET` | `/api/admin/albums/:id` | 👤 User / 👑 Admin | none | One album with its tracks |
| `GET` | `/api/admin/imagekit-auth` | 👑 Admin | none | Signed token for direct upload |
| `POST` | `/api/admin/upload` | 👑 Admin | `title`, `uri` (ImageKit URL) | Save an uploaded track |
| `POST` | `/api/admin/album` | 👑 Admin | `title`, `musics` (array of track ids) | Create an album |

### 🚦 Status codes

| Code | Meaning |
|:-:|---|
| `200` / `201` | Success / created |
| `400` | Missing or invalid input |
| `401` | Not logged in, bad credentials, or expired token |
| `403` | Logged in, but not allowed (for example a user calling an admin route) |
| `404` | Resource or route not found |
| `409` | Username or email already exists |
| `503` | Database unavailable |

<details>
<summary>🧪 <b>Try it with curl</b></summary>

```bash
# Register (cookie is saved to cookies.txt)
curl -c cookies.txt -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@example.com","password":"supersecret1"}'

# List tracks with the saved cookie
curl -b cookies.txt http://localhost:3000/api/admin
```

</details>

---

## ☁️ Deploy to Vercel

MusicFy deploys as **two Vercel projects from this one GitHub repo**: one for the API, one for the website.

### 1️⃣ Before you start
- 🍃 **MongoDB Atlas → Network Access:** allow `0.0.0.0/0` (Vercel uses changing IP addresses)
- 🔑 Have your four secret values ready (see [Environment Variables](#-environment-variables))

### 2️⃣ Deploy the backend

| Setting | Value |
|---|---|
| Root Directory | `RoleBasedAuth_project/backend` |
| Application Preset | `Express` |
| Build / Output Command | leave empty |
| Environment Variables | `MONGO_URI`, `JWT_SECRET`, `IMAGEKIT_P_KEY`, `IMAGEKIT_PUBLIC_KEY` |

Open the new domain. You should see **"MusicFy API is running 🎵"**. Copy that domain.

### 3️⃣ Point the frontend to the backend
Edit `RoleBasedAuth_project/frontend/vercel.json` with your backend domain (no trailing `/`):

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-BACKEND.vercel.app/api/:path*"
    }
  ]
}
```
Commit and push.

### 4️⃣ Deploy the frontend

| Setting | Value |
|---|---|
| Root Directory | `RoleBasedAuth_project/frontend` |
| Application Preset | `Vite` |
| Build Command / Output | `npm run build` / `dist` (auto-filled) |
| Environment Variables | **none**. Do **not** add `VITE_API_BASE_URL` |

### 5️⃣ Final checks
- [ ] Register and log in on the live site
- [ ] Promote your account to `admin` in Atlas, then log out and in again
- [ ] Upload a song (try one larger than 5 MB)
- [ ] Create an album and play a track

🔄 After this, every `git push` to `main` redeploys automatically. If you change environment variables, redeploy manually from the **Deployments** tab.

---

## 🧯 Troubleshooting

<details>
<summary>💥 <b>500 FUNCTION_INVOCATION_FAILED on the backend</b></summary>

The function crashed while starting. Open **Vercel → Deployments → latest → Logs** and read the first red line. Typical causes: a typo in an export or import, a missing package, or a wrong Root Directory.

</details>

<details>
<summary>🗄️ <b>503 "Database connection unavailable"</b></summary>

Check Atlas **Network Access** (`0.0.0.0/0`), the database password, and make sure `MONGO_URI` has **no trailing space**. Redeploy after changing variables.

</details>

<details>
<summary>🔌 <b>"Could not reach the server" or 404 on login</b></summary>

The `destination` in `frontend/vercel.json` is wrong or was not pushed. Fix it, push, and wait for the redeploy.

</details>

<details>
<summary>🚪 <b>Logged out right after logging in</b></summary>

You probably set `VITE_API_BASE_URL` on the frontend. Delete it and redeploy, so requests stay on one origin and the cookie is kept.

</details>

<details>
<summary>🖼️ <b>Upload fails</b></summary>

Check that both ImageKit keys exist, come from the **same** account, and that you redeployed after adding them. Open the browser console (F12) for the exact error.

</details>

<details>
<summary>👑 <b>Admin page says "no access"</b></summary>

Log out and log in again. The role is stored inside your login token, so an old session still says `user`.

</details>

---

## 🧰 Other Projects in This Repo

### 🖼️ Project_1: Image Post App
A small app to practise file uploads. Pick an image, add a caption, and it appears in a feed.

- **Backend:** Express 5, Multer (memory storage), ImageKit, Mongoose, CORS
- **Frontend:** React 19, React Router, Axios, Tailwind CSS 4
- **Routes:** `POST /create_post` · `GET /posts`

### 🔐 Project_2: Auth API Practice
A minimal API used to learn cookies and JWT verification.

- **Stack:** Express 5, Mongoose, cookie-parser
- **Routes:** `POST /api/auth/register` · `GET /api/auth/test` · `POST /api/posts/create` (checks the JWT cookie)

> ℹ️ These are learning projects. **MusicFy** is the polished, deployable one.

---

## 🔒 Security Notes

- 🚫 **Never commit `.env` files.** Add them to `.gitignore` before your first commit.
- ♻️ If a secret was ever committed or shared, **rotate it**: change the MongoDB password, generate a new `JWT_SECRET`, and create a new ImageKit private key.
- 🍪 Auth tokens live in `httpOnly` cookies, so JavaScript on the page cannot read them.
- 👑 Admin accounts are never created through public sign-up.
- 🔐 Passwords are hashed with **bcrypt** and never stored in plain text.

---

## 🗺️ Roadmap Ideas

- [ ] 🎤 Add artist and cover-art fields for tracks
- [ ] 📃 Playlists and a "Liked songs" list
- [ ] 🗑️ Edit and delete tracks and albums from the admin workspace
- [ ] 🧪 Automated tests for the API
- [ ] 🔍 Server-side search and pagination
- [ ] 🧑‍🎤 Admin tools to promote or demote users

Have an idea? Open an [issue](https://github.com/sourav-07-s/CompleteFullStack/issues) 💡

---

## 👨‍💻 Author

**Sourav** · [@sourav-07-s](https://github.com/sourav-07-s)

If this project helped you, please give it a ⭐ and share it!

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" alt="footer wave" />

**Made with ❤️, ☕ and a lot of debugging.**

</div>
