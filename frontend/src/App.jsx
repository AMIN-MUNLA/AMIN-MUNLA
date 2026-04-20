import { useCallback, useEffect, useState } from "react";

import {
  createCheckInVisit,
  deleteCheckInVisit,
  fetchCheckInVisits,
  fetchCompanions,
  fetchMoodSummary,
  fetchSeniors,
  updateCheckInVisit,
} from "./api/checkInVisitsApi";
import CheckInVisitForm from "./components/CheckInVisitForm";
import {
  SUPPORT_ACTION_OPTIONS,
  VISIT_TYPE_OPTIONS,
} from "./constants/checkInVisitOptions";
import "./App.css";

const INITIAL_FILTERS = {
  visitType: "",
  followUpRequired: "",
  minMood: "",
  maxMood: "",
  startDate: "",
  endDate: "",
};

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getName(value, fallback) {
  if (value && typeof value === "object" && "fullName" in value) {
    return value.fullName;
  }
  return fallback;
}

function getOptionLabel(options, value, fallback = "Unknown") {
  const found = options.find((item) => item.value === value);
  return found?.label || fallback;
}

function buildVisitFilters(filters) {
  return {
    visitType: filters.visitType,
    followUpRequired: filters.followUpRequired,
    minMood: filters.minMood,
    maxMood: filters.maxMood,
  };
}

function buildStatsFilters(filters) {
  return {
    visitType: filters.visitType,
    startDate: filters.startDate,
    endDate: filters.endDate,
  };
}

function formatMoodValue(value) {
  if (value === null || value === undefined) {
    return "-";
  }
  return `${value}/5`;
}

