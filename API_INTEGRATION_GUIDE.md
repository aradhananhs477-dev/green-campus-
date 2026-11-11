# GreenCampus – Backend Integration Specification & Guide

This document outlines the expected REST API endpoints, request/response JSON contracts, and MongoDB document schemas designed to connect your **Node.js + Express + MongoDB** backend to the GreenCampus frontend.

---

## 1. Authentication Endpoints

### `POST /api/auth/register`
Creates a new student or administrator account.

**Request Body:**
```json
{
  "name": "Priya Patel",
  "email": "priya.patel@campus.edu",
  "password": "SecurePassword123!",
  "role": "student", // "student" | "admin"
  "department": "Environmental Engineering"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "673000000000000000000001",
    "name": "Priya Patel",
    "email": "priya.patel@campus.edu",
    "role": "student",
    "department": "Environmental Engineering",
    "studentId": "GC-2026-104",
    "avatar": "https://images.unsplash.com/...",
    "points": 0,
    "approvedCount": 0
  }
}
```

---

### `POST /api/auth/login`
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "student@greencampus.edu",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "673000000000000000000002",
    "name": "Aarav Sharma",
    "email": "student@greencampus.edu",
    "role": "student",
    "department": "Computer Science & Engineering",
    "studentId": "GC-2024-892",
    "points": 420
  }
}
```

---

## 2. Activity Endpoints

### `GET /api/activities`
Retrieves activities with optional query filters.

**Query Parameters:**
- `studentId`: Filter by specific student
- `category`: Filter by category name
- `status`: Filter by status (`Approved`, `Pending`, `Rejected`)
- `search`: Search query string

**Response (200 OK):**
```json
[
  {
    "id": "act-1001",
    "studentId": "usr-103",
    "studentName": "Aarav Sharma",
    "studentEmail": "aarav.sharma@campus.edu",
    "studentAvatar": "https://images.unsplash.com/...",
    "title": "Botanical Garden Native Flora Planting",
    "category": "Tree Plantation",
    "description": "Planted 15 neem saplings with the Nature Club.",
    "date": "2026-11-08",
    "location": "North Campus Botanical Garden",
    "status": "Pending",
    "points": 50,
    "proofImage": "https://images.unsplash.com/...",
    "submissionDate": "2026-11-08T14:30:00.000Z",
    "rejectionReason": null
  }
]
```

---

### `POST /api/activities`
Submits a new student sustainability activity.

**Request Body:**
```json
{
  "title": "Solar Roof Sensor Audit",
  "category": "Energy Conservation",
  "description": "Audited classroom power shutoffs and recorded solar energy metrics.",
  "date": "2026-11-10",
  "location": "Engineering Block 3",
  "proofImage": "data:image/jpeg;base64,... or URL"
}
```

**Response (201 Created):** Returns the newly created activity object with `"status": "Pending"`.

---

### `PATCH /api/activities/:id/approve`
Approves an activity and assigns points (Admin only).

**Request Body:**
```json
{
  "points": 50
}
```

**Response (200 OK):**
```json
{
  "id": "act-1001",
  "status": "Approved",
  "points": 50,
  "reviewedAt": "2026-11-10T16:00:00.000Z"
}
```

---

### `PATCH /api/activities/:id/reject`
Rejects an activity with constructive feedback (Admin only).

**Request Body:**
```json
{
  "rejectionReason": "Photo proof does not show verified campus location. Please re-upload with student ID tag visible."
}
```

**Response (200 OK):**
```json
{
  "id": "act-1001",
  "status": "Rejected",
  "points": 0,
  "rejectionReason": "Photo proof does not show verified campus location..."
}
```

---

## 3. Users & Leaderboard Endpoints

### `GET /api/users/leaderboard`
Returns student rankings sorted by total points descending.

**Response (200 OK):**
```json
[
  {
    "id": "usr-101",
    "name": "Priya Patel",
    "rank": 1,
    "points": 580,
    "approvedCount": 22,
    "department": "Environmental Engineering",
    "avatar": "https://images.unsplash.com/..."
  }
]
```

---

## 4. Statistics Endpoints

### `GET /api/stats/dashboard`
Returns dashboard statistics for student or admin based on JWT token.

### `GET /api/stats/reports`
Returns campus ESG metrics: monthly activity velocity, category distribution, and cumulative environmental impact (CO2, trees, water, energy, waste).

