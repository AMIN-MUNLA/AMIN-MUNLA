require("dotenv").config();
const mongoose = require("mongoose");

const Senior = require("../models/senior.model");
const Companion = require("../models/companion.model");
const CheckInVisit = require("../models/checkInVisit.model");

function buildSeedData() {
  const seniors = [
    {
      key: "senior_ingrid",
      fullName: "Ingrid Andersson",
      age: 79,
      city: "Malmo",
      contactPhone: "+46 70 101 1001",
      supportLevel: "medium",
      preferredCheckInWindow: "morning",
    },
    {
      key: "senior_lars",
      fullName: "Lars Pettersson",
      age: 83,
      city: "Lund",
      contactPhone: "+46 70 101 1002",
      supportLevel: "high",
      preferredCheckInWindow: "afternoon",
    },
    {
      key: "senior_elsa",
      fullName: "Elsa Nilsson",
      age: 74,
      city: "Malmo",
      contactPhone: "+46 70 101 1003",
      supportLevel: "low",
      preferredCheckInWindow: "morning",
    },
    {
      key: "senior_karl",
      fullName: "Karl Johansson",
      age: 88,
      city: "Helsingborg",
      contactPhone: "+46 70 101 1004",
      supportLevel: "high",
      preferredCheckInWindow: "evening",
    },
    {
      key: "senior_birgit",
      fullName: "Birgit Svensson",
      age: 81,
      city: "Malmo",
      contactPhone: "+46 70 101 1005",
      supportLevel: "medium",
      preferredCheckInWindow: "afternoon",
    },
    {
      key: "senior_omar",
      fullName: "Omar Hasan",
      age: 77,
      city: "Lund",
      contactPhone: "+46 70 101 1006",
      supportLevel: "medium",
      preferredCheckInWindow: "morning",
    },
    {
      key: "senior_samira",
      fullName: "Samira Khaled",
      age: 72,
      city: "Malmo",
      contactPhone: "+46 70 101 1007",
      supportLevel: "low",
      preferredCheckInWindow: "afternoon",
    },
    {
      key: "senior_goran",
      fullName: "Goran Lind",
      age: 85,
      city: "Ystad",
      contactPhone: "+46 70 101 1008",
      supportLevel: "high",
      preferredCheckInWindow: "morning",
    },
    {
      key: "senior_marta",
      fullName: "Marta Ibrahim",
      age: 76,
      city: "Trelleborg",
      contactPhone: "+46 70 101 1009",
      supportLevel: "medium",
      preferredCheckInWindow: "evening",
    },
    {
      key: "senior_erik",
      fullName: "Erik Holm",
      age: 90,
      city: "Malmo",
      contactPhone: "+46 70 101 1010",
      supportLevel: "high",
      preferredCheckInWindow: "morning",
    },
    {
      key: "senior_nadia",
      fullName: "Nadia Rahman",
      age: 71,
      city: "Lund",
      contactPhone: "+46 70 101 1011",
      supportLevel: "low",
      preferredCheckInWindow: "afternoon",
    },
    {
      key: "senior_hassan",
      fullName: "Hassan Ali",
      age: 84,
      city: "Helsingborg",
      contactPhone: "+46 70 101 1012",
      supportLevel: "medium",
      preferredCheckInWindow: "evening",
    },
  ].map((item) => ({ ...item, _id: new mongoose.Types.ObjectId() }));

  const companions = [
    {
      key: "comp_sara",
      fullName: "Sara Nilsson",
      relationshipType: "family",
      phone: "+46 70 202 2001",
      preferredLanguage: "Swedish",
    },
    {
      key: "comp_noah",
      fullName: "Noah Berg",
      relationshipType: "volunteer",
      phone: "+46 70 202 2002",
      preferredLanguage: "Swedish",
    },
    {
      key: "comp_amina",
      fullName: "Amina Darwish",
      relationshipType: "caregiver",
      phone: "+46 70 202 2003",
      preferredLanguage: "Arabic",
    },
    {
      key: "comp_mikael",
      fullName: "Mikael Jonsson",
      relationshipType: "neighbor",
      phone: "+46 70 202 2004",
      preferredLanguage: "Swedish",
    },
    {
      key: "comp_lina",
      fullName: "Lina Ahmed",
      relationshipType: "family",
      phone: "+46 70 202 2005",
      preferredLanguage: "English",
    },
    {
      key: "comp_jonas",
      fullName: "Jonas Karlsson",
      relationshipType: "volunteer",
      phone: "+46 70 202 2006",
      preferredLanguage: "Swedish",
    },
    {
      key: "comp_reem",
      fullName: "Reem Khalil",
      relationshipType: "caregiver",
      phone: "+46 70 202 2007",
      preferredLanguage: "Arabic",
    },
    {
      key: "comp_emma",
      fullName: "Emma Persson",
      relationshipType: "family",
      phone: "+46 70 202 2008",
      preferredLanguage: "Swedish",
    },
  ].map((item) => ({ ...item, _id: new mongoose.Types.ObjectId() }));

  const seniorIdByKey = new Map(seniors.map((item) => [item.key, item._id]));
  const companionIdByKey = new Map(companions.map((item) => [item.key, item._id]));

  const visits = [
    {
      seniorKey: "senior_ingrid",
      companionKey: "comp_sara",
      checkInDate: "2026-04-18T09:10:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 4,
      notes: "Walked in the park and reviewed weekly medication schedule.",
    },
    {
      seniorKey: "senior_lars",
      companionKey: "comp_amina",
      checkInDate: "2026-04-17T14:30:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 3,
      notes: "Needed help with grocery list and hydration reminders.",
    },
    {
      seniorKey: "senior_elsa",
      companionKey: "comp_noah",
      checkInDate: "2026-04-16T11:00:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 5,
      notes: "Reported stable mood and completed chair exercise routine.",
    },
    {
      seniorKey: "senior_karl",
      companionKey: "comp_mikael",
      checkInDate: "2026-04-15T18:45:00.000Z",
      visitType: "call",
      moodAfterVisit: 2,
      notes: "Sounded tired; requested another check-in after clinic visit.",
    },
    {
      seniorKey: "senior_birgit",
      companionKey: "comp_emma",
      checkInDate: "2026-04-14T13:15:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 4,
      notes: "Meal prep support and light mobility practice.",
    },
    {
      seniorKey: "senior_omar",
      companionKey: "comp_reem",
      checkInDate: "2026-04-13T08:50:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Discussed sleep quality and confirmed doctor appointment date.",
    },
    {
      seniorKey: "senior_samira",
      companionKey: "comp_lina",
      checkInDate: "2026-04-12T15:20:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 4,
      notes: "Family joined call; all follow-up tasks completed.",
    },
    {
      seniorKey: "senior_goran",
      companionKey: "comp_jonas",
      checkInDate: "2026-04-11T10:00:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 2,
      notes: "Needed transport planning for pharmacy pickup.",
    },
    {
      seniorKey: "senior_marta",
      companionKey: "comp_reem",
      checkInDate: "2026-04-10T17:10:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Reviewed food delivery schedule and budget for the week.",
    },
    {
      seniorKey: "senior_erik",
      companionKey: "comp_mikael",
      checkInDate: "2026-04-09T09:35:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 2,
      notes: "Reported knee pain after stairs; advised to rest and monitor.",
    },
    {
      seniorKey: "senior_nadia",
      companionKey: "comp_lina",
      checkInDate: "2026-04-08T12:40:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 5,
      notes: "Shared positive updates and joined online social group.",
    },
    {
      seniorKey: "senior_hassan",
      companionKey: "comp_amina",
      checkInDate: "2026-04-07T18:00:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Blood pressure log was complete; no urgent issues.",
    },
    {
      seniorKey: "senior_ingrid",
      companionKey: "comp_noah",
      checkInDate: "2026-04-06T10:25:00.000Z",
      visitType: "call",
      moodAfterVisit: 4,
      notes: "Confirmed weekend family visit and transportation.",
    },
    {
      seniorKey: "senior_lars",
      companionKey: "comp_reem",
      checkInDate: "2026-04-05T14:00:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 2,
      notes: "Looked anxious before checkup; agreed on next-day follow-up.",
    },
    {
      seniorKey: "senior_elsa",
      companionKey: "comp_emma",
      checkInDate: "2026-04-04T11:40:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 5,
      notes: "Did breathing exercises and prepared healthy lunch.",
    },
    {
      seniorKey: "senior_karl",
      companionKey: "comp_jonas",
      checkInDate: "2026-04-03T19:00:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Conversation about sleep routine and evening medication.",
    },
    {
      seniorKey: "senior_birgit",
      companionKey: "comp_sara",
      checkInDate: "2026-04-02T13:45:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 4,
      notes: "Helped with bill payment reminder and kitchen safety check.",
    },
    {
      seniorKey: "senior_omar",
      companionKey: "comp_amina",
      checkInDate: "2026-04-01T09:15:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Mild dizziness reported, no emergency signs.",
    },
    {
      seniorKey: "senior_samira",
      companionKey: "comp_lina",
      checkInDate: "2026-03-30T16:30:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 4,
      notes: "Practiced language exercises and reviewed appointment notes.",
    },
    {
      seniorKey: "senior_goran",
      companionKey: "comp_mikael",
      checkInDate: "2026-03-29T10:50:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 2,
      notes: "Needed assistance setting medication alarm clock.",
    },
    {
      seniorKey: "senior_marta",
      companionKey: "comp_reem",
      checkInDate: "2026-03-28T17:25:00.000Z",
      visitType: "call",
      moodAfterVisit: 3,
      notes: "Discussed meal plan; appetite slightly improved.",
    },
    {
      seniorKey: "senior_erik",
      companionKey: "comp_jonas",
      checkInDate: "2026-03-27T09:05:00.000Z",
      visitType: "home_visit",
      moodAfterVisit: 2,
      notes: "Observed fatigue after poor sleep; scheduled family call.",
    },
    {
      seniorKey: "senior_nadia",
      companionKey: "comp_emma",
      checkInDate: "2026-03-26T12:00:00.000Z",
      visitType: "video_call",
      moodAfterVisit: 5,
      notes: "Mood strong; completed weekly to-do plan confidently.",
    },
    {
      seniorKey: "senior_hassan",
      companionKey: "comp_noah",
      checkInDate: "2026-03-25T18:20:00.000Z",
      visitType: "call",
      moodAfterVisit: 4,
      notes: "No complaints, requested same companion next week.",
    },
  ].map((item) => {
    const seniorId = seniorIdByKey.get(item.seniorKey);
    const companionId = companionIdByKey.get(item.companionKey);

    if (!seniorId || !companionId) {
      throw new Error(
        `Invalid visit link: seniorKey=${item.seniorKey}, companionKey=${item.companionKey}`
      );
    }

    return {
      _id: new mongoose.Types.ObjectId(),
      seniorId,
      companionId,
      checkInDate: new Date(item.checkInDate),
      visitType: item.visitType,
      moodAfterVisit: item.moodAfterVisit,
      notes: item.notes,
    };
  });

  return {
    seniors: seniors.map(({ key, ...rest }) => rest),
    companions: companions.map(({ key, ...rest }) => rest),
    checkInVisits: visits,
  };
}

