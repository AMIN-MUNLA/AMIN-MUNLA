require("dotenv").config();
const mongoose = require("mongoose");

const Senior = require("../models/senior.model");
const Companion = require("../models/companion.model");
const CheckInVisit = require("../models/checkInVisit.model");

const seniorSeedData = [
  {
    fullName: "Ingrid Andersson",
    age: 78,
    city: "Kristianstad",
    contactPhone: "+4670 112 34 56",
    supportLevel: "medium",
    preferredContactTime: "morning",
    mobilityLevel: "assisted",
    medicalNotes: "Needs reminder before blood pressure medication at 09:00.",
  },
  {
    fullName: "Karl-Erik Nilsson",
    age: 84,
    city: "Hassleholm",
    contactPhone: "+4670 223 45 67",
    supportLevel: "high",
    preferredContactTime: "afternoon",
    mobilityLevel: "limited",
    medicalNotes: "Uses walker indoors and avoids stairs when alone.",
  },
  {
    fullName: "Fatima Al-Hassan",
    age: 73,
    city: "Lund",
    contactPhone: "+4670 334 56 78",
    supportLevel: "low",
    preferredContactTime: "evening",
    mobilityLevel: "independent",
    medicalNotes: "Prefers short evening calls in Arabic or English.",
  },
  {
    fullName: "Lars Bergstrom",
    age: 81,
    city: "Malmo",
    contactPhone: "+4670 445 67 89",
    supportLevel: "medium",
    preferredContactTime: "afternoon",
    mobilityLevel: "assisted",
    medicalNotes: "Weekly check that grocery list is prepared.",
  },
  {
    fullName: "Maria Svensson",
    age: 76,
    city: "Ystad",
    contactPhone: "+4670 556 78 90",
    supportLevel: "low",
    preferredContactTime: "morning",
    mobilityLevel: "independent",
    medicalNotes: "Track mood after social visits from neighbors.",
  },
  {
    fullName: "Omar Khoury",
    age: 79,
    city: "Kristianstad",
    contactPhone: "+4670 667 89 01",
    supportLevel: "high",
    preferredContactTime: "evening",
    mobilityLevel: "limited",
    medicalNotes: "Follow-up needed after hospital appointment scheduling.",
  },
];

const companionSeedData = [
  {
    fullName: "Elin Johansson",
    relationshipType: "volunteer",
    phone: "+4673 101 20 30",
    preferredLanguage: "Swedish",
    active: true,
    maxWeeklyVisits: 5,
    notes: "Available Tuesday and Thursday mornings.",
  },
  {
    fullName: "MHD Amin Munla",
    relationshipType: "volunteer",
    phone: "+4673 111 22 33",
    preferredLanguage: "Arabic",
    active: true,
    maxWeeklyVisits: 6,
    notes: "Can help with translation during clinic calls.",
  },
  {
    fullName: "Ahmed Rahman",
    relationshipType: "caregiver",
    phone: "+4673 122 23 34",
    preferredLanguage: "English",
    active: true,
    maxWeeklyVisits: 8,
    notes: "Trained in medication reminder routines.",
  },
  {
    fullName: "Sofia Lindgren",
    relationshipType: "family",
    phone: "+4673 133 24 35",
    preferredLanguage: "Swedish",
    active: true,
    maxWeeklyVisits: 4,
    notes: "Primary contact for Lars Bergstrom.",
  },
  {
    fullName: "Yousef Darwish",
    relationshipType: "neighbor",
    phone: "+4673 144 25 36",
    preferredLanguage: "Arabic",
    active: true,
    maxWeeklyVisits: 3,
    notes: "Helps with grocery pickup on weekends.",
  },
  {
    fullName: "Anna Persson",
    relationshipType: "family",
    phone: "+4673 155 26 37",
    preferredLanguage: "English",
    active: true,
    maxWeeklyVisits: 5,
    notes: "Can join video calls during evening.",
  },
];

