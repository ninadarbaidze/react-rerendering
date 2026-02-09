"use client";

import { useState } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

function GrandParent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Alice");

  return (
    <div className="rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          GrandParent Component
        </h3>
        <RenderCounter name="GrandParent" />
      </div>

      <div className="mb-4 space-y-3">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
          <p className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">
            Count: {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
          >
            Update Count
          </button>
        </div>

        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
          <p className="mb-2 text-sm font-medium text-green-900 dark:text-green-100">
            Name: {name}
          </p>
          <button
            onClick={() => setName(name === "Alice" ? "Bob" : "Alice")}
            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
          >
            Toggle Name
          </button>
        </div>
      </div>

      <div className="space-y-4 border-l-4 border-blue-300 pl-4">
        <Parent count={count} name={name} />
      </div>
    </div>
  );
}

function Parent({ count, name }: { count: number; name: string }) {
  return (
    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
          Parent Component
        </h4>
        <RenderCounter name="Parent" />
      </div>

      <p className="mb-3 text-sm text-purple-800 dark:text-purple-200">
        Receives: count={count}, name=&quot;{name}&quot;
      </p>

      <div className="space-y-3 border-l-4 border-orange-300 pl-4">
        <ChildWithCount count={count} />
        <ChildWithName name={name} />
        <ChildWithNoProps />
      </div>
    </div>
  );
}

function ChildWithCount({ count }: { count: number }) {
  return (
    <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
          Child 1 (receives count)
        </h5>
        <RenderCounter name="Child 1" />
      </div>
      <p className="text-xs text-orange-800 dark:text-orange-200">
        Count: {count}
      </p>
    </div>
  );
}

function ChildWithName({ name }: { name: string }) {
  return (
    <div className="rounded-lg bg-pink-50 p-3 dark:bg-pink-950">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-sm font-semibold text-pink-900 dark:text-pink-100">
          Child 2 (receives name)
        </h5>
        <RenderCounter name="Child 2" />
      </div>
      <p className="text-xs text-pink-800 dark:text-pink-200">Name: {name}</p>
    </div>
  );
}

function ChildWithNoProps() {
  return (
    <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-950">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">
          Child 3 (no props)
        </h5>
        <RenderCounter name="Child 3" />
      </div>
      <p className="text-xs text-cyan-800 dark:text-cyan-200">
        I receive nothing but still rerender!
      </p>
    </div>
  );
}

export default function PropsPage() {
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
          2. Props Changes & Rerender Propagation
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            📚 Key Concepts
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>• Props changes trigger rerenders of the receiving component</li>
            <li>• Rerenders cascade down the component tree</li>
            <li>• Even children that don&apos;t receive specific props will rerender</li>
            <li>• All descendants rerender when any ancestor rerenders</li>
          </ul>
        </div>

        <div className="mb-6">
          <GrandParent />
        </div>

        <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
            🧪 Observations
          </h2>
          <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              1. Click &quot;Update Count&quot; → Only GrandParent, Parent, and Child 1 
              &quot;need&quot; to rerender, but ALL children rerender
            </li>
            <li>
              2. Click &quot;Toggle Name&quot; → Same story, everyone rerenders even though 
              only Child 2 uses the name
            </li>
            <li>
              3. Child 3 has no props at all, yet it rerenders every time because its 
              parent does
            </li>
            <li>
              4. This is React&apos;s default behavior - optimization comes later!
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
