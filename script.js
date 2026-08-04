/* ==========================================================================
   Studienkompass — script.js
   Pure vanilla JS. No frameworks, no backend, no network calls.

   The eligibility scoring engine (seeded RNG, university database
   generation, and the scoring algorithm itself) now lives in
   scoring-engine.js, loaded before this file. It's DOM-free so it can be
   unit-tested directly with Node (see tests/scoring.test.js). This file
   consumes it via the ScoringEngine global and handles everything DOM/UI.
   ========================================================================== */

(function(){
"use strict";

const { UNIVERSITIES, scoreUniversity, runEligibility } = window.ScoringEngine;

/* ---------------------------------------------------------------------
   ICON LIBRARY — stroke-based SVG icons (Lucide, ISC licensed), used
   instead of emoji so icons render consistently across every OS/browser
   and stay crisp at any size. This is DOM/rendering-related, so it lives
   here in script.js rather than in the DOM-free scoring-engine.js.
   --------------------------------------------------------------------- */
const ICONS = {
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  trendingUp: '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  graduationCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  clipboardList: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  calendarDays: '<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  medal: '<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>',
  heartHandshake: '<path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>',
  flaskConical: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
  notebookPen: '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>'
};
function icon(name, size=22){
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;
}

/* ---------------------------------------------------------------------
   5. STATIC CONTENT — features / scholarships / visa / cost items
   --------------------------------------------------------------------- */
const FEATURES = [
  ["target","Smart Eligibility Checker","Score your profile against modeled admission patterns from 130+ public universities in seconds.","#C9202D"],
  ["bot","AI Recommendation Engine","Get a personalised shortlist — best match, safest choice, and dream reach universities.","#3D7EFF"],
  ["trendingUp","Admission Predictor","See a percentage-based admission chance for every program you qualify for.","#1F9D6B"],
  ["languages","English Programs","Every university on this platform teaches at least one English-taught BS program.","#D4A72C"],
  ["graduationCap","Scholarship Information","DAAD, merit and need-based scholarships relevant to Pakistani applicants.","#8B5CF6"],
  ["wallet","Cost Calculator","Estimate your real monthly budget — rent, insurance, food and transport.","#F97316"],
  ["clipboardList","Document Checklist","Track every certificate, translation and letter you'll need before applying.","#3D7EFF"],
  ["calendarDays","Application Timeline","Winter and Summer intake deadlines, mapped against your field of study.","#C9202D"],
  ["plane","Visa Guidance","A clear walk-through of the German National Visa (Type D) process.","#1F9D6B"]
];

const SCHOLARSHIPS = [
  ["graduationCap","DAAD Scholarships","Germany's national academic exchange service funds selected Bachelor's, Master's and PhD applicants each year — highly competitive, application-based.","Merit + Need","#D4A72C"],
  ["medal","Merit Scholarships","University-specific awards for applicants with outstanding matric/FSC results, often covering a portion of living costs.","Merit-based","#3D7EFF"],
  ["heartHandshake","Need-Based Scholarships","Foundations such as Deutschlandstipendium support students who can demonstrate financial need alongside solid academics.","Need-based","#1F9D6B"],
  ["flaskConical","Research Grants","Available mainly at Master's/PhD level, but some universities open early research assistantships to strong Bachelor's students.","Research","#8B5CF6"],
  ["notebookPen","Application Tips","Apply 6–9 months ahead of intake, tailor your motivation letter per university, and keep certified translations ready early.","Guidance","#C9202D"]
];

const VISA_STEPS = [
  ["1","Student Visa","Apply for the German National Visa (Type D) at the German consulate — Islamabad, Karachi or Lahore — once you hold an admission letter."],
  ["2","Blocked Account","Open a Sperrkonto and deposit the required annual living-cost amount before your visa interview; funds are released monthly once in Germany."],
  ["3","Health Insurance","Public health insurance (or provisional travel insurance for the visa stage) is mandatory before enrolment."],
  ["4","Residence Permit","Register your address (Anmeldung) and convert your visa into a residence permit at the local Ausländerbehörde within 90 days."],
  ["5","Accommodation","Apply to Studentenwerk dormitories early, or arrange a WG (shared flat) — proof of address is often needed for Anmeldung."]
];

const COST_ITEMS = [
  ["rent","Accommodation",0,500,300,"#3D7EFF"],
  ["food","Food & groceries",0,350,180,"#1F9D6B"],
  ["insurance","Health insurance",0,150,120,"#D4A72C"],
  ["transport","Transport pass",0,120,60,"#C9202D"],
  ["books","Books & supplies",0,100,30,"#8B5CF6"],
  ["misc","Personal / misc",0,200,80,"#F97316"]
];

const DOC_LIST = ["Passport","Passport-size photos","Matric certificate","FSC certificate","IELTS/TOEFL certificate",
  "SAT score report","TestAS score report","CV / Resume","Motivation letter","Recommendation letter",
  "APS certificate (if applicable)","Certified translations"];

/* ---------------------------------------------------------------------
   6. RENDER STATIC SECTIONS
   --------------------------------------------------------------------- */
function renderFeatures(){
  const grid = document.getElementById('featureGrid');
  grid.innerHTML = FEATURES.map(([iconKey,title,desc,color])=>`
    <div class="feature-card">
      <div class="feature-icon" style="background:${color}">${icon(iconKey)}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>`).join('');
}

function renderScholarships(){
  const grid = document.getElementById('scholarshipGrid');
  grid.innerHTML = SCHOLARSHIPS.map(([iconKey,title,desc,tag,color])=>`
    <div class="info-card glass">
      <h3><span class="info-icon" style="background:${color}">${icon(iconKey,18)}</span> ${title}</h3>
      <p>${desc}</p>
      <span class="tag" style="background:${color}">${tag}</span>
    </div>`).join('');
}

function renderVisa(){
  const grid = document.getElementById('visaGrid');
  grid.innerHTML = VISA_STEPS.map(([num,title,desc])=>`
    <div class="info-card glass">
      <h3><span class="step-badge">${num}</span> ${title}</h3>
      <p>${desc}</p>
    </div>`).join('');
}

function renderDocs(){
  const list = document.getElementById('docList');
  list.innerHTML = DOC_LIST.map((doc,i)=>`
    <li class="doc-item" data-idx="${i}">
      <input type="checkbox" id="doc${i}">
      <span>${doc}</span>
    </li>`).join('');
  updateDocProgress();
  list.querySelectorAll('.doc-item').forEach(item=>{
    item.addEventListener('click', (e)=>{
      if (e.target.tagName !== 'INPUT'){
        const cb = item.querySelector('input');
        cb.checked = !cb.checked;
      }
      item.classList.toggle('checked', item.querySelector('input').checked);
      updateDocProgress();
    });
  });
}
function updateDocProgress(){
  const boxes = document.querySelectorAll('#docList input');
  const checked = [...boxes].filter(b=>b.checked).length;
  document.getElementById('docProgressFill').style.width = `${boxes.length ? (checked/boxes.length*100) : 0}%`;
  document.getElementById('docProgressLabel').textContent = `${checked} of ${boxes.length} collected`;
}

function renderCostCalculator(){
  const wrap = document.getElementById('costInputs');
  wrap.innerHTML = COST_ITEMS.map(([key,label,min,max,val])=>`
    <div class="cost-row">
      <label for="cost-${key}">${label}</label>
      <input type="range" id="cost-${key}" min="${min}" max="${max}" value="${val}" data-key="${key}">
      <output for="cost-${key}">€${val}</output>
    </div>`).join('');
  wrap.querySelectorAll('input[type=range]').forEach(input=>{
    input.addEventListener('input', updateCostTotal);
  });
  updateCostTotal();
}
function updateCostTotal(){
  let total = 0;
  const bars = [];
  COST_ITEMS.forEach(([key,label,min,max,val,color])=>{
    const input = document.getElementById(`cost-${key}`);
    const v = Number(input.value);
    input.nextElementSibling.textContent = `€${v}`;
    total += v;
    bars.push({v,color});
  });
  document.getElementById('costTotal').textContent = `€${total}`;
  const bar = document.getElementById('costBar');
  bar.innerHTML = bars.map(b=>`<span style="width:${total ? (b.v/total*100) : 0}%;background:${b.color}"></span>`).join('');
}

/* ---------------------------------------------------------------------
   7. MULTI-STEP FORM
   --------------------------------------------------------------------- */
const form = document.getElementById('eligibilityForm');
let currentStep = 1;
const TOTAL_STEPS = 4;

const VALIDATORS = {
  fullName: v => v.trim().length >= 3 || "Enter your full name",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address",
  phone: v => v.trim().length >= 7 || "Enter a valid phone number",
  country: v => v.trim().length > 0 || "Required",
  passportCountry: v => v.trim().length > 0 || "Required",
  matricMarks: v => v !== "" && Number(v) >= 0 || "Enter obtained marks",
  matricTotal: v => v !== "" && Number(v) > 0 || "Enter total marks",
  fscMarks: v => v !== "" && Number(v) >= 0 || "Enter obtained marks",
  fscTotal: v => v !== "" && Number(v) > 0 || "Enter total marks",
  ielts: v => v !== "" && Number(v) >= 0 && Number(v) <= 9 || "0–9 range",
  toefl: v => v !== "" && Number(v) >= 0 && Number(v) <= 120 || "0–120 range",
  sat: v => v !== "" && Number(v) >= 0 && Number(v) <= 1600 || "0–1600 range",
  testAs: v => v !== "" && Number(v) >= 0 && Number(v) <= 130 || "0–130 range",
  german: v => v !== "" || "Select a level",
  field: v => v !== "" || "Select a field",
  budget: v => v !== "" && Number(v) >= 0 || "Enter a monthly budget",
  semester: v => v !== "" || "Select a semester"
};

function fieldsInStep(step){
  return [...form.querySelectorAll(`.form-step[data-step="${step}"] input, .form-step[data-step="${step}"] select`)]
    .filter(el => !el.readOnly);
}

function validateField(el){
  const validator = VALIDATORS[el.name];
  if (!validator) return true;
  const result = validator(el.value);
  const errorEl = el.parentElement.querySelector('.field-error');
  if (result === true){
    el.classList.remove('invalid');
    if (errorEl) errorEl.textContent = "";
    return true;
  } else {
    el.classList.add('invalid');
    if (errorEl) errorEl.textContent = result;
    return false;
  }
}

function validateStep(step){
  const els = fieldsInStep(step);
  let valid = true;
  els.forEach(el => { if (!validateField(el)) valid = false; });
  return valid;
}

function calcPercentages(){
  const mm = Number(document.getElementById('matricMarks').value) || 0;
  const mt = Number(document.getElementById('matricTotal').value) || 0;
  const fm = Number(document.getElementById('fscMarks').value) || 0;
  const ft = Number(document.getElementById('fscTotal').value) || 0;
  const matricPct = mt ? (mm/mt*100) : 0;
  const fscPct = ft ? (fm/ft*100) : 0;
  const overallPct = (mt && ft) ? (matricPct*0.25 + fscPct*0.75) : 0;
  document.getElementById('matricPct').value = mt ? matricPct.toFixed(2)+'%' : '';
  document.getElementById('fscPct').value = ft ? fscPct.toFixed(2)+'%' : '';
  document.getElementById('overallPct').value = (mt&&ft) ? overallPct.toFixed(2)+'%' : '';
  return overallPct;
}

['matricMarks','matricTotal','fscMarks','fscTotal'].forEach(id=>{
  document.getElementById(id).addEventListener('input', calcPercentages);
});

function goToStep(step){
  form.querySelectorAll('.form-step').forEach(fs=>{
    fs.classList.toggle('active', Number(fs.dataset.step) === step);
  });
  document.querySelectorAll('.fp-step').forEach(fp=>{
    const s = Number(fp.dataset.step);
    fp.classList.toggle('active', s === step);
    fp.classList.toggle('done', s < step);
  });
  document.getElementById('prevStep').disabled = step === 1;
  document.getElementById('nextStep').style.display = step === TOTAL_STEPS ? 'none' : 'inline-flex';
  document.getElementById('submitForm').style.display = step === TOTAL_STEPS ? 'inline-flex' : 'none';
  currentStep = step;
}

document.getElementById('nextStep').addEventListener('click', ()=>{
  if (!validateStep(currentStep)) { showToast("Please fix the highlighted fields"); return; }
  if (currentStep < TOTAL_STEPS) goToStep(currentStep+1);
});
document.getElementById('prevStep').addEventListener('click', ()=>{
  if (currentStep > 1) goToStep(currentStep-1);
});

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if (!validateStep(currentStep)) { showToast("Please fix the highlighted fields"); return; }

  const overallPct = calcPercentages();
  const fe = form.elements;
  const student = {
    fullName: fe.fullName.value,
    field: fe.field.value,
    overallPct,
    ielts: Number(fe.ielts.value)||0,
    toefl: Number(fe.toefl.value)||0,
    sat: Number(fe.sat.value)||0,
    testAs: Number(fe.testAs.value)||0,
    german: fe.german.value,
    budget: Number(fe.budget.value)||0,
    city: fe.city.value.trim(),
    semester: fe.semester.value
  };

  const results = runEligibility(student);
  renderResults(results, student);
  showToast(`Found ${results.length} matching universities for ${student.field}`);
  document.getElementById('results').scrollIntoView({behavior:'smooth', block:'start'});
});

