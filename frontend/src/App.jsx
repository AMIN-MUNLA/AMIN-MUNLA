import { useCallback, useEffect, useState } from "react";

import {
  createCheckInVisit,
  fetchCheckInVisits,
  fetchCompanions,
  fetchSeniors,
} from "./api/checkInVisitsApi";
import CheckInVisitForm from "./components/CheckInVisitForm";
import "./App.css";

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

function App() {
  const [visits, setVisits] = useState([]);
  const [seniors, setSeniors] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReferenceLoading, setIsReferenceLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const [lastLoadedAt, setLastLoadedAt] = useState("");

  const loadVisits = useCallback(async ({ signal, withLoading } = {}) => {
    if (withLoading) {
      setIsLoading(true);
    }
    setErrorMessage("");

    try {
      const data = await fetchCheckInVisits({ signal });
      setVisits(data);
      setLastLoadedAt(new Date().toISOString());
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      setErrorMessage(error.message || "Could not load check-in visits.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateVisit = useCallback(
    async (payload) => {
      setIsSubmitting(true);
      setCreateErrorMessage("");

      try {
        await createCheckInVisit(payload);
        await loadVisits({ withLoading: true });
      } catch (error) {
        setCreateErrorMessage(error.message || "Could not create check-in visit.");
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadVisits]
  );

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchCheckInVisits({ signal: controller.signal }),
      fetchSeniors({ signal: controller.signal }),
      fetchCompanions({ signal: controller.signal }),
    ])
      .then(([visitData, seniorData, companionData]) => {
        setVisits(visitData);
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
        setIsReferenceLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">DA219B Day 5 - React API Integration</p>
        <h1>Senior Companion Check-In Planner</h1>
        <p className="subtitle">
          Real visit data from Express + MongoDB Atlas shown in React.
        </p>
      </header>

      <CheckInVisitForm
        seniors={seniors}
        companions={companions}
        isSubmitting={isSubmitting}
        submitError={createErrorMessage}
        onCreateVisit={handleCreateVisit}
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
            onClick={() => loadVisits({ withLoading: true })}
            disabled={isLoading || isReferenceLoading}
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
                  <th>Mood</th>
                  <th>Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit._id}>
                    <td>{formatDate(visit.checkInDate)}</td>
                    <td>{getName(visit.seniorId, "Unknown senior")}</td>
                    <td>{getName(visit.companionId, "Unknown companion")}</td>
                    <td>{visit.visitType}</td>
                    <td>{visit.moodAfterVisit}/5</td>
                    <td>{visit.followUpRequired ? "Yes" : "No"}</td>
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
