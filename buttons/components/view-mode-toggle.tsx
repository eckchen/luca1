"use client"

import { Type, Sparkles } from "lucide-react"

interface ViewModeToggleProps {
  viewMode: "text" | "icon"
  onViewModeChange: (mode: "text" | "icon") => void
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Button view mode"
      className="relative inline-flex gap-1 p-1 rounded-full"
      style={{
        background: "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Sliding active indicator — pure CSS transform, GPU-composited */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full"
        style={{
          background: "linear-gradient(135deg, #b0b0b0 0%, #6e6e6e 50%, #4a4a4a 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
          transform: viewMode === "icon" ? "translateX(calc(100% + 4px))" : "translateX(0)",
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Text mode button */}
      <button
        role="radio"
        aria-checked={viewMode === "text"}
        aria-label="Text mode"
        onClick={() => onViewModeChange("text")}
        className="relative z-10 flex items-center justify-center w-20 h-10 rounded-full cursor-pointer select-none
                   transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900"
        style={{ color: viewMode === "text" ? "#1c1c1c" : "#6b6b6b" }}
      >
        <Type size={17} strokeWidth={2} />
      </button>

      {/* Icon mode button */}
      <button
        role="radio"
        aria-checked={viewMode === "icon"}
        aria-label="Icon mode"
        onClick={() => onViewModeChange("icon")}
        className="relative z-10 flex items-center justify-center w-20 h-10 rounded-full cursor-pointer select-none
                   transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900"
        style={{ color: viewMode === "icon" ? "#1c1c1c" : "#6b6b6b" }}
      >
        <Sparkles size={17} strokeWidth={2} />
      </button>
    </div>
  )
}
