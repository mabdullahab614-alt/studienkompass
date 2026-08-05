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

🎯 [What It Does](#-what-it-does)
🧮 [Scoring Logic](#-scoring-logic)
🧩 [Features](#-features)

</td>
<td valign="top">

🛠️ [Tech Stack](#️-tech-stack)
📂 [Folder Structure](#-folder-structure)
🚀 [Run Locally](#-run-locally)

</td>
<td valign="top">

🧪 [Run Tests](#-run-tests)
📊 [Data Notes](#-data-notes)
📄 [License](#-license)

</td>
</tr>
</table>

<br/>

---

<br/>

## 🎯 What It Does

- 🇵🇰 Built for Pakistani students applying to English-taught Bachelor's programs in Germany
- 📝 Enter academic record once — Matric, FSC, IELTS / TOEFL / SAT / TestAS, German level, field, city, budget, semester
- 🏛️ Scored against **132 public universities** across **9 fields of study**
- 🟢🟡🔴 Returns a ranked list — **Eligible** · **Conditional** · **Not Eligible**
- 💬 Every result shows *why* — e.g. `FSC 86% ✅` · `IELTS 7.0 ✅` · `TestAS — not taken`
- 🔐 100% client-side — nothing stored, nothing sent to a server
- 🧱 Zero frameworks, zero build step, zero Node/npm required

<br/>

---

<br/>

## 🧮 Scoring Logic

- 🎲 Database of 132 universities is **procedurally generated** from a seeded RNG — identical result on every page load
- 🚫 `scoreUniversity()` → `null` if the university doesn't offer the student's field
- 📏 Score always **clamped between 2 and 98**
- 🟢 `eligible` at **72+**
- 🟡 `conditional` at **45+**
- 🔴 otherwise `not eligible`
- 💡 Up to **4 reasons** returned per result, explaining the score
- 🔽 `runEligibility()` filters by field, sorts by score descending

<br/>

---

<br/>

## 🧩 Features

<div align="center">

| | | |
|:--:|:--:|:--:|
| 🏠 **Animated stats**<br/>132 unis · 640 programs · count-up on scroll | 📝 **4-step checker**<br/>Personal → Academic → Language & Tests → Preferences | 📊 **Ranked results**<br/>Filter by status · sort by chance/name/fee |
| 🧮 **Live % calc**<br/>Matric 25% + FSC 75%, auto-computed | 🎓 **Scholarships**<br/>Funding matched to profile | 🛂 **Visa checklist**<br/>German National Visa (Type D) |
| 💶 **Cost calculator**<br/>Live monthly estimate + blocked-account guidance | 📄 **Document checklist**<br/>Tick-off tracker, session-local | 🌗 **Theme toggle**<br/>Dark/light via `localStorage` |
| 🧭 **Scrollspy nav**<br/>Active section auto-highlights | 🪟 **Accessible modals**<br/>Focus-trapped, keyboard-friendly | 🔍 **SEO built-in**<br/>OG · Twitter Card · canonical · JSON-LD |

</div>

<br/>

---

<br/>

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=html,css,js,github" alt="HTML, CSS, JavaScript, GitHub"/>

</div>

- 🎨 **CSS** → `style.css` — custom properties for theming
- ⚙️ **JS (UI)** → `script.js` — rendering, forms, filters, modals
- 🧮 **JS (logic)** → `scoring-engine.js` — RNG, database, scoring — loads *before* `script.js`
- 🧪 **JS (tests)** → `test-framework.js` — ~40-line runner, zero dependencies
- 🚫 No React · No Vue · No CSS framework · No build step

<br/>

---

<br/>

## 📂 Folder Structure

```
studienkompass/
│
├── 📄 index.html            → markup
├── 🎨 style.css              → styles + theming
├── 🧮 scoring-engine.js        → RNG · database · scoring algorithm
├── ⚙️ script.js               → DOM/UI · forms · filters · modals
│
├── 🧪 test-framework.js         → hand-built test runner
├── 🧪 scoring_tests.js           → unit tests
├── 🧪 test-runner.html           → open in browser to run tests
│
└── 📘 README.md
```

<br/>

---

<br/>

## 🚀 Run Locally

```bash
git clone https://github.com/mabdullahab614-alt/studienkompass.git
cd studienkompass
open index.html          # macOS
start index.html         # Windows
```

- ✅ No install step — just open `index.html`
- ⚠️ `file://` blocking `<script src>`? → `python3 -m http.server 8000` (browser quirk, not a dependency)

<br/>

---

<br/>

## 🧪 Run Tests

- 🌐 Open [`test-runner.html`](./test-runner.html) in any browser
- ✅ **12 unit tests** run automatically, pass/fail report renders on the page
- 🚫 No Node · No npm · No test framework dependency

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

## 📊 Data Notes

- ✅ University and city names are **real**
- 🎲 Every threshold (percentage, IELTS/TOEFL, TestAS, fees) is a **deterministically generated illustrative pattern** — not officially verified
- 📍 See the in-app "About this data" note above the results grid, and the comment header in `scoring-engine.js`
- 🔗 Canonical URL + Open Graph tags already point at the live GitHub Pages domain
- 🏢 A production deployment would need to sync these fields with each university's own admissions office and/or uni-assist

<br/>

---

<br/>

<div align="center">

## ⭐ Show Some Love

<a href="https://github.com/mabdullahab614-alt/studienkompass/stargazers">
  <img src="https://img.shields.io/github/stars/mabdullahab614-alt/studienkompass?style=for-the-badge&color=e8b923&labelColor=0a0a0c&label=⭐%20Stars" alt="GitHub stars"/>
</a>
&nbsp;
<a href="https://github.com/mabdullahab614-alt/studienkompass/network/members">
  <img src="https://img.shields.io/github/forks/mabdullahab614-alt/studienkompass?style=for-the-badge&color=3B82F6&labelColor=0a0a0c&label=🍴%20Forks" alt="GitHub forks"/>
</a>

- ⭐ Found this useful for your own Germany applications? A star helps other students find it
- 🐛 Spotted a bug or wrong-looking threshold? Open an [issue](https://github.com/mabdullahab614-alt/studienkompass/issues)

</div>

<br/>

---

<br/>

## 📄 License

🔒 **ALL RIGHTS RESERVED**

**All Rights Reserved © 2026 Abdullah Javid**

- 👀 Repository is publicly visible for **portfolio and demonstration purposes only**
- 🚫 No copying, modifying, distributing, sublicensing, or reuse — in whole or in part — without explicit written permission
- 🚫 Forking or cloning does **not** grant any usage rights

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
