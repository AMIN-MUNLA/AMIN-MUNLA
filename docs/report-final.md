# DA219B Lab Report (Final Draft)

## Project Summary
My project is **Senior Companion Check-In Planner**.  
It helps family members and volunteers track check-ins with older adults and follow wellbeing trends.

I used the required stack:
- HTML/CSS/JavaScript
- React (Vite) for frontend
- Node.js + Express for backend
- MongoDB Atlas with Mongoose for database

The main entity is `CheckInVisit`, connected to `Senior` and `Companion` using ObjectId references.

## Challenges and Solutions

### Challenge 1: Keep architecture clean and easy to explain
At first, it was easy to mix route logic, business logic, and data access in one file.  
That becomes hard to explain in seminar.

**Solution:**  
I used a strict `Router -> Controller -> Model` structure:
- Routes only define endpoint paths.
- Controllers handle request/response logic.
- Models define schema and validation.

This made the backend easier to maintain and easier to explain live.

### Challenge 2: Reliable error handling for all endpoints
Without a standard pattern, API errors become inconsistent and hard for frontend to handle.

**Solution:**  
I enforced one consistent error contract in all endpoints:
```json
{ "error": "string", "message": "string", "details": "any" }
```
I also used clear status codes (`400`, `404`, `409`, `500`, and `503` when DB config is missing).

Result: frontend error handling is simpler and API behavior is predictable.

### Challenge 3: Windows EPERM issues during dev/build
On Windows, process spawn errors (`EPERM`) appeared with some dev tooling.

**Solution:**  
I simplified scripts:
- backend dev runs with `node src/server.js`
- frontend Vite commands use `--configLoader native`

This gave stable startup/build behavior on my environment.

## DA219B Requirements Mapping
- **3 collections with relations:** `Senior`, `Companion`, `CheckInVisit`.
- **Full CRUD (main entity):** complete CRUD for `CheckInVisit`.
- **2 relational endpoints:**
  - `GET /api/seniors/:id/check-ins`
  - `GET /api/companions/:id/check-ins`
- **1 custom endpoint:** `GET /api/stats/mood-summary`
- **Realistic seed data:** implemented in backend seed script (not placeholder names).
- **React UI requirements:** split components, loading/error states, controlled form, edit/delete actions.
- **Interactive feature:** search by senior name + filter by visit type.
- **Auto-refresh:** `setInterval` with cleanup in `useEffect`.

## What I Would Do Differently
If I had more time, I would:
1. Add authentication/roles (family vs volunteer).
2. Add automated frontend tests for key CRUD flows.

I kept this version intentionally simple and explainable to match seminar requirements.

## Extra Libraries Used
- Backend: `express`, `mongoose`, `cors`, `dotenv`
- Frontend: `react`, `react-dom`, `vite`
- Dev: `eslint`, `nodemon` (optional dev script)

I did not add heavy frameworks to keep the project easy to run and explain.
