import { useEffect, useState } from "react";

import VisitForm from "./VisitForm";
import VisitList from "./VisitList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function parseJsonResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || "Request failed.";
    throw new Error(message);
  }

  return data;
}

function VisitsDashboard() {
  const [visits, setVisits] = useState([]);
  const [seniors, setSeniors] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visitTypeFilter, setVisitTypeFilter] = useState("");

  async function loadVisits(showLoading = true) {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-in-visits`);
      const data = await parseJsonResponse(response);
      setVisits(data);
      setError("");
    } catch (requestError) {
      setError(requestError.message || "Failed to load visits.");
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  async function loadReferenceData() {
    try {
      const [seniorsResponse, companionsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/seniors`),
        fetch(`${API_BASE_URL}/api/companions`),
      ]);

      const [seniorsData, companionsData] = await Promise.all([
        parseJsonResponse(seniorsResponse),
        parseJsonResponse(companionsResponse),
      ]);

      setSeniors(seniorsData);
      setCompanions(companionsData);
      setError("");
    } catch (requestError) {
      setError(requestError.message || "Failed to load seniors/companions.");
    }
  }

  useEffect(() => {
    let isUnmounted = false;

    async function loadAllData() {
      if (isUnmounted) {
        return;
      }

      setIsLoading(true);
      await Promise.all([loadVisits(false), loadReferenceData()]);
      if (!isUnmounted) {
        setIsLoading(false);
      }
    }

    loadAllData();

    const intervalId = setInterval(() => {
      loadVisits(false);
    }, 30000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

  async function handleSubmitVisit(payload) {
    setIsSaving(true);

    try {
      const endpoint = editingVisit
        ? `${API_BASE_URL}/api/check-in-visits/${editingVisit._id}`
        : `${API_BASE_URL}/api/check-in-visits`;
      const method = editingVisit ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      await parseJsonResponse(response);
      setEditingVisit(null);
      await loadVisits(false);
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditVisit(visit) {
    setEditingVisit(visit);
  }

  function handleCancelEdit() {
    setEditingVisit(null);
  }

  async function handleDeleteVisit(visit) {
    const shouldDelete = window.confirm(
      `Delete visit for ${visit?.seniorId?.fullName || "this senior"}?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-in-visits/${visit._id}`, {
        method: "DELETE",
      });

      await parseJsonResponse(response);
      await loadVisits(false);
    } catch (requestError) {
      setError(requestError.message || "Failed to delete visit.");
    }
  }

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">DA219B Fullstack Lab</p>
        <h1>Senior Companion Check-In Planner</h1>
        <p className="subtitle">
          Track wellness check-ins for older adults with clear follow-up and
          explainable data flow.
        </p>
      </header>

      <section className="panel controls-panel">
        <h2>Search & Filter</h2>
        <div className="controls-row">
          <label>
            Search by senior name
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Type a senior name..."
            />
          </label>

          <label>
            Filter by visit type
            <select
              value={visitTypeFilter}
              onChange={(event) => setVisitTypeFilter(event.target.value)}
            >
              <option value="">All types</option>
              <option value="call">Call</option>
              <option value="home_visit">Home Visit</option>
              <option value="video_call">Video Call</option>
            </select>
          </label>
        </div>
      </section>

      {isLoading ? <p className="status-text">Loading data...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <VisitForm
        key={editingVisit ? editingVisit._id : "create-visit"}
        seniors={seniors}
        companions={companions}
        editingVisit={editingVisit}
        isSaving={isSaving}
        onSubmitVisit={handleSubmitVisit}
        onCancelEdit={handleCancelEdit}
      />

      <VisitList
        visits={visits}
        searchQuery={searchQuery}
        visitTypeFilter={visitTypeFilter}
        onEditVisit={handleEditVisit}
        onDeleteVisit={handleDeleteVisit}
      />
    </main>
  );
}

export default VisitsDashboard;
