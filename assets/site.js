// 논문 목록 (홈 대표 논문, 논문 페이지에서 함께 사용)
const PUBS = [
  {y:2026, a:"Yoo, S., Kim, S., <strong>Lim, K.</strong>, & Lee, Y.", t:"Training investment indicators beyond cost", j:"International Journal of Human Resource Management", v:"", tags:[], featured:true},
  {y:2026, a:"<strong>임경애</strong>", t:"2차 베이비부머 근로자의 일중독과 직무만족의 관계", j:"HRD연구", v:"28(3)", tags:[]},
  {y:2026, a:"<strong>임경애</strong>", t:"2차 베이비부머 임금근로자의 직무만족 종단적 변화와 영향요인 분석", j:"평생교육·HRD연구", v:"22(3)", tags:["종단분석"]},
  {y:2026, a:"<strong>임경애</strong>, 이윤수", t:"랜덤 포레스트를 활용한 저경력 교사의 이직 의도 예측 요인 분석", j:"한국교원교육연구", v:"43(1)", tags:["머신러닝"]},
  {y:2026, a:"<strong>임경애</strong>, 임주형, 배수완, 이윤수", t:"랜덤 포레스트를 활용한 과학기술인의 주관적 경력 성공 예측 요인 분석", j:"역량개발학습연구", v:"21(1)", tags:["머신러닝"]},
  {y:2026, a:"남민지, 이윤수, <strong>임경애</strong>", t:"도움제공 행동, 도움요청 행동 및 감정 노동의 잠재 프로파일 분석", j:"한국심리학회지: 산업 및 조직", v:"39(1)", tags:["잠재프로파일"]},
  {y:2025, a:"<strong>임경애</strong>, 이윤수", t:"대학 교수의 직무 만족 유형에 따른 조직 몰입 수준 차이", j:"한국교원교육연구", v:"42(2)", tags:[]},
  {y:2025, a:"Yoo, S., Lee, Y., Jung, B., & <strong>Lim, K.</strong>", t:"Cultivating “good work”: validating organizational culture profile in South Korea", j:"European Journal of Training and Development", v:"49(9)", tags:["측정도구 타당화"], featured:true},
  {y:2025, a:"김유빈, <strong>임경애</strong>, 이윤수", t:"고등학교 교사의 디지털 역량 및 교육 환경과 인공지능 수업 효과에 대한 잠재 프로파일 분석", j:"아시아교육연구", v:"26(1)", tags:["잠재프로파일"]},
  {y:2024, a:"김민선, <strong>임경애</strong>, 이윤수", t:"임파워링 리더십과 직무 번영감의 관계에서 심리적 안정감의 조절효과", j:"역량개발학습연구", v:"19(2)", tags:["매개 및 조절"]},
  {y:2024, a:"엄회정, <strong>임경애</strong>, 이윤수", t:"성과 압박, 직원 성장 분위기(EGC)와 직무 열의의 관계에서 잡 크래프팅의 매개효과", j:"HRD연구", v:"26(2)", tags:["매개 및 조절"]},
  {y:2024, a:"<strong>임경애</strong>, 이윤수", t:"잠재 프로파일 분석(LPA)을 활용한 과학기술 분야 재직자의 경력 정체 유형에 관한 연구", j:"역량개발학습연구", v:"19(1)", tags:["잠재프로파일"]},
  {y:2024, a:"허재윤, <strong>임경애</strong>, 이윤수", t:"마이크로 매니지먼트 측정도구 타당화 연구", j:"역량개발학습연구", v:"19(1)", tags:["측정도구 타당화"]},
  {y:2024, a:"백조, <strong>임경애</strong>, 이윤수", t:"비인격적 감독이 이직의도에 미치는 영향에서 직무소진과 경력열망의 조절된 매개효과", j:"기업교육과 인재연구", v:"26(1)", tags:["매개 및 조절"]},
  {y:2024, a:"김지원, <strong>임경애</strong>, 이윤수", t:"직원 침묵 측정도구 타당화 연구", j:"HRD연구", v:"26(1)", tags:["측정도구 타당화"]},
  {y:2023, a:"<strong>임경애</strong>, 이윤수", t:"조직문화 측정도구(OCD) 타당화 연구", j:"기업교육과 인재연구", v:"25(2)", tags:["측정도구 타당화"]},
  {y:2023, a:"강지운, <strong>임경애</strong>, 조대연", t:"국내 섬유패션산업 종사자의 학습동기, 학습전이 및 적응수행 간 구조적 관계", j:"평생교육·HRD연구", v:"19(1)", tags:["구조모형"]},
];

