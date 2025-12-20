# eTuitionBd – Tuition Management System

## 🎯 Project Overview

The **Tuition Management System** is a comprehensive platform designed for students, tutors, and admins to manage tuition activities efficiently. It allows students to post tuition requirements, tutors to apply, and admins to monitor and regulate all platform operations.

**Purpose of the Project:**

- Solve the real problem of finding qualified tutors and verified tuition posts.
- Reduce friction between students and tutors by providing automated workflows.
- Enable digital class tracking, transparent payment, and structured communication.
- Assist admins in monitoring and regulating all platform activities.

## 💡 Features

### General Features

- User authentication (Email/Password & Google Login)
- Role-based routing: Student, Tutor, Admin
- JWT token verification for protected routes
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations using Framer Motion
- Clean and recruiter-friendly UI

### Student Features

- Register and manage profile
- Create, update, and delete tuition posts
- View tutor applications and approve/reject tutors
- Pay tutors securely via Stripe after approval
- Track tuition and payment history

### Tutor Features

- Register and manage profile
- Browse and apply for tuition posts
- Track application status: Pending, Approved, Rejected
- View ongoing tuitions and revenue history

### Admin Features

- Manage users (view, update, delete, change roles)
- Moderate tuition posts (approve/reject)
- View financial reports and transaction history
- Ensure platform security and compliance

### Additional & Challenge Features

- Search and sort tuition posts
- Advanced filters (class, subject, location)
- Pagination on tuition listing page
- JWT token verification (role, access, expiration)
- Optional: Tutor rating/review, in-app messaging, notifications, bookmarks

---

## 🖥️ Pages & Layout

### Navbar

- Logo & website name
- Navigation links: Home, Tuitions, Tutors, About, Contact
- Auth-based links: Login/Register (logged out), Dashboard/Profile dropdown (logged in)
- Sticky navbar using DaisyUI
- Mobile and tablet responsive

### Footer

- About platform
- Quick links
- Contact information
- Social media icons (new X logo)
- Copyright section

### Public Pages

- Home
- Tuitions Listing & Tuition Details
- Tutor Listing & Tutor Profile
- Login & Register
- Contact
- Error Page (404-friendly)

### Dashboard Pages

**Student Dashboard:**

- My Tuitions: View approved tuitions
- Post New Tuition: Create and publish tuition posts
- Applied Tutors: View tutor applications
- Payments: View payment history
- Profile Settings: Update personal info

**Tutor Dashboard:**

- My Applications: Track tuition applications
- Tutor Ongoing Tuitions: View approved tuitions
- Revenue History: Check earnings

**Admin Dashboard:**

- User Management: View, update, delete users, change roles
- Tuition Management: Approve/reject tuition posts
- Reports & Analytics: Platform earnings & transaction history

---

## 🔐 Authentication System

- Register as Student or Tutor (fields: Name, Email, Password, Role, Phone)
- Firebase authentication
- Save user profile in MongoDB
- Email/password login & Google login
- JWT token generation
- Role-based routing

---

## 🎨 UI & Design

- Unique design, not copied from modules
- Consistent headings, buttons, image sizes
- Clean spacing, alignment, responsive dashboard
- Charts & graphs for Admin dashboard
- Profile sidebar section included

---

## 🛠️ Technical Requirements

- Environment variables for Firebase & MongoDB
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React.js, DaisyUI, Framer Motion
- Stripe for payments
- Protected routes with JWT verification
- Smooth, polished deployment with no CORS/404/504 issues
- Minimum 20 meaningful client commits & 12 server commits

---

## 📦 Packages Used

- React.js, React Router
- DaisyUI, Tailwind CSS
- Firebase Authentication
- Axios
- Framer Motion
- Stripe
- MongoDB & Mongoose
- JWT
- React Hot Toast

---

## 🧩 Challenge Features

- Search & Sort (tuition by subject/location, sort by budget/date)
- Pagination (tuition listing)
- JWT token verification (role, access level, expiration)
- Advanced filter (class, subject, location)

**Optional Features:**

- Tutor rating & review system
- In-app messaging
- Student–tutor class calendar sync
- Notifications system
- Bookmark tutors or tuition posts

---
