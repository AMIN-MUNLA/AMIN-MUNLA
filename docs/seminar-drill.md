# DA219B Seminar Drill Script

Use this script during Zoom to explain the system step-by-step in a simple way.

## 1) One Route End-to-End
Route example: `POST /api/check-in-visits`

Flow to explain:
1. Frontend form (`VisitForm.jsx`) collects controlled inputs.
2. Frontend sends JSON with `fetch()` to `/api/check-in-visits`.
3. Express route in `backend/src/routes/checkInVisit.routes.js` forwards request to controller.
4. Controller `createCheckInVisit` in `backend/src/controllers/checkInVisit.controller.js`:
   - validates reference IDs
   - checks that `Senior` and `Companion` exist
   - creates `CheckInVisit`
   - returns populated response
5. Mongoose model `checkInVisit.model.js` enforces schema validation.
6. Error middleware returns standard JSON on failure.

Short Zoom line:
`Request starts in VisitForm, goes route -> controller -> model, then comes back as JSON with populated senior/companion fields.`

## 2) One React Component (Props + State)
Component: `frontend/src/components/VisitForm.jsx`

State used:
- `formData` (`useState`) for controlled fields
- `formError` (`useState`) for local validation message

Props used:
- `seniors`, `companions`
- `editingVisit`, `isSaving`
- `onSubmitVisit`, `onCancelEdit`

Short Zoom line:
`VisitForm keeps local state for inputs, receives lists and handlers by props from VisitsDashboard, and submits one clean payload to backend.`

## 3) One Mongoose Schema to Explain
Schema: `backend/src/models/checkInVisit.model.js`

Important fields and validation:
- `seniorId` and `companionId`: ObjectId references
- `checkInDate`: required, cannot be future
- `visitType`: enum (`call`, `home_visit`, `video_call`)
- `moodAfterVisit`: number 1-5
- `medicationTaken`: required boolean (custom domain field)
- `notes`: max length 500

Short Zoom line:
`The schema protects data quality before insert/update and ensures every visit always links to a real senior and companion.`

## 4) One Live-Change Example (<10 min)
Example request: Add a new filter `medicationTaken=true|false` to visits list.

Steps:
1. Backend: extend query parsing in `listCheckInVisits` controller.
2. Validate query value (`true`/`false`) and return `400` if invalid.
3. Apply filter in `CheckInVisit.find(filters)`.
4. Frontend: add filter control in `VisitsDashboard.jsx` + apply in `VisitList.jsx`.
5. Re-test quickly in browser.

## 5) Two Git Commits to Explain
Use these two commits in seminar:

1. `5d6bd61` - `feat: implement check-in-visit crud with error contract`  
   Why important: delivered core CRUD + consistent error shape.

2. `8f95119` - `feat: add relational endpoints and mood summary stats`  
   Why important: completed DA219B relational + custom endpoint requirements.

Optional iteration pair:
- `72dc23e` -> `a646bde` (improved DB configuration safety and clearer seed errors).

## 6) 2-Minute Demo Flow
1. Run `npm run seed --prefix backend`
2. Run `npm run dev`
3. Open `/api/health` and show `"database":"connected"`
4. In UI: create one visit, edit it, then delete it
5. Use search + visit type filter
6. Explain one route using section 1 above
