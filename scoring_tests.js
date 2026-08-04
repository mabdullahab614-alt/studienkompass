/* ==========================================================================
   scoring.tests.js — unit tests for scoring-engine.js
   Pure browser JS. Include after test-framework.js and scoring-engine.js.
   Open test-runner.html to run them (no Node, no npm, no build step).
   ========================================================================== */

(function () {
  "use strict";

  const { test, assertTrue, assertEqual, assertDeepEqual, assertNotEqual } = window.TestFramework;
  const Engine = window.ScoringEngine;
  const { makeRng, seedFromString, UNIVERSITIES, scoreUniversity, runEligibility } = Engine;

  function baseStudent(overrides) {
    return Object.assign(
      {
        field: "Computer Science",
        overallPct: 80,
        ielts: 7,
        toefl: 0,
        testAs: 0,
        sat: 0,
        german: "None",
      },
      overrides || {}
    );
  }

  test("makeRng is deterministic for the same seed", () => {
    const rngA = makeRng(42);
    const rngB = makeRng(42);
    const seqA = [rngA(), rngA(), rngA()];
    const seqB = [rngB(), rngB(), rngB()];
    assertDeepEqual(seqA, seqB);
  });

  test("makeRng produces values in [0, 1)", () => {
    const rng = makeRng(seedFromString("test-seed"));
    for (let i = 0; i < 50; i++) {
      const v = rng();
      assertTrue(v >= 0 && v < 1, `expected ${v} to be in [0,1)`);
    }
  });

  test("seedFromString is stable and non-zero for a given string", () => {
    assertEqual(seedFromString("RWTH Aachen"), seedFromString("RWTH Aachen"));
    assertNotEqual(seedFromString(""), 0);
  });

  test("the generated database is non-empty and every entry has required fields", () => {
    assertTrue(UNIVERSITIES.length > 100, "expected 100+ universities");
    UNIVERSITIES.forEach((uni) => {
      assertTrue(!!(uni.name && uni.city && uni.state), `missing name/city/state on ${uni.name}`);
      assertTrue(Array.isArray(uni.fields) && uni.fields.length > 0);
      assertTrue(uni.minimumPercentage >= 60 && uni.minimumPercentage <= 82);
      assertTrue([6.0, 6.5, 7.0].indexOf(uni.minimumIELTS) !== -1);
      assertTrue(
        typeof uni.officialSiteSearchQuery === "string" && uni.officialSiteSearchQuery.length > 0
      );
    });
  });

  test("database generation is deterministic across repeated calls", () => {
    const first = Engine.generateDatabase();
    const second = Engine.generateDatabase();
    assertEqual(first.length, second.length);
    assertDeepEqual(
      first.map((u) => u.minimumPercentage),
      second.map((u) => u.minimumPercentage)
    );
  });

  test("scoreUniversity returns null when the university doesn't offer the student's field", () => {
    const uni = UNIVERSITIES.find((u) => u.fields.indexOf("Finance") === -1);
    assertTrue(!!uni, "test fixture assumption failed: no university excludes Finance");
    const result = scoreUniversity(baseStudent({ field: "Finance" }), uni);
    assertEqual(result, null);
  });

  test("a strong profile scores higher than a weak profile at the same university", () => {
    const uni = UNIVERSITIES.find((u) => u.fields.indexOf("Computer Science") !== -1);
    const strong = scoreUniversity(
      baseStudent({ overallPct: 95, ielts: 7.5, testAs: 110, german: "B1" }),
      uni
    );
    const weak = scoreUniversity(
      baseStudent({ overallPct: 55, ielts: 5.0, testAs: 0, german: "None" }),
      uni
    );
    assertTrue(strong.score > weak.score, `expected strong (${strong.score}) > weak (${weak.score})`);
  });

  test("score is always clamped between 2 and 98", () => {
    const uni = UNIVERSITIES.find((u) => u.fields.indexOf("Computer Science") !== -1);
    const maxed = scoreUniversity(
      baseStudent({ overallPct: 100, ielts: 9, testAs: 120, sat: 1600, german: "C2" }),
      uni
    );
    const minned = scoreUniversity(
      baseStudent({ overallPct: 0, ielts: 0, toefl: 0, testAs: 0, sat: 0, german: "None" }),
      uni
    );
    assertTrue(maxed.score <= 98);
    assertTrue(minned.score >= 2);
  });

  test("status thresholds: eligible >= 72, conditional >= 45, else not eligible", () => {
    const uni = UNIVERSITIES.find((u) => u.fields.indexOf("Computer Science") !== -1);
    const result = scoreUniversity(baseStudent({ overallPct: 95, ielts: 7.5, testAs: 110 }), uni);
    if (result.score >= 72) assertEqual(result.status, "eligible");
    else if (result.score >= 45) assertEqual(result.status, "conditional");
    else assertEqual(result.status, "not");
  });

  test("runEligibility only returns universities offering the student's field, sorted by score descending", () => {
    const student = baseStudent();
    const results = runEligibility(student);
    assertTrue(results.length > 0);
    results.forEach((r) => assertTrue(r.uni.fields.indexOf(student.field) !== -1));
    for (let i = 1; i < results.length; i++) {
      assertTrue(results[i - 1].score >= results[i].score, "results must be sorted by score desc");
    }
  });

  test("runEligibility returns an empty list for a field no university offers", () => {
    const results = runEligibility(baseStudent({ field: "Astrology" }));
    assertEqual(results.length, 0);
  });

  test("reasons array never exceeds 4 entries", () => {
    const uni = UNIVERSITIES.find((u) => u.fields.indexOf("Computer Science") !== -1);
    const result = scoreUniversity(
      baseStudent({ overallPct: 0, ielts: 0, toefl: 0, testAs: 0, sat: 0, german: "None" }),
      uni
    );
    assertTrue(result.reasons.length <= 4);
  });
})();
