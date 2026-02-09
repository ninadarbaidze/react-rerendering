import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-white">
          React Workshop: Rerendering, Hooks & Keys
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          Interactive demos exploring React&apos;s rerendering behavior, modern hooks, and key reconciliation.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            Module 1: React Rerendering Fundamentals
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/rerendering/basics"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                1. Basic Rerendering
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                See how state updates trigger component rerenders
              </p>
            </Link>

            <Link
              href="/rerendering/props"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                2. Props Changes
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Understand parent-to-child rerender propagation
              </p>
            </Link>

            <Link
              href="/rerendering/context"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                3. Context Changes
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Learn how Context updates affect consumers
              </p>
            </Link>

            <Link
              href="/rerendering/pitfalls"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                4. Common Pitfalls
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Identify unnecessary rerenders and performance issues
              </p>
            </Link>

            <Link
              href="/rerendering/optimized"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                5. Optimization Techniques
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Master React.memo, useMemo, and useCallback
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            Module 2: Keys & Reconciliation
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/keys/bad-keys"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                1. Keys Anti-Patterns
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Learn what NOT to do with React keys
              </p>
            </Link>

            
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            Module 3: React Hook Form Performance
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/forms/watch-vs-usewatch"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                1. watch() vs useWatch()
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Understand how form watching affects rerenders
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            Module 4: Debugging & Performance
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/debugging/profiler"
              className="rounded-lg border border-zinc-300 bg-white p-6 transition-all hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                React DevTools Profiler
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Custom performance tracks and timing annotations
              </p>
            </Link>
          </div>
        </section>

      
      </main>
    </div>
  );
}
