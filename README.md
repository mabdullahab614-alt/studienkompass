<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0c,40:1a1a1a,100:e8b923&height=200&section=header&text=Studienkompass&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=German%20Public%20University%20Eligibility%20Checker&descAlignY=58&descSize=16&descColor=f5deb3" width="100%" alt="Studienkompass banner"/>

<br/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=20&pause=1200&color=E8B923&center=true&vCenter=true&width=640&lines=Score+your+profile+against+132+German+unis;100%25+client-side+%E2%80%94+nothing+is+stored;Zero+frameworks%2C+zero+build+step;Deterministic+scoring%2C+seeded+RNG" alt="Typing SVG"/>

<br/><br/>

<img src="https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-EF4444?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Frameworks-None-e8b923?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Responsive-Mobile%20%2B%20Desktop-3B82F6?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-22C55E?style=for-the-badge&labelColor=0a0a0c"/>

<br/><br/>

<img src="https://img.shields.io/github/last-commit/mabdullahab614-alt/studienkompass?style=flat-square&color=e8b923&labelColor=0a0a0c&label=Last%20Updated"/>
&nbsp;
<img src="https://img.shields.io/github/languages/top/mabdullahab614-alt/studienkompass?style=flat-square&color=3B82F6&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/github/repo-size/mabdullahab614-alt/studienkompass?style=flat-square&color=22C55E&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-EF4444?style=flat-square&labelColor=0a0a0c"/>

<br/><br/>

**Enter your academic record once — get scored against 132 German public universities, instantly, in your browser.**
No sign-up. No data leaves your device. No frameworks under the hood.

<br/>

<a href="https://mabdullahab614-alt.github.io/studienkompass/">
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=0:e8b923,100:c0392b&height=85&section=header&text=TRY%20IT%20LIVE&fontSize=32&fontColor=0a0a0c&animation=twinkling&fontAlignY=62&width=420" alt="Try Studienkompass live"/>
</a>
&nbsp;
<a href="#-running-it-locally">
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=0:1a1a1a,100:0a0a0c&height=85&section=header&text=RUN%20LOCALLY&fontSize=32&fontColor=e8b923&animation=twinkling&fontAlignY=62&width=420" alt="Run locally"/>
</a>

</div>

<br/>

<!--
SEO: German university eligibility checker, study in Germany from Pakistan, German public
university admission requirements, IELTS TestAS FSC eligibility calculator, uni-assist APS
guide, student visa Germany checklist, cost of living Germany students, vanilla JS project,
no framework web app, seeded RNG scoring engine.
-->

<div align="center">

## 📌 Table of Contents

</div>

<table align="center">
<tr>
<td valign="top">

