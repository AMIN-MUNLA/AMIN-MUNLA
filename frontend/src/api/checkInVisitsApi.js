const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API_ROOT = `${API_BASE_URL}/api`;

function buildQueryString(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      Number.isNaN(value)
    ) {
      return;
    }
    params.set(key, String(value));
  });

  const query = params.toString();
  return query ? `?${query}` : "";
}

async function readApiError(response) {
  try {
    const data = await response.json();
    if (data?.message) {
      return data.message;
    }
  } catch {
    // Ignore JSON parse errors and return fallback message.
  }

  return `Request failed (${response.status}).`;
}

export async function fetchCheckInVisits({ signal, filters } = {}) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`${API_ROOT}/check-in-visits${queryString}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
  return response.json();
}

export async function fetchMoodSummary({ signal, filters } = {}) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`${API_ROOT}/stats/mood-summary${queryString}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
  return response.json();
}

export async function fetchSeniors({ signal } = {}) {
  const response = await fetch(`${API_ROOT}/seniors`, { signal });
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
  return response.json();
}

export async function fetchCompanions({ signal } = {}) {
  const response = await fetch(`${API_ROOT}/companions`, { signal });
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }
  return response.json();
}

export async function createCheckInVisit(payload) {
  const response = await fetch(`${API_ROOT}/check-in-visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json();
}

export async function updateCheckInVisit(id, payload) {
  const response = await fetch(`${API_ROOT}/check-in-visits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json();
}

export async function deleteCheckInVisit(id) {
  const response = await fetch(`${API_ROOT}/check-in-visits/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return response.json();
}
