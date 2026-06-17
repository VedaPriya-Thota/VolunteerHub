<div align="center">

# 🌐 VolunteerHub

### Smart Volunteer Management & Community Impact Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Connecting volunteers, NGOs, and administrators — all in one place.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [API Overview](#-api-overview) • [Future Roadmap](#-future-roadmap)

</div>

---

## 🧩 The Problem

Volunteering is fragmented. Organizations post opportunities on different platforms, volunteers track hours in spreadsheets, certificates get lost, and NGOs have no real data on engagement.

The result? **Volunteers drop off. NGOs burn out. Impact goes unmeasured.**

| Pain Point | Current Reality |
|---|---|
| Event Discovery | Scattered across WhatsApp, Google Forms, email |
| Attendance Tracking | Manual sheets, prone to errors |
| Certificate Issuance | Delayed, inconsistent, often missing |
| Volunteer History | Nonexistent or stored locally |
| NGO Analytics | Zero visibility into engagement |

---

## 💡 The Solution

**VolunteerHub** is a centralized full-stack platform that unifies the entire volunteer lifecycle — from discovery to certified completion — under one modern, intuitive interface.

```
Discover Events → Apply → Get Approved → Attend → Get Certified → Track Impact
```

Volunteers get a dashboard. NGOs get analytics. Admins get control. Everyone saves time.

---

## ✨ Features

### 🔐 Auth & Access Control
- JWT-based authentication with secure session management
- Role-based access: **Volunteer** / **Admin**
- Protected routes on both frontend and backend
- bcrypt password hashing

### 📅 Event Management
- Create, browse, and delete volunteer events
- Capacity limits with real-time availability
- Admin-controlled event lifecycle

### 👤 Volunteer Workflow
- One-click event applications
- Application status tracking (Pending / Approved / Rejected)
- Complete participation history
- Editable volunteer profile

### 🛡️ Admin Dashboard
- Review and approve/reject volunteer applications
- Create and manage events
- Monitor platform-wide analytics in real time

### 📋 Attendance System
- Check-in and check-out functionality
- Persistent attendance records per event

### 🏅 Certificate System
- Auto-generated PDF certificates upon event completion
- Downloadable and shareable
- Built with PDFKit for professional formatting

### 📊 Analytics Dashboard
- Total users, events, and applications at a glance
- Pending approvals counter
- Platform-wide statistics for NGOs and admins

### 🏢 NGO Directory
- Browse verified partner organizations
- Connect directly with NGOs for opportunities

---

## 🖥️ Screenshots

> _Screenshots coming soon — UI includes dark mode glassmorphism dashboards, animated landing page, and certificate preview._

| Landing Page | Volunteer Dashboard | Admin Panel |
|---|---|---|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

| Event Discovery | Certificate View | Analytics |
|---|---|---|
| _(screenshot)_ | _(screenshot)_ | _(screenshot)_ |

---

## 🏗️ Architecture

### System Workflow

```
┌─────────────────────────────────────────────────────┐
│                   VOLUNTEER FLOW                     │
│                                                     │
│  Register → Explore Events → Apply → [Admin Review] │
│       ↓                                    ↓        │
│  Dashboard ←── Certificate ←── Attend ←── Approve  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                 TECHNICAL LAYERS                     │
│                                                     │
│  [Next.js Frontend]  ──→  REST APIs (Axios + JWT)  │
│         ↓                         ↓                │
│  [TypeScript + Tailwind]   [Node.js + Express]      │
│                                   ↓                │
│                            [MySQL Database]         │
└─────────────────────────────────────────────────────┘
```

### Component Map

