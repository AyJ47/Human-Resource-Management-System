# HRMS - Human Resource Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) based Human Resource Management System (HRMS) application with authentication, employee management, attendance tracking, leave management, and dashboard analytics.

---

# Features

## Authentication Module

- User Login & Logout
- JWT-based Authentication
- Role-Based Access Control

  - Admin
  - Employee

- Protected Routes
- Persistent Login using Local Storage

---

## Employee Management

### Admin Features

- Add Employee
- Edit Employee
- Delete Employee
- View Employee List

### Employee Features

- View Employee Records

---

## Attendance Management

- Mark Attendance
- Attendance Status:

  - Present
  - Absent
  - Late

- View Attendance Records
- Admin can view all attendance
- Employees can view only their own attendance

---

## Leave Management

### Employee Features

- Apply for Leave
- View Leave History

### Admin Features

- View All Leave Requests
- Approve Leave Requests
- Reject Leave Requests

---

## Dashboard

### Admin Dashboard

- Total Employees
- Attendance Summary
- Pending Leave Requests

### Employee Dashboard

- Personal Attendance Summary
- Leave Summary

---

## UI/UX Features

- Responsive Design
- Mobile Sidebar Navigation
- Toast Notifications
- Loading States
- Form Validation
- Modern Tailwind UI

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js
- Mongoose

---

## Database

- MongoDB Atlas

---

# Folder Structure

```bash
HRMS/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
│
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/AyJ47/Human-Resource-Management-System
```

---

# Backend Setup

## 2. Navigate to Backend Folder

```bash
cd backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create .env File

Create a `.env` file inside the backend folder:

---

## 5. Run Backend Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# Frontend Setup

## 6. Navigate to Frontend Folder

```bash
cd frontend
```

---

## 7. Install Dependencies

```bash
npm install
```

---

## 8. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

# Authentication Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

---

# Employee Routes

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | /api/employees     | Get Employees   |
| POST   | /api/employees     | Create Employee |
| PUT    | /api/employees/:id | Update Employee |
| DELETE | /api/employees/:id | Delete Employee |

---

# Attendance Routes

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | /api/attendance/mark | Mark Attendance |
| GET    | /api/attendance      | Get Attendance  |

---

# Leave Routes

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/leaves/apply      | Apply Leave         |
| GET    | /api/leaves            | Get Leaves          |
| PATCH  | /api/leaves/:id/status | Update Leave Status |

---

# Authentication Flow

1. User logs in
2. Backend validates credentials
3. JWT token generated
4. Token stored in localStorage
5. Axios interceptor attaches token automatically
6. Protected routes verify token

---

# Role-Based Access

## Admin

Can:

- Manage Employees
- View All Attendance
- Approve/Reject Leaves
- View Dashboard Analytics

---

## Employee

Can:

- Mark Attendance
- Apply for Leave
- View Own Attendance
- View Own Leaves

---

# Deployment

## Frontend Deployment

Deploy frontend using:

- Vercel

---

## Backend Deployment

Deploy backend using:

- Render

---

# Demo Credentials

## Admin Login

```bash
Email: admin@gmail.com
Password: 123456
```

---

# Future Improvements

- Profile Management
- Search & Filtering
- Attendance Charts
- Email Notifications
- Payroll Module
- Dark Mode
- Export Reports

---

# Author

Ayush Jadon

---

# License

This project is created for educational and internship assignment purposes.
