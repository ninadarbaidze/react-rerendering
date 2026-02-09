"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Parent Component
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
          <p className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">
            Count: {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Increment Count
          </button>
        </div>

       
      </div>

      <div className="mt-6 space-y-4">
        <ChildComponent1 count={count} />
        <ChildComponent2 />
        <ChildComponent3 />
        <ChildComponent4 count={count} />
      </div>
    </div>
  );
}

function ChildComponent1({ count }: { count: number }) {
  const [childCount, setChildCount] = useState(0);

  return (
    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
          Child 1 (receives count prop)
        </h4>
        <RenderCounter name="Child 1" />
      </div>
      <p className="text-sm text-blue-800 dark:text-blue-200">
        Count from parent: {count}
      </p>
      <div className="mt-3 rounded bg-blue-100 p-3 dark:bg-blue-900">
        <p className="mb-2 text-xs text-blue-900 dark:text-blue-100">
          Child&apos;s own state: {childCount}
        </p>
        <button
          onClick={() => setChildCount(childCount + 1)}
          className="rounded-md bg-blue-700 px-3 py-1 text-xs text-white transition hover:bg-blue-800"
        >
          Increment Child State
        </button>
        <p className="mt-2 text-xs italic text-blue-700 dark:text-blue-300">
          ↑ Only Child 1 rerenders, not Parent or Child 2!
        </p>
      </div>
    </div>
  );
}

function ChildComponent2() {
  return (
    <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-orange-900 dark:text-orange-100">
          Child 2 (no props)
        </h4>
        <RenderCounter name="Child 2" />
      </div>
      <p className="text-sm text-orange-800 dark:text-orange-200">
        I don&apos;t receive any props, but I still rerender when parent rerenders!
      </p>
    </div>
  );
}

const ChildComponent3 = memo(function ChildComponent3() {
  return (
    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-green-900 dark:text-green-100">
          Child 3 (wrapped with React.memo)
        </h4>
        <RenderCounter name="Child 3" />
      </div>
      <p className="text-sm text-green-800 dark:text-green-200">
        I&apos;m wrapped with React.memo, so I don&apos;t rerender when parent rerenders!
      </p>
      <p className="mt-2 text-xs italic text-green-700 dark:text-green-300">
        ✨ My render counter stays at 1 even when parent updates!
      </p>
    </div>
  );
});

const ChildComponent4 = memo(function ChildComponent4({ count }: { count: number }) {
  return (
    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
          Child 4 (React.memo + receives count prop)
        </h4>
        <RenderCounter name="Child 4" />
      </div>
      <p className="text-sm text-purple-800 dark:text-purple-200">
        Count from parent: {count}
      </p>
      <p className="mt-2 text-xs italic text-purple-700 dark:text-purple-300">
        🔄 I&apos;m wrapped with memo, but I STILL rerender because my prop (count) changes!
      </p>
    </div>
  );
});

export default function BasicsPage() {
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
          1. Basic Rerendering
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            📚 Key Concepts
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>• When a component&apos;s state changes, it rerenders</li>
            <li>• When a parent rerenders, ALL its children rerender by default</li>
            <li>• Child state changes only rerender that child, not the parent or siblings</li>
            <li>• React.memo prevents rerenders ONLY if props haven&apos;t changed</li>
            <li>• memo components still rerender when their props actually change</li>
            <li>• Watch the render counters increase with each state update</li>
          </ul>
        </div>

        <div className="mb-6">
          <ParentComponent />
        </div>

        <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
            🧪 Try This
          </h2>
          <ol className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>1. Click &quot;Increment Count&quot; - Child 1, 2, & 4 rerender, but Child 3 doesn&apos;t!</li>
            <li>2. Child 3 (memo, no props) stays at 1 render - never rerenders</li>
            <li>3. Child 4 (memo, with count prop) rerenders because count prop changes</li>
            <li>4. memo only prevents rerenders when props are unchanged</li>
            <li>5. Click &quot;Increment Child State&quot; - only Child 1 rerenders</li>
            <li>6. Open React DevTools Profiler to see the rerender tree</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
