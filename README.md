# Senior Companion Check-In Planner (DA219B)

This fullstack app helps family members and volunteers log check-ins with older adults and follow wellbeing trends over time.

## Stack (DA219B required)
- Frontend: React (Vite)
- Backend: Express.js
- Database: MongoDB Atlas
- Architecture: Router -> Controller -> Model

## Run In Under 5 Minutes
1. Clone and open this repository.
2. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
3. Create env files:
   - `Copy-Item backend/.env.example backend/.env`
   - `Copy-Item frontend/.env.example frontend/.env`
4. Put your Atlas connection in `backend/.env`:
   - `MONGODB_URI=your_atlas_connection_string`
5. Seed realistic data:
   - `npm run seed:dry-run --prefix backend`
   - `npm run seed --prefix backend`
6. Start both apps:
   - `npm run dev`

## Local URLs
- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## Collections (exactly 3)
- `Senior`
- `Companion`
- `CheckInVisit`

See ERD and validation targets in [docs/erd.md](./docs/erd.md).

## Backend API

### Main entity CRUD (`CheckInVisit`)
- `GET /api/check-in-visits`
- `GET /api/check-in-visits/:id`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`

### Relational endpoints (2)
- `GET /api/seniors/:id/check-ins`
- `GET /api/companions/:id/check-ins`

### Custom stats endpoint (1)
- `GET /api/stats/mood-summary`
  - Optional query: `seniorId`, `visitType`
  - Implemented with normal `.find()` + JavaScript array math (no Mongo aggregation pipeline).

## Error Contract (consistent)
Every API error returns:

```json
{
  "error": "Bad Request",
  "message": "Human-readable error message",
  "details": null
}
```

Used status codes:
- `400` bad request/validation/object id
- `404` not found
- `409` duplicate conflict
- `500` unexpected server error

## Frontend Requirements Coverage
- Split into 3 single-responsibility components:
  - `VisitsDashboard.jsx` (parent state + fetch + auto refresh)
  - `VisitForm.jsx` (controlled create/edit form)
  - `VisitList.jsx` (render list + edit/delete actions)
- Explicit `loading` and `error` UI states.
- Auto-refresh implemented with `setInterval` every 30 seconds.
- Interval cleanup implemented with `useEffect` return function.
- Interactive feature implemented:
  - Search by Senior name
  - Filter by Visit Type

## Seed Data Quality
- Realistic names, cities, relationships, notes, dates, and mood values.
- Custom domain field included: `medicationTaken` (boolean).

## Important Notes For Seminar
- No secrets are hardcoded.
- All environment values are read from `.env` and `.env.example`.
- Code is intentionally simple so it is easy to explain during live oral defense.
