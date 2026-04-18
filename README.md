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

## Run In Under 5 Minutes
1. Clone and open:
   - `git clone <your-repo-url>`
   - `cd <repository-folder-name>`
2. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
3. Create env files:
   - `Copy-Item backend/.env.example backend/.env`
   - `Copy-Item frontend/.env.example frontend/.env`
4. Add Atlas connection string in `backend/.env`:
   - `MONGODB_URI=your_atlas_connection_string`
5. Start backend + frontend:
   - `npm run dev`

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

## Current Progress
- Day 1: setup and structure
- Day 2: schemas + realistic seed data
- Day 3: CRUD + request validation
- Day 4: relational + custom stats endpoints
- Day 5: React list + controlled create form

## Security
- Secrets are not committed to Git
- Environment variables are handled through `.env` files

## Author
- MHD Amin Munla
- GitHub: `AMIN-MUNLA`
