<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0c,40:1a1a1a,100:e8b923&height=220&section=header&text=🎓%20Studienkompass&fontSize=54&fontColor=ffffff&animation=twinkling&fontAlignY=42&desc=German%20Public%20University%20Eligibility%20%26%20Admissions%20Consultant&descAlignY=65&descSize=15&descColor=f5deb3" width="100%"/>

<br/>

<img src="https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-EF4444?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Frameworks-None-e8b923?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Responsive-Mobile%20%2B%20Desktop-3B82F6?style=for-the-badge&labelColor=0a0a0c"/>
&nbsp;
<img src="https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-22C55E?style=for-the-badge&labelColor=0a0a0c"/>

<br/><br/>

### Find your dream German public university in seconds

📖 Enter your academic record once. Studienkompass scores it against modeled admission patterns across **130+ German public universities** and shows you exactly where you stand — eligible, conditional, or what to fix first.

<br/>

<a href="https://mabdullahab614-alt.github.io/studienkompass/">
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=0:e8b923,100:c0392b&height=90&section=header&text=🎓%20TRY%20IT%20LIVE&fontSize=34&fontColor=0a0a0c&animation=twinkling&fontAlignY=62&width=500" />
</a>

</div>

<br/>

## 📌 Table of Contents

| | |
|:--|:--|
| 🎯 [What Is This](#-what-is-this) | 🛠️ [Tech Stack](#️-tech-stack) |
| 🧩 [Features](#-features) | 📂 [File Structure](#-file-structure) |
| 🧪 [Testing](#-testing) | 🚀 [Running It Locally](#-running-it-locally) |
| 🗺️ [Roadmap](#️-roadmap) | 📄 [License](#-license) |

<br/>

## 🎯 What Is This

Studienkompass is a client-side eligibility checker built for **Pakistani students** applying to English-taught Bachelor's programs at **German public universities** — a process usually scattered across dozens of university pages, uni-assist rules, and APS requirements.

**How it works:**

1. Enter your academic record once — Matric %, FSC %, IELTS/TOEFL/SAT/TestAS, German level, preferred field
2. Get scored against **130+ public universities**
3. See a ranked list tagged **Eligible** / **Conditional** / **Not Eligible**, with the exact reason behind each tag

> ⚠️ University and city names are real. Every threshold shown (percentages, IELTS/TestAS bands, fees) is a **modeled, illustrative pattern** — not an officially verified figure. Always confirm current requirements on the university's own page before applying.

**Privacy by design:** everything runs in the browser. Nothing is stored or sent to a server.

<br>

---

<br>

## 🧩 Features

<div align="center">

| Section | What it does |
|:--|:--|
| 🏠 Hero | Quick counters — universities covered, programs indexed, % English-taught BS |
| 📝 Eligibility Checker | 4 steps: Personal → Academic → Language & Tests → Preferences |
| 📊 Results | Ranked university cards with admission chance %, filter by status, sort by chance/name/fee |
| 🎓 Scholarships | Funding options relevant to the student's profile |
| 🛂 Visa Checklist | German National Visa (Type D) steps, broken down |
| 💶 Cost Calculator | Live monthly cost-of-living estimate, including blocked-account guidance |
| 📄 Document Checklist | Tick-off paperwork tracker, kept local to the session |

</div>

<br>

---

<br>

## 🛠️ Tech Stack

**Plain HTML + CSS + vanilla JavaScript.** No React, no Vue, no CSS framework, no build step, no dependencies to install.

- 🎨 **CSS** — all layout, styling, and responsive breakpoints hand-written in `style.css`
- ⚙️ **JavaScript** — UI/state logic in `script.js`, kept fully separate from the eligibility math in `scoring-engine.js`
- 🧪 **Testing** — a from-scratch test runner (`test-framework.js`) instead of an external library, since the project deliberately has zero dependencies

<br>

---

<br>

## 📂 File Structure

```
studienkompass/
├── index.html          → markup for every section (hero, checker, results, scholarships, visa, costs, docs)
├── style.css            → all styling + responsive breakpoints
├── script.js             → UI logic — form steps, state, rendering results
├── scoring-engine.js       → eligibility scoring logic, kept separate from UI
├── test-runner.html         → standalone page to run the test suite in-browser
├── test-framework.js         → hand-built assertion/test runner
├── scoring_tests.js            → unit tests for the scoring engine
└── README.md
```

<br>

---

<br>

## 🧪 Testing

No external test framework — `test-framework.js` is a minimal, hand-built `assert`/`describe`-style runner.

- Open [`test-runner.html`](./test-runner.html) directly in a browser to run the suite
- `scoring_tests.js` covers the eligibility scoring logic, including edge cases like a field left at `0`/`None` (test not yet attempted) so scores degrade gracefully instead of breaking

<br>

---

<br>

## 🚀 Running It Locally

No build step, no npm install — it's static HTML/CSS/JS.

```bash
git clone https://github.com/mabdullahab614-alt/studienkompass.git
cd studienkompass
```

Then just open `index.html` in a browser, or serve it locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

<br>

---

<br>

## 🗺️ Roadmap

- [ ] Expand the university/program dataset beyond the current 130+ list
- [ ] Add more scholarship entries and filtering by field of study
- [ ] Persist document-checklist progress across sessions (still fully client-side)

<br>

---

<br>

## 📄 License

🔒 **ALL RIGHTS RESERVED**

**All Rights Reserved © 2026 Abdullah Javid**

This repository and its contents — including source code and documentation — are made publicly visible **for portfolio and demonstration purposes only**.

No part of this repository may be copied, modified, distributed, sublicensed, or used — in whole or in part, for personal, educational, or commercial purposes — without explicit prior written permission from the author. Forking or cloning this repository does **not** grant any rights to use, reproduce, or redistribute its contents.

📧 [mabdullah.ab614@gmail.com](mailto:mabdullah.ab614@gmail.com)
&nbsp;|&nbsp;
🔗 [github.com/mabdullahab614-alt](https://github.com/mabdullahab614-alt)
&nbsp;|&nbsp;
💼 [linkedin.com/in/abdullah-javid-b217a2384](https://linkedin.com/in/abdullah-javid-b217a2384)

<br>

---

<div align="center">

`#Studienkompass` `#VanillaJS` `#NoFrameworks` `#ResponsiveDesign` `#GermanUniversities` `#StudyInGermany` `#AdmissionsConsultant` `#AISeekho`

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:c0392b,60:1a1a1a,100:0a0a0c&height=120&section=footer&animation=twinkling" width="100%"/>

<i>🎓 Built as part of the AI Seekho program by UMT Inter AI Club — Row 4: Admission Pitch</i>

</div>
