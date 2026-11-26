// NusaData — render the sections and wire every control.
import {
  HEADLINE,
  AT_A_GLANCE,
  POPULATION_YEARS,
  AGE_STRUCTURE,
  POPULATION_FACTS,
  PROVINCES,
  GDP_GROWTH,
  GDP_SECTORS,
  TRADE_2024,
  INFLATION,
  UNEMPLOYMENT,
  LABOUR_FACTS,
  POVERTY,
  WELFARE,
  SOURCES,
  METHOD_NOTE,
  META,
} from './data.js';
import { drawBarChart, drawLineChart, drawHorizontalBarChart } from './charts.js';

const $ = (id) => document.getElementById(id);
const NATIONAL_POP = 283.5;

function statCard(item) {
  return `<article class="card stat"><p class="stat-label">${item.label}</p><p class="stat-value">${item.value}</p><p class="stat-sub">${item.sub || ''}</p><p class="source">${item.source}</p></article>`;
}

function factRow(item) {
  return `<div class="fact"><span>${item.label}</span><strong>${item.value}</strong><em>${item.source}</em></div>`;
}

function renderHeadline() {
  $('headline-cards').innerHTML = HEADLINE.map(statCard).join('');
  $('updated-note').textContent = `Updated ${META.updated} · ${META.note}`;
}

function renderGlance() {
  $('glance-grid').innerHTML = AT_A_GLANCE.map((item) => (
    `<div class="glance"><p class="glance-value">${item.value}</p><p class="glance-label">${item.label}</p>${item.source ? `<p class="source">${item.source}</p>` : ''}</div>`
  )).join('');
}

// --- Population section ---
let popMode = 'years';

function drawPopulation() {
  const canvas = $('pop-chart');
  if (popMode === 'years') {
    drawBarChart(canvas, POPULATION_YEARS.map((p) => ({ year: p.year, value: p.value })));
  } else {
    drawBarChart(canvas, PROVINCES.slice(0, 6).map((p) => ({ year: p.name.replace(' ', ' '), value: p.pop })));
  }
  $('pop-chart-caption').textContent = popMode === 'years'
    ? 'Total population, millions — World Bank, 2020–2024'
    : 'Largest provinces, millions — BPS, 2024 estimates';
}

function renderAge() {
  $('age-bars').innerHTML = AGE_STRUCTURE.map((a) => (
    `<div class="age-row"><span class="age-label">${a.label}</span><div class="age-track"><div class="age-fill" style="width:${a.value}%"></div></div><strong>${a.value}%</strong></div>`
  )).join('');
  $('pop-facts').innerHTML = POPULATION_FACTS.map(factRow).join('');
}

// --- Economy section ---
let ecoMode = 'growth';

function drawEconomy() {
  const canvas = $('eco-chart');
  if (ecoMode === 'growth') {
    drawLineChart(canvas, GDP_GROWTH.map((p) => ({ year: p.year, value: p.value, label: p.value + '%' })));
  } else {
    drawHorizontalBarChart(canvas, GDP_SECTORS.map((s) => ({ label: s.label, value: s.value })));
  }
  $('eco-chart-caption').textContent = ecoMode === 'growth'
    ? 'GDP growth, percent year on year — BPS, 2020–2024'
    : 'Share of GDP, percent — BPS, 2024';
}

function renderTrade() {
  $('trade-grid').innerHTML = TRADE_2024.map((t) => (
    `<div class="glance"><p class="glance-value">${t.value}</p><p class="glance-label">${t.label}</p><p class="source">${t.source}</p></div>`
  )).join('');
}

// --- Prices & jobs section ---
function drawPricesJobs() {
  drawBarChart($('inflation-chart'), INFLATION.map((p) => ({ year: p.year, value: p.value, label: p.value + '%' })));
  drawBarChart($('unemployment-chart'), UNEMPLOYMENT.map((p) => ({ year: p.year, value: p.value, label: p.value + '%' })));
  $('labour-facts').innerHTML = LABOUR_FACTS.map(factRow).join('');
}

