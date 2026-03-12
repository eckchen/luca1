"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { LiquidMetalButton } from "@/components/liquid-metal-button"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import {
  ArrowRight,
  Download,
  Mail,
  Plus,
  Trash2,
  ChevronDown,
  Sparkles,
  Send,
} from "lucide-react"

/* ── small helper to label each section ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono tracking-[0.18em] text-zinc-600 uppercase mb-4">
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-zinc-900" />
}

export default function Page() {
  const [viewMode, setViewMode] = useState<"text" | "icon">("text")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-14">

        {/* ── Header ── */}
        <div className="space-y-1">
          <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 uppercase">
            Component Library
          </p>
          <h1 className="text-3xl font-light tracking-tight">Button System</h1>
          <p className="text-sm text-zinc-500 pt-1">
            All variants, sizes and states — ready to use.
          </p>
        </div>

        <Divider />

        {/* ── 01 · Featured: LiquidMetal ── */}
        <section>
          <SectionLabel>01 · Featured</SectionLabel>
          <div className="flex flex-wrap items-center gap-6">
            <LiquidMetalButton viewMode={viewMode} label="Get Started" />
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        </section>

        <Divider />

        {/* ── 02 · Variants ── */}
        <section>
          <SectionLabel>02 · Variants</SectionLabel>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <Divider />

        {/* ── 03 · Sizes ── */}
        <section>
          <SectionLabel>03 · Sizes</SectionLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Divider />

        {/* ── 04 · With Icons ── */}
        <section>
          <SectionLabel>04 · With Icons</SectionLabel>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Download />
              Download
            </Button>
            <Button variant="outline">
              <Mail />
              Contact
            </Button>
            <Button variant="secondary">
              <Plus />
              Add Item
            </Button>
            <Button variant="ghost">
              <Send />
              Send
            </Button>
            <Button>
              Get Started
              <ArrowRight />
            </Button>
          </div>
        </section>

        <Divider />

        {/* ── 05 · Icon-only ── */}
        <section>
          <SectionLabel>05 · Icon Only</SectionLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="icon-sm" variant="ghost" aria-label="Add (small)">
              <Plus />
            </Button>
            <Button size="icon" aria-label="Add">
              <Plus />
            </Button>
            <Button size="icon-lg" variant="outline" aria-label="Add (large)">
              <Plus />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Sparkles">
              <Sparkles />
            </Button>
            <Button size="icon" variant="destructive" aria-label="Delete">
              <Trash2 />
            </Button>
          </div>
        </section>

        <Divider />

        {/* ── 06 · States ── */}
        <section>
          <SectionLabel>06 · States</SectionLabel>
          <div className="flex flex-wrap gap-3">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            {/* @ts-expect-error — aria-invalid demo */}
            <Button aria-invalid="true">Invalid</Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <Button variant="outline">Normal</Button>
            <Button variant="outline" disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <Button variant="destructive">Normal</Button>
            <Button variant="destructive" disabled>Disabled</Button>
          </div>
        </section>

        <Divider />

        {/* ── 07 · Button Groups ── */}
        <section>
          <SectionLabel>07 · Button Groups</SectionLabel>
          <div className="flex flex-wrap gap-6">
            {/* Segmented outline group */}
            <ButtonGroup>
              <Button variant="outline">Day</Button>
              <Button variant="outline">Week</Button>
              <Button variant="outline">Month</Button>
            </ButtonGroup>

            {/* Split action button */}
            <ButtonGroup>
              <Button>
                <Download />
                Save
              </Button>
              <ButtonGroupSeparator />
              <Button size="icon" aria-label="More save options">
                <ChevronDown />
              </Button>
            </ButtonGroup>

            {/* Ghost group (toolbar style) */}
            <ButtonGroup>
              <Button variant="ghost" size="icon" aria-label="Add"><Plus /></Button>
              <Button variant="ghost" size="icon" aria-label="Delete"><Trash2 /></Button>
              <Button variant="ghost" size="icon" aria-label="Send"><Send /></Button>
            </ButtonGroup>
          </div>
        </section>

        <Divider />

        {/* ── 08 · Responsive full-width ── */}
        <section>
          <SectionLabel>08 · Full Width (Mobile)</SectionLabel>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="w-full sm:w-auto">
              <ArrowRight />
              Primary Action
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Secondary Action
            </Button>
          </div>
        </section>

      </div>
    </div>
  )
}
