<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0c,40:1a1a1a,100:e8b923&height=220&section=header&text=🎓%20Assignment%203&fontSize=54&fontColor=ffffff&animation=twinkling&fontAlignY=42&desc=Row%204%20·%20Admission%20Pitch%20·%20Student%20Consultation%20Website&descAlignY=65&descSize=15&descColor=f5deb3" width="100%"/>

<br/>

<img src="https://img.shields.io/badge/Program-AI%20SEEKHO-e8b923?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Club-Inter%20AI%20Club%20UMT-22C55E?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Row-4%20%E2%80%94%20Admission%20Pitch-F59E0B?style=for-the-badge&labelColor=0a0a0c"/>
<br/><br/>
<img src="https://img.shields.io/badge/HTML-CSS-JS%20Only-EF4444?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Responsive-Mobile%20%2B%20Desktop-3B82F6?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Status-Submitted-10B981?style=for-the-badge&labelColor=0a0a0c"/>

<br/><br/>

### 🎓 AI Seekho — Assignment 3
📖 A full student-consultation website — **Studienkompass** — built to Row 4's brief: help students with admissions, and show them proper guidance and solutions. Built solo with plain HTML, CSS, and JavaScript (no frameworks), fully responsive, and deployed live on GitHub Pages.

<br/>

<a href="https://mabdullahab614-alt.github.io/studienkompass/">
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=0:e8b923,100:c0392b&height=90&section=header&text=🎓%20TRY%20LIVE%20DEMO&fontSize=34&fontColor=0a0a0c&animation=twinkling&fontAlignY=62&width=500" />
</a>
<br/>
<a href="https://github.com/mabdullahab614-alt/studienkompass">
  <img src="https://img.shields.io/badge/📦%20Product%20Repo-studienkompass-e8b923?style=for-the-badge&labelColor=0a0a0c" height="40"/>
</a>

</div>

---

## 📌 Table of Contents

