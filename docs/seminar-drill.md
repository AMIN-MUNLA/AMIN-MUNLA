# Seminar Live-Change Drill (Simple Practice)

Practice these 5 common assessor requests.

## 1) Add query param filter
Request example: "Filter visits by medicationTaken=true"
- Add query parsing in `listCheckInVisits`.
- Validate allowed values (`true`/`false`).
- Apply filter in Mongoose `find`.
- Test endpoint in browser or curl.

## 2) Add a new field
Request example: "Add `followUpNeeded` boolean"
- Add field in `checkInVisit.model.js` with default.
- Add input in `VisitForm.jsx`.
- Show value in `VisitList.jsx`.
- Update seed script values.

## 3) Add validation rule
Request example: "Notes must be max 300 chars"
- Update model validation in `checkInVisit.model.js`.
- Keep existing error JSON contract.
- Test invalid payload and show 400 response.

## 4) Add new frontend filter
Request example: "Filter visits where medication was taken"
- Add filter state in `VisitsDashboard.jsx`.
- Add dropdown/checkbox in controls.
- Apply filter in `VisitList.jsx`.

## 5) Add a new column in list
Request example: "Show senior city in table"
- Add new `<th>` and `<td>` in `VisitList.jsx`.
- Use populated field `visit.seniorId.city`.

## Fast seminar demo flow
1. Start app with `npm run dev`.
2. Show health endpoint.
3. Show one CRUD action.
4. Apply one small live change.
5. Re-run and show updated behavior.
