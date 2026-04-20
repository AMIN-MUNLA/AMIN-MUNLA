# Day 7 Demo Checklist (Zoom)

## Goal
Show that filter behavior and custom statistics endpoint are fully connected from backend to frontend.

## Steps To Demo
1. Start project:
   - `npm run dev`
2. Open frontend:
   - `http://localhost:5173`
3. Show unfiltered list and stats:
   - Visits table has all rows.
   - Mood summary shows total visits, average mood, and follow-up count.
4. Apply `visitType=home_visit` from filter panel:
   - Table updates to matching visit type only.
   - Mood summary updates at the same time.
5. Apply `followUpRequired=true` and `minMood=3`:
   - Table narrows again based on query filters.
6. Add stats date range (`startDate`, `endDate`):
   - Summary cards and breakdown lists change based on date window.
7. Clear filters:
   - Table and summary return to baseline data.

## API Proof Points
- Table data query:
  - `GET /api/check-in-visits`
  - Optional query params: `visitType`, `followUpRequired`, `minMood`, `maxMood`
- Summary query:
  - `GET /api/stats/mood-summary`
  - Optional query params: `visitType`, `startDate`, `endDate`

## Teacher Q&A Short Answers
- Why two requests for one dashboard?
  - "One endpoint provides detailed visit rows, one endpoint provides aggregated statistics."
- How do filters stay consistent?
  - "A shared filter state is applied to both requests, so table and stats stay synchronized."
