# Senior Companion Check-In Planner (DA219B)

## Problem Statement (required in DA219B)
This app helps family members and volunteers log check-ins with older adults so wellbeing changes can be tracked early and support actions can be planned.

## Stack (required by DA219B)
- Frontend: React (Vite)
- Backend: Express.js
- Database: MongoDB Atlas
- One-command startup: `concurrently` via root `npm run dev`

## Run In Under 5 Minutes (teacher verification)
1. Clone and open the project:
   - `git clone <your-repo-url>`
   - `cd <repository-folder-name>`
2. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
3. Create environment files:
   - `Copy-Item backend/.env.example backend/.env`
   - `Copy-Item frontend/.env.example frontend/.env`
4. Set your Atlas URI in `backend/.env`:
   - `MONGODB_URI=your_atlas_connection_string`
5. Run both backend and frontend with one command:
   - `npm run dev`

## Local URLs
- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`

## Architecture (teacher verification)
- Backend follows Router -> Controller -> Model pattern.
- Backend files are in `backend/src/routes`, `backend/src/controllers`, `backend/src/models`.
- Frontend files are in `frontend/src`.

## Current Progress
- Day 1 complete: setup, structure, README baseline.
- Day 2 complete: three validated collections (`seniors`, `companions`, `checkinvisits`) and realistic seed script.
- Day 3 complete: full CRUD for `check-in-visits` with input validation and consistent JSON errors.
- Day 4 complete: relational endpoints + custom mood summary endpoint with strict query validation.
- Day 5 complete: React list + controlled create form connected to backend API with loading/error UX.
- Next: React update/delete actions and final deploy/report prep.

## API Endpoints (Day 5)
- `GET /api/seniors` (list seniors for UI forms)
- `GET /api/companions` (list companions for UI forms)
- `GET /api/check-in-visits` (filters: `seniorId`, `companionId`, `visitType`, `followUpRequired`, `minMood`, `maxMood`)
- `GET /api/check-in-visits/:id`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`
- `GET /api/seniors/:id/check-ins` (relational endpoint)
- `GET /api/companions/:id/check-ins` (relational endpoint)
- `GET /api/stats/mood-summary` (custom endpoint, optional `visitType`, `startDate`, `endDate`)

## Seed Data (teacher verification)
- Dry validation without DB writes:
  - `npm run seed:dry-run --prefix backend`
- Seed Atlas after adding `MONGODB_URI`:
  - `npm run seed --prefix backend`
- Drop DB and reseed:
  - `npm run seed:drop --prefix backend`

## Security Rule (automatic-fail prevention)
- No secrets are committed to Git.
- Use `.env` files only.
