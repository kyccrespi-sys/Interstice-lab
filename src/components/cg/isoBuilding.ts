// Technical axonometric cutaway of the Common Ground building. Original illustration.
// Ink linework on paper, material hatching, architectural grid. Plan coordinates match CommonGround.astro zones.

export const ISO = { S: 0.95, OX: 452, OY: 112 };
const { S, OX, OY } = ISO;
type P = [number, number];
export const iso = (x: number, y: number, z = 0): P => [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S];
const f = (n: number) => n.toFixed(1);
const pt = (p: P) => `${f(p[0])},${f(p[1])}`;
const pts = (a: P[]) => a.map(pt).join(' ');

const INK = '#1F1D1A', PAPER = '#FBFAF7';
const HL = `stroke="${INK}" stroke-width=".75" stroke-linejoin="round"`;
const HL2 = `stroke="${INK}" stroke-width=".45" stroke-linejoin="round"`;

const poly = (a: P[], fill: string, extra = HL) => `<polygon points="${pts(a)}" fill="${fill}" ${extra}></polygon>`;
const ln = (a: P, b: P, w = 0.5, extra = '') => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${INK}" stroke-width="${w}" ${extra}></line>`;

function box(x: number, y: number, z: number, w: number, d: number, h: number, tint = PAPER, hatchEast = true) {
  const S1 = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const E1 = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)];
  const T1 = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  return poly(S1, tint) + poly(E1, tint) + (hatchEast && h > 4 ? poly(E1, 'url(#tHatch)', 'stroke="none"') : '') + poly(T1, PAPER);
}
function cyl(x: number, y: number, r: number, h: number, tint = PAPER, z = 0, hatch = true) {
  const [bx, by] = iso(x, y, z), ty = by - h * S, rx = r * S * 1.22, ry = r * S * 0.7;
  let s = `<path d="M${f(bx - rx)} ${f(ty)} L${f(bx - rx)} ${f(by)} A${f(rx)} ${f(ry)} 0 0 0 ${f(bx + rx)} ${f(by)} L${f(bx + rx)} ${f(ty)}Z" fill="${tint}" ${HL}></path>`;
  if (hatch && h > 6) for (let i = 1; i <= 2; i++) s += ln([bx + rx * (0.35 + i * 0.22), ty + 1], [bx + rx * (0.35 + i * 0.22), by + ry * 0.6], 0.35);
  s += `<ellipse cx="${f(bx)}" cy="${f(ty)}" rx="${f(rx)}" ry="${f(ry)}" fill="${PAPER}" ${HL}></ellipse>`;
  return s;
}
function stump(x: number, y: number, r: number, h: number) {
  const [bx, by] = iso(x, y, h), rx = r * S * 1.22, ry = r * S * 0.7;
  return cyl(x, y, r, h, '#ECE6DA') + [0.62, 0.3].map((k) => `<ellipse cx="${f(bx)}" cy="${f(by)}" rx="${f(rx * k)}" ry="${f(ry * k)}" fill="none" ${HL2}></ellipse>`).join('');
}
function log(x1: number, y1: number, x2: number, y2: number, r: number) {
  const a = iso(x1, y1, r), b = iso(x2, y2, r), w = 2 * r * S;
  return ln(a, b, w + 1.5, 'stroke-linecap="round"') + `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#ECE6DA" stroke-width="${f(w - 0.2)}" stroke-linecap="round"></line>` +
    ln([a[0], a[1] - w * 0.18], [b[0], b[1] - w * 0.18], 0.35) + ln([a[0], a[1] + w * 0.18], [b[0], b[1] + w * 0.18], 0.35) +
    `<ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(w * 0.42)}" ry="${f(w * 0.5)}" fill="${PAPER}" ${HL}></ellipse><ellipse cx="${f(b[0])}" cy="${f(b[1])}" rx="${f(w * 0.2)}" ry="${f(w * 0.25)}" fill="none" ${HL2}></ellipse>`;
}
function boulder(x: number, y: number, r: number, seed: number) {
  const [cx, cy] = iso(x, y, r * 0.45), n = 8, p: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = 0.82 + 0.26 * Math.abs(Math.sin(seed * 3.1 + i * 1.7));
    p.push([cx + Math.cos(a) * r * S * 1.25 * k, cy + Math.sin(a) * r * S * (a > 0 && a < Math.PI ? 0.55 : 0.85) * k]);
  }
  const d = `M${f(p[0][0])} ${f(p[0][1])} ` + p.map((_, i) => `L${f(p[(i + 1) % n][0])} ${f(p[(i + 1) % n][1])}`).join(' ') + 'Z';
  const m: P = [cx + r * S * 0.15, cy - r * S * 0.05];
  const facet = `M${f(p[5][0])} ${f(p[5][1])} L${f(m[0])} ${f(m[1])} L${f(p[1][0])} ${f(p[1][1])} M${f(m[0])} ${f(m[1])} L${f(p[3][0])} ${f(p[3][1])}`;
  return `<path d="${d}" fill="#EEEAE2" ${HL}></path><path d="${d}" fill="url(#tStipple)" stroke="none"></path><path d="${facet}" fill="none" ${HL2}></path>`;
}
function tree(x: number, y: number, s: number) {
  const [tx, ty] = iso(x, y, s * 2.1), rr = s * S * 1.45;
  let o = cyl(x, y, s * 0.13, s * 1.6, '#ECE6DA', 0, false);
  o += `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(rr)}" fill="#E4ECDA" fill-opacity=".85" ${HL}></circle>`;
  o += `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(rr * 0.68)}" fill="none" ${HL2} stroke-dasharray="2 2"></circle>`;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; o += ln([tx + Math.cos(a) * rr * 0.18, ty + Math.sin(a) * rr * 0.18], [tx + Math.cos(a) * rr * 0.92, ty + Math.sin(a) * rr * 0.92], 0.35); }
  o += `<circle cx="${f(tx)}" cy="${f(ty)}" r="1.6" fill="${INK}"></circle>`;
  return o;
}
function plant(x: number, y: number, s: number) {
  const [tx, ty] = iso(x, y, s * 0.95);
  return cyl(x, y, s * 0.32, s * 0.5, PAPER) + `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(s * 0.5 * S)}" fill="#E4ECDA" ${HL}></circle>` + ln([tx - s * 0.3, ty], [tx + s * 0.3, ty], 0.35) + ln([tx, ty - s * 0.3], [tx, ty + s * 0.3], 0.35);
}
function tower(x: number, y: number) {
  let o = cyl(x, y, 8, 4, '#E3ECEE', 0, false) + cyl(x, y, 5, 66, PAPER, 0, false);
  for (let j = 0; j < 6; j++) for (const side of [-1, 1]) {
    const [cx, cy] = iso(x, y, 10 + j * 9.5);
    o += `<circle cx="${f(cx + side * 6.6)}" cy="${f(cy)}" r="3.4" fill="#E4ECDA" ${HL2}></circle>`;
  }
  return o;
}
function person(x: number, y: number, kind: 'kid' | 'adult' | 'elder') {
  const h = kind === 'kid' ? 30 : 50, [bx, by] = iso(x, y, 0), u = (h / 50) * S;
  return `<g transform="translate(${f(bx)} ${f(by)}) scale(${u.toFixed(3)})" fill="${PAPER}" stroke="${INK}" stroke-width="${(0.8 / u).toFixed(2)}" stroke-linejoin="round">
    <path d="M-5 0 L-4 -24 L-1 -24 L-1 0Z M1 0 L1 -24 L4 -24 L5 0Z"></path>
    <path d="M-7.5 -23 L-7 -40 Q0 -43 7 -40 L7.5 -23Z"></path>
    <circle cx="0" cy="-47" r="5.6"></circle>
    ${kind === 'elder' ? '<path d="M10 -26 L12 0" fill="none"></path><path d="M7 -36 L10 -26" fill="none"></path>' : ''}
  </g>`;
}
function chair(x: number, y: number) { return box(x, y, 0, 12, 12, 9) + box(x, y, 9, 12, 3, 12); }
function armchair(x: number, y: number) { const t = '#EEE9F2'; return box(x, y, 0, 20, 20, 9, t) + box(x, y, 9, 20, 5, 14, t) + box(x, y + 5, 9, 4, 15, 6, t) + box(x + 16, y + 5, 9, 4, 15, 6, t); }

