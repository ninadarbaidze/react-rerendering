"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

// Create two separate contexts
const CountContext = createContext<{
  count: number;
  increment: () => void;
} | null>(null);

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
} | null>(null);

function useCount() {
  const context = useContext(CountContext);
  if (!context) throw new Error("useCount must be used within CountProvider");
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <CountContext.Provider value={{ count, increment }}>
      {children}
    </CountContext.Provider>
  );
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ProviderComponent() {
  return (
    <div className="rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Provider Component
        </h3>
        <RenderCounter name="Provider" />
      </div>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        This component wraps the contexts but doesn&apos;t consume them
      </p>

      <div className="space-y-4 border-l-4 border-purple-300 pl-4">
        <CountConsumer />
        <ThemeConsumer />
        <BothConsumer />
        <NoConsumer />
      </div>
    </div>
  );
}

function CountConsumer() {
  const { count, increment } = useCount();

  return (
    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
          Count Consumer
        </h4>
        <RenderCounter name="CountConsumer" />
      </div>
      <p className="mb-2 text-sm text-blue-800 dark:text-blue-200">
        Count: {count}
      </p>
      <button
        onClick={increment}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
}

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-purple-900 dark:text-purple-100">
          Theme Consumer
        </h4>
        <RenderCounter name="ThemeConsumer" />
      </div>
      <p className="mb-2 text-sm text-purple-800 dark:text-purple-200">
        Current theme: {theme}
      </p>
      <button
        onClick={toggleTheme}
        className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
      >
        Toggle Theme
      </button>
    </div>
  );
}

function BothConsumer() {
  const { count } = useCount();
  const { theme } = useTheme();

  return (
    <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-orange-900 dark:text-orange-100">
          Both Consumer
        </h4>
        <RenderCounter name="BothConsumer" />
      </div>
      <p className="text-xs text-orange-800 dark:text-orange-200">
        Count: {count} | Theme: {theme}
      </p>
      <p className="mt-2 text-xs italic text-orange-700 dark:text-orange-300">
        I rerender when EITHER context changes
      </p>
    </div>
  );
}

function NoConsumer() {
  return (
    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold text-green-900 dark:text-green-100">
          No Consumer
        </h4>
        <RenderCounter name="NoConsumer" />
      </div>
      <p className="text-xs text-green-800 dark:text-green-200">
        I don&apos;t use any context
      </p>
      <p className="mt-2 text-xs italic text-green-700 dark:text-green-300">
        But I still rerender when parent rerenders!
      </p>
    </div>
  );
}

function DemoApp() {
  return (
    <CountProvider>
      <ThemeProvider>
        <ProviderComponent />
      </ThemeProvider>
    </CountProvider>
  );
}

export default function ContextPage() {
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
          3. Context Changes & Rerendering
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            📚 Key Concepts
          </h2>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li>
              • Only components that consume context (via useContext) rerender when context
              changes
            </li>
            <li>• Provider components themselves don&apos;t rerender on context changes</li>
            <li>• Consuming multiple contexts means rerendering on any change</li>
            <li>
              • Non-consumer children still rerender if their parent rerenders for other
              reasons
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <DemoApp />
        </div>

        <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
          <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
            🧪 Experiments
          </h2>
          <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              1. Click &quot;Increment&quot; → Only CountConsumer and BothConsumer rerender
            </li>
            <li>
              2. Click &quot;Toggle Theme&quot; → Only ThemeConsumer and BothConsumer
              rerender
            </li>
            <li>
              3. Notice the Provider component never rerenders (it&apos;s just a wrapper)
            </li>
            <li>
              4. NoConsumer doesn&apos;t use context, so it doesn&apos;t rerender from context
              changes
            </li>
            <li>
              5. BothConsumer is the most &quot;expensive&quot; - it rerenders for both
              contexts
            </li>
          </ol>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            💡 Performance Tip
          </h2>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Split contexts by concern! If you have frequently-changing and rarely-changing
            data in one context, consider splitting them to reduce unnecessary rerenders.
          </p>
        </div>
      </div>
    </div>
  );
}
