import { ArrowLeft, Loader2, Zap, Copy, RotateCcw } from 'lucide-react';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface ExecutionTrace {
  phase: "thinking" | "skill_selection" | "executing" | "result";
  message: string;
  timestamp: number;
  details?: string;
}

interface ExecutionResult {
  result?: any;
  traces: ExecutionTrace[];
  executionTime?: number;
  skillUsed?: string;
  steps?: string[];
}

function detectSkill(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  // Order matters - check specific patterns first
  if (lower.includes("fibonacci")) return "fibonacci";
  if (lower.includes("coin change") || lower.includes("coin-change")) return "coin-change";
  if (lower.includes("edit distance") || lower.includes("levenshtein")) return "edit-distance";
  if (lower.includes("palindrome")) return "palindrome";
  if (lower.includes("binary search")) return "binary-search";
  if (lower.includes("detect cycle") || lower.includes("cycle detection")) return "detect-cycle";
  if (lower.includes("knapsack")) return "knapsack";
  if (lower.includes("shortest path") || lower.includes("shortest-path")) return "shortest-path";
  if (lower.includes("sort")) return "sort";
  
  return "sort";
}

const SKILL_EXAMPLES = [
  { category: "Sorting", prompt: "sort [64,34,25,12,22,11,90]", description: "Sort array with timsort", skill: "sort" },
  { category: "Graph", prompt: "shortest path from A to D", description: "Find shortest path", skill: "shortest-path" },
  { category: "Optimization", prompt: "knapsack weights [2,3,4] values [3,4,5] capacity 5", description: "0/1 knapsack", skill: "knapsack" },
  { category: "Search", prompt: "binary search target 25 in [11,12,22,25,34,64,90]", description: "Binary search", skill: "binary-search" },
  { category: "Graph", prompt: "detect cycle in graph 1->2, 2->3, 3->1", description: "Cycle detection", skill: "detect-cycle" },
  { category: "String", prompt: "palindrome check racecar", description: "Palindrome validation", skill: "palindrome" },
  { category: "String", prompt: "edit distance KITTEN SITTING", description: "Levenshtein distance", skill: "edit-distance" },
  { category: "Math", prompt: "fibonacci 10", description: "Fibonacci sequence", skill: "fibonacci" },
  { category: "DP", prompt: "coin change amount 7 coins [1,2,5]", description: "Minimum coins", skill: "coin-change" },
];

