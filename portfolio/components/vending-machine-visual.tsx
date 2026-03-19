"use client"

export function VendingMachineVisual() {
  const CODES = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["D1", "D2", "D3"],
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
      <svg
        viewBox="0 0 100 120"
        className="w-24 h-[130px] sm:w-32 sm:h-[165px] opacity-45 dark:opacity-40"
        aria-hidden
      >
        {/* Schatten / Tiefe */}
        <rect
          x="14"
          y="28"
          width="72"
          height="86"
          rx="6"
          fill="black"
          opacity="0.08"
        />
        {/* Gehäuse */}
        <rect
          x="8"
          y="20"
          width="84"
          height="94"
          rx="6"
          fill="currentColor"
          className="text-foreground/30 dark:text-foreground/24"
        />
        {/* Gehäuse-Border – weiß leuchtend */}
        <rect
          x="8"
          y="20"
          width="84"
          height="94"
          rx="6"
          fill="none"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="0.85"
        />
        {/* statischer Lichtfleck statt Dauer-Animation */}
        <ellipse cx="50" cy="24" rx="10" ry="2" fill="rgba(255,255,255,0.2)" />
        {/* Münzeinwurf */}
        <rect
          x="36"
          y="6"
          width="28"
          height="10"
          rx="3"
          fill="currentColor"
          className="text-foreground/45 dark:text-foreground/38"
        />
        <rect
          x="40"
          y="9.5"
          width="20"
          height="3"
          rx="1"
          fill="currentColor"
          className="text-foreground/20 dark:text-foreground/16"
        />
        {/* Glasfront – Hintergrund */}
        <rect
          x="14"
          y="34"
          width="48"
          height="54"
          rx="3"
          fill="currentColor"
          className="text-sky-500/12 dark:text-sky-400/10"
        />
        {/* Glasfront – Rahmen – weiß leuchtend */}
        <rect
          x="14"
          y="34"
          width="48"
          height="54"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
        {/* Glasreflexion (oben links) */}
        <path
          d="M 16 36 L 26 36 L 26 39 L 16 39 Z"
          fill="currentColor"
          className="text-white"
          style={{ opacity: 0.12 }}
        />
        {/* Produktfächer */}
        {CODES.map((codes, row) =>
          codes.map((code, col) => {
            const x = 18 + col * 16
            const y = 38 + row * 13
            return (
              <g key={code}>
                <rect
                  x={x}
                  y={y}
                  width="12"
                  height="10"
                  rx="1.5"
                  fill="currentColor"
                  className="text-sky-600/40 dark:text-sky-500/32"
                />
                <rect
                  x={x}
                  y={y}
                  width="12"
                  height="10"
                  rx="1.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.32)"
                  strokeWidth="0.5"
                />
                <text
                  x={x + 6}
                  y={y + 7.5}
                  fontSize="3.5"
                  fill="currentColor"
                  className="text-foreground/65 dark:text-foreground/55"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="500"
                >
                  {code}
                </text>
              </g>
            )
          })
        )}
        {/* Display */}
        <rect
          x="66"
          y="36"
          width="22"
          height="14"
          rx="2"
          fill="currentColor"
          className="text-sky-800/55 dark:text-sky-700/45"
        />
        <rect
          x="67.5"
          y="37.5"
          width="19"
          height="11"
          rx="1"
          fill="currentColor"
          className="text-sky-500/35 dark:text-sky-400/28"
        />
        <text
          x="77"
          y="45"
          fontSize="5"
          fill="currentColor"
          className="text-sky-700 dark:text-sky-600"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="ui-monospace, monospace"
        >
          2.50
        </text>
        {/* Tastatur mit Ziffern – ohne Glow */}
        <g filter="none" style={{ isolation: "isolate" }}>
          {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((nums, row) =>
            nums.map((num, col) => (
              <g key={num}>
                <rect
                  x={68 + col * 7}
                  y={54 + row * 8}
                  width="5.5"
                  height="6"
                  rx="1.2"
                  fill="currentColor"
                  className="text-foreground/42 dark:text-foreground/36"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="0.35"
                />
                <text
                  x={70.75 + col * 7}
                  y={57 + row * 8}
                  fontSize="3.5"
                  fill="currentColor"
                  className="text-foreground"
                  style={{ textShadow: "none", filter: "none" }}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  {num}
                </text>
              </g>
            ))
          )}
        </g>
        {/* Ausgabefach */}
        <rect
          x="14"
          y="96"
          width="72"
          height="14"
          rx="4"
          fill="currentColor"
          className="text-foreground/40 dark:text-foreground/32"
        />
        <rect
          x="17"
          y="99"
          width="66"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-foreground/18 dark:text-foreground/14"
        />
      </svg>
    </div>
  )
}
