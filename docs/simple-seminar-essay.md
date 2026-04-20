# Simple Seminar Essay (Explain The Project End-to-End)

## 1) What this project is
This project is a fullstack app called **Senior Companion Check-In Planner**.  
Its purpose is to help families and volunteers record check-ins with older adults, follow their wellbeing, and plan follow-up actions.

## 2) Which technologies I used
- Frontend: React (Vite)
- Backend: Express.js
- Database: MongoDB Atlas

I can run both frontend and backend from one command: `npm run dev`.

## 3) How data is structured
I use three main collections:
- `seniors`
- `companions`
- `checkinvisits`

`checkinvisits` connects the other two collections with references:
- `seniorId`
- `companionId`

This gives me realistic relationships for real-world data.

## 4) How request flow works
When I do an action in the UI:
1. React sends an API request.
2. Express route receives it.
3. Controller applies logic and validation.
4. Mongoose model validates schema rules.
5. Data is saved/read in MongoDB.
6. JSON response returns to React and updates the screen.

## 5) How I prevent bad data
- Input validation middleware for create/update payload.
- Query validation in controllers.
- Schema validation in Mongoose models.
- Reference checks so `seniorId` and `companionId` must exist.
- Invalid `visitType` returns `400` instead of silent empty result.

## 6) What features are implemented
- Full CRUD for check-in visits.
- Relational endpoints:
  - `/api/seniors/:id/check-ins`
  - `/api/companions/:id/check-ins`
- Custom stats endpoint:
  - `/api/stats/mood-summary`
- Frontend:
  - list visits
  - create visit (controlled form)
  - edit visit
  - delete visit with confirmation
  - filter and stats dashboard

## 7) How I prove it to teacher quickly
1. Run seed and app.
2. Open frontend and health endpoint.
3. Show create/edit/delete in UI.
4. Show filters update both table and stats.
5. Show one invalid request returns `400`.
6. Show clean commit history with small steps.

## 8) One-line summary for seminar
"This app uses React + Express + MongoDB with clear Router-Controller-Model architecture, strong validation, and realistic relational data."