export const DEFS = `
  <pattern id="tHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="${INK}" stroke-width=".35" opacity=".45"></line></pattern>
  <pattern id="tCross" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="6" height="6" fill="${PAPER}"></rect><path d="M0 0 L0 6 M0 0 L6 0" stroke="${INK}" stroke-width=".35" opacity=".35"></path></pattern>
  <pattern id="tStipple" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".45" fill="${INK}" opacity=".5"></circle><circle cx="4.5" cy="4" r=".35" fill="${INK}" opacity=".4"></circle></pattern>
  <pattern id="tSand" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#F4EBD8"></rect><circle cx="1.2" cy="1.5" r=".5" fill="${INK}" opacity=".45"></circle><circle cx="3.7" cy="3.8" r=".4" fill="${INK}" opacity=".35"></circle></pattern>
  <pattern id="tGrass" width="12" height="9" patternUnits="userSpaceOnUse"><rect width="12" height="9" fill="#EEF2E6"></rect><path d="M2 7 l1 -3 l1 3 M8 4 l1 -3 l1 3" fill="none" stroke="#3E5A32" stroke-width=".5" opacity=".7"></path></pattern>
  <pattern id="tGlass" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="7" height="7" fill="#EAF3F4"></rect><line x1="0" y1="0" x2="0" y2="7" stroke="#6F858C" stroke-width=".4" opacity=".55"></line></pattern>
  <pattern id="tLight" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)"><line x1="0" y1="0" x2="0" y2="4" stroke="#A8772F" stroke-width=".6" opacity=".55"></line></pattern>
  <marker id="tArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#A8772F"></path></marker>
`;

