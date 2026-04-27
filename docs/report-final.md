# DA219B Fullstack Lab Report
**Student:** MHD Amin Munla  
**Project:** Senior Companion Check-In Planner  
**Course:** DA219B

## 1) System Overview (5-8 lines)
Senior Companion Check-In Planner is a simple fullstack web app for tracking check-ins with older adults.  
The frontend is built with React (Vite), and the backend is built with Express and Mongoose.  
The app stores three related collections: `Senior`, `Companion`, and `CheckInVisit`.  
`CheckInVisit` is the main entity and connects to both other collections using ObjectId references.  
Users can create, read, update, and delete visits from one dashboard.  
The UI also supports search by senior name, filter by visit type, and auto-refresh for updated data.  
The API uses one consistent error contract and clear status codes for easier debugging and seminar explanation.

## 2) Database Design
The database design follows the lab requirement of three collections with references.

- **Senior**: stores older adult profile data (`fullName`, `age`, `city`, `contactPhone`, `supportLevel`).
- **Companion**: stores family/volunteer/caregiver info (`fullName`, `relationshipType`, `phone`, `preferredLanguage`).
- **CheckInVisit**: stores each visit record (`seniorId`, `companionId`, `checkInDate`, `visitType`, `moodAfterVisit`, `medicationTaken`, `notes`).

`CheckInVisit.seniorId` references `Senior._id` and `CheckInVisit.companionId` references `Companion._id`.  
This creates one-to-many relationships:
- one Senior -> many CheckInVisit documents
- one Companion -> many CheckInVisit documents

ERD reference: `docs/erd.md`

## 3) API Endpoint Examples

### Endpoint A: Create visit
- **Method:** `POST`
- **Route:** `/api/check-in-visits`
- **Request body (example):**

```json
{
  "seniorId": "680d5ed2875f68d7d4c12345",
  "companionId": "680d5ed2875f68d7d4c67890",
  "checkInDate": "2026-04-24T10:30:00.000Z",
  "visitType": "home_visit",
  "moodAfterVisit": 4,
  "medicationTaken": true,
  "notes": "Walked for 20 minutes and checked medication box."
}
```

- **Example response (201):**

```json
{
  "_id": "680d611b875f68d7d4c9ab01",
  "seniorId": {
    "_id": "680d5ed2875f68d7d4c12345",
    "fullName": "Ingrid Andersson",
    "city": "Malmo",
    "supportLevel": "medium"
  },
  "companionId": {
    "_id": "680d5ed2875f68d7d4c67890",
    "fullName": "Sara Nilsson",
    "relationshipType": "family",
    "preferredLanguage": "Swedish"
  },
  "checkInDate": "2026-04-24T10:30:00.000Z",
  "visitType": "home_visit",
  "moodAfterVisit": 4,
  "medicationTaken": true,
  "notes": "Walked for 20 minutes and checked medication box."
}
```

### Endpoint B: Update visit
- **Method:** `PUT`
- **Route:** `/api/check-in-visits/:id`
- **Request body (example):**

```json
{
  "visitType": "video_call",
  "moodAfterVisit": 5,
  "medicationTaken": true,
  "notes": "Follow-up call, mood improved after family support."
}
```

- **Example response (200):**

```json
{
  "_id": "680d611b875f68d7d4c9ab01",
  "visitType": "video_call",
  "moodAfterVisit": 5,
  "medicationTaken": true,
  "notes": "Follow-up call, mood improved after family support."
}
```

## 4) Challenge, Solution, and Learning
### Challenge
During final testing, the app started locally but data endpoints failed because database configuration was incomplete.

### Solution
I added explicit checks for missing or placeholder `MONGODB_URI` values and returned clear `503` messages when the DB is unavailable.  
I also improved seed/startup messages so configuration problems are obvious before seminar.

### What I learned
I learned that clear error messaging and predictable API behavior are as important as core CRUD logic.  
This reduced debugging time and made the system easier to explain during live defense.

## 5) Feature Iteration Evidence (Real Commits)
I iterated the same "database configuration reliability" feature in two steps:

1. `72dc23e`  
   Added placeholder URI detection so angle-bracket Atlas examples are treated as not configured.

2. `a646bde`  
   Improved seeding feedback with a clear error message when Atlas URI is still placeholder.

This shows the feature was first implemented, then improved based on testing feedback.

## 6) Extra Libraries Used
- Backend: `express`, `mongoose`, `cors`, `dotenv`
- Frontend: `react`, `react-dom`, `vite`
- Dev tooling: `nodemon` (optional script), `eslint`

No heavy extra framework was added, to keep the solution simple and easy to explain.
