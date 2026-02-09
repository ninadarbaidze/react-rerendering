"use client";

import { useRef } from "react";

export function RenderCounter({ name }: { name: string }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
      {name}: {renderCount.current} render{renderCount.current !== 1 ? "s" : ""}
    </span>
  );
}
