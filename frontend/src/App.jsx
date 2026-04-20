import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">DA219B Fullstack Lab</p>
        <h1>GoldenCare Senior Check-In</h1>
        <p className="subtitle">
          Track wellness check-ins for older adults with clear follow-up and
          explainable data flow.
        </p>
      </header>

      <section className="day-box">
        <h2>Day 1 Completed</h2>
        <ul>
          <li>Project setup: React + Express + Mongo-ready backend</li>
          <li>One-command startup with concurrently</li>
          <li>Secret-safe config with .env templates</li>
          <li>ERD draft and architecture scaffolding</li>
        </ul>
      </section>

      <section className="day-box">
        <h2>Next Build Order</h2>
        <ol>
          <li>Day 2: Mongoose schemas + realistic seed data</li>
          <li>Day 3-5: CRUD, relational endpoints, custom stats endpoint</li>
          <li>Day 6-7: React CRUD UI with loading/error and filter</li>
          <li>Day 8-10: Deploy, report, seminar drills</li>
        </ol>
      </section>
    </main>
  )
}

export default App
