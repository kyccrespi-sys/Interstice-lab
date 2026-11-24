// Fine-line axonometric of Camp Hale, winter. Illustrative reconstruction, not a survey plan.
const FG = '#E8E4DA', BG = '#1C1D1B', HON = '#C99242', COOL = '#8FC1CB', WARM = '#D9826B', DIM = '#A8A397';
const S = 0.66, OX = 262, OY = 168;
type P = [number, number];
const iso = (x: number, y: number, z = 0): P => [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S];
const f = (n: number) => n.toFixed(1);
const pts = (a: P[]) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');
const L = (a: P, b: P, op = 0.8, w = 0.7, extra = '') => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${FG}" stroke-opacity="${op}" stroke-width="${w}" ${extra}></line>`;
const poly = (a: P[], op = 0.85, fill = BG, w = 0.7) => `<polygon points="${pts(a)}" fill="${fill}" stroke="${FG}" stroke-opacity="${op}" stroke-width="${w}" stroke-linejoin="round"></polygon>`;

// gabled building: footprint x,y,w(len along x),d, wall h, roof rise r
function hut(x: number, y: number, w: number, d: number, h: number, r: number, op = 0.85) {
  const s = [iso(x, y + d, 0), iso(x + w, y + d, 0), iso(x + w, y + d, h), iso(x, y + d, h)];
  const gable = [iso(x + w, y, 0), iso(x + w, y + d, 0), iso(x + w, y + d, h), iso(x + w, y + d / 2, h + r), iso(x + w, y, h)];
  const roofS = [iso(x, y + d, h), iso(x + w, y + d, h), iso(x + w, y + d / 2, h + r), iso(x, y + d / 2, h + r)];
  const roofN = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d / 2, h + r), iso(x, y + d / 2, h + r)];
  let o = poly(roofN, op * 0.6) + poly(s, op) + poly(gable, op) + poly(roofS, op);
  // windows on the long side
  for (let k = 1; k < Math.floor(w / 7); k++) { const a = iso(x + k * 7, y + d, h * 0.35), b = iso(x + k * 7, y + d, h * 0.7); o += L(a, b, op * 0.5, 1.4); }
  // roof seam lines (snow)
  o += L(iso(x, y + d / 2, h + r), iso(x + w, y + d / 2, h + r), op, 0.9);
  return o;
}
function chimney(x: number, y: number, z: number, id: number) {
  const a = iso(x, y, z), b = iso(x, y, z + 6);
  const sx = b[0], sy = b[1];
  return L(a, b, 0.85, 1.6) +
    `<path d="M${f(sx)} ${f(sy)} c -6 -10 8 -16 2 -26 c -6 -10 10 -16 4 -28" fill="none" stroke="${DIM}" stroke-opacity=".55" stroke-width="1" class="c3-smoke" style="--d:${(id % 7) * 0.7}s"></path>`;
}
function person(x: number, y: number, z = 0, op = 0.9) {
  const [px, py] = iso(x, y, z);
  return `<g stroke="${FG}" stroke-opacity="${op}" stroke-width=".8" fill="none"><circle cx="${f(px)}" cy="${f(py - 9)}" r="1.6" fill="${FG}" fill-opacity="${op}"></circle><path d="M${f(px)} ${f(py - 7.5)} L${f(px)} ${f(py - 3)} M${f(px)} ${f(py - 3)} L${f(px - 1.6)} ${f(py)} M${f(px)} ${f(py - 3)} L${f(px + 1.6)} ${f(py)} M${f(px - 2)} ${f(py - 6)} L${f(px + 2)} ${f(py - 5)}"></path></g>`;
}
function skierGlyph() {
  // drawn around 0,0, leaning downhill
  return `<g stroke="${FG}" stroke-width=".9" fill="none" stroke-linecap="round"><circle cx="1" cy="-9" r="1.6" fill="${FG}"></circle><path d="M1 -7.5 L-0.5 -3 L1.5 0 M-0.5 -3 L-2.5 -1 M0.5 -6 L4 -3 M0.5 -6 L-3 -4"></path><path d="M-5 1.2 L5 -0.6" stroke="${HON}" stroke-width="1.1"></path></g>`;
}
function walker() {
  return `<g stroke="${FG}" stroke-opacity=".9" stroke-width=".8" fill="none"><circle cx="0" cy="-9" r="1.6" fill="${FG}"></circle><path d="M0 -7.5 L0 -3 M0 -3 L-1.6 0 M0 -3 L1.6 0 M-2 -6 L2 -5"></path></g>`;
}
function mule(x: number, y: number) {
  const [px, py] = iso(x, y, 0);
  return `<g stroke="${FG}" stroke-opacity=".85" stroke-width=".8" fill="none" transform="translate(${f(px)} ${f(py)})"><path d="M-5 -4 L4 -4 L6 -7 L7 -6 L5 -3 M-4 -4 L-5 0 M-2 -4 L-2 0 M2 -4 L2 0 M4 -4 L4.5 0 M-5 -4 L-7 -2"></path><rect x="-3" y="-7" width="5" height="3" stroke="${HON}"></rect></g>`;
}

