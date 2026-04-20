const VISIT_TYPES = ["call", "home_visit", "video_call"];

const SUPPORT_ACTIONS = [
  "none",
  "medicine_reminder",
  "grocery_help",
  "appointment_booking",
  "emergency_contact",
];

function joinAllowedValues(values) {
  return values.join(", ");
}

module.exports = {
  VISIT_TYPES,
  SUPPORT_ACTIONS,
  joinAllowedValues,
};
