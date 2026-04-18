import { useCallback, useEffect, useState } from "react";

import { fetchCheckInVisits } from "./api/checkInVisitsApi";
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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    const controller = new AbortController();
    fetchCheckInVisits({ signal: controller.signal })
      .then((data) => {
        setVisits(data);
        setLastLoadedAt(new Date().toISOString());
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setErrorMessage(error.message || "Could not load check-in visits.");
      })
      .finally(() => {
        setIsLoading(false);
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
            disabled={isLoading}
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