// live validation on blur
form.querySelectorAll('input,select').forEach(el=>{
  el.addEventListener('blur', ()=> validateField(el));
});

/* ---------------------------------------------------------------------
   8. RESULTS RENDERING + FILTER/SORT/SEARCH
   --------------------------------------------------------------------- */
let lastResults = [];
let activeRecommend = null;

function ringSvg(score, size=52, stroke=7){
  const r = (size/2) - stroke;
  const c = 2*Math.PI*r;
  const offset = c - (score/100)*c;
  const color = score>=72 ? 'var(--green)' : score>=45 ? 'var(--amber)' : 'var(--red)';
  return `<svg viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${offset}" transform="rotate(-90 ${size/2} ${size/2})"/>
  </svg>`;
}

function statusBadge(status){
  if (status === 'eligible') return '<span class="badge badge-green">Eligible</span>';
  if (status === 'conditional') return '<span class="badge badge-yellow">Conditional</span>';
  return '<span class="badge badge-red">Not Eligible</span>';
}

function uniCardHTML(r, i){
  const { uni, score, status, reasons } = r;
  return `
    <article class="uni-card" style="animation-delay:${Math.min(i*0.04,0.4)}s">
      <div class="uni-card-top">
        <div>
          <p class="uni-name">${uni.name}</p>
          <p class="uni-loc">${uni.city}, ${uni.state}</p>
        </div>
        <div class="uni-ring">${ringSvg(score)}<span class="ring-val">${score}%</span></div>
      </div>
      ${statusBadge(status)}
      <div class="uni-meta">
        <div>Program: <b>${uni.programs[0]}</b></div>
        <div>Ranking: <b>#${uni.ranking}</b></div>
        <div>Deadline: <b>${uni.deadlineWinter} / ${uni.deadlineSummer}</b></div>
        <div>Tuition: <b>${uni.tuition}</b></div>
        <div>Semester fee: <b>${uni.semesterFee}</b></div>
        <div>Scholarship: <b>${uni.scholarshipAvailable ? 'Available' : 'Limited'}</b></div>
      </div>
      <ul class="uni-reasons">${reasons.map(r=>`<li>${r}</li>`).join('')}</ul>
      <div class="uni-actions">
        <button class="btn btn-primary btn-sm" data-apply="${uni.id}">Apply</button>
        <a class="btn btn-ghost btn-sm" href="https://www.google.com/search?q=${encodeURIComponent(uni.officialSiteSearchQuery)}" target="_blank" rel="noopener" title="Opens a web search for this university's official site — we don't store direct URLs">Search official site ↗</a>
      </div>
    </article>`;
}