const visitTemplates = [
  {
    seniorIndex: 0,
    companionIndex: 0,
    checkInDate: "2026-04-11T08:30:00.000Z",
    visitType: "home_visit",
    moodAfterVisit: 4,
    durationMinutes: 55,
    supportAction: "medicine_reminder",
    followUpRequired: false,
    notes: "Reviewed pill organizer and walked together in corridor.",
  },
  {
    seniorIndex: 1,
    companionIndex: 2,
    checkInDate: "2026-04-12T13:15:00.000Z",
    visitType: "call",
    moodAfterVisit: 3,
    durationMinutes: 25,
    supportAction: "appointment_booking",
    followUpRequired: true,
    followUpDueDate: "2026-04-16T11:00:00.000Z",
    notes: "Booked follow-up physiotherapy and confirmed transport.",
  },
  {
    seniorIndex: 2,
    companionIndex: 1,
    checkInDate: "2026-04-13T18:05:00.000Z",
    visitType: "video_call",
    moodAfterVisit: 5,
    durationMinutes: 35,
    supportAction: "none",
    followUpRequired: false,
    notes: "Discussed weekly meal plan and family photos.",
  },
  {
    seniorIndex: 3,
    companionIndex: 3,
    checkInDate: "2026-04-14T14:20:00.000Z",
    visitType: "home_visit",
    moodAfterVisit: 4,
    durationMinutes: 50,
    supportAction: "grocery_help",
    followUpRequired: false,
    notes: "Prepared shopping list and checked pantry staples.",
  },
  {
    seniorIndex: 4,
    companionIndex: 4,
    checkInDate: "2026-04-14T09:10:00.000Z",
    visitType: "call",
    moodAfterVisit: 4,
    durationMinutes: 20,
    supportAction: "none",
    followUpRequired: false,
    notes: "Confirmed weekend social activity with local seniors group.",
  },
  {
    seniorIndex: 5,
    companionIndex: 5,
    checkInDate: "2026-04-15T17:40:00.000Z",
    visitType: "video_call",
    moodAfterVisit: 2,
    durationMinutes: 40,
    supportAction: "emergency_contact",
    followUpRequired: true,
    followUpDueDate: "2026-04-17T10:30:00.000Z",
    notes: "Coordinated with family after missed clinic reminder.",
  },
];

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function buildCheckInVisits(seniors, companions) {
  return visitTemplates.map((visit) => ({
    seniorId: seniors[visit.seniorIndex]._id,
    companionId: companions[visit.companionIndex]._id,
    checkInDate: new Date(visit.checkInDate),
    visitType: visit.visitType,
    moodAfterVisit: visit.moodAfterVisit,
    durationMinutes: visit.durationMinutes,
    supportAction: visit.supportAction,
    followUpRequired: visit.followUpRequired,
    followUpDueDate: visit.followUpDueDate
      ? new Date(visit.followUpDueDate)
      : undefined,
    notes: visit.notes,
  }));
}

function validateSeedDocuments(seniors, companions, visits) {
  const allDocs = [
    ...seniors.map((doc) => new Senior(doc)),
    ...companions.map((doc) => new Companion(doc)),
    ...visits.map((doc) => new CheckInVisit(doc)),
  ];

  const validationErrors = allDocs
    .map((doc) => doc.validateSync())
    .filter(Boolean);

  if (validationErrors.length > 0) {
    throw new Error(
      `Seed validation failed for ${validationErrors.length} document(s).`
    );
  }
}

async function run() {
  const shouldDrop = hasFlag("--drop");
  const isDryRun = hasFlag("--dry-run");
  const mongoUri = process.env.MONGODB_URI;

  if (isDryRun) {
    const seniors = seniorSeedData.map((doc) => ({
      _id: new mongoose.Types.ObjectId(),
      ...doc,
    }));
    const companions = companionSeedData.map((doc) => ({
      _id: new mongoose.Types.ObjectId(),
      ...doc,
    }));
    const visits = buildCheckInVisits(seniors, companions);

    validateSeedDocuments(seniors, companions, visits);
    console.log("[seed] Dry run passed.");
    console.log(
      `[seed] Seniors: ${seniors.length}, Companions: ${companions.length}, CheckInVisits: ${visits.length}`
    );
    return;
  }

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }

  await mongoose.connect(mongoUri);

  if (shouldDrop) {
    await mongoose.connection.dropDatabase();
    console.log("[seed] Existing database dropped.");
  } else {
    await Promise.all([
      Senior.deleteMany({}),
      Companion.deleteMany({}),
      CheckInVisit.deleteMany({}),
    ]);
    console.log("[seed] Existing collection data cleared.");
  }

  const seniors = await Senior.insertMany(seniorSeedData);
  const companions = await Companion.insertMany(companionSeedData);

  const checkInVisits = buildCheckInVisits(seniors, companions);
  validateSeedDocuments(seniorSeedData, companionSeedData, checkInVisits);
  await CheckInVisit.insertMany(checkInVisits);

  console.log("[seed] Seed completed successfully.");
  console.log(
    `[seed] Seniors: ${seniors.length}, Companions: ${companions.length}, CheckInVisits: ${checkInVisits.length}`
  );
}

run()
  .catch((error) => {
    console.error("[seed] Failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
