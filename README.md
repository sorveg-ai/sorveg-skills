# Sorveg Skills

> Deterministic execution — not probabilistic answers.

Most AI tools generate responses.  
Sorveg executes computations.

**Same input → same output.**

**Live:** https://skills.sorveg.com

---

## ⚡ Try in 10 seconds

### 1. Sort + Search

**Input**

sort [64,34,25,12,22,11,90] then find index of 25


**Output**

[11,12,22,25,34,64,90]
index: 3
(23ms)


👉 https://skills.sorveg.com/playground?prompt=sort+[64,34,25,12,22,11,90]+then+find+index+of+25

---

### 2. Shortest Path

**Input**

shortest path from A to D in graph {A:[B:1,C:4],B:[C:2,D:5],C:[D:1]}


**Output**

A → B → C → D
cost: 4
(18ms)


👉 https://skills.sorveg.com/playground?prompt=shortest+path+from+A+to+D

---

### 3. Knapsack

**Input**

weights [2,3,4], values [3,4,5], capacity 5


**Output**

max value: 7
items: [2,3]
(31ms)


👉 https://skills.sorveg.com/playground?prompt=knapsack+capacity+5

---

## 🔗 The model

A Sorveg link is a **reproducible execution contract**:


https://skills.sorveg.com/playground?prompt=sort+[64,34,25
]


Anyone opening that link can:

- run the same computation  
- get the same result  
- verify it instantly  
- modify and re-run  

No setup. No environment. No hidden state.

**Run → Share → Modify → Re-run → Re-share**

---

## ❓ Why this exists

> If it can't be reproduced, it's not a valid result.

Most AI systems are:

- probabilistic  
- non-reproducible  
- difficult to verify  

That breaks:

- debugging  
- validation  
- automation  

Sorveg executes instead of predicts.

---

## ✅ What you get

- Deterministic execution (for supported computations)  
- Reproducible results across runs, machines, and time  
- Step-by-step traces  
- Sub-100ms execution (typical)  
- Shareable execution links  
- 400+ computational skills  

---

## 🧠 Example capabilities


detect cycle in graph
optimize delivery route
find longest common subsequence
search codebase for auth logic
plan trip with constraints


These are executed tasks — not generated responses.

---

## ⚙️ How it works

1. Write a prompt  
2. Sorveg maps it to a computation  
3. Executes in a sandbox  
4. Returns structured output:

```json
{
  "result": "...",
  "steps": ["..."],
  "executionTime": 23
}
🔌 API
POST https://api.sorveg.com/api/skills/{skill}

Body

{ "prompt": "..." }

Response

{
  "result": "...",
  "steps": [...],
  "executionTime": 23
}
🏗 Architecture
Local-first deterministic execution
Sandboxed runtime (no side effects)
FastAPI backend
React + TypeScript frontend

Composable via chained prompts and external orchestration.

🚀 Try it

👉 https://skills.sorveg.com/playground

📄 License

MIT — public layer. Core orchestration remains proprietary.

🎯 Positioning

Sorveg is not an AI assistant.

It is a reproducible computation layer.

Use it when:

results must be verifiable
outputs must be stable
correctness matters more than fluency

https://sorveg.com

Deterministic AI for developers
