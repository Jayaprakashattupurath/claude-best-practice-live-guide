export function buildGuidance({ scenario, goal, constraints }) {
  const missing = [];
  if (!scenario?.trim()) missing.push("scenario");
  if (!goal?.trim()) missing.push("goal");

  if (missing.length) {
    return {
      title: "Need a little more detail",
      summary: `Please provide: ${missing.join(", ")}.`,
      steps: [
        "Describe the real-world context (who, what, urgency).",
        "State exactly what output you want.",
        "Add constraints (tone, length, compliance, audience)."
      ],
      promptTemplate: ""
    };
  }

  const safeConstraints = constraints?.trim() || "No additional constraints provided";

  return {
    title: "Claude Best Practice Plan",
    summary: "Use a structured prompt: context + objective + constraints + output format + review pass.",
    steps: [
      "1) Set role and context clearly (what happened, who is involved, why now).",
      "2) Define the goal as an action (e.g., draft, analyze, prioritize, summarize).",
      "3) Add practical constraints (policy, legal, tone, deadline, word count).",
      "4) Ask for a structured output (bullets/table/checklist) for faster execution.",
      "5) Request a self-check section for risks, assumptions, and missing info.",
      "6) Iterate with follow-up prompts: refine one section at a time."
    ],
    promptTemplate: `You are an operations assistant helping with a live business scenario.

Context:
${scenario}

Goal:
${goal}

Constraints:
${safeConstraints}

Instructions:
- Think step-by-step, but only output final actionable content.
- If details are missing, state assumptions briefly.
- Provide output in this format:
  1) Recommended response
  2) Risks and caveats
  3) Follow-up questions
  4) Next 24-hour action checklist`
  };
}