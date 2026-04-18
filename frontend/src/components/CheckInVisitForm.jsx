import { useState } from "react";

const visitTypeOptions = [
  { value: "call", label: "Call" },
  { value: "home_visit", label: "Home Visit" },
  { value: "video_call", label: "Video Call" },
];

const supportActionOptions = [
  { value: "none", label: "None" },
  { value: "medicine_reminder", label: "Medicine Reminder" },
  { value: "grocery_help", label: "Grocery Help" },
  { value: "appointment_booking", label: "Appointment Booking" },
  { value: "emergency_contact", label: "Emergency Contact" },
];

function buildInitialFormState() {
  return {
    seniorId: "",
    companionId: "",
    checkInDate: "",
    visitType: "call",
    moodAfterVisit: "3",
    durationMinutes: "30",
    supportAction: "none",
    followUpRequired: false,
    followUpDueDate: "",
    notes: "",
  };
}

function formatDateInputValue(date) {
  if (!date) {
    return "";
  }

  const now = new Date(date);
  if (Number.isNaN(now.getTime())) {
    return "";
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function validateForm(formState) {
  if (!formState.seniorId || !formState.companionId) {
    return "Senior and companion are required.";
  }

  if (!formState.checkInDate) {
    return "Check-in date is required.";
  }

  if (formState.followUpRequired && !formState.followUpDueDate) {
    return "Follow-up due date is required when follow-up is checked.";
  }

  return "";
}

function buildPayload(formState) {
  return {
    seniorId: formState.seniorId,
    companionId: formState.companionId,
    checkInDate: new Date(formState.checkInDate).toISOString(),
    visitType: formState.visitType,
    moodAfterVisit: Number(formState.moodAfterVisit),
    durationMinutes: Number(formState.durationMinutes),
    supportAction: formState.supportAction,
    followUpRequired: formState.followUpRequired,
    followUpDueDate:
      formState.followUpRequired && formState.followUpDueDate
        ? new Date(formState.followUpDueDate).toISOString()
        : null,
    notes: formState.notes.trim(),
  };
}

function CheckInVisitForm({
  seniors,
  companions,
  isSubmitting,
  submitError,
  onCreateVisit,
}) {
  const [formState, setFormState] = useState(() => ({
    ...buildInitialFormState(),
    checkInDate: formatDateInputValue(new Date()),
  }));
  const [validationMessage, setValidationMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    setValidationMessage("");
    setFormState((previous) => {
      const nextState = {
        ...previous,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "followUpRequired" && !checked) {
        nextState.followUpDueDate = "";
      }

      return nextState;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm(formState);
    if (validationError) {
      setValidationMessage(validationError);
      return;
    }

    try {
      await onCreateVisit(buildPayload(formState));
      setFormState({
        ...buildInitialFormState(),
        checkInDate: formatDateInputValue(new Date()),
      });
      setValidationMessage("");
    } catch {
      // Form-level error is shown from parent via submitError.
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Create Check-In Visit</h2>
          <p className="muted">Controlled React form connected to POST API.</p>
        </div>
      </div>

      {validationMessage && <p className="error-text">Error: {validationMessage}</p>}
      {submitError && <p className="error-text">Error: {submitError}</p>}
      {seniors.length === 0 || companions.length === 0 ? (
        <p className="warning-text">
          Add seed data first so the form can load seniors and companions.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Senior
          <select
            name="seniorId"
            value={formState.seniorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select senior</option>
            {seniors.map((senior) => (
              <option key={senior._id} value={senior._id}>
                {senior.fullName} - {senior.city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Companion
          <select
            name="companionId"
            value={formState.companionId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select companion</option>
            {companions.map((companion) => (
              <option key={companion._id} value={companion._id}>
                {companion.fullName} - {companion.relationshipType}
              </option>
            ))}
          </select>
        </label>

        <label>
          Check-in Date
          <input
            type="datetime-local"
            name="checkInDate"
            value={formState.checkInDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Visit Type
          <select
            name="visitType"
            value={formState.visitType}
            onChange={handleInputChange}
            required
          >
            {visitTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Mood After Visit (1-5)
          <input
            type="number"
            min="1"
            max="5"
            name="moodAfterVisit"
            value={formState.moodAfterVisit}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Duration (minutes)
          <input
            type="number"
            min="5"
            max="240"
            name="durationMinutes"
            value={formState.durationMinutes}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Support Action
          <select
            name="supportAction"
            value={formState.supportAction}
            onChange={handleInputChange}
          >
            {supportActionOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="followUpRequired"
            checked={formState.followUpRequired}
            onChange={handleInputChange}
          />
          Follow-up required
        </label>

        <label>
          Follow-up Due Date
          <input
            type="datetime-local"
            name="followUpDueDate"
            value={formState.followUpDueDate}
            onChange={handleInputChange}
            disabled={!formState.followUpRequired}
            required={formState.followUpRequired}
          />
        </label>

        <label className="full-width">
          Notes
          <textarea
            name="notes"
            rows="3"
            maxLength="500"
            value={formState.notes}
            onChange={handleInputChange}
          />
        </label>

        <div className="full-width">
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting || seniors.length === 0 || companions.length === 0}
          >
            {isSubmitting ? "Creating..." : "Create Visit"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CheckInVisitForm;
