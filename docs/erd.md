# Day 2 ERD (DA219B)

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
      string preferredContactTime
      string mobilityLevel
      string medicalNotes
    }
    COMPANIONS {
      objectId _id
      string fullName
      string relationshipType
      string phone
      string preferredLanguage
      int maxWeeklyVisits
      bool active
      string notes
    }
    CHECK_IN_VISITS {
      objectId _id
      objectId seniorId
      objectId companionId
      date checkInDate
      string visitType
      int moodAfterVisit
      int durationMinutes
      string supportAction
      bool followUpRequired
      date followUpDueDate
      string notes
    }
```

## Validation targets implemented
- `Senior`: required `fullName/age/city/contactPhone/supportLevel/preferredContactTime/mobilityLevel`, age range 60-110, unique phone, enum rules.
- `Companion`: required identity/contact fields, enum rules, unique phone, `maxWeeklyVisits` range 1-14.
- `CheckInVisit`: required object references, enum rules, `moodAfterVisit` range 1-5, `durationMinutes` range 5-240, no future `checkInDate`, conditional `followUpDueDate`.

## Seed requirements implemented
- 6 realistic seniors
- 6 realistic companions
- 6 realistic check-in visits linked by ObjectId references