function renderResults(results, student){
  lastResults = results;
  document.getElementById('resultsGrid').dataset.field = student.field;
  applyFiltersAndRender();
  renderDashStats(results);
  renderRecommendations(results, student);
}

function renderDashStats(results){
  const eligible = results.filter(r=>r.status==='eligible').length;
  const avg = results.length ? Math.round(results.reduce((a,r)=>a+r.score,0)/results.length) : 0;
  const max = results.length ? Math.max(...results.map(r=>r.score)) : 0;
  const min = results.length ? Math.min(...results.map(r=>r.score)) : 0;
  const english = results.filter(r=>r.uni.english).length;
  const stats = [
    ["Eligible universities", eligible],
    ["Average chance", avg+'%'],
    ["Highest chance", max+'%'],
    ["Lowest chance", min+'%'],
    ["Total matched", results.length],
    ["English programs", english]
  ];
  document.getElementById('dashStats').innerHTML = stats.map(([label,val])=>`
    <div class="dash-stat glass"><span>${label}</span><strong>${val}</strong></div>`).join('');
}

function renderRecommendations(results, student){
  if (!results.length) { document.getElementById('recommendRow').innerHTML=''; return; }
  const byChance = [...results].sort((a,b)=>b.score-a.score);
  const safest = byChance.find(r=>r.status==='eligible' && r.score>=85) || byChance[0];
  const dream = [...results].sort((a,b)=>a.uni.ranking-b.uni.ranking)[0];
  const budgetFriendly = [...results].sort((a,b)=> parseInt(a.uni.semesterFee.replace(/\D/g,'')) - parseInt(b.uni.semesterFee.replace(/\D/g,'')))[0];
  const highestRanked = dream;
  const recs = [
    ["Best Match", byChance[0]],
    ["Highest Chance", byChance[0]],
    ["Safest Choice", safest],
    ["Dream University", dream],
    ["Budget Friendly", budgetFriendly],
    ["Highest Ranked", highestRanked]
  ];
  const seen = new Set();
  const chips = recs.filter(([label,r])=>{
    const key = label+r.uni.id; if (seen.has(label)) return false; seen.add(label); return true;
  });
  document.getElementById('recommendRow').innerHTML = chips.map(([label,r])=>
    `<button class="chip" data-uni="${r.uni.id}">${label} → ${r.uni.name.split(' ').slice(0,3).join(' ')}</button>`).join('');
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const card = document.querySelector(`[data-apply="${chip.dataset.uni}"]`);
      if (card){ card.closest('.uni-card').scrollIntoView({behavior:'smooth',block:'center'}); card.closest('.uni-card').style.borderColor='var(--gold)'; setTimeout(()=>card.closest('.uni-card').style.borderColor='',1200); }
    });
  });
}

