# GreenCampus – Campus Sustainability Action Tracker (Frontend)

GreenCampus is a modern, responsive, and intuitive web application designed to encourage students to participate in eco-friendly activities and assist university administrative councils in monitoring and verifying their real-time environmental impact.

Built with **React.js**, **Vite**, **Tailwind CSS**, **React Router v6**, **Recharts**, and **Lucide React**.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000` (or `http://localhost:5173`).

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Access Credentials

The platform uses client-side mock authentication persisted via `localStorage` with convenient 1-click login buttons:

| Role | Name | Email | Password | Access Area |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Aarav Sharma | `student@greencampus.edu` | `password123` | `/student` (Student Hub) |
| **Admin** | Dr. Sunita Rao | `admin@greencampus.edu` | `password123` | `/admin` (Admin Console) |

> **Tip:** You can also use the **Quick Demo Persona** bar at the top or sidebar footer at any time to seamlessly toggle between Student and Admin views.

---

## 🎨 UI/UX Color Palette

- **Primary Brand Color**: Forest Green (`#166534`)
- **Secondary Accent**: Emerald Green (`#10B981`)
- **Background**: Soft Campus White/Green (`#F8FAF9`)
- **Cards**: Pure White (`#FFFFFF`) with subtle shadow curves
- **Text**: Dark Charcoal (`#1F2937`)
- **Accent Mint**: Mint Tints (`#ECFDF5`, `#D1FAE5`)

---

## 📂 Architecture & Directory Structure

```
green_campus/
├── src/
│   ├── assets/              # Static assets and icons
│   ├── components/
│   │   ├── common/          # Navbar, Footer, Sidebar, StatCard, Badge, QuickRoleBanner
│   │   ├── activities/      # ActivityCard, ActivityFilters, ActivityDetailModal
│   │   └── charts/          # ActivityTrendsChart, CategoryPieChart, ImpactMetricsGrid
│   ├── context/
│   │   ├── AuthContext.jsx      # Student & Admin session state + quick role switcher
│   │   ├── ActivityContext.jsx  # Activity state, optimistic submissions, approvals, rejections
│   │   └── ToastContext.jsx     # Modern floating feedback notifications
│   ├── data/
│   │   └── mockData.js          # Pre-seeded activities, student profiles, goals & impact metrics
│   ├── layouts/
│   │   ├── StudentLayout.jsx    # Responsive student navigation, topbar & sidebar
│   │   └── AdminLayout.jsx      # Responsive administrative verification console
│   ├── pages/
│   │   ├── LandingPage.jsx             # Public presentation, hero, impact, categories, benefits
│   │   ├── LoginPage.jsx               # Mock auth with 1-click role fill
│   │   ├── RegisterPage.jsx            # Student & Admin registration with role selector
│   │   ├── PublicLeaderboardPage.jsx   # Public student leaderboard
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx    # Metrics, trends, goals progress, recent activity
│   │   │   ├── SubmitActivityPage.jsx  # Form with photo evidence upload + preset selectors
│   │   │   ├── MyActivitiesPage.jsx    # Card/Table toggle, category & status filters, search
│   │   │   ├── LeaderboardPage.jsx     # Podium highlights (Top 3) & rankings table
│   │   │   └── StudentProfilePage.jsx  # Badges unlocked, points, cohort details
│   │   └── admin/
│   │       ├── AdminDashboard.jsx      # Total stats, analytics, pending review queue
│   │       ├── ManageActivitiesPage.jsx# Live approvals, point assignments, rejection feedback
│   │       ├── ManageStudentsPage.jsx  # Student registry, points, approved counts
│   │       └── ReportsPage.jsx         # Monthly participation & category breakdowns (Recharts)
│   ├── services/
│   │   ├── authService.js      # Prepared for POST /api/auth/login & register
│   │   ├── activityService.js  # Prepared for GET/POST/PATCH /api/activities
│   │   ├── statsService.js     # Prepared for GET /api/stats/dashboard & reports
│   │   └── userService.js       # Prepared for GET /api/users/leaderboard & students
│   ├── App.jsx                 # Router configuration
│   ├── main.jsx                # Application mount
│   └── index.css               # Tailwind directives & custom scrollbars
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔌 Seamless Backend Integration (Phase 2 Ready)

All data calls are decoupled from React components into dedicated service modules located in `src/services/`.

To connect your existing Node.js + Express backend:
1. Replace `localStorage` operations in `src/services/*.js` with `axios.get()` or `axios.post()` calls.
2. The data schemas across `Activity`, `User`, `Category`, and `Stats` are pre-aligned with standard MongoDB models.
3. No frontend component markup or state logic needs to be rewritten!

---

## 🌿 Standardized Sustainability Categories

1. **Tree Plantation** (+50 pts)
2. **Waste Management** (+30 pts)
3. **Recycling** (+25 pts)
4. **Water Conservation** (+35 pts)
5. **Energy Conservation** (+30 pts)
6. **Campus Cleanliness** (+20 pts)
7. **Other Eco-Friendly Activities** (+20 pts)

