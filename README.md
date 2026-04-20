# Senior Companion Check-In Planner (DA219B)

## Project Summary
This fullstack app helps families and volunteers log wellbeing check-ins for older adults and track follow-up needs over time.

## Tech Stack
- Frontend: React + Vite
- Backend: Express.js
- Database: MongoDB Atlas
- Startup: one command from root (`npm run dev`)

## Why This Project Is Strong (Exam + Jobs)
- Clear backend architecture: Router -> Controller -> Model
- Realistic relational data model: `seniors`, `companions`, `checkinvisits`
- Robust validation and error handling for API input
- Full CRUD foundation with relational and custom stats endpoints
- React frontend connected to real API with loading and error UX
- Clean incremental Git history with small daily commits

## Run In Under 5 Minutes (Teacher Demo)
1. Clone and open project:
   - `git clone <your-repo-url>`
   - `cd <repository-folder-name>`
2. Install dependencies (root + workspaces):
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
3. Create environment files:
   - `Copy-Item backend/.env.example backend/.env`
   - `Copy-Item frontend/.env.example frontend/.env`
4. Set MongoDB Atlas connection in `backend/.env`:
   - `MONGODB_URI=your_atlas_connection_string`
5. (Recommended for first run) seed realistic data:
   - `npm run seed --prefix backend`
6. Start full app (frontend + backend):
   - `npm run dev`
7. Verify quickly:
   - Frontend: `http://localhost:5173`
   - Health: `http://localhost:5000/api/health`

## Local URLs
- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## Architecture
- Backend code:
  - `backend/src/routes`
  - `backend/src/controllers`
  - `backend/src/models`
- Frontend code:
  - `frontend/src`

## API Endpoints
- `GET /api/seniors`
- `GET /api/companions`
- `GET /api/check-in-visits`
- `GET /api/check-in-visits/:id`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`
- `GET /api/seniors/:id/check-ins`
- `GET /api/companions/:id/check-ins`
- `GET /api/stats/mood-summary`

## Seed Data
- Validate seed data only:
  - `npm run seed:dry-run --prefix backend`
- Seed Atlas:
  - `npm run seed --prefix backend`
- Drop and reseed:
  - `npm run seed:drop --prefix backend`

## Current Progress (Teacher Verification)
- Day 1 complete:
  - Project setup and folder structure (`frontend`, `backend`, `docs`)
  - One-command startup from root (`npm run dev`)
- Day 2 complete:
  - Three validated collections: `seniors`, `companions`, `checkinvisits`
  - Realistic seed script with dry-run and reseed support
- Day 3 complete:
  - Full CRUD for main entity (`/api/check-in-visits`)
  - Request validation middleware and consistent JSON error handling
- Day 4 complete:
  - Relational endpoints: `/api/seniors/:id/check-ins`, `/api/companions/:id/check-ins`
  - Custom endpoint: `/api/stats/mood-summary`
  - Review fixes applied:
    - Reference IDs checked before create/update (Senior + Companion)
    - Invalid `visitType` query returns `400`
- Day 5 complete:
  - React list view + controlled create form connected to real API
  - Loading/error states for create/list flow
- Day 6 complete:
  - Edit mode (prefilled controlled form) + update flow
  - Delete action with user confirmation and refresh
- Day 7 complete:
  - Filter controls for visits table
  - Mood summary dashboard synchronized with filter state
- Next (Day 8-10 planned):
  - Deployment setup, final report polish, and seminar rehearsal checklist

## Security
- Secrets are not committed to Git
- Environment variables are handled through `.env` files

## Presentation Notes
- Day 7 Zoom checklist: `docs/day7-demo-checklist.md`

## Author
- MHD Amin Munla
- GitHub: `AMIN-MUNLA`