// --- Welfare section ---
function drawWelfare() {
  drawLineChart($('poverty-chart'), POVERTY.map((p) => ({ year: p.year, value: p.value, label: p.value + '%' })));
  $('welfare-cards').innerHTML = WELFARE.map((w) => (
    `<article class="card stat"><p class="stat-label">${w.label}</p><p class="stat-value">${w.value}</p><p class="stat-sub">${w.sub}</p><p class="source">${w.source}</p></article>`
  )).join('');
}

// --- Provinces table ---
let provSort = { key: 'pop', dir: -1 };
let provQuery = '';

function provinceRows() {
  const q = provQuery.trim().toLowerCase();
  let rows = PROVINCES.map((p) => ({ ...p, share: (p.pop / NATIONAL_POP) * 100 }));
  if (q) rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  rows.sort((a, b) => {
    const k = provSort.key;
    if (typeof a[k] === 'string') return provSort.dir * a[k].localeCompare(b[k]);
    return provSort.dir * (a[k] - b[k]);
  });
  return rows;
}

function renderProvinces() {
  const rows = provinceRows();
  const body = $('province-body');
  if (rows.length === 0) {
    body.innerHTML = '<tr><td colspan="4" class="empty">No province matches that search. Try another name.</td></tr>';
  } else {
    body.innerHTML = rows.map((p, i) => (
      `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.capital}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${p.share.toFixed(1)}%</td></tr>`
    )).join('');
  }
  $('province-count').textContent = `${rows.length} of ${PROVINCES.length} provinces shown · Top 10 by population — BPS, 2024 estimates`;
  document.querySelectorAll('#province-table th[data-sort]').forEach((th) => {
    const key = th.dataset.sort;
    th.textContent = th.dataset.label + (provSort.key === key ? (provSort.dir === 1 ? ' ▲' : ' ▼') : '');
  });
}

// --- Sources section ---
function renderSources() {
  $('source-list').innerHTML = SOURCES.map((s) => (
    `<li><strong>${s.name}</strong><span>${s.what}</span></li>`
  )).join('');
  $('method-note').textContent = METHOD_NOTE;
}

// --- Navigation: highlight the section in view ---
function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((s) => s && spy.observe(s));
}

// --- Mobile menu: hamburger toggle ---
function initMenu() {
  const header = document.querySelector('.top');
  const btn = $('menu-btn');
  if (!header || !btn) return;
  const close = () => {
    header.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#site-nav a').forEach((a) => {
    a.addEventListener('click', close);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// --- Wire controls ---
function initControls() {
  document.querySelectorAll('[data-pop-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      popMode = btn.dataset.popMode;
      document.querySelectorAll('[data-pop-mode]').forEach((b) => b.classList.toggle('on', b === btn));
      drawPopulation();
    });
  });
  document.querySelectorAll('[data-eco-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ecoMode = btn.dataset.ecoMode;
      document.querySelectorAll('[data-eco-mode]').forEach((b) => b.classList.toggle('on', b === btn));
      drawEconomy();
    });
  });
  $('province-search').addEventListener('input', (e) => {
    provQuery = e.target.value;
    renderProvinces();
  });
  document.querySelectorAll('#province-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (provSort.key === key) provSort.dir *= -1;
      else provSort = { key, dir: key === 'name' ? 1 : -1 };
      renderProvinces();
    });
  });
  window.addEventListener('resize', () => {
    drawPopulation();
    drawEconomy();
    drawPricesJobs();
    drawWelfare();
  });
}

renderHeadline();
renderGlance();
renderAge();
drawPopulation();
renderTrade();
drawEconomy();
drawPricesJobs();
drawWelfare();
renderProvinces();
renderSources();
initControls();
initScrollSpy();
initMenu();
