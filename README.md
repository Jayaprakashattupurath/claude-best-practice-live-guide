# Claude Best Practice Live Guide (Node + React)

A small, practical codebase that demonstrates **Claude best-practice prompting** in a real-time workflow.

## Real-world scenario this addresses

When teams handle urgent situations (outages, incident updates, high-priority customer complaints), they often ask AI with vague prompts and get weak outputs.  
This app helps users create a better prompt structure quickly:

- Context
- Objective
- Constraints
- Output format
- Risk/self-check

## What this app does

- User enters a live scenario, goal, and constraints.
- Node API returns:
  - step-by-step best-practice guidance
  - a ready-to-use prompt template
- React UI displays the guidance in a practical format.

## Tech stack

- **Backend:** Node.js + Express
- **Frontend:** React (Vite)

## Project structure

- `src/server.js` → API server
- `src/claudeBestPractice.js` → simple logic for guidance/prompt generation
- `client/src/App.jsx` → UI for entering scenario and viewing result

## Run locally

```bash
npm install
npm run dev
```

- React app: `http://localhost:5173`
- API: `http://localhost:4000`

## Example input

- Scenario: "Payment API is timing out for some users during peak traffic."
- Goal: "Draft customer update and internal next actions."
- Constraints: "No blame language, concise, max 150 words for customer note."

## Guidance approach (Claude best practice)

1. Be explicit about context.
2. Define the exact output you want.
3. Add constraints (policy, tone, length).
4. Ask for structured output.
5. Ask for assumptions/risks.
6. Iterate in short loops.

## Why this is useful

This pattern reduces hallucinated or generic answers and increases actionable responses during time-sensitive operations.

## Notes

- This project is intentionally lightweight.
- It does not call external AI APIs by default.
- You can extend `src/claudeBestPractice.js` to integrate real model calls later.