🎯 [What Is This](#-what-is-this)
🧮 [How Scoring Works](#-how-scoring-works)
🧩 [Features](#-features)

</td>
<td valign="top">

🛠️ [Tech Stack](#️-tech-stack)
📂 [Folder Structure](#-folder-structure)
🚀 [Running It Locally](#-running-it-locally)

</td>
<td valign="top">

🧪 [Running The Tests](#-running-the-tests)
📊 [Notes On The Data](#-notes-on-the-data)
📄 [License](#-license)

</td>
</tr>
</table>

<br/>

---

<br/>

## 🎯 What Is This

Studienkompass is a **client-side eligibility checker** for Pakistani students applying to English-taught Bachelor's programs at German public universities — a process usually scattered across dozens of university pages, uni-assist rules, and APS requirements.

**How it works:**

| Step | Action |
|:--:|:--|
| 1️⃣ | Enter your academic record — Matric marks, FSC/Intermediate marks, IELTS / TOEFL / SAT / TestAS, German level, preferred field, city, budget, semester |
| 2️⃣ | Get scored against **132 public universities** across **9 fields of study** |
| 3️⃣ | See a ranked, filterable, sortable list tagged 🟢 **Eligible** · 🟡 **Conditional** · 🔴 **Not Eligible** |
| 4️⃣ | Each result shows *why* — e.g. `FSC 86% ✅` · `IELTS 7.0 ✅` · `TestAS — not taken` |

🔐 **Privacy by design** — 100% HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no Node/npm required to run or test it. Everything runs in your browser; nothing is stored or sent to a server.

<br/>

---

<br/>

## 🧮 How Scoring Works

`scoring-engine.js` doesn't hardcode 132 universities by hand — it **seeds a deterministic RNG** to procedurally generate the database once, so the same result comes out identically on every page load.

- `scoreUniversity(student, uni)` → `null` if that university doesn't offer the student's field, otherwise a score + status + up to 4 reasons
- Score is always **clamped between 2 and 98**
- **Status thresholds:** `eligible` at 72+, `conditional` at 45+, else `not eligible`
- `runEligibility(student)` filters to the student's field and sorts by score, descending

<br/>

---

<br/>

## 🧩 Features

<div align="center">

| | | |
|:--:|:--:|:--:|
| 🏠 **Animated hero stats**<br/>132 universities, 640 programs, count up on scroll | 📝 **4-step checker**<br/>Personal → Academic → Language & Tests → Preferences | 📊 **Ranked results**<br/>Filter by status, sort by chance/name/fee |
| 🧮 **Live % calculator**<br/>Matric 25% + FSC 75%, auto-computed as you type | 🎓 **Scholarships**<br/>Funding options matched to your profile | 🛂 **Visa checklist**<br/>German National Visa (Type D), step by step |
| 💶 **Cost calculator**<br/>Live monthly estimate + blocked-account guidance | 📄 **Document checklist**<br/>Tick-off tracker, kept local to your session | 🌗 **Theme toggle**<br/>Dark/light, remembered via `localStorage` |
| 🧭 **Scrollspy nav**<br/>Highlights the active section as you scroll | 🪟 **Accessible modals**<br/>Focus-trapped About/Privacy/Terms/Contact dialogs | 🔍 **SEO built-in**<br/>OG tags, Twitter Card, canonical URL, `schema.org` JSON-LD |

</div>

<br/>

---

<br/>

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=html,css,js,github" alt="HTML, CSS, JavaScript, GitHub"/>

**100% HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no Node/npm required to run or test it.**

</div>

- 🎨 **CSS** — all styles in `style.css`, using CSS custom properties for theming
- ⚙️ **JavaScript** — `script.js` handles DOM/UI (rendering, form handling, filters, modals); `scoring-engine.js` holds the eligibility logic (seeded RNG, database generation, scoring algorithm) and loads *before* `script.js`
- 🧪 **Testing** — a from-scratch ~40-line test runner (`test-framework.js`), no external dependency

<br/>

---

<br/>

## 📂 Folder Structure

```
studienkompass/
│
├── 📄 index.html            → markup
├── 🎨 style.css              → all styles (CSS custom properties for theming)
├── 🧮 scoring-engine.js        → eligibility logic — seeded RNG, university database
│                                 generation, scoring algorithm. Loaded before script.js
├── ⚙️ script.js               → DOM/UI — rendering, form handling, filters, modal, etc.
│
├── 🧪 test-framework.js         → a ~40-line vanilla JS test runner (no dependency)
├── 🧪 scoring_tests.js           → unit tests for the scoring engine
├── 🧪 test-runner.html           → open this in a browser to run the tests
│
└── 📘 README.md
```

<br/>

---

<br/>

## 🚀 Running It Locally

Just open `index.html` in any browser. That's it — no install step.

```bash
git clone https://github.com/mabdullahab614-alt/studienkompass.git
cd studienkompass
open index.html          # macOS
start index.html         # Windows
```

> If your browser blocks local `<script src>` loading over `file://`, serve the folder with any static server — e.g. `python3 -m http.server 8000` — this is only a browser security quirk, not a project dependency.

<br/>

---

<br/>

## 🧪 Running The Tests

Open [`test-runner.html`](./test-runner.html) in a browser. It loads `scoring-engine.js`, runs **12 unit tests** against it, and renders a pass/fail report on the page — no Node, no npm, no test framework dependency.

<div align="center">

| Covers | |
|:--|:--|
| ✅ RNG determinism | ✅ Score clamping |
| ✅ Database integrity | ✅ Status thresholds |
| ✅ Sorting | ✅ Field filtering |

</div>

<br/>

---

<br/>

## 📊 Notes On The Data

University and city names are **real**. Every numeric admission threshold (minimum percentage, IELTS/TOEFL cut-offs, TestAS requirement, fees, etc.) is a **deterministically generated illustrative pattern**, not an officially verified figure — see the in-app "About this data" note above the results grid, and the comment header in `scoring-engine.js`.

> ⚠️ A production deployment would need to sync these fields with each university's own admissions office and/or uni-assist. The canonical URL and Open Graph tags in `index.html` already point at the live GitHub Pages domain — update them if you ever move to a custom domain.

<br/>

---

<br/>

<div align="center">

## ⭐ Star History

<a href="https://star-history.com/#mabdullahab614-alt/studienkompass&Date">
  <img src="https://api.star-history.com/svg?repos=mabdullahab614-alt/studienkompass&type=Date" alt="Star History Chart" width="600"/>
</a>

*If this project was useful for your own Germany applications, a ⭐ helps other students find it.*

</div>

<br/>

---

<br/>

## 📄 License

🔒 **ALL RIGHTS RESERVED**

**All Rights Reserved © 2026 Abdullah Javid**

This repository and its contents — including source code and documentation — are made publicly visible **for portfolio and demonstration purposes only**.

No part of this repository may be copied, modified, distributed, sublicensed, or used — in whole or in part, for personal, educational, or commercial purposes — without explicit prior written permission from the author. Forking or cloning this repository does **not** grant any rights to use, reproduce, or redistribute its contents.

<br/>

<div align="center">

📧 [mabdullah.ab614@gmail.com](mailto:mabdullah.ab614@gmail.com)
&nbsp;|&nbsp;
🔗 [github.com/mabdullahab614-alt](https://github.com/mabdullahab614-alt)
&nbsp;|&nbsp;
💼 [linkedin.com/in/abdullah-javid-b217a2384](https://linkedin.com/in/abdullah-javid-b217a2384)

<br/><br/>

`#Studienkompass` `#VanillaJS` `#NoFrameworks` `#ResponsiveDesign` `#GermanUniversities` `#StudyInGermany` `#AdmissionsConsultant` `#AISeekho`

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:c0392b,60:1a1a1a,100:0a0a0c&height=110&section=footer" width="100%" alt="footer banner"/>

<i>🎓 Built as part of the AI Seekho program by UMT Inter AI Club — Row 4: Admission Pitch</i>

</div>