function printDryRunSummary(data) {
  console.log("[seed] Dry-run only. No database write will happen.");
  console.log(
    `[seed] counts -> seniors: ${data.seniors.length}, companions: ${data.companions.length}, checkInVisits: ${data.checkInVisits.length}`
  );
  console.log("[seed] sample senior:", data.seniors[0]);
  console.log("[seed] sample companion:", data.companions[0]);
  console.log("[seed] sample check-in visit:", data.checkInVisits[0]);
}

async function run() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const shouldDrop = args.includes("--drop");

  const data = buildSeedData();

  if (isDryRun) {
    printDryRunSummary(data);
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it in backend/.env before seeding.");
  }

  await mongoose.connect(mongoUri);
  console.log("[seed] Connected to MongoDB.");

  if (shouldDrop) {
    await mongoose.connection.db.dropDatabase();
    console.log("[seed] Dropped database.");
  }

  await Promise.all([
    Senior.deleteMany({}),
    Companion.deleteMany({}),
    CheckInVisit.deleteMany({}),
  ]);

  await Senior.insertMany(data.seniors);
  await Companion.insertMany(data.companions);
  await CheckInVisit.insertMany(data.checkInVisits);

  console.log("[seed] Seed completed successfully.");
  console.log(
    `[seed] inserted -> seniors: ${data.seniors.length}, companions: ${data.companions.length}, checkInVisits: ${data.checkInVisits.length}`
  );
}

run()
  .catch((error) => {
    console.error("[seed] Failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("[seed] MongoDB connection closed.");
    }
  });