function applyFiltersAndRender(){
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const statusFilter = document.getElementById('filterStatus').value;
  const sortBy = document.getElementById('sortBy').value;

  let list = lastResults.filter(r=>{
    const matchesSearch = !search || r.uni.name.toLowerCase().includes(search) || r.uni.city.toLowerCase().includes(search);
    const matchesStatus = statusFilter==='all' || r.status===statusFilter;
    return matchesSearch && matchesStatus;
  });

  list = [...list].sort((a,b)=>{
    if (sortBy==='chance-desc') return b.score-a.score;
    if (sortBy==='chance-asc') return a.score-b.score;
    if (sortBy==='name') return a.uni.name.localeCompare(b.uni.name);
    if (sortBy==='fee') return parseInt(a.uni.semesterFee.replace(/\D/g,'')) - parseInt(b.uni.semesterFee.replace(/\D/g,''));
    return 0;
  });

  const grid = document.getElementById('resultsGrid');
  grid.innerHTML = list.length ? list.map(uniCardHTML).join('') : '<p class="empty-state">No universities match your filters. Try adjusting search or status.</p>';
}

['searchInput'].forEach(id=> document.getElementById(id).addEventListener('input', applyFiltersAndRender));
['filterStatus','sortBy'].forEach(id=> document.getElementById(id).addEventListener('change', applyFiltersAndRender));

