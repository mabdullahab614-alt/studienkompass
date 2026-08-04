/* ==========================================================================
   Studienkompass — scoring-engine.js
   Pure, DOM-free eligibility logic, extracted out of script.js so it can be
   unit-tested with plain Node (see tests/scoring.test.js) without needing a
   browser/DOM environment. Works as a plain <script> in the browser (attaches
   to window.ScoringEngine) and as a CommonJS module in Node (for tests).

   NOTE ON DATA: The university list below uses real German public
   university names and cities, but every numeric admission threshold
   (minimum percentage, IELTS/TOEFL cut-offs, TestAS requirement, etc.)
   is a DETERMINISTICALLY GENERATED PLACEHOLDER, not an official figure.
   A production build must sync these fields with each university's own
   admissions office and/or uni-assist, since requirements vary by
   institution and programme and change over time.
   ========================================================================== */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ScoringEngine = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
"use strict";

/* ---------------------------------------------------------------------
   1. SEEDED RANDOM (deterministic — same dataset every page load)
   --------------------------------------------------------------------- */
function makeRng(seed){
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function(){
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function seedFromString(str){
  let h = 0;
  for (let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h || 1;
}

/* ---------------------------------------------------------------------
   2. BASE DATA — real German public universities (name + city + state)
   --------------------------------------------------------------------- */
const BASE_UNIS = [
  ["RWTH Aachen University","Aachen","North Rhine-Westphalia"],
  ["Technical University of Munich","Munich","Bavaria"],
  ["Ludwig Maximilian University of Munich","Munich","Bavaria"],
  ["Humboldt University of Berlin","Berlin","Berlin"],
  ["Free University of Berlin","Berlin","Berlin"],
  ["Technical University of Berlin","Berlin","Berlin"],
  ["University of Stuttgart","Stuttgart","Baden-Württemberg"],
  ["Karlsruhe Institute of Technology","Karlsruhe","Baden-Württemberg"],
  ["University of Heidelberg","Heidelberg","Baden-Württemberg"],
  ["University of Freiburg","Freiburg","Baden-Württemberg"],
  ["University of Tübingen","Tübingen","Baden-Württemberg"],
  ["University of Mannheim","Mannheim","Baden-Württemberg"],
  ["University of Hohenheim","Stuttgart","Baden-Württemberg"],
  ["University of Ulm","Ulm","Baden-Württemberg"],
  ["Technical University of Darmstadt","Darmstadt","Hesse"],
  ["Goethe University Frankfurt","Frankfurt","Hesse"],
  ["University of Kassel","Kassel","Hesse"],
  ["University of Marburg","Marburg","Hesse"],
  ["University of Giessen","Giessen","Hesse"],
  ["Leibniz University Hannover","Hannover","Lower Saxony"],
  ["University of Göttingen","Göttingen","Lower Saxony"],
  ["Technical University of Braunschweig","Braunschweig","Lower Saxony"],
  ["University of Oldenburg","Oldenburg","Lower Saxony"],
  ["University of Osnabrück","Osnabrück","Lower Saxony"],
  ["University of Hildesheim","Hildesheim","Lower Saxony"],
  ["University of Cologne","Cologne","North Rhine-Westphalia"],
  ["University of Bonn","Bonn","North Rhine-Westphalia"],
  ["University of Düsseldorf","Düsseldorf","North Rhine-Westphalia"],
  ["Technical University of Dortmund","Dortmund","North Rhine-Westphalia"],
  ["University of Duisburg-Essen","Duisburg","North Rhine-Westphalia"],
  ["Bielefeld University","Bielefeld","North Rhine-Westphalia"],
  ["University of Münster","Münster","North Rhine-Westphalia"],
  ["University of Wuppertal","Wuppertal","North Rhine-Westphalia"],
  ["University of Paderborn","Paderborn","North Rhine-Westphalia"],
  ["University of Siegen","Siegen","North Rhine-Westphalia"],
  ["Ruhr University Bochum","Bochum","North Rhine-Westphalia"],
  ["Technical University of Kaiserslautern","Kaiserslautern","Rhineland-Palatinate"],
  ["University of Mainz","Mainz","Rhineland-Palatinate"],
  ["University of Trier","Trier","Rhineland-Palatinate"],
  ["Saarland University","Saarbrücken","Saarland"],
  ["Technical University of Dresden","Dresden","Saxony"],
  ["University of Leipzig","Leipzig","Saxony"],
  ["Chemnitz University of Technology","Chemnitz","Saxony"],
  ["Martin Luther University Halle-Wittenberg","Halle","Saxony-Anhalt"],
  ["Otto von Guericke University Magdeburg","Magdeburg","Saxony-Anhalt"],
  ["University of Rostock","Rostock","Mecklenburg-Vorpommern"],
  ["University of Greifswald","Greifswald","Mecklenburg-Vorpommern"],
  ["University of Kiel","Kiel","Schleswig-Holstein"],
  ["University of Lübeck","Lübeck","Schleswig-Holstein"],
  ["University of Hamburg","Hamburg","Hamburg"],
  ["Hamburg University of Technology","Hamburg","Hamburg"],
  ["University of Bremen","Bremen","Bremen"],
  ["University of Bayreuth","Bayreuth","Bavaria"],
  ["University of Würzburg","Würzburg","Bavaria"],
  ["University of Erlangen-Nuremberg","Erlangen","Bavaria"],
  ["University of Regensburg","Regensburg","Bavaria"],
  ["University of Augsburg","Augsburg","Bavaria"],
  ["University of Passau","Passau","Bavaria"],
  ["University of Bamberg","Bamberg","Bavaria"],
  ["Technical University of Munich - Weihenstephan","Freising","Bavaria"],
  ["Berlin School of Economics and Law","Berlin","Berlin"],
  ["HTW Berlin","Berlin","Berlin"],
  ["Munich University of Applied Sciences","Munich","Bavaria"],
  ["Stuttgart Media University","Stuttgart","Baden-Württemberg"],
  ["Frankfurt University of Applied Sciences","Frankfurt","Hesse"],
  ["Cologne University of Applied Sciences","Cologne","North Rhine-Westphalia"],
  ["Aachen University of Applied Sciences","Aachen","North Rhine-Westphalia"],
  ["Hamburg University of Applied Sciences","Hamburg","Hamburg"],
  ["Esslingen University of Applied Sciences","Esslingen","Baden-Württemberg"],
  ["Offenburg University of Applied Sciences","Offenburg","Baden-Württemberg"],
  ["Reutlingen University","Reutlingen","Baden-Württemberg"],
  ["Furtwangen University","Furtwangen","Baden-Württemberg"],
  ["Rhine-Waal University of Applied Sciences","Kleve","North Rhine-Westphalia"],
  ["South Westphalia University of Applied Sciences","Iserlohn","North Rhine-Westphalia"],
  ["Bochum University of Applied Sciences","Bochum","North Rhine-Westphalia"],
  ["Deggendorf Institute of Technology","Deggendorf","Bavaria"],
  ["Ingolstadt University of Applied Sciences","Ingolstadt","Bavaria"],
  ["Coburg University of Applied Sciences","Coburg","Bavaria"],
  ["Jena University of Applied Sciences","Jena","Thuringia"],
  ["Friedrich Schiller University Jena","Jena","Thuringia"],
  ["Technical University of Ilmenau","Ilmenau","Thuringia"],
  ["Bauhaus-University Weimar","Weimar","Thuringia"],
  ["Anhalt University of Applied Sciences","Köthen","Saxony-Anhalt"],
  ["Flensburg University of Applied Sciences","Flensburg","Schleswig-Holstein"],
  ["Kiel University of Applied Sciences","Kiel","Schleswig-Holstein"],
  ["Emden/Leer University of Applied Sciences","Emden","Lower Saxony"],
  ["Ostfalia University of Applied Sciences","Wolfenbüttel","Lower Saxony"],
  ["University of Hannover — HsH","Hannover","Lower Saxony"],
  ["University of Applied Sciences Bremen","Bremen","Bremen"],
  ["University of Applied Sciences Trier","Trier","Rhineland-Palatinate"],
  ["Koblenz University of Applied Sciences","Koblenz","Rhineland-Palatinate"],
  ["Worms University of Applied Sciences","Worms","Rhineland-Palatinate"],
  ["Bingen University of Applied Sciences","Bingen","Rhineland-Palatinate"],
  ["Zwickau University of Applied Sciences","Zwickau","Saxony"],
  ["Mittweida University of Applied Sciences","Mittweida","Saxony"],
  ["HTW Dresden","Dresden","Saxony"],
  ["Merseburg University of Applied Sciences","Merseburg","Saxony-Anhalt"],
  ["Stralsund University of Applied Sciences","Stralsund","Mecklenburg-Vorpommern"],
  ["Wismar University of Applied Sciences","Wismar","Mecklenburg-Vorpommern"],
  ["University of Potsdam","Potsdam","Brandenburg"],
  ["Brandenburg University of Technology","Cottbus","Brandenburg"],
  ["Technical University of Berlin — Beuth","Berlin","Berlin"],
  ["University of Vechta","Vechta","Lower Saxony"],
  ["Clausthal University of Technology","Clausthal","Lower Saxony"],
  ["University of Konstanz","Konstanz","Baden-Württemberg"],
  ["Pforzheim University","Pforzheim","Baden-Württemberg"],
  ["Mannheim University of Applied Sciences","Mannheim","Baden-Württemberg"],
  ["Karlsruhe University of Applied Sciences","Karlsruhe","Baden-Württemberg"],
  ["Ravensburg-Weingarten University of Applied Sciences","Weingarten","Baden-Württemberg"],
  ["Rosenheim Technical University of Applied Sciences","Rosenheim","Bavaria"],
  ["Kempten University of Applied Sciences","Kempten","Bavaria"],
  ["Landshut University of Applied Sciences","Landshut","Bavaria"],
  ["Nuremberg Tech","Nuremberg","Bavaria"],
  ["Amberg-Weiden University of Applied Sciences","Amberg","Bavaria"],
  ["Hof University of Applied Sciences","Hof","Bavaria"],
  ["Neu-Ulm University of Applied Sciences","Neu-Ulm","Bavaria"],
  ["Schmalkalden University of Applied Sciences","Schmalkalden","Thuringia"],
  ["Erfurt University of Applied Sciences","Erfurt","Thuringia"],
  ["University of Erfurt","Erfurt","Thuringia"]
];

const PROGRAM_POOL = {
  "Computer Science":["B.Sc. Computer Science","B.Sc. Informatics"],
  "Artificial Intelligence":["B.Sc. Artificial Intelligence","B.Sc. AI & Data Engineering"],
  "Software Engineering":["B.Sc. Software Engineering","B.Sc. Applied Computer Science"],
  "Data Science":["B.Sc. Data Science","B.Sc. Data Engineering & Analytics"],
  "Mechanical Engineering":["B.Sc. Mechanical Engineering","B.Eng. Mechanical Engineering"],
  "Electrical Engineering":["B.Sc. Electrical Engineering","B.Eng. Electrical & Computer Engineering"],
  "Civil Engineering":["B.Sc. Civil Engineering","B.Eng. Civil & Structural Engineering"],
  "Business":["B.Sc. International Business","B.A. Business Administration"],
  "Finance":["B.Sc. Finance & Accounting","B.Sc. Business & Finance"]
};
const FIELD_KEYS = Object.keys(PROGRAM_POOL);

const REQUIRED_DOC_POOL = ["Passport copy","Matric certificate","FSC certificate","IELTS/TOEFL certificate",
  "Letter of Motivation","CV / Resume","Two recommendation letters","APS certificate","Attested transcripts"];

/* ---------------------------------------------------------------------
   3. GENERATE UNIVERSITY DATABASE (deterministic pseudo-random spread)
   --------------------------------------------------------------------- */
function generateDatabase(){
  return BASE_UNIS.map(([name, city, state], idx)=>{
    const rng = makeRng(seedFromString(name + city + idx));
    const isTU = /Technical|Institute of Technology|TU |RWTH|Ingenieur/i.test(name);
    const isAppliedSci = /University of Applied Sciences|Tech$|Hochschule|HTW|HsH/i.test(name);

    // pick 2-4 programs from the pool
    const fieldsShuffled = [...FIELD_KEYS].sort(()=>rng()-0.5);
    const numPrograms = 2 + Math.floor(rng()*3);
    const chosenFields = fieldsShuffled.slice(0, numPrograms);
    const programs = chosenFields.map(f => PROGRAM_POOL[f][Math.floor(rng()*PROGRAM_POOL[f].length)]);

    const minimumPercentage = Math.round(60 + rng()*22); // 60–82%
    const minimumIELTS = [6.0,6.5,7.0][Math.floor(rng()*3)];
    const minimumTOEFL = Math.round(minimumIELTS*13 + 5); // rough correlate
    const TestASRequired = isTU ? rng() < 0.7 : rng() < 0.35;
    const SATRequired = rng() < 0.15;
    const ranking = Math.round(1 + rng()*400);
    const semesterFee = Math.round(120 + rng()*260); // admin/semester ticket fee, tuition-free
    const scholarshipAvailable = rng() < 0.55;

    return {
      id: idx+1,
      name, city, state,
      fields: chosenFields,
      programs,
      minimumPercentage,
      minimumIELTS,
      minimumTOEFL,
      TestASRequired,
      SATRequired,
      german: isAppliedSci ? (rng()<0.4 ? "A2" : "None") : (rng()<0.25 ? "A2" : "None"),
      english: true,
      public: true,
      deadlineWinter: "July 15",
      deadlineSummer: "January 15",
      tuition: "Mostly Free (public university)",
      semesterFee: `€${semesterFee}`,
      ranking,
      // A guessed domain (e.g. "rwthaachen.de") is unreliable across 130+
      // entries and breaks easily. Rather than fabricate a URL, we store a
      // search query and are explicit in the UI that this opens a search,
      // not a direct link to the university's own site.
      officialSiteSearchQuery: `${name} official website admissions`,
      requiredDocuments: REQUIRED_DOC_POOL.filter(()=>rng()<0.72).length ? REQUIRED_DOC_POOL.filter(()=>rng()<0.72) : REQUIRED_DOC_POOL.slice(0,5),
      scholarshipAvailable,
      isTU
    };
  });
}

const UNIVERSITIES = generateDatabase();

/* ---------------------------------------------------------------------
   4. ELIGIBILITY ENGINE
   --------------------------------------------------------------------- */
function scoreUniversity(student, uni){
  if (!uni.fields.includes(student.field)) return null; // not offering the field at all

  let score = 0;
  const reasons = [];
  const maxScore = 100;

  // Academic percentage — 40 points
  const pctGap = student.overallPct - uni.minimumPercentage;
  if (pctGap >= 10) score += 40;
  else if (pctGap >= 0) score += 32;
  else if (pctGap >= -5) { score += 18; reasons.push(`Overall percentage is close but below the ~${uni.minimumPercentage}% pattern for this university`); }
  else { score += 4; reasons.push(`Overall percentage is well below the ~${uni.minimumPercentage}% pattern — higher percentage required`); }

  // English proficiency — 25 points (best of IELTS/TOEFL)
  const ieltsOk = student.ielts >= uni.minimumIELTS;
  const toeflOk = student.toefl >= uni.minimumTOEFL;
  if (ieltsOk || toeflOk) score += 25;
  else if (student.ielts >= uni.minimumIELTS - 0.5 || student.toefl >= uni.minimumTOEFL - 8) {
    score += 14; reasons.push(`IELTS/TOEFL slightly below the ~${uni.minimumIELTS} band requirement`);
  } else {
    score += 2; reasons.push(`IELTS too low — this university's pattern expects around IELTS ${uni.minimumIELTS} or equivalent TOEFL`);
  }
  if (student.ielts === 0 && student.toefl === 0) reasons.push("No IELTS or TOEFL score on record yet");

  // TestAS — 15 points
  if (uni.TestASRequired){
    if (student.testAs >= 90) score += 15;
    else if (student.testAs > 0) { score += 6; reasons.push("TestAS score is on the lower side for this university's pattern"); }
    else { score += 0; reasons.push("Need TestAS — this university typically expects it for international applicants"); }
  } else {
    score += 10; // not required, small bonus for simplicity
  }

  // SAT — 10 points
  if (uni.SATRequired){
    if (student.sat >= 1200) score += 10;
    else if (student.sat > 0) { score += 4; reasons.push("SAT score is below the typical competitive range"); }
    else { score += 0; reasons.push("SAT recommended for this university and not yet on record"); }
  } else {
    score += 7;
  }

  // German language — 10 points
  const germanLevels = ["None","A1","A2","B1","B2","C1","C2"];
  const studentLevel = germanLevels.indexOf(student.german);
  const requiredLevel = germanLevels.indexOf(uni.german);
  if (studentLevel >= requiredLevel) score += 10;
  else { score += 3; reasons.push(`German language requirement not met — this pattern expects at least ${uni.german}`); }

  // Documents nudge (soft — informational only, doesn't gate score heavily)
  if (student.overallPct < uni.minimumPercentage - 15){
    reasons.push("Profile may need a Studienkolleg (preparatory) pathway before direct BS admission");
  }

  score = Math.max(2, Math.min(98, Math.round(score)));

  let status = "not";
  if (score >= 72) status = "eligible";
  else if (score >= 45) status = "conditional";

  if (status === "eligible" && reasons.length === 0) reasons.push("Profile matches this university's typical admission pattern");

  return { uni, score, status, reasons: reasons.slice(0,4) };
}

function runEligibility(student){
  return UNIVERSITIES
    .map(u => scoreUniversity(student, u))
    .filter(Boolean)
    .sort((a,b)=> b.score - a.score);
}

return {
  makeRng,
  seedFromString,
  BASE_UNIS,
  PROGRAM_POOL,
  FIELD_KEYS,
  REQUIRED_DOC_POOL,
  generateDatabase,
  UNIVERSITIES,
  scoreUniversity,
  runEligibility
};

});
