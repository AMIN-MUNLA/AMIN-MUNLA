import { useState } from "react";

const VISIT_TYPES = [
  { value: "call", label: "Call" },
  { value: "home_visit", label: "Home Visit" },
  { value: "video_call", label: "Video Call" },
];

function toDateTimeLocalValue(dateInput) {
  if (!dateInput) {
    return "";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localTime = new Date(date.getTime() - timezoneOffset);
  return localTime.toISOString().slice(0, 16);
}

function buildInitialFormState(editingVisit) {
  return {
    seniorId:
      editingVisit?.seniorId?._id || editingVisit?.seniorId || "",
    companionId:
      editingVisit?.companionId?._id || editingVisit?.companionId || "",
    checkInDate: toDateTimeLocalValue(editingVisit?.checkInDate) || "",
    visitType: editingVisit?.visitType || "call",
    moodAfterVisit: editingVisit?.moodAfterVisit ?? 3,
    medicationTaken: Boolean(editingVisit?.medicationTaken),
    notes: editingVisit?.notes || "",
  };
}

function VisitForm({
  seniors,
  companions,
  editingVisit,
  isSaving,
  onSubmitVisit,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(buildInitialFormState(editingVisit));
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!formData.seniorId || !formData.companionId || !formData.checkInDate) {
      setFormError("senior, companion, and check-in date are required.");
      return;
    }

    const payload = {
      seniorId: formData.seniorId,
      companionId: formData.companionId,
      checkInDate: new Date(formData.checkInDate).toISOString(),
      visitType: formData.visitType,
      moodAfterVisit: Number(formData.moodAfterVisit),
      medicationTaken: Boolean(formData.medicationTaken),
      notes: formData.notes.trim(),
    };

    try {
      await onSubmitVisit(payload);
      if (!editingVisit) {
        setFormData(buildInitialFormState(null));
      }
    } catch (error) {
      setFormError(error.message || "Failed to save visit.");
    }
  }

  return (
    <section className="panel">
      <h2>{editingVisit ? "Edit Visit" : "Add New Visit"}</h2>
      <form className="visit-form" onSubmit={handleSubmit}>
        <label>
          Senior
          <select
            name="seniorId"
            value={formData.seniorId}
            onChange={handleChange}
            required
          >
            <option value="">Select senior</option>
            {seniors.map((senior) => (
              <option key={senior._id} value={senior._id}>
                {senior.fullName} ({senior.city})
              </option>
            ))}
          </select>
        </label>

        <label>
          Companion
          <select
            name="companionId"
            value={formData.companionId}
            onChange={handleChange}
            required
          >
            <option value="">Select companion</option>
            {companions.map((companion) => (
              <option key={companion._id} value={companion._id}>
                {companion.fullName} ({companion.relationshipType})
              </option>
            ))}
          </select>
        </label>

        <label>
          Check-In Date
          <input
            type="datetime-local"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Visit Type
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
            required
          >
            {VISIT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Mood After Visit (1-5)
          <input
            type="number"
            name="moodAfterVisit"
            value={formData.moodAfterVisit}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="medicationTaken"
            checked={formData.medicationTaken}
            onChange={handleChange}
          />
          Medication taken
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            maxLength="500"
          />
        </label>

        {formError ? <p className="error-text">{formError}</p> : null}

        <div className="form-actions">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : editingVisit ? "Update Visit" : "Create Visit"}
          </button>
          {editingVisit ? (
            <button
              type="button"
              className="secondary-button"
              onClick={onCancelEdit}
              disabled={isSaving}
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default VisitForm;
