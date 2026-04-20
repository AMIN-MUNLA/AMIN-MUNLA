export const VISIT_TYPE_OPTIONS = [
  { value: "call", label: "Call" },
  { value: "home_visit", label: "Home Visit" },
  { value: "video_call", label: "Video Call" },
];

export const SUPPORT_ACTION_OPTIONS = [
  { value: "none", label: "None" },
  { value: "medicine_reminder", label: "Medicine Reminder" },
  { value: "grocery_help", label: "Grocery Help" },
  { value: "appointment_booking", label: "Appointment Booking" },
  { value: "emergency_contact", label: "Emergency Contact" },
];

export const DEFAULT_VISIT_TYPE = VISIT_TYPE_OPTIONS[0].value;
export const DEFAULT_SUPPORT_ACTION = SUPPORT_ACTION_OPTIONS[0].value;