// 다크 모드 버튼
(function(){
  const root = document.documentElement;
  try{ const t = localStorage.getItem("kl-theme"); if (t==="dark"||t==="light") root.dataset.theme = t; }catch(e){}
  const btn = document.getElementById("theme-btn");
  if (!btn) return;
  const isDark = ()=> root.dataset.theme ? root.dataset.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = ()=>{ btn.textContent = isDark() ? "밝게" : "어둡게"; };
  label();
  btn.addEventListener("click",()=>{
    root.dataset.theme = isDark() ? "light" : "dark";
    try{ localStorage.setItem("kl-theme", root.dataset.theme); }catch(e){}
    label();
  });
})();

// 복사 버튼
document.querySelectorAll(".copy").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const el = document.getElementById(btn.dataset.target);
    const reset = ()=>setTimeout(()=>btn.textContent="복사",1500);
    const fallback = ()=>{ const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent="선택됨"; reset(); };
    try{ navigator.clipboard.writeText(el.textContent).then(()=>{ btn.textContent="복사됨"; reset(); }, fallback); }catch(e){ fallback(); }
  });
});

const pubHTML = p => `<li class="pub"><div class="t">${p.t}${p.tags.length?`<span class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</span>`:""}</div><div class="a">${p.a}</div><div class="j"><i>${p.j}</i>${p.v?", "+p.v:""}</div></li>`;

// 홈: 대표 논문
const feat = document.getElementById("featured");
if (feat){
  feat.innerHTML = PUBS.filter(p=>p.featured).map(p=>`<article><div class="jn">${p.j}, ${p.y}</div><div class="t">${p.t}</div><div class="a">${p.a}</div></article>`).join("");
}

// 논문 페이지: 필터와 연도별 목록
const list = document.getElementById("pub-list");
if (list){
  const isFirst = p => p.a.startsWith("<strong>");
  const isIntl = p => /^[A-Za-z]/.test(p.j);
  const byTag = t => p => p.tags.includes(t);
  const FILTERS = [
    {k:"all", label:"전체", f:()=>true},
    {k:"first", label:"제1저자", f:isFirst},
    {k:"intl", label:"국제 학술지", f:isIntl},
    {k:"lpa", label:"잠재프로파일", f:byTag("잠재프로파일")},
    {k:"ml", label:"머신러닝", f:byTag("머신러닝")},
    {k:"valid", label:"측정도구 타당화", f:byTag("측정도구 타당화")},
    {k:"medmod", label:"매개 및 조절", f:byTag("매개 및 조절")},
  ];
  let current = "all";
  const fwrap = document.getElementById("filters");
  FILTERS.forEach((f,i)=>{
    const b = document.createElement("button");
    b.type="button"; b.className="chip"; b.id="filter-"+i; b.textContent=f.label;
    b.addEventListener("click",()=>{ current=f.k; render(); });
    fwrap.appendChild(b);
  });
  function render(){
    const flt = FILTERS.find(f=>f.k===current);
    [...fwrap.children].forEach((b,i)=>b.setAttribute("aria-pressed", FILTERS[i].k===current));
    const items = PUBS.filter(flt.f);
    document.getElementById("pub-count").textContent = items.length + " / " + PUBS.length + "편";
    if (!items.length){ list.innerHTML = '<p class="empty">해당하는 논문이 없습니다.</p>'; return; }
    const years = [...new Set(items.map(p=>p.y))];
    list.innerHTML = years.map(y=>`<div class="year-group"><div class="year">${y}</div><ul class="pubs">${items.filter(p=>p.y===y).map(pubHTML).join("")}</ul></div>`).join("");
  }
  render();
}