function App() {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState(null);
  const [seniors, setSeniors] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isReferenceLoading, setIsReferenceLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingVisitId, setDeletingVisitId] = useState("");
  const [editingVisitId, setEditingVisitId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statsErrorMessage, setStatsErrorMessage] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [backgroundRefreshError, setBackgroundRefreshError] = useState("");
  const [lastLoadedAt, setLastLoadedAt] = useState("");
  const editingVisit = visits.find((visit) => visit._id === editingVisitId) || null;

  const loadVisits = useCallback(async ({ signal, withLoading, filtersOverride } = {}) => {
    const resolvedFilters = buildVisitFilters(filtersOverride || activeFilters);

    if (withLoading) {
      setIsLoading(true);
    }
    setErrorMessage("");

    try {
      const data = await fetchCheckInVisits({ signal, filters: resolvedFilters });
      setVisits(data);
      setLastLoadedAt(new Date().toISOString());
      setBackgroundRefreshError("");
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      if (withLoading) {
        setErrorMessage(error.message || "Could not load check-in visits.");
      } else {
        setBackgroundRefreshError(
          "Auto-refresh failed for visits. Please refresh manually."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeFilters]);

  const loadStats = useCallback(async ({ signal, withLoading, filtersOverride } = {}) => {
    const resolvedFilters = buildStatsFilters(filtersOverride || activeFilters);

    if (withLoading) {
      setIsStatsLoading(true);
    }
    setStatsErrorMessage("");

    try {
      const data = await fetchMoodSummary({ signal, filters: resolvedFilters });
      setStats(data);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      if (withLoading) {
        setStatsErrorMessage(error.message || "Could not load mood summary.");
      } else {
        setBackgroundRefreshError(
          "Auto-refresh failed for mood summary. Please refresh manually."
        );
      }
    } finally {
      setIsStatsLoading(false);
    }
  }, [activeFilters]);

  const refreshDashboard = useCallback(
    async ({ withLoading, filtersOverride } = {}) => {
      await Promise.all([
        loadVisits({ withLoading, filtersOverride }),
        loadStats({ withLoading, filtersOverride }),
      ]);
    },
    [loadStats, loadVisits]
  );

  const handleCreateVisit = useCallback(
    async (payload) => {
      setIsSubmitting(true);
      setSubmitErrorMessage("");

      try {
        await createCheckInVisit(payload);
        await refreshDashboard({ withLoading: true });
      } catch (error) {
        setSubmitErrorMessage(
          error.message || "Could not create check-in visit."
        );
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [refreshDashboard]
  );

  const handleUpdateVisit = useCallback(
    async (payload) => {
      if (!editingVisitId) {
        return;
      }

      setIsSubmitting(true);
      setSubmitErrorMessage("");

      try {
        await updateCheckInVisit(editingVisitId, payload);
        setEditingVisitId("");
        await refreshDashboard({ withLoading: true });
      } catch (error) {
        setSubmitErrorMessage(
          error.message || "Could not update check-in visit."
        );
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingVisitId, refreshDashboard]
  );

  const handleDeleteVisit = useCallback(
    async (visit) => {
      const shouldDelete = window.confirm(
        "Delete this check-in visit? This action cannot be undone."
      );

      if (!shouldDelete) {
        return;
      }

      setDeletingVisitId(visit._id);
      setErrorMessage("");
      setSubmitErrorMessage("");

      try {
        await deleteCheckInVisit(visit._id);
        if (editingVisitId === visit._id) {
          setEditingVisitId("");
        }
        await refreshDashboard({ withLoading: true });
      } catch (error) {
        setErrorMessage(error.message || "Could not delete check-in visit.");
      } finally {
        setDeletingVisitId("");
      }
    },
    [editingVisitId, refreshDashboard]
  );

  useEffect(() => {
    const controller = new AbortController();
    const visitFilters = buildVisitFilters(INITIAL_FILTERS);
    const statsFilters = buildStatsFilters(INITIAL_FILTERS);

    Promise.all([
      fetchCheckInVisits({ signal: controller.signal, filters: visitFilters }),
      fetchMoodSummary({ signal: controller.signal, filters: statsFilters }),
      fetchSeniors({ signal: controller.signal }),
      fetchCompanions({ signal: controller.signal }),
    ])
      .then(([visitData, statsData, seniorData, companionData]) => {
        setVisits(visitData);
        setStats(statsData);
        setSeniors(seniorData);
        setCompanions(companionData);
        setLastLoadedAt(new Date().toISOString());
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setErrorMessage(
          error.message ||
            "Could not load initial dashboard data. Check backend connection."
        );
      })
      .finally(() => {
        setIsLoading(false);
        setIsStatsLoading(false);
        setIsReferenceLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshDashboard({ withLoading: false });
    }, 45000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshDashboard]);

  const handleFilterInputChange = (event) => {
    const { name, value } = event.target;
    setDraftFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleApplyFilters = async (event) => {
    event.preventDefault();
    const nextFilters = { ...draftFilters };
    setActiveFilters(nextFilters);
    await refreshDashboard({ withLoading: true, filtersOverride: nextFilters });
  };

  const handleClearFilters = async () => {
    const resetFilters = { ...INITIAL_FILTERS };
    setDraftFilters(resetFilters);
    setActiveFilters(resetFilters);
    await refreshDashboard({ withLoading: true, filtersOverride: resetFilters });
  };

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">DA219B Day 7 - Filter + Stats Dashboard</p>
        <h1>Senior Companion Check-In Planner</h1>
        <p className="subtitle">
          Real visit data from Express + MongoDB Atlas shown in React.
        </p>
      </header>

      {backgroundRefreshError ? (
        <p className="warning-text">{backgroundRefreshError}</p>
      ) : null}
      {!isReferenceLoading && (seniors.length === 0 || companions.length === 0) ? (
        <p className="warning-text">
          Missing reference data. Run backend seed data for full create-form demo.
        </p>
      ) : null}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Visit Filters</h2>
            <p className="muted">
              Filter table data and summary endpoint in real time.
            </p>
          </div>
        </div>

        <form onSubmit={handleApplyFilters} className="filter-grid">
          <label>
            Visit Type
            <select
              name="visitType"
              value={draftFilters.visitType}
              onChange={handleFilterInputChange}
            >
              <option value="">All</option>
              {VISIT_TYPE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Follow-up Required
            <select
              name="followUpRequired"
              value={draftFilters.followUpRequired}
              onChange={handleFilterInputChange}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <label>
            Min Mood
            <input
              type="number"
              min="1"
              max="5"
              name="minMood"
              value={draftFilters.minMood}
              onChange={handleFilterInputChange}
            />
          </label>

          <label>
            Max Mood
            <input
              type="number"
              min="1"
              max="5"
              name="maxMood"
              value={draftFilters.maxMood}
              onChange={handleFilterInputChange}
            />
          </label>

          <label>
            Stats Start Date
            <input
              type="date"
              name="startDate"
              value={draftFilters.startDate}
              onChange={handleFilterInputChange}
            />
          </label>

          <label>
            Stats End Date
            <input
              type="date"
              name="endDate"
              value={draftFilters.endDate}
              onChange={handleFilterInputChange}
            />
          </label>

          <div className="full-width filter-actions">
            <button
              type="submit"
              className="secondary-button"
              disabled={isLoading || isStatsLoading || isReferenceLoading}
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleClearFilters}
              disabled={isLoading || isStatsLoading}
            >
              Clear Filters
            </button>
          </div>
        </form>

        <p className="muted">
          Active filters:{" "}
          {Object.values(activeFilters).every((value) => !value)
            ? "none"
            : JSON.stringify(activeFilters)}
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Mood Summary</h2>
            <p className="muted">Powered by `GET /api/stats/mood-summary`.</p>
          </div>
        </div>

        {statsErrorMessage ? (
          <p className="error-text">Error: {statsErrorMessage}</p>
        ) : null}

        {isStatsLoading ? (
          <p className="muted">Loading mood summary...</p>
        ) : (
          <>
            <div className="stats-grid">
              <article className="stat-card">
                <p className="stat-label">Total Visits</p>
                <p className="stat-value">{stats?.totals?.totalVisits ?? 0}</p>
              </article>
              <article className="stat-card">
                <p className="stat-label">Average Mood</p>
                <p className="stat-value">{formatMoodValue(stats?.mood?.average)}</p>
              </article>
              <article className="stat-card">
                <p className="stat-label">Follow-up Required</p>
                <p className="stat-value">
                  {stats?.totals?.followUpRequiredCount ?? 0}
                </p>
              </article>
            </div>

            <div className="summary-columns">
              <div>
                <h3>By Visit Type</h3>
                <ul className="summary-list">
                  {(stats?.byVisitType || []).map((item) => (
                    <li key={item.visitType}>
                      <span>{item.visitType}</span>
                      <span>
                        {item.count} visits, avg {formatMoodValue(item.averageMood)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>By Support Level</h3>
                <ul className="summary-list">
                  {(stats?.bySupportLevel || []).map((item) => (
                    <li key={item.supportLevel}>
                      <span>{item.supportLevel}</span>
                      <span>
                        {item.count} visits, avg {formatMoodValue(item.averageMood)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>

      <CheckInVisitForm
        key={editingVisitId || "create-mode"}
        seniors={seniors}
        companions={companions}
        isSubmitting={isSubmitting}
        submitError={submitErrorMessage}
        editVisit={editingVisit}
        onCreateVisit={handleCreateVisit}
        onUpdateVisit={handleUpdateVisit}
        onCancelEdit={() => setEditingVisitId("")}
      />

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Check-In Visits</h2>
            <p className="muted">
              {lastLoadedAt
                ? `Last loaded: ${formatDate(lastLoadedAt)}`
                : "Not loaded yet"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refreshDashboard({ withLoading: true })}
            disabled={isLoading || isStatsLoading || isReferenceLoading}
            className="secondary-button"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {errorMessage && <p className="error-text">Error: {errorMessage}</p>}

        {isLoading ? (
          <p className="muted">Loading visits...</p>
        ) : visits.length === 0 ? (
          <p className="muted">No check-in visits found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Senior</th>
                  <th>Companion</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Support Action</th>
                  <th>Mood</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit._id}>
                    <td>{formatDate(visit.checkInDate)}</td>
                    <td>{getName(visit.seniorId, "Unknown senior")}</td>
                    <td>{getName(visit.companionId, "Unknown companion")}</td>
                    <td>{getOptionLabel(VISIT_TYPE_OPTIONS, visit.visitType)}</td>
                    <td>{visit.durationMinutes} min</td>
                    <td>
                      {getOptionLabel(
                        SUPPORT_ACTION_OPTIONS,
                        visit.supportAction,
                        "None"
                      )}
                    </td>
                    <td>{visit.moodAfterVisit}/5</td>
                    <td>{visit.followUpRequired ? "Yes" : "No"}</td>
                    <td className="row-actions">
                      <button
                        type="button"
                        className="secondary-button action-button"
                        onClick={() => {
                          setSubmitErrorMessage("");
                          setEditingVisitId(visit._id);
                        }}
                        disabled={isSubmitting || deletingVisitId === visit._id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="danger-button action-button"
                        onClick={() => handleDeleteVisit(visit)}
                        disabled={isSubmitting || deletingVisitId === visit._id}
                      >
                        {deletingVisitId === visit._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