type Item = { k: number; s: string };

export function buildIso(): string {
  const out: string[] = [];
  // architectural grid on the ground
  const gx = [88, 325, 675, 912], gy = [38, 145, 305, 432];
  gx.forEach((x) => {
    const a = iso(x, -40), b = iso(x, 640);
    out.push(ln(a, b, 0.4, 'stroke-dasharray="6 3 1 3" opacity=".45"'));
  });
  gy.forEach((y) => {
    const a = iso(1000, y), b = iso(20, y);
    out.push(ln(b, a, 0.4, 'stroke-dasharray="6 3 1 3" opacity=".45"'));
  });
  // yard
  out.push(poly([iso(230, 455), iso(770, 455), iso(770, 615), iso(230, 615)], 'url(#tGrass)'));
  const path: P[] = []; for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2; path.push(iso(500 + Math.cos(a) * 205, 540 + Math.sin(a) * 50)); }
  out.push(`<polyline points="${pts(path)}" fill="none" stroke="${INK}" stroke-width="11" stroke-linejoin="round"></polyline><polyline points="${pts(path)}" fill="none" stroke="${PAPER}" stroke-width="9.6" stroke-linejoin="round"></polyline>`);
  // slab
  out.push(box(88, 38, -6, 824, 394, 6, PAPER, false));
  // floors
  const floor = (x: number, y: number, w: number, d: number, fill: string, planks = 0, tile = 0) => {
    let s = poly([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)], fill, HL2);
    if (planks) for (let yy = y + planks; yy < y + d; yy += planks) s += ln(iso(x, yy), iso(x + w, yy), 0.3, 'opacity=".55"');
    if (tile) { for (let yy = y + tile; yy < y + d; yy += tile) s += ln(iso(x, yy), iso(x + w, yy), 0.3, 'opacity=".4"'); for (let xx = x + tile; xx < x + w; xx += tile) s += ln(iso(xx, y), iso(xx, y + d), 0.3, 'opacity=".4"'); }
    return s;
  };
  out.push(floor(92, 42, 230, 100, PAPER, 10));
  out.push(floor(328, 42, 344, 100, PAPER, 0, 20));
  out.push(floor(678, 42, 230, 100, PAPER, 0, 14));
  out.push(floor(92, 148, 230, 154, PAPER, 10));
  out.push(floor(92, 308, 230, 120, PAPER, 10));
  out.push(floor(328, 148, 344, 280, '#FAF4E8', 8));
  out.push(floor(678, 148, 230, 154, PAPER, 0, 14));
  out.push(floor(678, 308, 230, 120, 'url(#tCross)'));
  out.push(poly([iso(345, 340), iso(470, 340), iso(470, 412), iso(345, 412)], 'url(#tSand)', HL2));
  out.push(poly([iso(560, 470), iso(660, 470), iso(660, 520), iso(560, 520)], 'url(#tSand)', HL2));
  out.push(poly([iso(130, 70), iso(280, 70), iso(280, 125), iso(130, 125)], 'none', `${HL2} stroke-dasharray="3 2"`));
  out.push(poly([iso(790, 330), iso(890, 330), iso(890, 410), iso(790, 410)], PAPER, HL2));
  // back walls with windows
  const wallH = 78;
  out.push(poly([iso(88, 38, 0), iso(912, 38, 0), iso(912, 38, wallH), iso(88, 38, wallH)], PAPER));
  out.push(poly([iso(88, 38, 0), iso(88, 432, 0), iso(88, 432, wallH), iso(88, 38, wallH)], PAPER));
  out.push(poly([iso(88, 38, 0), iso(88, 432, 0), iso(88, 432, wallH), iso(88, 38, wallH)], 'url(#tHatch)', 'stroke="none" opacity=".5"'));
  for (const x0 of [130, 380, 520, 720]) out.push(poly([iso(x0, 38, 26), iso(x0 + 90, 38, 26), iso(x0 + 90, 38, 64), iso(x0, 38, 64)], 'url(#tGlass)') + ln(iso(x0 + 45, 38, 26), iso(x0 + 45, 38, 64), 0.5));
  for (const y0 of [70, 190, 340]) out.push(poly([iso(88, y0, 26), iso(88, y0 + 70, 26), iso(88, y0 + 70, 64), iso(88, y0, 64)], 'url(#tGlass)'));
  out.push(poly([iso(84, 34, wallH), iso(916, 34, wallH), iso(912, 38, wallH), iso(88, 38, wallH)], INK, 'stroke="none"'));
  out.push(poly([iso(84, 34, wallH), iso(88, 38, wallH), iso(88, 432, wallH), iso(84, 436, wallH)], INK, 'stroke="none"'));
  // partitions: cut walls with solid tops
  const part = (x: number, y: number, w: number, d: number) => box(x, y, 0, w, d, 26, PAPER, false) + poly([iso(x, y, 26), iso(x + w, y, 26), iso(x + w, y + d, 26), iso(x, y + d, 26)], INK, 'stroke="none"');
  out.push(part(323, 38, 4, 394)); out.push(part(673, 38, 4, 394));
  out.push(part(88, 143, 235, 4)); out.push(part(327, 143, 346, 4)); out.push(part(677, 143, 235, 4));
  out.push(part(88, 303, 235, 4)); out.push(part(677, 303, 235, 4));

  const items: Item[] = [];
  const add = (x: number, y: number, s: string) => items.push({ k: x + y, s });
  add(150, 95, boulder(150, 95, 10, 2)); add(205, 100, boulder(205, 100, 12, 5)); add(290, 70, plant(290, 70, 16));
  add(400, 46, box(345, 44, 0, 300, 18, 30));
  add(470, 80, box(420, 70, 0, 100, 22, 30, '#ECE6DA'));
  add(560, 115, box(530, 100, 0, 110, 26, 22, '#ECE6DA'));
  for (const cx of [535, 565, 595, 625]) { add(cx, 92, chair(cx - 6, 88)); add(cx, 132, chair(cx - 6, 128)); }
  add(400, 115, person(400, 115, 'elder')); add(420, 120, person(420, 122, 'kid'));
  add(720, 90, box(700, 70, 0, 70, 28, 22, '#E3ECEE')); add(820, 70, box(800, 50, 0, 80, 16, 30)); add(880, 120, plant(880, 120, 14));
  add(100, 220, box(94, 160, 0, 14, 130, 36, '#ECE6DA'));
  for (const [tx, ty] of [[160, 200], [240, 200]] as P[]) {
    add(tx, ty, cyl(tx, ty, 16, 16, '#ECE6DA'));
    for (let k = 0; k < 4; k++) { const sx = tx + Math.cos(k * 1.57 + 0.6) * 24, sy = ty + Math.sin(k * 1.57 + 0.6) * 24; add(sx, sy, cyl(sx, sy, 4.5, 9, PAPER, 0, false)); }
  }
  for (let i = 0; i < 4; i++) add(130 + i * 46, 270, box(126 + i * 46, 262, 0, 36, 18, 7));
  add(240, 210, person(240, 228, 'kid'));
  add(100, 370, box(94, 320, 0, 12, 100, 44, '#ECE6DA'));
  for (const [ax, ay] of [[150, 330], [200, 330], [150, 385], [200, 385]] as P[]) add(ax + 10, ay + 10, armchair(ax, ay));
  add(275, 360, box(255, 345, 0, 50, 34, 14, '#ECE6DA')); add(290, 405, plant(290, 405, 14));
  add(178, 372, person(178, 372, 'elder'));
  for (const [cx, cy] of [[345, 170], [655, 170], [345, 410], [655, 410]] as P[]) add(cx, cy, cyl(cx, cy, 7, 78, '#ECE6DA'));
  add(500, 230, box(470, 212, 0, 60, 34, 8, '#ECE6DA') + tree(500, 229, 24));
  add(430, 285, log(385, 262, 495, 300, 7)); add(520, 330, log(470, 320, 590, 345, 6));
  add(580, 370, boulder(580, 370, 22, 1)); add(620, 300, boulder(620, 300, 15, 3)); add(405, 375, boulder(405, 375, 9, 6));
  for (const [sx, sy, h] of [[560, 245, 10], [585, 262, 14], [608, 280, 18], [630, 260, 12]] as [number, number, number][]) add(sx, sy, stump(sx, sy, 9, h));
  add(340, 280, box(334, 230, 0, 18, 110, 12, '#ECE6DA'));
  add(345, 300, person(343, 300, 'elder')); add(452, 287, person(452, 280, 'kid')); add(600, 368, person(596, 352, 'kid')); add(415, 395, person(430, 392, 'kid')); add(560, 400, person(560, 404, 'adult'));
  for (let i = 0; i < 5; i++) add(705 + i * 40, 205, tower(705 + i * 40, 205));
  add(780, 270, box(700, 258, 0, 190, 24, 24, '#ECE6DA'));
  for (let i = 0; i < 6; i++) add(715 + i * 28, 268, box(708 + i * 28, 262, 24, 22, 14, 3, '#E4ECDA', false));
  add(760, 245, person(760, 245, 'elder')); add(790, 250, person(790, 248, 'kid'));
  for (const yy of [326, 366]) add(740, yy + 9, box(696, yy, 0, 4, 4, 30) + box(776, yy, 0, 4, 4, 30) + box(696, yy, 30, 84, 4, 3));
  add(735, 360, person(735, 352, 'elder'));
  for (const [i, h] of [[0, 6], [1, 12], [2, 18]] as [number, number][]) add(808 + i * 26, 395, box(800 + i * 26, 384, 0, 24, 20, h, '#ECE6DA'));
  add(840, 345, box(800, 340, 0, 80, 7, 6, '#ECE6DA')); add(850, 360, person(850, 354, 'kid'));
  for (let i = 0; i < 3; i++) {
    const bx = 590 + i * 55;
    add(bx + 20, 482, box(bx, 470, 0, 44, 26, 16, '#ECE6DA') + poly([iso(bx + 2, 472, 16), iso(bx + 42, 472, 16), iso(bx + 42, 494, 16), iso(bx + 2, 494, 16)], 'url(#tStipple)', HL2));
    for (let k = 0; k < 4; k++) { const [cx, cy] = iso(bx + 6 + k * 10, 482, 18); add(bx + 22, 483, `<circle cx="${f(cx)}" cy="${f(cy)}" r="4" fill="#E4ECDA" ${HL2}></circle>`); }
  }
  add(290, 520, tree(290, 520, 26)); add(720, 585, tree(720, 585, 30)); add(450, 600, tree(450, 600, 22));
  add(360, 500, log(300, 492, 420, 510, 7)); add(500, 560, boulder(500, 560, 18, 4));
  add(610, 495, box(560, 470, 0, 40, 18, 22, '#ECE6DA'));
  add(395, 560, person(395, 560, 'elder')); add(380, 505, person(380, 498, 'kid')); add(620, 535, person(620, 535, 'kid'));
  items.sort((a, b) => a.k - b.k);
  out.push(...items.map((i) => i.s));

  const cutWall = (x: number, y: number, w: number, d: number) => box(x, y, 0, w, d, 14, PAPER, false) + poly([iso(x, y, 14), iso(x + w, y, 14), iso(x + w, y + d, 14), iso(x, y + d, 14)], INK, 'stroke="none"');
  out.push(cutWall(88, 428, 340, 6)); out.push(cutWall(572, 428, 340, 6)); out.push(cutWall(906, 38, 6, 390));
  out.push(box(422, 426, 0, 8, 10, 70) + box(570, 426, 0, 8, 10, 70) + box(422, 426, 70, 156, 10, 8));
  let door = poly([iso(430, 432, 0), iso(570, 432, 0), iso(570, 432, 70), iso(430, 432, 70)], PAPER);
  for (let z = 10; z < 70; z += 10) door += ln(iso(430, 432, z), iso(570, 432, z), 0.45);
  for (let x = 450; x < 570; x += 20) door += poly([iso(x, 432, 50), iso(x + 14, 432, 50), iso(x + 14, 432, 58), iso(x, 432, 58)], 'url(#tGlass)', HL2);
  out.push(`<g data-doorpanel class="doorpanel">${door}</g>`);

  out.push('<g data-beams></g>');
  for (let i = 0; i < 4; i++) {
    const x0 = 352 + i * 78;
    out.push(poly([iso(x0, 175, 112), iso(x0 + 62, 175, 112), iso(x0 + 62, 395, 112), iso(x0, 395, 112)], 'url(#tGlass)', `${HL} fill-opacity=".35"`));
    for (let y = 230; y < 395; y += 55) out.push(ln(iso(x0, y, 112), iso(x0 + 62, y, 112), 0.45));
    for (const [px, py] of [[x0, 175], [x0 + 62, 395]] as P[]) out.push(ln(iso(px, py, 78), iso(px, py, 112), 0.4, 'stroke-dasharray="2 2"'));
  }
  return out.join('\n');
}

export const skylights = [0, 1, 2, 3].map((i) => ({ x0: 352 + i * 78, x1: 414 + i * 78, y0: 175, y1: 395 }));
