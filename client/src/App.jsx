import React, { useState } from "react";

const API = "http://localhost:4000/api/guidance";

export default function App() {
  const [scenario, setScenario] = useState("");
  const [goal, setGoal] = useState("");
  const [constraints, setConstraints] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, goal, constraints })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        title: "Error",
        summary: "Could not reach API. Make sure server is running on port 4000.",
        steps: [],
        promptTemplate: ""
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 880, margin: "30px auto", background: "#fff", padding: 20, borderRadius: 10 }}>
      <h2>Claude Best Practice (Real-Time Scenario Helper)</h2>
      <p style={{ color: "#555" }}>
        Example use case: You are handling an urgent support incident and need a clean AI prompt to generate a safe, useful response.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Scenario
          <textarea
            rows="4"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="e.g., Major outage affects premium customers; support queue is overloaded."
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Goal
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Draft a calm customer update + internal triage checklist."
            style={{ width: "100%", height: 34 }}
          />
        </label>

        <label>
          Constraints (optional)
          <input
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="e.g., No legal admissions, 120 words max, empathetic tone."
            style={{ width: "100%", height: 34 }}
          />
        </label>

        <button disabled={loading} style={{ height: 36 }}>
          {loading ? "Generating..." : "Generate Guidance"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 24, borderTop: "1px solid #eee", paddingTop: 16 }}>
          <h3>{result.title}</h3>
          <p>{result.summary}</p>

          {result.steps?.length > 0 && (
            <>
              <h4>Recommended Steps</h4>
              <ul>
                {result.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </>
          )}

          {result.promptTemplate && (
            <>
              <h4>Ready-to-use Prompt</h4>
              <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 8, whiteSpace: "pre-wrap" }}>
                {result.promptTemplate}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}