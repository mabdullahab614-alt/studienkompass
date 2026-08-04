/* ==========================================================================
   test-framework.js — a ~40-line vanilla JS test runner.
   No Node, no npm, no dependencies. Just functions + the DOM.
   Include this before your test file(s), then include the test file(s),
   then call runTests() once the DOM is ready.
   ========================================================================== */

(function (root) {
  "use strict";

  const registered = [];
  let passCount = 0;
  let failCount = 0;

  function test(name, fn) {
    registered.push({ name, fn });
  }

  function assertTrue(condition, message) {
    if (!condition) throw new Error(message || "Expected condition to be true");
  }

  function assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(
        message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
      );
    }
  }

  function assertDeepEqual(actual, expected, message) {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a !== b) {
      throw new Error(message || `Expected ${b} but got ${a}`);
    }
  }

  function assertNotEqual(actual, expected, message) {
    if (actual === expected) {
      throw new Error(message || `Expected value to differ from ${JSON.stringify(expected)}`);
    }
  }

  function runTests(outputEl) {
    passCount = 0;
    failCount = 0;
    const results = [];

    for (const { name, fn } of registered) {
      try {
        fn();
        passCount++;
        results.push({ name, pass: true });
      } catch (err) {
        failCount++;
        results.push({ name, pass: false, error: err.message });
      }
    }

    if (outputEl) render(outputEl, results);
    return { passCount, failCount, results };
  }

  function render(outputEl, results) {
    const total = results.length;
    const summary = document.createElement("div");
    summary.className = "test-summary " + (failCount === 0 ? "test-summary-pass" : "test-summary-fail");
    summary.textContent = `${passCount} / ${total} tests passed`;
    outputEl.appendChild(summary);

    const list = document.createElement("ul");
    list.className = "test-list";
    results.forEach((r) => {
      const li = document.createElement("li");
      li.className = "test-item " + (r.pass ? "test-pass" : "test-fail");
      li.textContent = (r.pass ? "✓ " : "✗ ") + r.name + (r.error ? ` — ${r.error}` : "");
      list.appendChild(li);
    });
    outputEl.appendChild(list);
  }

  root.TestFramework = { test, assertTrue, assertEqual, assertDeepEqual, assertNotEqual, runTests };
})(typeof window !== "undefined" ? window : this);
