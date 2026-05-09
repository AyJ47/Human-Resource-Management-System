# HRMS — Human Resource Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) based Human Resource Management System with authentication, employee management, attendance tracking, leave management, and dashboard analytics.

---

## Features

### Authentication Module
- User Login & Logout
- JWT-based Authentication
- Role-Based Access Control (Admin / Employee)
- Protected Routes
- Persistent Login using Local Storage

### Employee Management
**Admin:** Add, Edit, Delete, and View Employees (fully from UI — no MongoDB access needed)
**Employee:** View Employee Directory

### Attendance Management
- Mark Attendance (Present / Absent / Late)
- Duplicate check — prevents double marking per day
- Admin: View all attendance, mark for any employee
- Employee: View own attendance, mark own attendance

### Leave Management
**Employee:** Apply for Leave, View Leave History
**Admin:** View All Requests, Approve / Reject

### Dashboard
**Admin:** Total Employees, Today's Attendance, Pending Leaves, Total Leave Requests
**Employee:** Attendance count, Leave Requests, Pending Leaves

---

## Tech Stack

| Layer     | Technology                                                    |
| --------- | ------------------------------------------------------------- |
| Frontend  | React.js, Vite, Tailwind CSS v4, Axios, React Router DOM v7  |
| Backend   | Node.js, Express.js v5, JWT, Bcrypt.js, Mongoose              |
| Database  | MongoDB Atlas                                                 |
| Deploy    | Vercel (frontend) + Render (backend)                          |

---

## Folder Structure

```
HRMS/
├── backend/
│   ├── middleware/       # authMiddleware, adminMiddleware
│   ├── models/           # User, Employee, Attendance, Leave
│   ├── routes/           # authRoutes, employeeRoutes, attendanceRoutes, leaveRoutes
│   ├── server.js
│   ├── .env              # (git-ignored) — see .env.example
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Sidebar, StatCard, EmployeeForm, MarkAttendance, etc.
│   │   ├── context/      # AuthContext
│   │   ├── pages/        # Login, Dashboard, Employees, Attendance, Leaves
│   │   ├── utils/        # axios instance with interceptors
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── vite.config.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/AyJ47/Human-Resource-Management-System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using the template:

```bash
cp .env.example .env
```

Then fill in your actual values:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_strong_random_secret
CORS_ORIGIN=*
```

> ⚠️ **Never commit your `.env` file.** It contains database credentials and secrets. The `.gitignore` already excludes it.

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description          | Auth     |
| ------ | ------------------ | -------------------- | -------- |
| POST   | /api/auth/register | Register User        | Public   |
| POST   | /api/auth/login    | Login User           | Public   |
| GET    | /api/auth/me       | Get current profile  | Required |

### Employees

| Method | Endpoint              | Description             | Auth          |
| ------ | --------------------- | ----------------------- | ------------- |
| GET    | /api/employees        | Get all employees       | Required      |
| GET    | /api/employees/me     | Get own employee record | Required      |
| POST   | /api/employees        | Create employee + user  | Admin only    |
| PUT    | /api/employees/:id    | Update employee profile | Admin only    |
| DELETE | /api/employees/:id    | Delete employee + data  | Admin only    |

### Attendance

| Method | Endpoint              | Description         | Auth     |
| ------ | --------------------- | ------------------- | -------- |
| POST   | /api/attendance/mark  | Mark attendance     | Required |
| GET    | /api/attendance       | Get attendance      | Required |

### Leaves

| Method | Endpoint                | Description          | Auth       |
| ------ | ----------------------- | -------------------- | ---------- |
| POST   | /api/leaves/apply       | Apply for leave      | Required   |
| GET    | /api/leaves             | Get leaves           | Required   |
| PATCH  | /api/leaves/:id/status  | Approve/Reject leave | Admin only |

---

## Deployment

### Frontend (Vercel)

1. Connect the `frontend/` directory to Vercel
2. Set environment variable: `VITE_API_URL` = your Render backend URL + `/api`

### Backend (Render)

1. Connect the `backend/` directory to Render
2. Set environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — a strong random secret
   - `CORS_ORIGIN` — your Vercel frontend URL (e.g. `https://your-app.vercel.app`)
   - `PORT` — Render sets this automatically

> ⚠️ **Security:** Never expose `MONGO_URI` or `JWT_SECRET` in client-side code, git history, or public documentation. Use environment variables exclusively.

---

## Demo Credentials

```
Admin:   admin@gmail.com / 123456
```

---

## Author

Ayush Jadon

---

## License

This project is created for educational and internship assignment purposes.
