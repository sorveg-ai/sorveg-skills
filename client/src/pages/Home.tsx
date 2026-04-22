import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Github, Terminal } from "lucide-react";

interface ExecutionStep {
  type: "thinking" | "executing" | "result";
  text: string;
  timestamp: number;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const simulateExecution = async () => {
      setIsExecuting(true);
      const newSteps: ExecutionStep[] = [];

      await new Promise((resolve) => setTimeout(resolve, 500));
      newSteps.push({
        type: "thinking",
        text: "Analyzing prompt: sort [64, 34, 25]",
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);

      await new Promise((resolve) => setTimeout(resolve, 600));
      newSteps.push({
        type: "thinking",
        text: "Selected skill: sort (deterministic, <100ms)",
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);

      await new Promise((resolve) => setTimeout(resolve, 400));
      newSteps.push({
        type: "executing",
        text: "Executing on local hardware...",
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);

      await new Promise((resolve) => setTimeout(resolve, 800));
      newSteps.push({
        type: "result",
        text: "✓ [11, 12, 22, 25, 34, 64, 90] (23ms)",
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);

      setIsExecuting(false);
    };

    simulateExecution();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Terminal size={18} className="text-black" />
            </div>
            <span className="font-bold text-lg text-white">Sorveg</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://sorveg.com/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white"
            >
              Sign In
            </a>
            <a
              href="https://sorveg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-4 py-2 rounded-lg text-sm"
            >
              Sign Up Free
            </a>
            <Button
              onClick={() => setLocation("/playground")}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium"
            >
              Playground
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Agentic AI Execution Engine
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              Deterministic AI.
              <br />
              <span className="text-emerald-500">Every time.</span>
            </h1>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed">
            433+ deterministic skills orchestrated by an autonomous agent. Same input, same output. No hallucinations. No approximations. Just pure, reproducible computation.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              onClick={() => setLocation("/playground")}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-6 py-2 h-auto"
            >
              Try Playground
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <a
              href="https://sorveg.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-900"
              >
                Get Full Access
              </Button>
            </a>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm">⚡</span>
                <span className="font-mono text-sm font-semibold text-white">Sub-100ms</span>
              </div>
              <p className="text-xs text-gray-500">Execution timeouts for determinism</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm">🧠</span>
                <span className="font-mono text-sm font-semibold text-white">Intent-Locked</span>
              </div>
              <p className="text-xs text-gray-500">Zero hallucinated tool calls</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm">📦</span>
                <span className="font-mono text-sm font-semibold text-white">Sandboxed</span>
              </div>
              <p className="text-xs text-gray-500">Python & Bash isolation</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm">💻</span>
                <span className="font-mono text-sm font-semibold text-white">Local-First</span>
              </div>
              <p className="text-xs text-gray-500">Runs on sovereign hardware</p>
            </div>
          </div>
        </div>

        {/* Right: Live Execution Terminal */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 font-mono text-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Live Execution
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-gray-500">
              <span className="text-emerald-500">$</span> sorveg sort [64, 34, 25]
            </div>

            {steps.map((step, idx) => (
              <div key={idx} className="space-y-1">
                {step.type === "thinking" && (
                  <div className="text-gray-500 flex items-start gap-2">
                    <span className="text-emerald-500/60 mt-0.5">→</span>
                    <span>{step.text}</span>
                  </div>
                )}
                {step.type === "executing" && (
                  <div className="text-emerald-500/80 flex items-start gap-2">
                    <span className="animate-pulse">⟳</span>
                    <span>{step.text}</span>
                  </div>
                )}
                {step.type === "result" && (
                  <div className="text-emerald-500 font-semibold flex items-start gap-2">
                    <span>✓</span>
                    <span>{step.text}</span>
                  </div>
                )}
              </div>
            ))}

            {isExecuting && (
              <div className="text-gray-600 animate-pulse">
                <span className="text-emerald-500">_</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-800">
            <div className="text-gray-600 text-xs">
              <span className="text-emerald-500">$</span> Ready for next prompt...
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-800">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Skill Categories</h2>
            <p className="text-gray-400">433+ deterministic skills across multiple domains</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🔗", title: "Graph Analysis", desc: "Cycle detection, shortest paths, topological sorting" },
              { icon: "⚡", title: "Optimization", desc: "Knapsack, TSP, spanning trees, resource allocation" },
              { icon: "🔍", title: "Search & Sort", desc: "Binary search, merge sort, LCS, pattern matching" },
              { icon: "📝", title: "String Processing", desc: "Edit distance, palindromes, anagrams, transformations" },
              { icon: "🎯", title: "Dynamic Programming", desc: "Fibonacci, coin change, max subarray, planning" },
              { icon: "🧠", title: "Reasoning", desc: "Logic puzzles, constraint satisfaction, inference" },
            ].map((cat, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-400">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-800">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to execute deterministically?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Test any of 433+ skills in the playground. Share reproducible results with shareable links. Build agentic workflows with guaranteed correctness.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setLocation("/playground")} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-8 py-3 h-auto text-base">
              Open Playground
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <a href="https://sorveg.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 px-8 py-3 h-auto text-base">
                Sign Up for Full Platform
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-gray-500">
          <p>
            Sorveg: Sovereign AI Execution Engine
            <br />
            <span className="text-emerald-500">"If it can't be reproduced, it's not a valid result."</span>
            <br />
            <a href="https://sorveg.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 mt-2 inline-block">
              sorveg.com →
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
