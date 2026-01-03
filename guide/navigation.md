2. NAVIGATION — Non-Linear, State-Based Runtime Navigation
PHASE 0 — Core Intent (Read First)

Goal
Navigation should feel like changing application state, not visiting pages.

Hard Rules

❌ No navbar

❌ No links at top/bottom

❌ No route-based page loads

✅ Navigation feels like mode switching

✅ Transitions are the navigation

PHASE 1 — Input Layer (How Navigation Is Triggered)
Task 1.1 — Floating Command Palette (Hidden by Default)

Behavior

Invisible until invoked

Appears above all content

Blurred, glassy, terminal-inspired

Positioning

Fixed

Centered or slightly top-biased

Does not push layout

Task 1.2 — Invocation Methods (Multiple Inputs)

Implement all of the following:

Keyboard

⌘ + K (Mac)

Ctrl + K (Windows fallback)

Touch

Two-finger tap anywhere on screen

Voice

Speech recognition trigger

Command example:

"Go to projects"


Acceptance Criteria

Any input opens the same palette

Inputs do not conflict with scroll or typing

PHASE 2 — Command Palette UI
Task 2.1 — Command Palette Structure

Components

Input field (monospace)

Results list

Active item highlight

Commands

projects
about
experiments
contact
home


Rules

Fuzzy search

Keyboard navigable

Instant feedback

Task 2.2 — Visual Language

Style

Dark translucent background

Subtle glow

Minimal borders

Feels like dev tooling (VS Code / Raycast)

Motion

Palette fades + scales in

No slide-in menus

PHASE 3 — Navigation Engine (Finite State Machine)
Task 3.1 — Define Navigation States

Each section = a state, not a route.

Example

states = {
  home,
  projects,
  experiments,
  about,
  contact
}


Rules

Only one active state at a time

Transitions explicitly defined

No implicit routing

Task 3.2 — State Transition Logic

When a command is selected

Close command palette

Capture current DOM state

Transition to target state

Animate morph

No URL reload

URL may update after transition

State change is primary

PHASE 4 — GSAP FLIP Transitions (Core Magic 🔥)
Task 4.1 — Capture FLIP State

Before state change:

const state = Flip.getState(".section, .shared-element");

Task 4.2 — Morph Between Sections

After state change:

Flip.from(state, {
  duration: 1.1,
  ease: "expo.inOut",
  absolute: true,
  stagger: 0.02
});


Rules

Sections morph into each other

Shared elements animate seamlessly

No hard cuts

Task 4.3 — Section Identity Preservation

Guidelines

Reuse layout primitives

Maintain element continuity

Avoid re-mounting DOM unnecessarily

This is why FLIP works.

PHASE 5 — Route Illusion (Optional but Powerful)
Task 5.1 — URL Sync (Optional)

Behavior

Update URL after transition

No blocking navigation

Allows deep linking

Important

URL ≠ navigation driver

State machine is the source of truth

PHASE 6 — Motion Safety & Performance
Task 6.1 — Reduced Motion Mode

When enabled

Disable FLIP morphing

Replace with opacity crossfade

Navigation still works

Task 6.2 — Performance Guardrails

Cap transition duration

Avoid layout thrashing

Preload section assets

PHASE 7 — Why This Navigation Wins

Judges see:

Navigation as architecture

Mastery of GSAP FLIP (rare)

Multi-input UX (keyboard, touch, voice)

No reliance on framework routing magic

It feels like using a tool, not a website.