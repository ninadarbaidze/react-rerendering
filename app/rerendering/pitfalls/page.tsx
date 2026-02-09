"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

// Pitfall 1: Inline Object Creation
function InlineObjectPitfall() {
  const [count, setCount] = useState(0);

  // ❌ BAD: Creates new object on every render
  const inlineStyle = { color: "blue", fontSize: "16px" };

  return (
    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-red-900 dark:text-red-100">
          ❌ Pitfall 1: Inline Object Creation
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
      >
        Increment Count ({count})
      </button>

      <ExpensiveChild style={inlineStyle} />

      <div className="mt-3 rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
        <strong>Problem:</strong> The style object is recreated every render, causing child
        to see it as a &quot;new&quot; prop even though the values haven&apos;t changed!
      </div>
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({ style }: { style: React.CSSProperties }) {
  // Simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 50) {} // Block for 50ms

  return (
    <div className="rounded bg-red-200 p-2 dark:bg-red-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-red-900 dark:text-red-100">Expensive Child (with memo)</span>
        <RenderCounter name="Child" />
      </div>
      <p className="text-xs text-red-800 dark:text-red-200">
        This child takes 50ms to render!
      </p>
    </div>
  );
});

// Pitfall 2: Inline Function Creation
function InlineFunctionPitfall() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-orange-900 dark:text-orange-100">
          ❌ Pitfall 2: Inline Function Creation
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-orange-600 px-4 py-2 text-sm text-white transition hover:bg-orange-700"
      >
        Increment Count ({count})
      </button>

      <div className="space-y-2">
        {items.map((item) => (
          <ListItem
            key={item}
            item={item}
            // ❌ BAD: Creates new function on every render
            onRemove={() => setItems(items.filter((i) => i !== item))}
          />
        ))}
      </div>

      <div className="mt-3 rounded bg-orange-100 p-2 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200">
        <strong>Problem:</strong> Arrow function is recreated every render, causing all
        children to rerender even when just incrementing the unrelated counter!
      </div>
    </div>
  );
}

const ListItem = memo(function ListItem({ item, onRemove }: { item: string; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between rounded bg-orange-200 p-2 dark:bg-orange-800">
      <span className="text-sm text-orange-900 dark:text-orange-100">{item} (with memo)</span>
      <div className="flex items-center gap-2">
        <RenderCounter name={`Item-${item}`} />
        <button
          onClick={onRemove}
          className="rounded bg-orange-600 px-2 py-1 text-xs text-white hover:bg-orange-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

// Pitfall 3: Large Context Values
function LargeContextPitfall() {
  const [user, setUser] = useState({ name: "Alice", age: 30, email: "alice@example.com" });
  const [settings, setSettings] = useState({ theme: "light", notifications: true });
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100">
          ❌ Pitfall 3: Monolithic State
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setUser({ ...user, age: user.age + 1 })}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700"
        >
          Birthday
        </button>
        <button
          onClick={() =>
            setSettings({ ...settings, notifications: !settings.notifications })
          }
          className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700"
        >
          Toggle Notifications
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700"
        >
          Counter ({count})
        </button>
      </div>

      <div className="space-y-2">
        <UserDisplay user={user} />
        <SettingsDisplay settings={settings} />
        <CounterDisplay count={count} />
      </div>

      <div className="mt-3 rounded bg-purple-100 p-2 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <strong>Problem:</strong> All state in one component means changing ANY value
        rerenders ALL children, even those that don&apos;t care about the changed value.
      </div>
    </div>
  );
}

function UserDisplay({ user }: { user: { name: string; age: number; email: string } }) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-purple-900 dark:text-purple-100">
          User: {user.name}, {user.age}
        </span>
        <RenderCounter name="UserDisplay" />
      </div>
    </div>
  );
}

function SettingsDisplay({ settings }: { settings: { theme: string; notifications: boolean } }) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-purple-900 dark:text-purple-100">
          Notifications: {settings.notifications ? "On" : "Off"}
        </span>
        <RenderCounter name="SettingsDisplay" />
      </div>
    </div>
  );
}

function CounterDisplay({ count }: { count: number }) {
  return (
    <div className="rounded bg-purple-200 p-2 dark:bg-purple-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-purple-900 dark:text-purple-100">Count: {count}</span>
        <RenderCounter name="CounterDisplay" />
      </div>
    </div>
  );
}

// Pitfall 4: Component in Render
function ComponentInRenderPitfall() {
  const [count, setCount] = useState(0);

  // ❌ BAD: Component defined inside render
  function InnerComponent() {
    return (
      <div className="rounded bg-cyan-200 p-2 dark:bg-cyan-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-cyan-900 dark:text-cyan-100">Inner Component</span>
          <RenderCounter name="Inner" />
        </div>
        <p className="text-xs text-cyan-800 dark:text-cyan-200">
          I&apos;m a new component on every render!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 border-cyan-300 bg-cyan-50 p-4 dark:border-cyan-700 dark:bg-cyan-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">
          ❌ Pitfall 4: Component in Render
        </h3>
        <RenderCounter name="Parent" />
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-700"
      >
        Increment Count ({count})
      </button>

      <InnerComponent />

      <div className="mt-3 rounded bg-cyan-100 p-2 text-xs text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
        <strong>Problem:</strong> InnerComponent is redefined on every render, so React
        treats it as a completely new component, losing state and remounting!
      </div>
    </div>
  );
}

export default function PitfallsPage() {
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
          4. Common Rerendering Pitfalls
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            ⚠️ Watch Out For These
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>• Creating new objects/arrays inline as props</li>
            <li>• Defining arrow functions inline in JSX</li>
            <li>• Keeping all state in one place unnecessarily</li>
            <li>• Defining components inside other components</li>
          </ul>
        </div>

        <div className="space-y-6">
          <InlineObjectPitfall />
          <InlineFunctionPitfall />
          <LargeContextPitfall />
          <ComponentInRenderPitfall />
        </div>

       
      </div>
    </div>
  );
}