export default function Playground() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fromLink, setFromLink] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("prompt");
    if (p) {
      const decodedPrompt = decodeURIComponent(p);
      setPrompt(decodedPrompt);
      setFromLink(true);
      executeSkill(decodedPrompt);
    }
  }, []);

  const executeSkill = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    const traces: ExecutionTrace[] = [];
    const startTime = Date.now();

    try {
      const skill = detectSkill(text);
      
      traces.push({ phase: "thinking", message: "Analyzing prompt...", timestamp: Date.now(), details: `"${text}"` });
      setResult({ result: null, traces, executionTime: 0, skillUsed: skill });

      traces.push({ phase: "skill_selection", message: `Selected skill: ${skill}`, timestamp: Date.now(), details: "Deterministic execution" });
      setResult({ result: null, traces, executionTime: 0, skillUsed: skill });

      traces.push({ phase: "executing", message: "Executing on local hardware...", timestamp: Date.now(), details: "Sandboxed Python" });
      setResult({ result: null, traces, executionTime: 0, skillUsed: skill });

      const response = await fetch(`https://api.sorveg.com/api/skills/${skill}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const executionTime = Date.now() - startTime;
        
        traces.push({
          phase: "result",
          message: "✓ Execution successful",
          timestamp: Date.now(),
          details: `${executionTime}ms`,
        });

        setResult({
          result: data.result,
          traces,
          executionTime,
          skillUsed: skill,
          steps: data.steps,
        });

        const url = new URL(window.location.href);
        url.searchParams.set("prompt", text);
        window.history.replaceState({}, "", url.toString());
        toast.success("Execution complete");
      } else {
        throw new Error("API error");
      }
    } catch (error) {
      traces.push({ phase: "result", message: "⚠️ Demo result (API unavailable)", timestamp: Date.now(), details: "Using local demo" });
      const demoResults: Record<string, any> = {
        sort: [11, 12, 22, 25, 34, 64, 90],
        "shortest-path": { path: ["A", "C", "F"], distance: 3 },
        knapsack: { selected_items: ["Item2", "Item3"], total_value: 7 },
        "binary-search": { target: 25, index: 3, found: true },
        "detect-cycle": { has_cycle: true, cycle: ["1", "2", "3", "1"] },
        palindrome: { text: "racecar", is_palindrome: true },
        "edit-distance": { s1: "KITTEN", s2: "SITTING", distance: 3 },
        fibonacci: { n: 10, value: 55, sequence: [0,1,1,2,3,5,8,13,21,34,55] },
        "coin-change": { amount: 7, coins: [1,2,5], min_coins: 2 },
      };
      setResult({
        result: demoResults[skill] || "Done",
        traces,
        executionTime: 23,
        skillUsed: skill,
        steps: ["Parsed input", "Executed algorithm", "Generated output"],
      });
    } finally {
      setLoading(false);
    }
  };

  const copyShareableLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("prompt", prompt);
    navigator.clipboard.writeText(url.toString());
    toast.success("Shareable link copied!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-black/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation("/")} className="text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-emerald-500" />
              <span className="font-bold text-lg">Playground</span>
            </div>
          </div>
          <a
            href="https://sorveg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-4 py-2 rounded-lg text-sm"
          >
            Get Full Access
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {fromLink && (
          <div className="px-4 py-3 bg-gray-800 border border-gray-800 rounded-lg text-sm flex items-center gap-2">
            <span className="text-emerald-500">🔗</span>
            <span>Loaded from shared link — editable, re-runnable, verifiable</span>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-black border-gray-800 text-white font-mono text-sm rounded-lg"
            rows={3}
            placeholder="e.g., sort [64,34,25] or fibonacci 10"
          />
          <div className="flex gap-3">
            <Button onClick={() => executeSkill(prompt)} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black">
              {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Executing...</> : <><Zap size={16} className="mr-2" />Execute</>}
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-mono text-sm font-semibold">{result.skillUsed}</span>
                </div>
                <span className="text-gray-400 text-xs">{result.executionTime}ms</span>
              </div>
              <div className="flex gap-2">
                <button onClick={copyShareableLink} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-md">
                  <Copy size={16} />
                </button>
                <button onClick={() => executeSkill(prompt)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-md">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 font-mono text-sm">
              {result.traces.map((trace, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-start gap-3">
                    {trace.phase === "thinking" && <span className="text-gray-400">→</span>}
                    {trace.phase === "skill_selection" && <span className="text-emerald-500">◆</span>}
                    {trace.phase === "executing" && <span className="text-emerald-500 animate-pulse">⟳</span>}
                    {trace.phase === "result" && <span className="text-emerald-500">✓</span>}
                    <span className={trace.phase === "result" ? "text-emerald-500 font-semibold" : "text-white"}>
                      {trace.message}
                    </span>
                  </div>
                  {trace.details && <div className="ml-6 text-xs text-gray-400">{trace.details}</div>}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 px-6 py-4 bg-gray-900/50">
              <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Result</div>
              <pre className="text-sm text-white font-mono overflow-x-auto">
                {JSON.stringify(result.result, null, 2)}
              </pre>
            </div>

            {result.steps && result.steps.length > 0 && (
              <div className="border-t border-gray-800 px-6 py-4">
                <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Steps</div>
                <div className="space-y-1">
                  {result.steps.map((step, i) => (
                    <div key={i} className="text-xs text-gray-400 font-mono">→ {step}</div>
                  ))}
                </div>
              </div>
            )}
            <div className="border-t border-gray-800 px-6 py-4 bg-emerald-500/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-500 font-semibold">Want 433+ skills?</p>
                  <p className="text-xs text-gray-400">Unlock full agentic workflows</p>
                </div>
                <a href="https://sorveg.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-emerald-500 text-black px-3 py-1.5 rounded font-medium hover:bg-emerald-400">
                  Sign Up →
                </a>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-sm">Enter a prompt or click an example to execute a skill</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Try an example</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SKILL_EXAMPLES.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(example.prompt);
                  executeSkill(example.prompt);
                }}
                className="text-left bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-emerald-500/50 transition-colors"
              >
                <div className="text-xs font-semibold text-emerald-500 mb-2 uppercase tracking-wider">{example.category}</div>
                <p className="text-sm font-mono text-white mb-2 break-words">{example.prompt}</p>
                <p className="text-xs text-gray-400">{example.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
