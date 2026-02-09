"use client";

import { useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

// Solution 1: React.memo - Prevents rerender if props haven't changed
const MemoizedExpensiveChild = memo(function ExpensiveChild({
  style,
}: {
  style: React.CSSProperties;
}) {
  const start = Date.now();
  while (Date.now() - start < 50) {} // Simulate expensive operation

  return (
    <div className="rounded bg-green-200 p-2 dark:bg-green-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-green-900 dark:text-green-100">
          Memoized Expensive Child
        </span>
        <RenderCounter name="MemoChild" />
      </div>
      <p className="text-xs text-green-800 dark:text-green-200">
        I only rerender when style actually changes!
      </p>
    </div>
  );
});

function ReactMemoDemo() {
  const [count, setCount] = useState(0);

  // ✅ GOOD: Object created once and reused
  const stableStyle = useMemo(() => ({ color: "blue", fontSize: "16px" }), []);

  return (
    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-green-900 dark:text-green-100">
          ✅ Solution 1: React.memo + useMemo
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
      >
        Increment Count ({count})
      </button>

      <MemoizedExpensiveChild style={stableStyle} />

      <div className="mt-3 rounded bg-green-100 p-2 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
        <strong>Fix:</strong> React.memo wraps the child, and useMemo stabilizes the style
        object. Child only rerenders if style reference changes!
      </div>
    </div>
  );
}

// Solution 2: useCallback - Memoize function references
const MemoizedListItem = memo(function ListItem({
  item,
  onRemove,
}: {
  item: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded bg-blue-200 p-2 dark:bg-blue-800">
      <span className="text-sm text-blue-900 dark:text-blue-100">{item}</span>
      <div className="flex items-center gap-2">
        <RenderCounter name={`Item-${item}`} />
        <button
          onClick={onRemove}
          className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

function UseCallbackDemo() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [count, setCount] = useState(0);

  // ✅ GOOD: Function is memoized and only recreated when items change
  const handleRemove = useCallback(
    (item: string) => {
      setItems((current) => current.filter((i) => i !== item));
    },
    []
  );

  return (
    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          ✅ Solution 2: React.memo + useCallback
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
      >
        Increment Count ({count})
      </button>

      <div className="space-y-2">
        {items.map((item) => (
          <MemoizedListItem key={item} item={item} onRemove={() => handleRemove(item)} />
        ))}
      </div>

      <div className="mt-3 rounded bg-blue-100 p-2 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <strong>Fix:</strong> useCallback memoizes the function. With React.memo, children
        don&apos;t rerender when incrementing the counter!
      </div>
    </div>
  );
}

// Solution 3: Split State
function UserSection() {
  const [user, setUser] = useState({ name: "Alice", age: 30, email: "alice@example.com" });

  return (
    <div className="rounded bg-purple-100 p-3 dark:bg-purple-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
          User Section
        </h4>
        <RenderCounter name="UserSection" />
      </div>
      <button
        onClick={() => setUser({ ...user, age: user.age + 1 })}
        className="mb-2 rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
      >
        Birthday
      </button>
      <UserDisplay user={user} />
    </div>
  );
}

function SettingsSection() {
  const [settings, setSettings] = useState({ theme: "light", notifications: true });

  return (
    <div className="rounded bg-purple-100 p-3 dark:bg-purple-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
          Settings Section
        </h4>
        <RenderCounter name="SettingsSection" />
      </div>
      <button
        onClick={() =>
          setSettings({ ...settings, notifications: !settings.notifications })
        }
        className="mb-2 rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
      >
        Toggle Notifications
      </button>
      <SettingsDisplay settings={settings} />
    </div>
  );
}

function CounterSection() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded bg-purple-100 p-3 dark:bg-purple-900">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
          Counter Section
        </h4>
        <RenderCounter name="CounterSection" />
      </div>
      <button
        onClick={() => setCount(count + 1)}
        className="mb-2 rounded bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
      >
        Increment ({count})
      </button>
      <CounterDisplay count={count} />
    </div>
  );
}

function SplitStateDemo() {
  return (
    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100">
          ✅ Solution 3: Split State into Components
        </h3>
        <RenderCounter name="Container" />
      </div>

      <div className="space-y-2">
        <UserSection />
        <SettingsSection />
        <CounterSection />
      </div>

      <div className="mt-3 rounded bg-purple-100 p-2 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <strong>Fix:</strong> Each section manages its own state. Now only the relevant
        section rerenders when its data changes!
      </div>
    </div>
  );
}

const UserDisplay = memo(function UserDisplay({
  user,
}: {
  user: { name: string; age: number; email: string };
}) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-900 dark:text-purple-100">
          {user.name}, {user.age}
        </span>
        <RenderCounter name="UserDisplay" />
      </div>
    </div>
  );
});

