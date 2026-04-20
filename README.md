# GoldenCare Senior Check-In (DA219B)

GoldenCare Senior Check-In helps family members and volunteers track check-ins with older adults so they can follow wellbeing trends and catch support needs early.

## Day 1 goals completed
- Chosen a personal, non-generic domain and frozen MVP scope.
- Set up React (Vite) frontend and Express backend.
- Added one-command startup with `concurrently`.
- Added `.env.example` files and secret-safe `.gitignore`.
- Drafted ERD and validation targets in `docs/erd.md`.
- Created backend Router -> Controller -> Model skeleton for `CheckInVisit`.

## Day 2 goals completed
- Added three Mongoose collections:
  - `Senior` (`backend/src/models/senior.model.js`)
  - `Companion` (`backend/src/models/companion.model.js`)
  - `CheckInVisit` (`backend/src/models/checkInVisit.model.js`)
- Added strong validation targets (enums, ranges, required fields, no future visit date).
- Added realistic seed script with 12 seniors, 8 companions, and 24 check-in visits.
- Added seed commands for teacher verification:
  - `npm run seed:dry-run --prefix backend`
  - `npm run seed --prefix backend`
  - `npm run seed:drop --prefix backend`

## Scope guardrails (strict)
- Build only DA219B required features.
- No authentication in v1.
- No payments, notifications, chat, or admin dashboard.
- Prioritize realistic seed data, explainability, and deployability.

## Project structure
- `frontend/` React (Vite) client.
- `backend/` Express API.
- `docs/` ERD and architecture notes.

## Quick start (under 5 minutes)
1. Copy environment templates:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env`
2. Install dependencies:
   - `cd frontend && npm install`
   - `cd ../backend && npm install`
   - `cd .. && npm install`
3. Start both apps:
   - `npm run dev`

Frontend default URL: `http://localhost:5173`  
Backend health URL: `http://localhost:5000/api/health`

## Day-by-day plan
- Day 1: Setup + scope + ERD (done)
- Day 2: MongoDB schemas + realistic seed data (done)
- Day 3-5: API CRUD + relational + custom endpoints
- Day 6-7: React CRUD UI + loading/error + interactive feature
- Day 8: Deploy + production config
- Day 9: Report writing
- Day 10: Seminar live-change drills
