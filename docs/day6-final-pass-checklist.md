# Day 6 Final Pass Checklist (Teacher Verification)

Use this on seminar day before Zoom.

## 1) Database Ready (Atlas)
1. Open `backend/.env`.
2. Set a real URI:
   - `MONGODB_URI=mongodb+srv://...`
3. Save file.

Expected result:
- No placeholder values like `<your_cluster>` remain.

## 2) Seed Realistic Data
Run:
- `npm run seed --prefix backend`

Expected result:
- Seed completes with inserted counts for `Senior`, `Companion`, and `CheckInVisit`.

## 3) Start Application
Run:
- `npm run dev`

Expected result:
- Frontend opens on `http://localhost:5173`
- Backend health responds on `http://localhost:5000/api/health`

## 4) Quick API Proof (Core Requirements)
Check these endpoints:
- `GET /api/check-in-visits`
- `POST /api/check-in-visits`
- `PUT /api/check-in-visits/:id`
- `DELETE /api/check-in-visits/:id`
- `GET /api/seniors/:id/check-ins`
- `GET /api/companions/:id/check-ins`
- `GET /api/stats/mood-summary`

Expected result:
- All required endpoints respond correctly.
- Error responses follow the same shape:
  - `{ "error": string, "message": string, "details": any }`

## 5) Quick UI Proof (Core Requirements)
Show in browser:
- Loading state.
- Error state (if backend is down or bad request).
- Create/edit/delete flow.
- Search by senior name.
- Filter by visit type.
- Auto-refresh updates list and cleans interval on unmount.

## 6) Zoom Defense Lines (Simple)
Say this:
- "I used a simple Router -> Controller -> Model architecture so each file has one clear responsibility."
- "The app uses three related collections: Senior, Companion, and CheckInVisit, with full CRUD and relational/statistics endpoints."
- "Frontend is split into small components with loading/error handling, controlled form inputs, and a simple search/filter plus auto-refresh."

## 7) Submission Package
Before submission, verify:
- GitHub repo is public or teacher has access.
- README is clear and runnable.
- Report is 1-2 pages.
- Seminar drill notes are ready.

Files to include in discussion:
- `README.md`
- `docs/erd.md`
- `docs/report-template.md`
- `docs/seminar-drill.md`
