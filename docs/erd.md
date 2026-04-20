# Day 1 ERD Draft (DA219B)

```mermaid
erDiagram
    SENIORS ||--o{ CHECK_IN_VISITS : receives
    COMPANIONS ||--o{ CHECK_IN_VISITS : performs
    SENIORS {
      objectId _id
      string fullName
      int age
      string city
      string contactPhone
      string supportLevel
    }
    COMPANIONS {
      objectId _id
      string fullName
      string relationshipType
      string phone
      string preferredLanguage
    }
    CHECK_IN_VISITS {
      objectId _id
      objectId seniorId
      objectId companionId
      date checkInDate
      string visitType
      int moodAfterVisit
      string notes
    }
```

## Validation targets (to implement in Day 2)
- `CheckInVisit.moodAfterVisit`: required, number, min 1, max 5.
- `CheckInVisit.visitType`: required enum (`call`, `home_visit`, `video_call`).
- `Senior.supportLevel`: required enum (`low`, `medium`, `high`).
- `Companion.relationshipType`: required enum (for example `family`, `volunteer`, `caregiver`).
