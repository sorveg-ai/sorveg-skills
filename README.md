# Sorveg Skills

> **A deterministic execution contract.** Same input → same output. Every time.

[Live Playground](https://skills.sorveg.com/playground) • [Sign Up](https://sorveg.com/signup) • [Docs](https://docs.sorveg.com)

---

## The product is the link

A Sorveg link isn't a result — it's a verifiable computation:

8 lines hidden
https://skills.sorveg.com/playground?prompt=sort%20

[64][34][25]

Share it. Anyone can run it. Everyone gets identical output. No setup. No API key. No "it works on my machine."

**The link replaces documentation.** It's example, test case, and benchmark in one.

---

## Try in 10 seconds

**1. Sort**
```bash
$ sorveg run "sort [64,34,25,12,22,11,90]"
✓ [11,12,22,25,34,64,90] (23ms)

8 lines hidden
2. Shortest Path

Bash
$ sorveg run "shortest path A to D"
✓ A→B→C→D cost:4 (18ms)
3. Knapsack

Bash
$ sorveg run "knapsack capacity 5"
✓ max value: 7 (31ms)
Open Playground →

Why this works
Traditional AI:

Probabilistic outputs
Varies by session
Cannot be verified
Sorveg:

Deterministic for supported computations
No probabilistic variation
Reproducible outputs for identical inputs
"If it can't be reproduced, it isn't engineering."

Built for developers
Local-first: Runs on your hardware. No data leaves your machine.
Verifiable: Every execution shows steps, timing, and full trace.
Composable: Chain skills via links or API.
Shareable: Links are self-contained units of trust.
Run → Share → Modify → Re-run → Re-share. That's the network effect.

9 public skills, 433+ in private
This demo shows 9 core algorithms. The full Sorveg platform includes:

Graph: cycle detection, shortest path, topological sort
Optimization: knapsack, scheduling, route optimization
Search: binary search, semantic search, codebase search
Reasoning: data analysis, code audit, multi-step planning
Each is executable. Each is verifiable. Each is shareable.

Get full access →

License
MIT — public demo layer only. Core orchestration and agentic capabilities remain proprietary.

Built by Sorvegian AI • sorveg.com
