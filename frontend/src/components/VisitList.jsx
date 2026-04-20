function formatDate(dateInput) {
  if (!dateInput) {
    return "-";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString();
}

function VisitList({
  visits,
  searchQuery,
  visitTypeFilter,
  onEditVisit,
  onDeleteVisit,
}) {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredVisits = visits.filter((visit) => {
    const seniorName = visit?.seniorId?.fullName?.toLowerCase() || "";
    const matchesSearch = normalizedSearch
      ? seniorName.includes(normalizedSearch)
      : true;
    const matchesVisitType = visitTypeFilter ? visit.visitType === visitTypeFilter : true;

    return matchesSearch && matchesVisitType;
  });

  return (
    <section className="panel">
      <h2>Visits ({filteredVisits.length})</h2>
      {filteredVisits.length === 0 ? (
        <p className="empty-text">No visits match the current search/filter.</p>
      ) : (
        <div className="table-wrapper">
          <table className="visit-table">
            <thead>
              <tr>
                <th>Senior</th>
                <th>Companion</th>
                <th>Date</th>
                <th>Type</th>
                <th>Mood</th>
                <th>Medication</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((visit) => (
                <tr key={visit._id}>
                  <td>{visit?.seniorId?.fullName || "-"}</td>
                  <td>{visit?.companionId?.fullName || "-"}</td>
                  <td>{formatDate(visit.checkInDate)}</td>
                  <td>{visit.visitType}</td>
                  <td>{visit.moodAfterVisit}</td>
                  <td>{visit.medicationTaken ? "Yes" : "No"}</td>
                  <td>
                    <button type="button" onClick={() => onEditVisit(visit)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => onDeleteVisit(visit)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default VisitList;
