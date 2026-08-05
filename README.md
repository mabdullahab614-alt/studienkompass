# Studienkompass

German public university eligibility checker for Pakistani students.
**100% HTML, CSS, and vanilla JavaScript — no frameworks, no build step,
no Node/npm required to run or test it.**

## Files

- `index.html` — markup
- `style.css` — all styles (CSS custom properties for theming)
- `scoring-engine.js` — the eligibility logic (seeded RNG, university
  database generation, scoring algorithm). Loaded before `script.js`.
- `script.js` — DOM/UI: rendering, form handling, filters, modal, etc.
- `test-framework.js` — a ~40-line vanilla JS test runner (no dependency)
- `scoring_tests.js` — unit tests for the scoring engine
- `test-runner.html` — open this in a browser to run the tests

## Running the site

Just open `index.html` in any browser. That's it — no install step.

(If your browser blocks local `<script src>` loading over `file://`, serve
the folder with any static server, e.g. `python3 -m http.server 8000` —
this is only a browser security quirk, not a project dependency.)

## Running the tests

Open `test-runner.html` in a browser. It loads `scoring-engine.js`,
runs 12 unit tests against it (RNG determinism, database integrity, score
clamping, status thresholds, sorting, field filtering), and renders a
pass/fail report on the page — no Node, no npm, no test framework
dependency.

## Notes on the data

University and city names are real. Every numeric admission threshold
(minimum percentage, IELTS/TOEFL cut-offs, TestAS requirement, fees, etc.)
is a **deterministically generated illustrative pattern**, not an
officially verified figure — see the in-app "About this data" note above
the results grid, and the comment header in `scoring-engine.js`. A
production deployment would need to sync these fields with each
university's own admissions office and/or uni-assist.

Before deploying, also update the placeholder domain used in
`index.html`'s `<link rel="canonical">` and Open Graph tags
(`studienkompass.example.com`) to your real domain.