const SettingsDisplay = memo(function SettingsDisplay({
  settings,
}: {
  settings: { theme: string; notifications: boolean };
}) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-900 dark:text-purple-100">
          Notifications: {settings.notifications ? "On" : "Off"}
        </span>
        <RenderCounter name="SettingsDisplay" />
      </div>
    </div>
  );
});

const CounterDisplay = memo(function CounterDisplay({ count }: { count: number }) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-900 dark:text-purple-100">Count: {count}</span>
        <RenderCounter name="CounterDisplay" />
      </div>
    </div>
  );
});

// Solution 4: Define components outside
const ProperInnerComponent = memo(function InnerComponent() {
  return (
    <div className="rounded bg-orange-200 p-2 dark:bg-orange-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-orange-900 dark:text-orange-100">
          Proper Inner Component
        </span>
        <RenderCounter name="Inner" />
      </div>
      <p className="text-xs text-orange-800 dark:text-orange-200">
        I&apos;m defined outside, so my identity stays stable!
      </p>
    </div>
  );
});

function ComponentLocationDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-orange-900 dark:text-orange-100">
          ✅ Solution 4: Define Components Outside + memo
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-orange-600 px-4 py-2 text-sm text-white transition hover:bg-orange-700"
      >
        Increment Count ({count})
      </button>

      <ProperInnerComponent />

      <div className="mt-3 rounded bg-orange-100 p-2 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200">
        <strong>Fix:</strong> Component defined outside + React.memo = stable identity and
        no unnecessary rerenders!
      </div>
    </div>
  );
}

export default function OptimizedPage() {
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
          5. Optimization Techniques
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            🔧 Optimization Tools
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>
              • <strong>React.memo:</strong> Skip rerendering if props haven&apos;t changed
            </li>
            <li>
              • <strong>useMemo:</strong> Memoize expensive computations and object
              references
            </li>
            <li>
              • <strong>useCallback:</strong> Memoize function references
            </li>
            <li>
              • <strong>Component Splitting:</strong> Isolate state to minimize rerender
              scope
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <ReactMemoDemo />
          <UseCallbackDemo />
          <SplitStateDemo />
          <ComponentLocationDemo />
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            ⚖️ When to Optimize
          </h2>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p>
              <strong>DO optimize when:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Component renders are measurably slow (use Profiler!)</li>
              <li>Lists with many items rerender frequently</li>
              <li>Complex computations run on every render</li>
            </ul>
            <p className="mt-3">
              <strong>DON&apos;T optimize prematurely when:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Components are simple and fast</li>
              <li>You can&apos;t measure a performance problem</li>
              <li>It makes code harder to understand</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <h2 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            🎯 Key Takeaways
          </h2>
          <ol className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>1. Measure before optimizing - use React DevTools Profiler</li>
            <li>2. React.memo is most useful for expensive or frequently rendered components</li>
            <li>3. useMemo/useCallback must be paired with React.memo to be effective</li>
            <li>4. Component architecture matters - split state to isolate rerenders</li>
            <li>5. Don&apos;t optimize everything - it adds complexity!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
