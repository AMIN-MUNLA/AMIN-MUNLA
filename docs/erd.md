# ERD (DA219B)

```mermaid
erDiagram
    SENIORS ||--o{ CHECK_IN_VISITS : receives
    COMPANIONS ||--o{ CHECK_IN_VISITS : performs

    SENIORS {
      objectId _id
      string fullName
      number age
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
      number moodAfterVisit
      boolean medicationTaken
      string notes
    }
```

## Validation Targets
- `Senior.supportLevel`: enum `low`, `medium`, `high`.
- `Companion.relationshipType`: enum `family`, `volunteer`, `caregiver`, `neighbor`.
- `CheckInVisit.visitType`: enum `call`, `home_visit`, `video_call`.
- `CheckInVisit.moodAfterVisit`: number between `1` and `5`.
- `CheckInVisit.medicationTaken`: required boolean (custom field).
- `CheckInVisit.checkInDate`: required and cannot be in the future.