document.addEventListener('click', (e)=>{
  const applyBtn = e.target.closest('[data-apply]');
  if (applyBtn) showToast("This is a demo — apply directly via the university's official admissions portal.");
});

/* ---------------------------------------------------------------------
   9. NAV, THEME, REVEAL, COUNTERS, MODAL, TOAST
   --------------------------------------------------------------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', ()=>{
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const h = document.documentElement;
  const progress = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight||document.body.scrollHeight) - h.clientHeight) * 100;
  progressLine.style.width = progress + '%';
}, {passive:true});

const progressLine = document.createElement('div');
progressLine.className = 'progress-line';
document.body.appendChild(progressLine);

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function setTheme(t){ root.setAttribute('data-theme', t); try{localStorage.setItem('sk-theme', t)}catch(e){} }
themeToggle.addEventListener('click', ()=>{
  setTheme(root.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
});
(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem('sk-theme'); }catch(e){}
  if (saved) setTheme(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
})();

const navBurger = document.getElementById('navBurger');
navBurger.addEventListener('click', ()=>{
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  links.style.display = isOpen ? 'none' : 'flex';
  links.style.cssText += isOpen ? '' : 'position:absolute;top:64px;left:0;right:0;flex-direction:column;background:var(--bg-elevated);padding:20px 6vw;border-bottom:1px solid var(--border);';
  navBurger.classList.toggle('open', !isOpen);
});

// count-up stats
function countUp(el){
  const target = Number(el.dataset.count);
  const dur = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min(1, (now-start)/dur);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(target*eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.querySelectorAll('.stat-num').forEach(countUp);
      statObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.4});
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// hero ring animation
window.addEventListener('load', ()=>{
  const fill = document.getElementById('heroRingFill');
  const val = document.getElementById('heroRingValue');
  const target = 95;
  const c = 2*Math.PI*52;
  fill.style.strokeDasharray = c;
  requestAnimationFrame(()=>{
    fill.style.strokeDashoffset = c - (target/100)*c;
  });
  let n = 0;
  const t = setInterval(()=>{ n++; val.textContent = n+'%'; if (n>=target) clearInterval(t); }, 14);
});

// scroll reveal for feature cards
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
  });
}, {threshold:0.15});

function observeFeatureCards(){
  document.querySelectorAll('.feature-card').forEach(card=> revealObserver.observe(card));
}

// universal scroll-reveal for section headings, toolbars, shells and grids
function observeRevealElements(){
  document.querySelectorAll('.reveal-up, .reveal-stagger').forEach(el=> revealObserver.observe(el));
}

// scrollspy — highlight the nav link for the section currently in view
const navLinkMap = new Map();
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link=>{
  const id = link.getAttribute('href').slice(1);
  const section = document.getElementById(id);
  if (section) navLinkMap.set(section, link);
});
const spyObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const link = navLinkMap.get(entry.target);
    if (!link) return;
    if (entry.isIntersecting){
      document.querySelectorAll('.nav-links a.active').forEach(a=>a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {rootMargin:'-45% 0px -50% 0px', threshold:0});
function initScrollspy(){
  navLinkMap.forEach((link, section)=> spyObserver.observe(section));
}

// subtle parallax on the hero glow shapes as the page scrolls
const floatShapes = document.querySelectorAll('.float-shape');
let parallaxTicking = false;
function updateParallax(){
  const y = window.scrollY;
  floatShapes.forEach((shape, i)=>{
    const speed = 0.06 + (i * 0.03);
    shape.style.transform = `translateY(${y * speed}px)`;
  });
  parallaxTicking = false;
}
window.addEventListener('scroll', ()=>{
  if (!parallaxTicking){ requestAnimationFrame(updateParallax); parallaxTicking = true; }
}, {passive:true});

// back-to-top button
const backToTop = document.getElementById('backToTop');
if (backToTop){
  window.addEventListener('scroll', ()=>{
    backToTop.classList.toggle('show', window.scrollY > 600);
  }, {passive:true});
  backToTop.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// click feedback on buttons — ripple fill + shockwave ring + pop/flash
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.btn, .footer-social-btn, .footer-link-btn');
  if (!btn || btn.disabled) return;
  const rect = btn.getBoundingClientRect();
  const originX = (e.clientX ?? rect.left + rect.width/2) - rect.left;
  const originY = (e.clientY ?? rect.top + rect.height/2) - rect.top;

  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size+'px';
  ripple.style.left = (originX - size/2)+'px';
  ripple.style.top = (originY - size/2)+'px';
  btn.appendChild(ripple);

  const shock = document.createElement('span');
  shock.className = 'btn-shock';
  shock.style.left = originX+'px';
  shock.style.top = originY+'px';
  btn.appendChild(shock);

  btn.classList.remove('is-pressed');
  // reflow so the animation restarts on rapid repeat clicks
  void btn.offsetWidth;
  btn.classList.add('is-pressed');

  setTimeout(()=>ripple.remove(), 650);
  setTimeout(()=>shock.remove(), 600);
  setTimeout(()=>btn.classList.remove('is-pressed'), 450);
});

// toast
let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 3200);
}

// modal (footer links)
const MODAL_CONTENT = {
  about: ["About Studienkompass","An independent, frontend-only tool that helps Pakistani students estimate their admission chances at German public universities. All eligibility logic runs locally in your browser — nothing is uploaded."],
  privacy: ["Privacy","This demo does not send your form data to any server. Everything is calculated client-side and disappears when you close the tab."],
  terms: ["Terms","Results are illustrative estimates based on generalized patterns, not official decisions. Always confirm requirements with the university or uni-assist before applying."],
  contact: ["Contact","This is a portfolio/demo project. For real admissions questions, reach out to the university's international office or uni-assist directly."]
};
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBox = document.getElementById('modalBox');
const modalCloseBtn = document.getElementById('modalClose');
let lastFocusedBeforeModal = null;

function getFocusableInModal(){
  return Array.from(modalBox.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);
}

function openModal(title, body){
  document.getElementById('modalContent').innerHTML = `<h3 id="modalTitle">${title}</h3><p>${body}</p>`;
  lastFocusedBeforeModal = document.activeElement;
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  // move focus into the dialog for screen-reader / keyboard users
  requestAnimationFrame(()=> modalCloseBtn.focus());
  document.addEventListener('keydown', onModalKeydown);
}

function closeModal(){
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onModalKeydown);
  // return focus to whatever triggered the modal
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function'){
    lastFocusedBeforeModal.focus();
  }
}

function onModalKeydown(e){
  if (e.key === 'Escape'){
    e.preventDefault();
    closeModal();
    return;
  }
  if (e.key === 'Tab'){
    // trap focus inside the dialog
    const focusable = getFocusableInModal();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }
}

document.querySelectorAll('[data-modal]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const [title, body] = MODAL_CONTENT[link.dataset.modal];
    openModal(title, body);
  });
});
modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e)=>{
  if (e.target.id === 'modalBackdrop') closeModal();
});

/* ---------------------------------------------------------------------
   10. INIT
   --------------------------------------------------------------------- */
function init(){
  renderFeatures();
  renderScholarships();
  renderVisa();
  renderDocs();
  renderCostCalculator();
  goToStep(1);
  observeFeatureCards();
  observeRevealElements();
  initScrollspy();
}
document.addEventListener('DOMContentLoaded', init);

})();
