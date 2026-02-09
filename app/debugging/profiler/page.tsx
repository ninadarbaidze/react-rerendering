"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

function ExpensiveComponent({ iterations }: { iterations: number }) {
  // Mark before render starts
  performance.mark("expensive-render-start");
  
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < iterations * 1000000; i++) {
    result += Math.sqrt(i);
  }

  // Mark after computation but still during render
  performance.mark("expensive-render-end");
  performance.measure("Expensive Component Render", "expensive-render-start", "expensive-render-end");

  return (
    <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
          Expensive Component
        </h4>
        <RenderCounter name="Expensive" />
      </div>
      <p className="text-sm text-blue-800 dark:text-blue-200">
        Result: {result.toFixed(2)}
      </p>
    </div>
  );
}

function DataFetchingComponent() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    performance.mark("fetch-start");
    
    // Simulate API call
    setTimeout(() => {
      performance.mark("fetch-end");
      performance.measure("Data Fetch Duration", "fetch-start", "fetch-end");
      setData("Data loaded successfully!");
    }, 1000);
  }, []);

  return (
    <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-green-900 dark:text-green-100">
          Data Fetching Component
        </h4>
        <RenderCounter name="DataFetch" />
      </div>
      <p className="text-sm text-green-800 dark:text-green-200">
        {data || "Loading..."}
      </p>
    </div>
  );
}

function CustomMeasureComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    performance.mark("button-click-start");
    
    // Simulate some processing
    const start = Date.now();
    while (Date.now() - start < 100) {} // Block for 100ms
    
    setCount(count + 1);
    
    performance.mark("button-click-end");
    performance.measure("Button Click Handler", "button-click-start", "button-click-end");
  };

  return (
    <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
          Custom Measure Component
        </h4>
        <RenderCounter name="CustomMeasure" />
      </div>
      <p className="mb-2 text-sm text-purple-800 dark:text-purple-200">
        Count: {count}
      </p>
      <button
        onClick={handleClick}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
      >
        Slow Click (100ms)
      </button>
    </div>
  );
}

export default function ProfilerPage() {
  const [iterations, setIterations] = useState(10);
  const [showExpensive, setShowExpensive] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
          React DevTools Profiler with Custom Tracks
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            📊 How to Use This Demo
          </h2>
          <ol className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>1. Open React DevTools (F12 → React Components tab)</li>
            <li>2. Switch to the &quot;Profiler&quot; tab</li>
            <li>3. Click the ⚙️ settings icon in the Profiler tab</li>
            <li>4. Enable &quot;Record why each component rendered&quot;</li>
            <li>5. Click the record button (blue circle)</li>
            <li>6. Interact with the components below</li>
            <li>7. Stop recording and view the flame graph</li>
            <li>8. OR use browser DevTools: F12 → Performance tab → Record → Look for &quot;User Timing&quot; section</li>
          </ol>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
          <h2 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
            🔧 Controls
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-blue-900 dark:text-blue-100">
                Iterations: {iterations}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="w-32"
              />
            </div>
            <button
              onClick={() => setShowExpensive(!showExpensive)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              {showExpensive ? "Hide" : "Show"} Expensive Component
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {showExpensive && <ExpensiveComponent iterations={iterations} />}
          <DataFetchingComponent />
          <CustomMeasureComponent />
        </div>

        <div className="mt-6 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
            📝 Custom Performance Marks
          </h2>
          <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <strong className="text-zinc-900 dark:text-white">Expensive Component Render:</strong>
              <p className="ml-4">Measures the time taken for expensive computation</p>
              <code className="ml-4 text-xs">performance.measure(&quot;Expensive Component Render&quot;)</code>
            </div>
            <div>
              <strong className="text-zinc-900 dark:text-white">Data Fetch Duration:</strong>
              <p className="ml-4">Tracks simulated API call timing</p>
              <code className="ml-4 text-xs">performance.measure(&quot;Data Fetch Duration&quot;)</code>
            </div>
            <div>
              <strong className="text-zinc-900 dark:text-white">Button Click Handler:</strong>
              <p className="ml-4">Measures event handler execution time</p>
              <code className="ml-4 text-xs">performance.measure(&quot;Button Click Handler&quot;)</code>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <h2 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            💡 Using Performance API
          </h2>
          <pre className="overflow-x-auto rounded bg-green-100 p-3 text-xs text-green-900 dark:bg-green-900 dark:text-green-100">
{`// Mark the start of an operation
performance.mark("operation-start");

// ... do some work ...

// Mark the end
performance.mark("operation-end");

// Measure the duration
performance.measure(
  "My Custom Operation",
  "operation-start",
  "operation-end"
);`}
          </pre>
          <p className="mt-3 text-sm text-green-800 dark:text-green-200">
            These measurements appear in React DevTools Profiler timeline, helping you identify performance bottlenecks!
          </p>
        </div>

        <div className="mt-6 rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
          <h2 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-100">
            ⚠️ If Timeline Data is Missing
          </h2>
          <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
            <p><strong>For React DevTools Profiler:</strong></p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Open Profiler tab settings (⚙️ icon)</li>
              <li>Enable &quot;Record why each component rendered while profiling&quot;</li>
              <li>Try recording again</li>
            </ol>
            <p className="mt-3"><strong>Alternative - Use Browser Performance Tab:</strong></p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>F12 → Performance tab (not React DevTools)</li>
              <li>Click record (circle button)</li>
              <li>Interact with components</li>
              <li>Stop recording</li>
              <li>Scroll to &quot;User Timing&quot; or &quot;Timings&quot; section</li>
              <li>You&apos;ll see all your performance marks and measures there!</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            🔗 Learn More
          </h2>
          <a
            href="https://react.dev/reference/dev-tools/react-performance-tracks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-700 underline hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
          >
            React DevTools Performance Tracks Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
