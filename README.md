# Sorveg Skills

> **A Sorveg link is a deterministic execution contract.**

Most AI tools generate responses. Sorveg executes computations.

**Same input → same output.**

**[Live Playground](https://skills.sorveg.com/playground)** • **[Sign Up](https://sorveg.com)** • **[Docs](https://docs.sorveg.com)**

---

## Try in 10 seconds

### 1. Sort + Search
```
Input: sort then find index of 25
Output:
        index: 3
        (23ms)
```[64][34][25][12][22][11][90]

### 2. Shortest Path
```
Input: shortest path from A to D
Output: A → B → C → D
        cost: 4
        (18ms)
```

### 3. Knapsack
```
Input: weights, values, capacity 5
Output: max value: 7
        items:
        (31ms)
```[2][3][4][5]

---

## The model

A Sorveg link replaces documentation.

```
https://skills.sorveg.com/playground?prompt=sort+
```[64][34][25]

Anyone opening that link can:
- Run the same computation
- Get the same result
- Verify it instantly
- Modify and re-run

No setup. No environment. No hidden state.

**Run → Share → Modify → Re-run → Re-share**

---

## Why this exists

> **If it can't be reproduced, it's not a valid result.**

Most AI systems are probabilistic, non-reproducible, and difficult to verify. That breaks debugging, validation, and automation.

Sorveg executes instead of predicts.

---

## What you get

- Deterministic execution (for supported computations)
- Reproducible results across runs, machines, and time
- Step-by-step traces
- Sub-100ms execution (typical)
- Shareable execution links
- 433+ computational skills

---

## Example capabilities

```
detect cycle in graph
optimize delivery route
find longest common subsequence
search codebase for auth logic
plan trip with constraints
```

These are executed tasks — not generated responses.

---

## How it works

1. Write prompt
2. Sorveg maps to computation
3. Executes in sandbox
4. Returns structured output

```json
{
  "result": "...",
  "steps": ["..."],
  "executionTime": 23
}
```

---

## Architecture

**Local-first deterministic execution. Sovereign by design.**

- Frontend: React 19 + TypeScript + Tailwind CSS 4
- Execution: Sandboxed deterministic engine
- API: FastAPI
- Composable via chained prompts and external orchestration

---

## API

```
POST https://api.sorveg.com/api/skills/{skill}

Body: { "prompt": "..." }

Response: {
  "result": "...",
  "steps": [...],
  "executionTime": 23
}
```

---

## Try it

**[→ skills.sorveg.com/playground](https://skills.sorveg.com/playground)**

---

## License

MIT — public demo only. Core orchestration remains proprietary.

---

**[sorveg.com](https://sorveg.com)** — Deterministic AI for developers