```
volunteerhub/
├── frontend/                    # Next.js 16 App
│   ├── app/
│   │   ├── (auth)/             # Login, Register pages
│   │   ├── dashboard/          # Volunteer dashboard
│   │   ├── admin/              # Admin panel
│   │   ├── events/             # Event listings
│   │   └── certificates/       # Certificate viewer
│   ├── components/             # Reusable UI components
│   ├── lib/                    # API clients, utils
│   └── styles/                 # Tailwind config
│
├── backend/                    # Node.js + Express API
│   ├── routes/
│   │   ├── auth.js             # Register, Login
│   │   ├── events.js           # CRUD operations
│   │   ├── applications.js     # Apply, Approve, Reject
│   │   ├── attendance.js       # Check-in/Check-out
│   │   ├── certificates.js     # PDF generation
│   │   └── analytics.js        # Platform stats
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   └── role.js             # Role guard
│   └── db/                    # MySQL connection
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16, React, TypeScript | App framework & rendering |
| **Styling** | Tailwind CSS, Framer Motion | UI design & animations |
| **UI/UX** | Glassmorphism, Lucide React | Modern aesthetic, icons |
| **Notifications** | React Hot Toast | User feedback |
| **Backend** | Node.js, Express.js | REST API server |
| **Auth** | JWT, bcrypt.js | Secure authentication |
| **Database** | MySQL | Relational data storage |
| **PDF** | PDFKit | Certificate generation |

---

## 🗄️ Database Design

| Table | Purpose |
|---|---|
| `users` | Authentication credentials and roles |
| `volunteers` | Extended volunteer profile information |
| `events` | Event details, capacity, and dates |
| `event_applications` | Volunteer applications and approval status |
| `attendance` | Per-event check-in and check-out records |
| `certificates` | Generated certificate metadata and links |

### Key Relationships

```
users ─────────┬──── event_applications ──── events
               │               │
           volunteers      attendance
               │
          certificates
```

---

## 📡 API Overview

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Login and receive JWT |

### Events
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List all events |
| POST | `/api/events` | Create event (Admin) |
| DELETE | `/api/events/:id` | Delete event (Admin) |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Apply for an event |
| GET | `/api/applications/me` | Get my applications |
| PATCH | `/api/applications/:id` | Approve/Reject (Admin) |

### Attendance
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/attendance/checkin` | Check in to event |
| POST | `/api/attendance/checkout` | Check out from event |

### Certificates & Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/certificates/:id` | Download certificate PDF |
| GET | `/api/analytics` | Platform-wide stats (Admin) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/volunteerhub.git
cd volunteerhub
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=volunteerhub
JWT_SECRET=your_super_secret_key
```

Initialize the database:

```bash
mysql -u root -p < db/schema.sql
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔒 Security Features

- **JWT Authentication** — stateless, token-based sessions
- **bcrypt Hashing** — industry-standard password protection
- **Role-Based Middleware** — admin routes locked down server-side
- **Protected Frontend Routes** — unauthorized access redirected automatically
- **Input Validation** — all API inputs sanitized before DB queries
- **Environment Secrets** — sensitive config kept out of source code

---

## 🔮 Future Roadmap

- [ ] 🤖 AI-based volunteer-event matching engine
- [ ] 📱 React Native mobile app
- [ ] 📧 Email notifications for approvals and reminders
- [ ] 🏆 Gamification — badges, leaderboards, streaks
- [ ] 📷 QR code attendance check-in
- [ ] 🔔 Real-time push notifications (WebSockets)
- [ ] 🏢 NGO self-onboarding portal
- [ ] 📊 Advanced impact analytics with charts and exports
- [ ] 🌍 Multi-language support

---

## 🧠 Skills Demonstrated

This project was built to showcase production-grade engineering practices:

- **Full-Stack Architecture** — seamless frontend-backend-database integration
- **REST API Design** — clean, versioned, role-protected endpoints
- **Authentication & Authorization** — JWT + RBAC from scratch
- **Database Design** — normalized relational schema with foreign keys
- **Component Architecture** — reusable, typed React components
- **UI/UX Engineering** — responsive design, animations, dark mode
- **PDF Generation** — server-side document generation with PDFKit
- **Product Thinking** — solving a real problem end-to-end with a working product

---

## 🌟 Why VolunteerHub Stands Out

> Most CRUD apps stop at Create-Read-Update-Delete. VolunteerHub is a **complete product** with an end-to-end user journey, real-world problem framing, role-based workflows, and production-ready security.

- ✅ Solves a real, underserved problem in the social impact sector
- ✅ Full role-based system — not just a single-user app
- ✅ Certificate generation adds tangible, real-world utility
- ✅ Analytics layer shows engineering maturity
- ✅ Polished UI that doesn't look like a tutorial project

---
---

<div align="center">

⭐ **If this project helped you, drop a star!** ⭐

_Built with passion for community impact_

</div>
