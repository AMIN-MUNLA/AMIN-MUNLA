# Senior Companion Check-In Planner (DA219B)

Senior Companion Check-In Planner helps family members and volunteers track check-ins with older adults so they can follow wellbeing trends and catch support needs early.

## Stack
- Frontend: React (Vite)
- Backend: Express.js
- Database: MongoDB Atlas (Mongoose)

## Completed Scope (Day 1-5)
- 3 collections with relations: `Senior`, `Companion`, `CheckInVisit`.
- Full CRUD for `CheckInVisit`.
- 2 relational endpoints:
  - `GET /api/seniors/:id/check-ins`
  - `GET /api/companions/:id/check-ins`
- 1 custom stats endpoint:
  - `GET /api/stats/mood-summary`
- Consistent API error contract:
  - `{ "error": string, "message": string, "details": any }`
- React UI with:
  - 3 components (`VisitsDashboard`, `VisitForm`, `VisitList`)
  - loading and error states
  - controlled form
  - edit/delete confirmation flow
  - search by senior name + filter by visit type
  - auto-refresh using `setInterval` with cleanup in `useEffect`

## Project Structure
- `frontend/` React app
- `backend/` Express API
- `docs/` ERD, report template, seminar notes

## Run in Under 5 Minutes
1. Copy environment templates:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env`
2. Set real Atlas URI in `backend/.env`:
   - `MONGODB_URI=your_atlas_connection_string`
3. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
4. Seed realistic data:
   - `npm run seed --prefix backend`
5. Start app:
   - `npm run dev`

URLs:
- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## API Endpoints

### Check-In Visits (CRUD)
- `GET /api/check-in-visits`
- `GET /api/check-in-visits/:id`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`

### Relational
- `GET /api/seniors/:id/check-ins`
- `GET /api/companions/:id/check-ins`

### Custom Stats
- `GET /api/stats/mood-summary`
- Optional query params:
  - `seniorId=<objectId>`
  - `visitType=call|home_visit|video_call`

## Notes for Seminar
- If `MONGODB_URI` is missing, data endpoints return `503` with a clear message.
- Health endpoint shows DB state in `database` field.
- Report template: `docs/report-template.md`
- Final report draft: `docs/report-final.md`
- Live-change practice script: `docs/seminar-drill.md`
- Final pass checklist (Day 6): `docs/day6-final-pass-checklist.md`
- Teacher pass matrix: `docs/teacher-pass-matrix.md`