export function buildCamp(): string {
  const o: string[] = [];
  // ---- mountains behind (north/east): layered ridgelines drawn as fine contours
  for (let k = 0; k < 6; k++) {
    const yb = -40 - k * 20, amp = 30 + k * 20;
    const ridge: P[] = [];
    for (let x = -30; x <= 1000; x += 12) {
      const z = amp * (0.55 + 0.45 * Math.sin(x / 95 + k * 1.3) * Math.cos(x / 210 - k)) + 20 * Math.sin(x / 33 + k);
      ridge.push(iso(x, yb, Math.max(8, z)));
    }
    o.push(`<polyline points="${pts(ridge)}" fill="none" stroke="${FG}" stroke-opacity="${(0.12 + k * 0.05).toFixed(2)}" stroke-width=".7"></polyline>`);
  }
  // ---- the ski slope on the mountainside ("B Slope"): run band, tow line, skiers
  const slope = (t: number, s: number): P => { const x = 690 + s * 120; const y = -150 + t * 150; return iso(x, y, 150 * (1 - t) + 4); };
  const runL: P[] = [], runR: P[] = [];
  for (let t = 0; t <= 1.0001; t += 0.1) { runL.push(slope(t, 0)); runR.push(slope(t, 1)); }
  o.push(`<polygon points="${pts([...runL, ...runR.reverse()])}" fill="${FG}" fill-opacity=".05" stroke="${FG}" stroke-opacity=".35" stroke-width=".6" stroke-dasharray="3 3"></polygon>`);
  const towA = iso(870, 0, 4), towB = iso(870, -150, 154);
  o.push(L(towA, towB, 0.8, 0.8));
  for (let t = 0; t <= 1.001; t += 0.25) { const p = iso(870, -150 * t, 4 + 150 * t); o.push(L(p, [p[0], p[1] - 9], 0.8, 1.2)); }
  // tow riders going up
  o.push(`<g><animateMotion dur="14s" repeatCount="indefinite" path="M${f(towA[0])} ${f(towA[1] - 6)} L${f(towB[0])} ${f(towB[1] - 6)}"></animateMotion>${skierGlyph()}</g>`);
  o.push(`<g><animateMotion dur="14s" begin="-7s" repeatCount="indefinite" path="M${f(towA[0])} ${f(towA[1] - 6)} L${f(towB[0])} ${f(towB[1] - 6)}"></animateMotion>${skierGlyph()}</g>`);
  // skiers carving down in S-turns
  const carve = (phase: number) => { let d = ''; for (let t = 0; t <= 1.0001; t += 0.04) { const s = 0.5 + 0.38 * Math.sin(t * Math.PI * 5 + phase); const p = slope(t, s); d += `${t === 0 ? 'M' : 'L'}${f(p[0])} ${f(p[1] - 2)} `; } return d; };
  [0, 2.1, 4.2].forEach((ph, i) => {
    const d = carve(ph);
    o.push(`<path d="${d}" fill="none" stroke="${FG}" stroke-opacity=".18" stroke-width=".6"></path>`);
    o.push(`<g><animateMotion dur="${9 + i * 2}s" begin="-${i * 3}s" repeatCount="indefinite" rotate="0" path="${d}"></animateMotion>${skierGlyph()}</g>`);
  });
  o.push(`<text x="972" y="258" font-size="9" fill="${HON}" letter-spacing="1.6" text-anchor="end">SKI SLOPE &amp; TOW</text><text x="972" y="271" font-size="9" fill="${HON}" fill-opacity=".75" letter-spacing="1.6" text-anchor="end">TRAINING ABOVE CAMP</text>`);

  // ---- rock-climbing cliffs on the west wall
  const cliff: P[] = [iso(-40, 60, 0), iso(-40, 60, 70), iso(-40, 140, 92), iso(-40, 220, 64), iso(-40, 220, 0)];
  o.push(`<polygon points="${pts(cliff)}" fill="${BG}" stroke="${FG}" stroke-opacity=".7" stroke-width=".8"></polygon>`);
  for (let k = 0; k < 9; k++) { const y = 70 + k * 17; o.push(L(iso(-40, y, 4), iso(-40, y + 6, 40 + (k % 3) * 14), 0.25, 0.5)); }
  o.push(L(iso(-40, 140, 92), iso(-40, 140, 20), 0.9, 0.6, `stroke-dasharray="1.5 2"`));
  o.push(person(-40, 140, 50));
  o.push(`<text x="60" y="126" font-size="9" fill="${HON}" letter-spacing="1.6">ROCK CLIMBING · ROPES &amp; PITONS</text>`);

  // ---- ground plane
  o.push(poly([iso(0, 0), iso(900, 0), iso(900, 300), iso(0, 300)], 0.35, 'rgba(232,228,218,.025)', 0.7));
  for (let x = 0; x <= 900; x += 60) o.push(L(iso(x, 0), iso(x, 300), 0.05, 0.5));
  for (let y = 0; y <= 300; y += 60) o.push(L(iso(0, y), iso(900, y), 0.05, 0.5));

  // ---- rail siding along the north edge with a moving coal train
  o.push(L(iso(-60, 18), iso(960, 18), 0.8, 0.8)); o.push(L(iso(-60, 26), iso(960, 26), 0.8, 0.8));
  for (let x = -60; x <= 960; x += 12) o.push(L(iso(x, 15), iso(x, 29), 0.45, 0.6));
  const tA = iso(-60, 22), tB = iso(960, 22);
  let train = '';
  // draw train in local iso offsets around origin (relative to start point)
  const rel = (x: number, y: number, z: number): P => { const p = iso(x - 60, y + 22, z); return [p[0] - tA[0], p[1] - tA[1]]; };
  const tbox = (x0: number, w: number, h: number) => {
    const d = 10, y0 = -5;
    const S1 = [rel(x0, y0 + d, 0), rel(x0 + w, y0 + d, 0), rel(x0 + w, y0 + d, h), rel(x0, y0 + d, h)];
    const E1 = [rel(x0 + w, y0, 0), rel(x0 + w, y0 + d, 0), rel(x0 + w, y0 + d, h), rel(x0 + w, y0, h)];
    const T1 = [rel(x0, y0, h), rel(x0 + w, y0, h), rel(x0 + w, y0 + d, h), rel(x0, y0 + d, h)];
    return poly(T1, 0.9) + poly(S1, 0.9) + poly(E1, 0.9);
  };
  for (let c = 0; c < 4; c++) train += tbox(c * 34, 30, 10);
  train += tbox(136, 34, 14);
  const stack = rel(162, 0, 14);
  train += `<line x1="${f(stack[0])}" y1="${f(stack[1])}" x2="${f(stack[0])}" y2="${f(stack[1] - 7)}" stroke="${FG}" stroke-width="2"></line>`;
  train += `<path d="M${f(stack[0])} ${f(stack[1] - 8)} c -8 -6 4 -14 -6 -20 c -10 -6 2 -14 -10 -20" fill="none" stroke="${DIM}" stroke-opacity=".6" stroke-width="1.2" class="c3-smoke"></path>`;
  o.push(`<g><animateMotion dur="40s" repeatCount="indefinite" path="M0 0 L${f(tB[0] - tA[0])} ${f(tB[1] - tA[1])}"></animateMotion><g transform="translate(${f(tA[0])} ${f(tA[1])})">${train}</g></g>`);
  const rl = iso(930, 18, 0); o.push(`<text x="${f(rl[0] + 8)}" y="${f(rl[1] - 10)}" font-size="9" fill="${FG}" fill-opacity=".75" letter-spacing="1.6">D&amp;RGW SIDING · COAL TRAINS</text>`);

  // ---- the straightened river along the south edge
  o.push(L(iso(-60, 282), iso(960, 282), 0.9, 1.2).replace(`stroke="${FG}"`, `stroke="${COOL}"`));
  o.push(L(iso(-60, 292), iso(960, 292), 0.9, 1.2).replace(`stroke="${FG}"`, `stroke="${COOL}"`));
  o.push(`<line x1="${f(iso(-60, 287)[0])}" y1="${f(iso(-60, 287)[1])}" x2="${f(iso(960, 287)[0])}" y2="${f(iso(960, 287)[1])}" stroke="${COOL}" stroke-width=".8" stroke-dasharray="6 9" class="c3-flow"></line>`);
  const rv = iso(120, 312, 0); o.push(`<text transform="translate(${f(rv[0])} ${f(rv[1])}) rotate(30)" font-size="9" fill="${COOL}" letter-spacing="1.6">EAGLE RIVER · CHANNELED STRAIGHT</text>`);

  // ---- buildings (painter's order: back to front)
  type B = { k: number; s: string };
  const items: B[] = [];
  const add = (x: number, y: number, s: string) => items.push({ k: x + y, s });
  // HQ with flag
  add(40, 60, hut(30, 50, 60, 30, 14, 8) + L(iso(55, 45, 0), iso(55, 45, 40), 0.9, 0.8) + `<path d="M${f(iso(55, 45, 40)[0])} ${f(iso(55, 45, 40)[1])} l 12 3 l -12 4z" fill="${HON}" class="c3-flag"></path>`);
  // hospital: long ward blocks off a spine
  add(50, 170, hut(30, 140, 70, 14, 9, 5));
  for (let k = 0; k < 4; k++) add(40 + k * 18, 170, hut(36 + k * 18, 156, 10, 70, 8, 4));
  // barracks grid with chimneys
  let ci = 0;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 11; c++) {
    const x = 140 + c * 42, y = 60 + r * 40;
    add(x + 15, y + 7, hut(x, y, 32, 14, 9, 5, 0.8) + (c % 3 === r % 3 ? chimney(x + 22, y + 7, 13, ci++) : ''));
  }
  // field house
  add(760, 110, hut(700, 70, 150, 50, 22, 12));
  // stables and corral
  add(760, 200, hut(700, 170, 150, 18, 9, 6));
  add(760, 240, hut(700, 215, 150, 18, 9, 6));
  items.sort((a, b) => a.k - b.k);
  o.push(...items.map((i) => i.s));
  // corral fence
  for (let x = 700; x <= 860; x += 10) o.push(L(iso(x, 250), iso(x, 250, 5), 0.6, 0.6));
  o.push(L(iso(700, 250, 4), iso(860, 250, 4), 0.6, 0.6));
  // mule string walking the camp road
  const mA = iso(860, 262), mB = iso(130, 262);
  for (let k = 0; k < 5; k++) {
    o.push(`<g><animateMotion dur="60s" begin="-${k * 1.6}s" repeatCount="indefinite" path="M${f(mA[0])} ${f(mA[1])} L${f(mB[0])} ${f(mB[1])}"></animateMotion><g transform="scale(-1 1)">${mule(0, 0).replace(/translate\([^)]+\)/, 'translate(0 0)')}</g></g>`);
  }
  o.push(person(865, 262));
  // marching squad on the parade ground (in front of the field house)
  const pA = iso(640, 140), pB = iso(640, 250);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    o.push(`<g><animateMotion dur="18s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear" path="M${f(pA[0] + c * 6 - r * 5)} ${f(pA[1] + c * 3 + r * 3)} L${f(pB[0] + c * 6 - r * 5)} ${f(pB[1] + c * 3 + r * 3)}"></animateMotion>${walker()}</g>`);
  }
  // a few soldiers on skis crossing camp
  o.push(`<g><animateMotion dur="26s" repeatCount="indefinite" path="M${f(iso(120, 270)[0])} ${f(iso(120, 270)[1])} L${f(iso(690, 270)[0])} ${f(iso(690, 270)[1])}"></animateMotion>${skierGlyph()}</g>`);
  o.push(`<g><animateMotion dur="26s" begin="-1.2s" repeatCount="indefinite" path="M${f(iso(120, 270)[0])} ${f(iso(120, 270)[1])} L${f(iso(690, 270)[0])} ${f(iso(690, 270)[1])}"></animateMotion>${skierGlyph()}</g>`);

  // ---- labels with leaders
  const tag = (x: number, y: number, z: number, text: string, dx: number, dy: number, col = FG) => {
    const a = iso(x, y, z), b: P = [a[0] + dx, a[1] + dy];
    return L(a, b, 0.45, 0.6) + `<circle cx="${f(a[0])}" cy="${f(a[1])}" r="1.6" fill="${col}"></circle><text x="${f(b[0] + (dx >= 0 ? 4 : -4))}" y="${f(b[1] + 3)}" font-size="9" fill="${col}" fill-opacity=".85" letter-spacing="1.5" text-anchor="${dx >= 0 ? 'start' : 'end'}">${text}</text>`;
  };
  o.push(tag(55, 45, 40, 'HQ', -36, -26, HON));
  o.push(tag(60, 225, 8, 'HOSPITAL', -60, 30));
  o.push(tag(420, 100, 14, 'BARRACKS · ONE OF 1,000+ BUILDINGS', 40, -120));
  o.push(tag(790, 95, 34, 'FIELD HOUSE', 40, -44));
  o.push(tag(820, 228, 14, 'STABLES · MULE PACK TRAINS', 50, 26));
  o.push(tag(640, 200, 0, 'PARADE GROUND', -40, 70));
  o.push(tag(220, 60, 34, 'COAL SMOKE · “THE PANDO HACK”', 60, -110, DIM));

  // ---- falling snow
  let snow = '';
  for (let i = 0; i < 90; i++) {
    const x = (i * 97.3) % 1000, y = (i * 53.7) % 625, r = 0.6 + (i % 3) * 0.35;
    snow += `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${FG}" fill-opacity="${(0.25 + (i % 4) * 0.12).toFixed(2)}" class="c3-snow" style="--d:${((i * 0.37) % 6).toFixed(2)}s;--t:${(7 + (i % 5)).toFixed(0)}s"></circle>`;
  }
  o.push(`<g class="c3-snowfield">${snow}</g>`);
  return o.join('\n');
}