- [🧭 Assignment Overview](#-assignment-overview)
- [📋 The Brief — Row 4: Admission Pitch](#-the-brief--row-4-admission-pitch)
- [🎓 Part 1 — What Studienkompass Does](#-part-1-what-studienkompass-does)
- [🧩 Part 2 — Feature Breakdown](#-part-2-feature-breakdown)
- [🛠️ Part 3 — Tech Stack & Why No Framework](#️-part-3-tech-stack--why-no-framework)
- [📱 Part 4 — Responsive Design Approach](#-part-4-responsive-design-approach)
- [🧪 Part 5 — Testing (Built From Scratch)](#-part-5-testing-built-from-scratch)
- [🚀 Part 6 — Live Deployment](#-part-6-live-deployment)
- [💭 Reflection](#-reflection)
- [🔗 References](#-references)
- [📄 License](#-license)

---

## 🧭 Assignment Overview

<div align="center">

| 👤 Student | 🆔 Student ID | 🎤 Instructor | 📅 Date | 🎓 Product |
|:---:|:---:|:---:|:---:|:---:|
| **Abdullah Javid** | **f2025376178** | **Umair (AI Club President)** | **5 August 2026** | **Studienkompass** |

</div>

<div align="center">

| 🏷️ Field | 📋 Detail |
|:--|:--|
| 🎓 Program | AI Seekho — *"Learn AI. Build with AI."* |
| 🏢 Organized By | UMT Inter AI Club (Office of Participant Affairs) |
| 📍 This Session | Session 3 of 16 — Admission Pitch Build |
| 🧩 Row Assigned | Row 4 — Admission Pitch |

</div>

---

## 📋 The Brief — Row 4: Admission Pitch

> Build a student consultation website that:
> - Helps students with admissions
> - Shows proper guidance & solutions
>
> **Rules:**
> - HTML, CSS & JavaScript only — no frameworks
> - Make it responsive (mobile + desktop)
> - Code must be on GitHub

---

## 🎓 Part 1 — What Studienkompass Does

**Studienkompass** is an admissions consultation tool built specifically for Pakistani students trying to figure out whether they're eligible for a Bachelor's program at a **German public university** — a real, painful, and genuinely confusing process (APS, uni-assist, per-university thresholds, English-taught programs mixed in with German-taught ones, winter vs. summer intakes, and so on).

Instead of a generic "consultation" landing page, the product is a working **eligibility engine**: a student enters their academic record once (Matric %, FSC %, IELTS/TOEFL/SAT/TestAS scores, German language level, preferred field of study) and the site scores that profile against admission patterns across **130+ public universities**, returning a ranked list of matches tagged **Eligible**, **Conditional**, or **Not Eligible**, each with an admission-chance percentage and the specific reason behind the tag (e.g. "FSC 86% — meets requirement", "IELTS 7.0 — meets requirement", "TestAS — recommended, not taken").

Everything runs **client-side, in the browser** — nothing is stored or sent to a server, which matters for a tool asking students to enter grades, test scores, and personal contact details.

---

## 🧩 Part 2 — Feature Breakdown

<div align="center">

| 🧱 Section | 💬 What it does |
|:--|:--|
| 🏠 Hero | Quick-glance counters (public universities covered, programs indexed, % English-taught BS) and a direct CTA into the checker |
| 📝 4-step Eligibility Checker | Personal → Academic → Language & Tests → Preferences, with blank/0 fields treated as "not attempted yet" rather than breaking the score |
| 📊 Results / Matched Universities | Ranked cards per university with admission chance %, eligibility status, and the specific criteria that passed or failed; filterable by status and sortable (chance, name, fee) |
| 🎓 Scholarships & Grants | A dedicated section surfacing funding options relevant to the student's profile |
| 🛂 Student Visa Checklist | Breaks down the German National Visa (Type D) process into what documents/steps are actually required |
| 💶 Monthly Cost Calculator | Live-updating estimate of cost of living, including blocked-account guidance for the current cycle |
| 📄 Document Checklist | A tick-off checklist for paperwork, with progress kept local to the session — nothing persisted server-side |

</div>

An honest disclaimer sits directly above the results: university and city names are real, but every threshold shown (percentage cut-offs, IELTS/TestAS bands, fees) is a modeled, illustrative pattern rather than an officially verified figure — students are told explicitly to confirm final requirements on the university's own page before applying. That disclaimer was a deliberate design choice, not an afterthought — a consultation tool that overstates its own certainty is worse than no tool at all.

---

## 🛠️ Part 3 — Tech Stack & Why No Framework

**Stack:** Plain HTML + CSS + vanilla JavaScript. No React, no Vue, no CSS framework, no build step.

**File structure:**

```
studienkompass/
├── index.html          # markup + all sections (hero, checker, results, scholarships, visa, costs, docs)
├── style.css            # all styling + responsive breakpoints
├── script.js             # UI logic — form steps, state, rendering results
├── scoring-engine.js       # eligibility scoring logic, kept separate from UI code
├── test-runner.html         # standalone page to run the test suite in-browser
├── test-framework.js         # a small assertion/test-runner built from scratch
├── scoring_tests.js            # unit tests for the scoring engine
└── README.md
```

**Why the constraint helped rather than hurt:** with no framework to lean on for state management, the scoring logic had to be pulled out of the UI entirely and put in its own file (`scoring-engine.js`). That separation — pure scoring functions in one file, DOM/rendering logic in another — is exactly the kind of modularity Session 1 covered (avoid tightly coupled components, keep things independently testable), and it's easier to enforce by hand in vanilla JS than it would've been leaning on a framework's conventions to do it automatically.

---

## 📱 Part 4 — Responsive Design Approach

The brief required mobile **and** desktop support with no CSS framework (so no Bootstrap/Tailwind grid to fall back on). That meant hand-written responsive CSS in `style.css`, built around:

- A proper `viewport` meta tag so mobile browsers don't fake a desktop-width layout
- The 4-step eligibility form collapsing to a single-column layout on narrow screens instead of the wider multi-column layout used on desktop
- Section layouts (hero counters, university result cards, checklist items) designed to reflow rather than just shrink, so text and tap targets stay usable on a phone

---

## 🧪 Part 5 — Testing (Built From Scratch)

Since the brief said "no frameworks," that constraint was applied to testing too — no Jest, no external test runner. Instead, `test-framework.js` is a minimal from-scratch assertion/test-runner (basic `assert`/`describe`-style structure), `test-runner.html` is a standalone page that loads it and executes the suite directly in the browser, and `scoring_tests.js` holds the actual unit tests for `scoring-engine.js` — covering the eligibility math and edge cases like a field left at 0/None (student hasn't attempted IELTS/TestAS yet) so the score degrades gracefully instead of breaking.

Building the test runner itself ended up being as instructive as writing the tests — it's easy to take for granted what a testing framework is doing under the hood (assertion tracking, pass/fail counting, output formatting) until you have to hand-roll a minimal version of it.

---

## 🚀 Part 6 — Live Deployment

<div align="center">

| 🔗 Resource | 📍 Link |
|:--|:--|
| 🌐 Live Site | [mabdullahab614-alt.github.io/studienkompass](https://mabdullahab614-alt.github.io/studienkompass/) |
| 📦 Source Code | [github.com/mabdullahab614-alt/studienkompass](https://github.com/mabdullahab614-alt/studienkompass) |
| 🚀 Hosting | GitHub Pages, deployed straight from the repo — no build step needed since it's plain HTML/CSS/JS |

</div>

---

## 💭 Reflection

- 🧩 The "no frameworks" rule turned out to be the most useful constraint in the whole assignment — it forced a real separation between the scoring engine and the UI that a framework's state management might have let me get lazy about.
- 🧪 Writing `test-framework.js` from scratch instead of reaching for a test library made me actually understand what a test runner is doing, not just how to call one.
- 🔐 Keeping everything client-side (no data stored or sent anywhere) wasn't just a technical shortcut — it fit the actual audience: students entering grades and test scores into a random website are right to be wary about where that data goes.
- ⚠️ Being explicit in the UI itself that admission thresholds are modeled patterns, not officially verified figures, felt like the right call for a consultation tool — false confidence is worse than a clearly-labeled estimate.

---

## 🔗 References

- 🔹 [MDN Web Docs — HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- 🔹 [MDN Web Docs — CSS Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- 🔹 [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- 🔹 [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## 📄 License

🔒 **ALL RIGHTS RESERVED**

**All Rights Reserved © 2026 Abdullah Javid**

This repository and its contents — including source code and documentation — are made publicly visible **for portfolio and demonstration purposes only**.

**No part of this repository may be copied, modified, distributed, sublicensed, or used** — in whole or in part, for personal, educational, or commercial purposes — without explicit prior written permission from the author.

Forking or cloning this repository does **not** grant any rights to use, reproduce, or redistribute its contents.

If you are interested in using any part of this project, please contact me directly for permission:

📧 **Email:** [mabdullah.ab614@gmail.com](mailto:mabdullah.ab614@gmail.com)
&nbsp;|&nbsp;
🔗 **GitHub:** [github.com/mabdullahab614-alt](https://github.com/mabdullahab614-alt)
&nbsp;|&nbsp;
💼 **LinkedIn:** [linkedin.com/in/abdullah-javid-b217a2384](https://linkedin.com/in/abdullah-javid-b217a2384)

---

<div align="center">

### 🏷️ Topics
`#AISeekho` `#InterAIClubUMT` `#AdmissionPitch` `#VanillaJS` `#NoFrameworks` `#ResponsiveDesign` `#Studienkompass` `#Assignment3`

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:c0392b,60:1a1a1a,100:0a0a0c&height=120&section=footer&animation=twinkling" width="100%"/>

<i>🎓 Assignment 3 — AI Seekho by UMT Inter AI Club — Abdullah Javid (f2025376178)</i>

</div>
