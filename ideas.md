# Sorveg Website Design Philosophy

## Selected Design Approach: **Premium Clarity**

### Design Movement
**Modern Minimalism with Computational Elegance** — inspired by Linear, Stripe, and Vercel's clean, purposeful interfaces. The design emphasizes clarity, speed, and trustworthiness through deliberate whitespace and refined typography.

### Core Principles
1. **Deterministic Clarity**: Every element communicates the core message—"Get correct answers. Every time." Visual hierarchy reinforces this promise.
2. **Speed & Responsiveness**: Fast interactions, instant feedback, minimal cognitive load. The UI gets out of the way.
3. **Computational Aesthetics**: Subtle nods to code and precision (monospace fonts for results, clean grids, structured spacing).
4. **Trust Through Simplicity**: No dark terminals or hacker aesthetics; instead, a professional, accessible interface that welcomes non-technical users.

### Color Philosophy
- **Primary**: Deep blue (`#1e40af`) — conveys trust, precision, and stability
- **Background**: Pure white (`#ffffff`) — clarity and openness
- **Accents**: Soft gray (`#f3f4f6`) for sections, `#6b7280` for secondary text
- **Status Colors**: Green for success, amber for loading, red for errors
- **Reasoning**: The palette is intentionally restrained. White backgrounds reduce cognitive friction; blue provides focus without aggression.

### Layout Paradigm
- **Hero Section**: Asymmetric layout with headline on left, visual element (animated code snippet or abstract shape) on right
- **Examples Section**: 3-column grid showcasing live API results (sort, shortest-path, knapsack)
- **Playground**: Full-width, centered layout with input on top, results below
- **Navigation**: Minimal top nav with logo + "Try Playground" CTA
- **Avoid**: Centered layouts, excessive symmetry, generic hero patterns

### Signature Elements
1. **Monospace Result Blocks**: JSON/code output displayed in a clean monospace font with subtle background
2. **Execution Trace**: Step-by-step breakdown of API execution (→ arrows, clean typography)
3. **Shareable Link Badge**: Visual indicator when a result is loaded from a shared URL

### Interaction Philosophy
- **Instant Feedback**: Button clicks trigger immediate visual response (no spinners unless >500ms)
- **Copy-to-Clipboard**: One-click sharing of results and shareable links
- **Demo Prompts**: Quick-start buttons that populate the input and run immediately
- **URL State**: Playground URL updates as user types, enabling seamless sharing

### Animation
- **Entrance**: Subtle fade-in for sections (200ms, ease-out)
- **Loading**: Minimal spinner on Run button, no distracting animations
- **Result Reveal**: Smooth fade-in of result block (300ms)
- **Hover States**: Slight background color shift on buttons/cards, no scale transforms
- **Philosophy**: Animations serve clarity, not decoration

### Typography System
- **Display Font**: `Geist` or `Inter` (bold, 600-700 weight) for headlines — modern, geometric, professional
- **Body Font**: `Inter` (400-500 weight) for body text — highly legible, neutral
- **Monospace**: `Monaco` or `Fira Code` for code/results — familiar to developers, maintains precision
- **Hierarchy**:
  - H1: 48px, 700 weight, tight line-height
  - H2: 32px, 600 weight
  - Body: 16px, 400 weight, 1.6 line-height
  - Small: 12px, 500 weight, monospace for technical content

---

## Implementation Notes
- Use Tailwind 4 with OKLCH color space for consistent theming
- Leverage shadcn/ui Button, Card, Badge components
- Implement URL state management with `useEffect` and `URLSearchParams`
- Call `api.sorveg.com/api/skills/[skill-name]` directly from frontend (no backend proxy needed)
- Ensure all text has sufficient contrast against white background
- Test on mobile, tablet, desktop — responsive design is non-negotiable
