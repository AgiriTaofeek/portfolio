HERO / LANDING — “The Runtime Boot Sequence”
LLM-Friendly Task Breakdown (Production-Ready)
PHASE 0 — Non-Negotiable Constraints (Read First)

Goal
Build a hero section that behaves like a runtime booting in real time, not a marketing banner.

Hard Rules

No traditional hero headline

No CTA buttons

No centered marketing copy

Everything feels procedural, technical, alive

Tech Stack

React (Vite)

GSAP + ScrollTrigger

WebGL (Three.js or raw shader)

Canvas + DOM hybrid

Optional: Monaco Editor (or lightweight custom editor)

PHASE 1 — Visual & Structural Foundation
Task 1.1 — Create the Full-Viewport Shell

Requirements

Full viewport (100vw × 100vh)

Positioning:

WebGL canvas = background layer

DOM content = foreground layer

Background color:

Near-black (#050505 – #0a0a0a)

Add subtle grain/noise via shader or CSS overlay

Acceptance Criteria

Canvas renders behind DOM

Text remains crisp above canvas

No layout shift on load

Task 1.2 — Canvas + DOM Layering

Canvas

WebGL scene fills viewport

Transparent background allowed

Shader initially at low intensity

DOM

Centered vertically & horizontally

Monospace font

Looks like a terminal, not a headline

PHASE 2 — Runtime Boot Console
Task 2.1 — Create Live Runtime Console

Structure

> booting frontend.runtime v3.2.1
> loading shaders…
> initializing scroll engine…
> ready

Rules

Each line types in sequentially

No static text

Cursor blink optional but encouraged

Task 2.2 — Boot Sequence Timeline (GSAP)

Timeline Order

Line 1 types in

Short pause

Line 2 types in

Short pause

Line 3 types in

Short pause

Final > ready

GSAP Techniques

stagger

onComplete hooks

Controlled timing (feels deliberate, not fast)

Acceptance Criteria

Looks like an actual runtime starting

Feels engineered, not animated “for flair”

PHASE 3 — Transition to Statement
Task 3.1 — Reveal the Statement

Text

Hello, I build experiences that run.

Rules

Appears only after boot sequence completes

No typewriter effect

Subtle fade + slight Y translation

Centered, calm, confident

Meaning
This is the only human sentence in the hero.

PHASE 4 — WebGL Shader System
Task 4.1 — Shader Initialization

Initial State

Very subtle grain / flow

Almost invisible at load

After Boot

Shader intensity increases slightly

Feels like “system online”

Task 4.2 — Cursor Interaction (Desktop)

Behavior

Mouse movement subtly distorts shader

No dramatic displacement

Effect scales with cursor velocity, not position

Acceptance Criteria

Users feel interaction, not distraction

Shader never overpowers text

Task 4.3 — Mobile Gyroscope Control

Mobile Only

Use device orientation

Gentle directional flow

Disable on unsupported devices

Fallback

Static shader flow if gyro unavailable

PHASE 5 — GSAP Scroll System
Task 5.1 — ScrollTrigger Hero Motion

Example

gsap.to(".hero-title", {
yPercent: -40,
scrollTrigger: {
scrub: params.scrub,
ease: params.ease
}
});

Rules

Scroll affects hero subtly

Feels like runtime responding to input

No parallax clichés

PHASE 6 — Live Code Playground (Core Flex 🔥)
Task 6.1 — Mini Live Editor

Editor Options

Monaco Editor (preferred)

OR lightweight custom editor

Editable Parameters

scrub (ScrollTrigger)

ease

shader intensity

Rules

No full codebase exposure

Only controlled params

Changes apply in real time

Task 6.2 — Real-Time Binding

When user edits

GSAP updates instantly

Shader updates instantly

No reload

No debounce lag

Acceptance Criteria

Feels like tweaking a runtime, not settings

PHASE 7 — Reduced Motion & Accessibility
Task 7.1 — Reduced Motion Mode

Detection

prefers-reduced-motion

Behavior

Disable:

Cursor distortion

Scroll scrubbing

Replace with:

Static gradient

Simple fade transitions

Task 7.2 — Performance Guardrails

Cap FPS for shader

Disable heavy effects on low-end devices

Keep text readable at all times

PHASE 8 — Why This Section Wins (Validation Layer)

This hero must communicate:

You understand animation systems, not effects

You think in runtime states

You expose process, not just output

You can teach without being boring

If any part feels “decorative”, it fails.
