// Own canvas charts for NusaData. No library: two small draw functions,
// bar and line, with crisp rendering on high-density screens.

const INK = '#14213d';
const MUTED = '#5b6b7f';
const GRID = '#d9dee7';
const NAVY = '#0f2a4a';
const AMBER = '#d97706';
const SLATE = '#475569';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  return { ctx, width, height };
}

function axes(ctx, width, height, min, max, padTop = 22) {
  const padL = 44, padR = 10, padT = padTop, padB = 26;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = padT + plotH - (plotH * i) / steps;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + plotW, y);
    ctx.stroke();
    ctx.fillText(formatTick(v), padL - 6, y);
  }
  return { padL, padR, padT, padB, plotW, plotH };
}

function formatTick(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

function barColor(i, count, highlight) {
  if (highlight !== undefined && i === highlight) return AMBER;
  return i === count - 1 ? NAVY : SLATE;
}

export function drawHorizontalBarChart(canvas, series, options = {}) {
  const rowH = options.rowHeight || 44;
  const height = Math.max(120, series.length * rowH + 30);
  const { ctx, width } = setup(canvas, height);
  const values = series.map((p) => p.value);
  const max = Math.max(...values) * 1.15;
  const padL = 150, padR = 56, padT = 8;
  const plotW = width - padL - padR;
  // Value labels: percent by default; callers may pass their own format.
  const formatValue = options.formatValue || ((v) => String(v) + '%');
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  series.forEach((point, i) => {
    const y = padT + rowH * i + rowH / 2;
    const barW = (point.value / max) * plotW;
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(point.label, padL - 8, y);
    // Highlight one row in navy when requested; otherwise the first row.
    ctx.fillStyle = options.highlight !== undefined
      ? (i === options.highlight ? NAVY : SLATE)
      : (i === 0 ? NAVY : SLATE);
    ctx.fillRect(padL, y - 11, Math.max(barW, 2), 22);
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(formatValue(point.value), padL + barW + 6, y);
  });
}

// Annotations: options.annotations = [{ index, lines: ['...'] }].
// Each annotation is drawn in amber above the annotated point or bar, one
// line per entry, so a chart can name the event behind a spike or a dip.
// Callers that annotate a tall bar should also pass options.padTop so the
// lines have room above the plot.
function drawAnnotations(ctx, items) {
  ctx.fillStyle = AMBER;
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.textBaseline = 'bottom';
  items.forEach((a) => {
    a.lines.forEach((line, j) => {
      const y = a.y - 20 - (a.lines.length - 1 - j) * 14;
      ctx.fillText(line, a.x, y);
    });
  });
}

export function drawBarChart(canvas, series, options = {}) {
  const height = options.height || 260;
  const { ctx, width } = setup(canvas, height);
  const values = series.map((p) => p.value);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  if (max === min) max = min + 1;
  const pad = (max - min) * 0.08;
  min -= pad;
  max += pad;
  const { padL, padT, plotW, plotH } = axes(ctx, width, height, min, max, options.padTop);
  const n = series.length;
  const slot = plotW / n;
  const barW = Math.min(56, slot * 0.6);
  ctx.textAlign = 'center';
  series.forEach((point, i) => {
    const x = padL + slot * i + slot / 2;
    const y0 = padT + plotH - ((0 - min) / (max - min)) * plotH;
    const y1 = padT + plotH - ((point.value - min) / (max - min)) * plotH;
    const top = Math.min(y0, y1);
    const h = Math.abs(y1 - y0);
    ctx.fillStyle = barColor(i, n, options.highlight);
    ctx.fillRect(x - barW / 2, top, barW, Math.max(h, 1));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(point.label ?? String(point.value), x, top - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(point.year ?? '', x, padT + plotH + 6);
  });
  if (options.annotations) {
    const notes = options.annotations.map((a) => {
      const i = a.index;
      const x = padL + slot * i + slot / 2;
      const y1 = padT + plotH - ((series[i].value - min) / (max - min)) * plotH;
      return { x, y: Math.min(padT + plotH - ((0 - min) / (max - min)) * plotH, y1), lines: a.lines };
    });
    ctx.textAlign = 'center';
    drawAnnotations(ctx, notes);
  }
}

export function drawLineChart(canvas, series, options = {}) {
  const height = options.height || 260;
  const { ctx, width } = setup(canvas, height);
  const values = series.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (max === min) max = min + 1;
  const pad = (max - min) * 0.15;
  min -= pad;
  max += pad;
  const { padL, padT, plotW, plotH } = axes(ctx, width, height, min, max, options.padTop);
  const n = series.length;
  const xAt = (i) => padL + (plotW * i) / (n - 1);
  const yAt = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.forEach((point, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(point.value));
    else ctx.lineTo(xAt(i), yAt(point.value));
  });
  ctx.stroke();
  ctx.textAlign = 'center';
  series.forEach((point, i) => {
    ctx.fillStyle = AMBER;
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(point.value), 4, 0, Math.PI * 2);
    ctx.fill();
    // Keep end labels inside the plot: first label starts at its point,
    // last label ends at its point, middle labels stay centered.
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    if (i === 0) {
      ctx.textAlign = 'left';
      ctx.fillText(point.label ?? String(point.value), xAt(i) + 7, yAt(point.value) - 8);
    } else if (i === n - 1) {
      ctx.textAlign = 'right';
      ctx.fillText(point.label ?? String(point.value), xAt(i) - 7, yAt(point.value) - 8);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(point.label ?? String(point.value), xAt(i), yAt(point.value) - 8);
    }
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    if (i === 0) {
      ctx.textAlign = 'left';
      ctx.fillText(point.year ?? '', xAt(i), padT + plotH + 6);
    } else if (i === n - 1) {
      ctx.textAlign = 'right';
      ctx.fillText(point.year ?? '', xAt(i), padT + plotH + 6);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(point.year ?? '', xAt(i), padT + plotH + 6);
    }
  });
  if (options.annotations) {
    const notes = options.annotations.map((a) => {
      const i = a.index;
      // Anchor the text the same way the point label is anchored, so an
      // annotation on an end point never runs off the plot edge.
      const x = i === 0 ? xAt(i) + 7 : i === n - 1 ? xAt(i) - 7 : xAt(i);
      return { x, y: yAt(series[i].value), lines: a.lines, align: i === 0 ? 'left' : i === n - 1 ? 'right' : 'center' };
    });
    notes.forEach((note) => {
      ctx.textAlign = note.align;
      drawAnnotations(ctx, [note]);
    });
  }
}
