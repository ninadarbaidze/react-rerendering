"use client";

import { useState } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

// Demo 1: Index as Key - Reordering Problem
function IndexKeyProblem() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", color: "red" },
    { id: 2, name: "Banana", color: "yellow" },
    { id: 3, name: "Cherry", color: "red" },
  ]);

  const shuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  return (
    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-red-900 dark:text-red-100">
          ❌ Problem 1: Using Index as Key
        </h3>
      </div>

      <div className="mb-3 flex gap-2">
        <button
          onClick={shuffle}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
        >
          Shuffle Items
        </button>
        <button
          onClick={removeFirst}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
        >
          Remove First
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <ItemWithInput key={index} item={item} label={`Item ${index}`} />
        ))}
      </div>

      <div className="mt-3 rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
        <strong>Problem:</strong> Input values stay in the same position even though data
        shuffles! React reuses DOM nodes based on index position, not actual data.
      </div>
    </div>
  );
}

function ItemWithInput({ item, label }: { item: { id: number; name: string; color: string }; label: string }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center gap-3 rounded bg-white p-2 dark:bg-zinc-800">
      <span className="w-20 text-sm font-medium text-zinc-900 dark:text-white">{label}:</span>
      <span className="w-24 text-sm text-zinc-700 dark:text-zinc-300">{item.name}</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
        className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
      />
      <RenderCounter name={`Item-${item.id}`} />
    </div>
  );
}

// Demo 2: Math.random() as Key
function RandomKeyProblem() {
  const [count, setCount] = useState(0);
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-orange-900 dark:text-orange-100">
          ❌ Problem 2: Using Math.random() as Key
        </h3>
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="mb-3 rounded-md bg-orange-600 px-4 py-2 text-sm text-white transition hover:bg-orange-700"
      >
        Force Rerender (Count: {count})
      </button>

      <div className="space-y-2">
        {items.map((item) => (
          <RandomKeyItem key={Math.random()} item={item} />
        ))}
      </div>

      <div className="mt-3 rounded bg-orange-100 p-2 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200">
        <strong>Problem:</strong> Every rerender creates new keys, causing React to destroy
        and recreate components! Input values are lost, animations restart, render counters
        keep increasing.
      </div>
    </div>
  );
}

function RandomKeyItem({ item }: { item: string }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center gap-3 rounded bg-white p-2 dark:bg-zinc-800">
      <span className="w-32 text-sm font-medium text-zinc-900 dark:text-white">{item}</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
        className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
      />
      <RenderCounter name={item} />
    </div>
  );
}

// Demo 3: Non-unique Keys
function NonUniqueKeyProblem() {
  const items = [
    { id: 1, category: "fruit", name: "Apple" },
    { id: 2, category: "fruit", name: "Banana" },
    { id: 3, category: "vegetable", name: "Carrot" },
    { id: 4, category: "fruit", name: "Cherry" },
  ];

  return (
    <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100">
          ❌ Problem 3: Non-unique Keys
        </h3>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          // ❌ BAD: Using category as key - not unique!
          <NonUniqueKeyItem key={item.category} item={item} />
        ))}
      </div>

      <div className="mt-3 rounded bg-purple-100 p-2 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <strong>Problem:</strong> Multiple items share the same key (&quot;fruit&quot;).
        React can&apos;t distinguish between them, leading to incorrect updates and console
        warnings!
      </div>
    </div>
  );
}

function NonUniqueKeyItem({ item }: { item: { id: number; category: string; name: string } }) {
  return (
    <div className="flex items-center gap-3 rounded bg-white p-2 dark:bg-zinc-800">
      <span className="w-32 text-sm text-zinc-700 dark:text-zinc-300">
        [{item.category}]
      </span>
      <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-white">
        {item.name}
      </span>
      <RenderCounter name={`${item.category}-${item.id}`} />
    </div>
  );
}

// Demo 4: Missing Keys in Lists
function MissingKeyProblem() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([newItem, ...items]);
  };

  return (
    <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
          ❌ Problem 4: Missing Keys
        </h3>
      </div>

      <button
        onClick={addItem}
        className="mb-3 rounded-md bg-yellow-600 px-4 py-2 text-sm text-white transition hover:bg-yellow-700"
      >
        Add Item to Top
      </button>

      <div className="space-y-2">
        {items.map((item) => (
          // ❌ BAD: No key prop at all!
          <MissingKeyItem item={item} />
        ))}
      </div>

      <div className="mt-3 rounded bg-yellow-100 p-2 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <strong>Problem:</strong> No keys provided! React uses index by default and shows
        console warnings. Performance suffers and updates may be incorrect.
      </div>
    </div>
  );
}

function MissingKeyItem({ item }: { item: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded bg-white p-2 dark:bg-zinc-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="h-4 w-4"
      />
      <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-white">{item}</span>
      <RenderCounter name={item} />
    </div>
  );
}

export default function BadKeysPage() {
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
          Keys Anti-Patterns: What NOT to Do
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            ⚠️ Common Key Mistakes
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>❌ Using array index as key (breaks on reordering)</li>
            <li>❌ Using Math.random() as key (remounts every render)</li>
            <li>❌ Non-unique keys (React can&apos;t tell items apart)</li>
            <li>❌ No keys at all (defaults to index, shows warnings)</li>
          </ul>
        </div>

        <div className="space-y-6">
          <IndexKeyProblem />
          <RandomKeyProblem />
          <NonUniqueKeyProblem />
          <MissingKeyProblem />
        </div>

        <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <h2 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            ✅ The Right Way
          </h2>
          <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
            <p>
              <strong>Use stable, unique identifiers:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Database IDs (best for fetched data)</li>
              <li>UUIDs or nanoid for client-generated data</li>
              <li>Stable composite keys: {"`${item.userId}-${item.timestamp}`"}</li>
            </ul>
            <pre className="mt-3 overflow-x-auto rounded bg-green-100 p-3 text-xs text-green-900 dark:bg-green-900 dark:text-green-100">
{`// ✅ GOOD: Use stable unique IDs
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// ✅ GOOD: Generate IDs when creating items
const addItem = () => {
  const newItem = { 
    id: crypto.randomUUID(),
    name: "New Item" 
  };
  setItems([...items, newItem]);
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
