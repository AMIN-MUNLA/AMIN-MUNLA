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
   - `cd da219b-senior-checkin-clean`
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
- Day 1 complete: setup, structure, README baseline, and ERD draft.
- Day 2+ will add schemas, realistic seed data, full CRUD, relational endpoints, and custom endpoint.

## Security Rule (automatic-fail prevention)
- No secrets are committed to Git.
- Use `.env` files only.
