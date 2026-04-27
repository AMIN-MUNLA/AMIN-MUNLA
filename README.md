# Senior Companion Check-In Planner (DA219B)

## Problem Statement
Older adults often receive check-ins from family members, volunteers, and caregivers, but follow-up information is usually scattered between phone calls and personal notes.  
This project provides one simple system to log each check-in, track mood after each visit, and see whether medication was taken.

## Stack (Required by DA219B)
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose

## Scope Delivered
- 3 related collections: `Senior`, `Companion`, `CheckInVisit`
- Full CRUD for main entity `CheckInVisit`
- 2 relational endpoints:
  - `GET /api/seniors/:id/check-ins`
  - `GET /api/companions/:id/check-ins`
- 1 custom endpoint:
  - `GET /api/stats/mood-summary`
- Consistent API error contract:
  - `{ "error": string, "message": string, "details": any }`
- React UI requirements covered:
  - 3 components (`VisitsDashboard`, `VisitForm`, `VisitList`)
  - loading + error states
  - controlled form
  - edit/delete with confirmation
  - search by senior name + filter by visit type
  - auto-refresh with `setInterval` and cleanup in `useEffect`

## Project Structure
- `frontend/`: React app
- `backend/`: Express API
- `docs/`: ERD, report, seminar notes

## Quick Setup (Under 5 Minutes)
1. Open terminal in project root:
   - `cd "C:\Users\aminm\Documents\New project\da219b-senior-checkin-planner"`
2. Create env files:
   - copy `backend/.env.example` to `backend/.env`
   - copy `frontend/.env.example` to `frontend/.env`
3. Set real Atlas URI in `backend/.env`:
   - `MONGODB_URI=your_real_atlas_connection_string`
4. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
5. Seed realistic data:
   - `npm run seed --prefix backend`
6. Run app:
   - `npm run dev`
7. Verify:
   - Health: `http://localhost:5000/api/health` (should show `"database":"connected"`)
   - Frontend: `http://localhost:5173` (or next port if 5173 is busy)

## API Endpoints

### CheckInVisit CRUD
- `GET /api/check-in-visits`
- `GET /api/check-in-visits/:id`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`

### Relational
- `GET /api/seniors`
- `GET /api/companions`
- `GET /api/seniors/:id/check-ins`
- `GET /api/companions/:id/check-ins`

### Custom Statistics
- `GET /api/stats/mood-summary`
- Optional query params:
  - `seniorId=<objectId>`
  - `visitType=call|home_visit|video_call`

## Seminar Notes
- If `MONGODB_URI` is missing/placeholder, data endpoints return `503` with clear message.
- Health route always responds and shows DB state in `database`.
- ERD: `docs/erd.md`
- Final report: `docs/report-final.md`
- Drill script: `docs/seminar-drill.md`
