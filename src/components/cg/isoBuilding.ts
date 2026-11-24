// Isometric cutaway of the Common Ground building, drawn as SVG. Original illustration.
// Plan coordinates match the zone rectangles in CommonGround.astro.

export const ISO = { S: 0.95, OX: 452, OY: 92 };
const { S, OX, OY } = ISO;
type P = [number, number];
export const iso = (x: number, y: number, z = 0): P => [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S];
const pt = (p: P) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const pts = (a: P[]) => a.map(pt).join(' ');

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c: number[]) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const shade = (h: string, f: number) => toHex(hex(h).map((v) => (f >= 1 ? v + (255 - v) * (f - 1) : v * f)));

const poly = (a: P[], fill: string, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${extra}></polygon>`;
const line = (a: P, b: P, stroke: string, w = 1, extra = '') => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${stroke}" stroke-width="${w}" ${extra}></line>`;
const ST = 'stroke="rgba(35,32,26,.35)" stroke-width=".6" stroke-linejoin="round"';

function box(x: number, y: number, z: number, w: number, d: number, h: number, col: string, top?: string) {
  const t = top ?? shade(col, 1.18);
  return (
    poly([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)], shade(col, 0.92), ST) +
    poly([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)], shade(col, 0.74), ST) +
    poly([iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)], t, ST)
  );
}
function shadow(x: number, y: number, r: number, op = 0.2) {
  const [cx, cy] = iso(x, y, 0);
  return `<ellipse cx="${cx.toFixed(1)}" cy="${(cy + 2).toFixed(1)}" rx="${(r * S * 1.25).toFixed(1)}" ry="${(r * S * 0.62).toFixed(1)}" fill="#23201A" opacity="${op}" filter="url(#cgblur)"></ellipse>`;
}
function cyl(x: number, y: number, r: number, h: number, col: string, z = 0, grad?: string) {
  const [bx, by] = iso(x, y, z), ty = by - h * S, rx = r * S * 1.22, ry = r * S * 0.7;
  return `<path d="M${(bx - rx).toFixed(1)} ${ty.toFixed(1)} L${(bx - rx).toFixed(1)} ${by.toFixed(1)} A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(bx + rx).toFixed(1)} ${by.toFixed(1)} L${(bx + rx).toFixed(1)} ${ty.toFixed(1)}Z" fill="${grad ?? col}" ${ST}></path>
    <ellipse cx="${bx.toFixed(1)}" cy="${ty.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${shade(col, 1.15)}" ${ST}></ellipse>`;
}
function stump(x: number, y: number, r: number, h: number) {
  const [bx, by] = iso(x, y, h), rx = r * S * 1.22, ry = r * S * 0.7;
  return shadow(x, y, r * 1.2, 0.18) + cyl(x, y, r, h, '#8A6238', 0, 'url(#cgbark)') +
    `<ellipse cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" rx="${(rx * 0.62).toFixed(1)}" ry="${(ry * 0.62).toFixed(1)}" fill="none" stroke="#9C7448" stroke-width=".8"></ellipse>
     <ellipse cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" rx="${(rx * 0.3).toFixed(1)}" ry="${(ry * 0.3).toFixed(1)}" fill="none" stroke="#9C7448" stroke-width=".8"></ellipse>`;
}
function log(x1: number, y1: number, x2: number, y2: number, r: number) {
  const a = iso(x1, y1, r), b = iso(x2, y2, r), w = 2 * r * S;
  const end = iso(x2, y2, r);
  return shadow((x1 + x2) / 2, (y1 + y2) / 2, Math.hypot(x2 - x1, y2 - y1) / 2.6, 0.14) +
    line(a, b, '#7A5432', w, 'stroke-linecap="round"') +
    line([a[0], a[1] - w * 0.22], [b[0], b[1] - w * 0.22], '#A9804F', w * 0.45, 'stroke-linecap="round"') +
    line([a[0], a[1] - w * 0.3], [b[0], b[1] - w * 0.3], '#C29A66', w * 0.12, 'stroke-linecap="round" opacity=".7"') +
    `<ellipse cx="${end[0].toFixed(1)}" cy="${end[1].toFixed(1)}" rx="${(w * 0.42).toFixed(1)}" ry="${(w * 0.5).toFixed(1)}" fill="#D8B888" stroke="#7A5432" stroke-width=".8"></ellipse>
     <ellipse cx="${end[0].toFixed(1)}" cy="${end[1].toFixed(1)}" rx="${(w * 0.22).toFixed(1)}" ry="${(w * 0.27).toFixed(1)}" fill="none" stroke="#A9804F" stroke-width=".7"></ellipse>`;
}
function boulder(x: number, y: number, r: number, seed: number) {
  const [cx, cy] = iso(x, y, r * 0.45);
  const n = 9; let d = '';
  const p: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = 0.82 + 0.28 * Math.abs(Math.sin(seed * 3.1 + i * 1.7));
    p.push([cx + Math.cos(a) * r * S * 1.25 * k, cy + Math.sin(a) * r * S * (a > 0 && a < Math.PI ? 0.55 : 0.85) * k]);
  }
  d = `M${pt(p[0]).replace(',', ' ')}`;
  for (let i = 0; i < n; i++) {
    const c = p[(i + 1) % n], m: P = [(p[i][0] + c[0]) / 2, (p[i][1] + c[1]) / 2];
    d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return shadow(x + r * 0.2, y + r * 0.2, r * 1.15, 0.24) + `<path d="${d}Z" fill="url(#cgstone)" stroke="#7E7568" stroke-width=".8"></path>
    <path d="M${(cx - r * S * 0.6).toFixed(1)} ${(cy - r * S * 0.35).toFixed(1)} q ${(r * S * 0.4).toFixed(1)} ${(-r * S * 0.25).toFixed(1)} ${(r * S * 0.9).toFixed(1)} 0" fill="none" stroke="#FFFFFF" stroke-opacity=".35" stroke-width="1.4" stroke-linecap="round"></path>`;
}
function tree(x: number, y: number, s: number, seed: number) {
  let out = shadow(x + s * 0.3, y + s * 0.3, s * 1.1, 0.22) + cyl(x, y, s * 0.16, s * 1.5, '#7A5432', 0, 'url(#cgbark)');
  const blobs: [number, number, number, number][] = [];
  for (let i = 0; i < 7; i++) {
    const a = seed + i * 2.1;
    blobs.push([x + Math.cos(a) * s * 0.45, y + Math.sin(a) * s * 0.45, s * (1.5 + 0.6 * Math.abs(Math.sin(a * 1.3))), s * (0.5 + 0.18 * Math.abs(Math.cos(a))) ]);
  }
  blobs.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  blobs.forEach(([bx, by, bz, br], i) => {
    const [cx, cy] = iso(bx, by, bz);
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(br * S * 1.25).toFixed(1)}" fill="url(#cgleaf${i % 2})" stroke="#3F6430" stroke-opacity=".35" stroke-width=".6"></circle>`;
  });
  const [tx, ty] = iso(x, y, s * 2.2);
  out += `<circle cx="${(tx - s * 0.3).toFixed(1)}" cy="${(ty - s * 0.2).toFixed(1)}" r="${(s * 0.32 * S).toFixed(1)}" fill="#D7EBB8" opacity=".35"></circle>`;
  return out;
}
function plant(x: number, y: number, s: number) {
  let out = shadow(x, y, s * 0.6, 0.18) + cyl(x, y, s * 0.35, s * 0.5, '#B8774A');
  for (let i = 0; i < 5; i++) {
    const [cx, cy] = iso(x + Math.cos(i * 1.3) * s * 0.25, y + Math.sin(i * 1.3) * s * 0.25, s * (0.8 + (i % 3) * 0.2));
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(s * 0.32 * S).toFixed(1)}" fill="url(#cgleaf${i % 2})"></circle>`;
  }
  return out;
}
function tower(x: number, y: number) {
  let out = shadow(x, y, 7, 0.2) + cyl(x, y, 5.5, 66, '#EDE9E1', 0, 'url(#cgpipe)') + cyl(x, y, 9, 4, '#5B7FA6');
  for (let j = 0; j < 6; j++) for (const side of [-1, 1]) {
    const [cx, cy] = iso(x, y, 10 + j * 9.5);
    out += `<ellipse cx="${(cx + side * 6.5).toFixed(1)}" cy="${(cy + 1).toFixed(1)}" rx="5.2" ry="3.6" fill="${(j + side) % 2 ? '#5E9A45' : '#7DB55C'}" stroke="#3F6430" stroke-opacity=".4" stroke-width=".5"></ellipse>`;
  }
  return out;
}
function person(x: number, y: number, kind: 'kid' | 'adult' | 'elder', shirt: string, skin = '#C99A78', hair = '#3A2A1E') {
  const h = kind === 'kid' ? 30 : 50, [bx, by] = iso(x, y, 0), u = (h / 50) * S;
  const hairC = kind === 'elder' ? '#D9D4CC' : hair;
  let s = shadow(x, y, kind === 'kid' ? 5 : 7, 0.25);
  s += `<g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${u.toFixed(3)})">
    <path d="M-5 0 L-4.5 -22 L-0.5 -22 L-1 0Z M1 0 L0.5 -22 L4.5 -22 L5 0Z" fill="#4A5568"></path>
    <path d="M-8 -21 Q-9 -38 -6 -40 L6 -40 Q9 -38 8 -21Z" fill="${shirt}" stroke="rgba(0,0,0,.2)" stroke-width=".8"></path>
    <path d="M-8 -36 L-11 -22 M8 -36 L11 -24" stroke="${shirt}" stroke-width="3.6" stroke-linecap="round"></path>
    <circle cx="0" cy="-46" r="6.4" fill="${skin}"></circle>
    <path d="M-6.6 -47 Q-6 -54 0 -54 Q6 -54 6.6 -47 Q3 -50 -6.6 -47Z" fill="${hairC}"></path>
    ${kind === 'elder' ? '<path d="M11 -24 L13 0" stroke="#6B4A2E" stroke-width="1.6" stroke-linecap="round"></path>' : ''}
  </g>`;
  return s;
}
function chair(x: number, y: number, col: string) {
  return box(x, y, 0, 12, 12, 9, col) + box(x, y, 9, 12, 3, 12, col);
}
function armchair(x: number, y: number, col: string) {
  return shadow(x + 9, y + 9, 10, 0.15) + box(x, y, 0, 20, 20, 9, col) + box(x, y, 9, 20, 5, 14, col) + box(x, y + 5, 9, 4, 15, 6, col) + box(x + 16, y + 5, 9, 4, 15, 6, col);
}

type Item = { k: number; s: string };

export function buildIso(): string {
  const out: string[] = [];
  // ground and yard lawn
  out.push(poly([iso(40, -10), iso(960, -10), iso(960, 640), iso(40, 640)], '#E9E1D2'));
  out.push(poly([iso(230, 455), iso(770, 455), iso(770, 615), iso(230, 615)], 'url(#cggrass)', 'stroke="#6B8F4E" stroke-opacity=".45"'));
  // garden path loop in yard
  const path: P[] = []; for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2; path.push(iso(500 + Math.cos(a) * 205, 540 + Math.sin(a) * 50)); }
  out.push(`<polyline points="${pts(path)}" fill="none" stroke="#D9CDB6" stroke-width="13" stroke-linejoin="round"></polyline><polyline points="${pts(path)}" fill="none" stroke="#E8DFCD" stroke-width="9"></polyline>`);
  // building slab
  out.push(box(88, 38, -6, 824, 394, 6, '#CFC6B6', '#D9D1C2'));
  // room floors
  const floor = (x: number, y: number, w: number, d: number, fill: string, planks = false) => {
    let s = poly([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)], fill);
    if (planks) for (let yy = y + 9; yy < y + d; yy += 9) s += line(iso(x, yy), iso(x + w, yy), 'rgba(90,60,30,.16)', 0.7);
    return s;
  };
  out.push(floor(92, 42, 230, 100, '#D9CCB4', true));     // quiet
  out.push(floor(328, 42, 344, 100, '#E3D3B8', true));    // hearth
  out.push(floor(678, 42, 230, 100, '#E2E6E4'));           // clinic
  out.push(floor(92, 148, 230, 154, '#E6D2A6', true));     // kids
  out.push(floor(92, 308, 230, 120, '#D8CCD8', true));     // elders
  out.push(floor(328, 148, 344, 280, '#D6BE93', true));    // hall
  out.push(floor(678, 148, 230, 154, '#DCE3DF'));          // garden lab
  out.push(floor(678, 308, 230, 120, '#9C5A43'));          // gym rubber
  // rugs, mats, sand
  out.push(poly([iso(130, 70), iso(280, 70), iso(280, 125), iso(130, 125)], '#B7C79F', 'opacity=".75"'));
  out.push(poly([iso(345, 340), iso(470, 340), iso(470, 412), iso(345, 412)], 'url(#cgsand)', 'stroke="#C9A86A"'));
  out.push(poly([iso(790, 330), iso(890, 330), iso(890, 410), iso(790, 410)], '#6E8FA8', 'opacity=".85"'));
  out.push(poly([iso(560, 470), iso(660, 470), iso(660, 520), iso(560, 520)], 'url(#cgsand)', 'stroke="#C9A86A"'));
  // back walls (north, west) with windows
  const wallH = 78;
  out.push(poly([iso(88, 38, 0), iso(912, 38, 0), iso(912, 38, wallH), iso(88, 38, wallH)], '#EFE8DB', ST));
  out.push(poly([iso(88, 38, 0), iso(88, 432, 0), iso(88, 432, wallH), iso(88, 38, wallH)], '#E3DACB', ST));
  for (const x0 of [130, 380, 520, 720]) out.push(poly([iso(x0, 38, 26), iso(x0 + 90, 38, 26), iso(x0 + 90, 38, 64), iso(x0, 38, 64)], 'url(#cgglass)', 'stroke="#8A9DA3" stroke-width="1.2"') + line(iso(x0 + 45, 38, 26), iso(x0 + 45, 38, 64), '#8A9DA3', 1));
  for (const y0 of [70, 190, 340]) out.push(poly([iso(88, y0, 26), iso(88, y0 + 70, 26), iso(88, y0 + 70, 64), iso(88, y0, 64)], 'url(#cgglass)', 'stroke="#8A9DA3" stroke-width="1.2"'));
  // wall tops
  out.push(poly([iso(84, 34, wallH), iso(916, 34, wallH), iso(912, 38, wallH), iso(88, 38, wallH)], '#CFC6B6'));
  out.push(poly([iso(84, 34, wallH), iso(88, 38, wallH), iso(88, 432, wallH), iso(84, 436, wallH)], '#CFC6B6'));
  // interior partitions (low cutaway walls)
  const part = (x: number, y: number, w: number, d: number) => box(x, y, 0, w, d, 26, '#F1EBDF', '#BDB3A2');
  out.push(part(323, 38, 4, 394)); out.push(part(673, 38, 4, 394));
  out.push(part(88, 143, 235, 4)); out.push(part(327, 143, 346, 4)); out.push(part(677, 143, 235, 4));
  out.push(part(88, 303, 235, 4)); out.push(part(677, 303, 235, 4));

  const items: Item[] = [];
  const add = (x: number, y: number, s: string) => items.push({ k: x + y, s });
  // Quiet room
  add(150, 95, boulder(150, 95, 10, 2).replace(/url\(#cgstone\)/, '#C7B8A4'));
  add(205, 100, `<g opacity=".95">${boulder(205, 100, 12, 5).replace(/url\(#cgstone\)/, '#B7C79F')}</g>`);
  add(290, 70, plant(290, 70, 16));
  // Hearth: counter, island, table
  add(400, 46, box(345, 44, 0, 300, 18, 30, '#C9B8A0', '#EDE6DA'));
  add(470, 80, box(420, 70, 0, 100, 22, 30, '#9C7448', '#F0EAE0'));
  add(560, 115, box(530, 100, 0, 110, 26, 22, '#B98A55', '#C8996A'));
  for (const cx of [535, 565, 595, 625]) { add(cx, 92, chair(cx - 6, 88, '#8A6238')); add(cx, 132, chair(cx - 6, 128, '#8A6238')); }
  add(400, 115, person(400, 115, 'elder', '#8E7BA8', '#E2B999'));
  add(420, 120, person(420, 122, 'kid', '#E8A33D', '#8D5A3E'));
  // Clinic
  add(720, 90, box(700, 70, 0, 70, 28, 22, '#E7EBEC', '#F6F8F8'));
  add(820, 70, box(800, 50, 0, 80, 16, 30, '#B9C3C7', '#DCE2E4'));
  add(880, 120, plant(880, 120, 14));
  // Little ones: round tables, stools, cots, cubbies
  add(100, 220, box(94, 160, 0, 14, 130, 36, '#D8B888', '#E8D3AE'));
  for (const [tx, ty] of [[160, 200], [240, 200]] as P[]) {
    add(tx, ty, shadow(tx, ty, 16, 0.15) + cyl(tx, ty, 16, 16, '#C9A26E') );
    for (let k = 0; k < 4; k++) { const sx = tx + Math.cos(k * 1.57 + 0.6) * 24, sy = ty + Math.sin(k * 1.57 + 0.6) * 24; add(sx, sy, cyl(sx, sy, 4.5, 9, ['#E8A33D', '#6B8F4E', '#3E7F8C', '#D9826B'][k])); }
  }
  for (let i = 0; i < 4; i++) add(130 + i * 46, 270, box(126 + i * 46, 262, 0, 36, 18, 7, '#EDE6DA', '#A9C4D4'));
  add(240, 210, person(240, 228, 'kid', '#3E7F8C', '#E2B999', '#7A4E2A'));
  // Elders: armchairs, coffee table, shelf
  add(100, 370, box(94, 320, 0, 12, 100, 44, '#8A6238', '#A9804F'));
  for (const [ax, ay] of [[150, 330], [200, 330], [150, 385], [200, 385]] as P[]) add(ax + 10, ay + 10, armchair(ax, ay, '#8E7BA8'));
  add(275, 360, box(255, 345, 0, 50, 34, 14, '#B98A55', '#C8996A'));
  add(290, 405, plant(290, 405, 14));
  add(178, 372, person(178, 372, 'elder', '#5B7FA6', '#C99A78'));
  // Nature Hall: tree columns, big indoor tree, logs, boulders, stumps, bench, kids
  add(345, 170, cyl(345, 170, 7, 78, '#8A6238', 0, 'url(#cgbark)'));
  add(655, 170, cyl(655, 170, 7, 78, '#8A6238', 0, 'url(#cgbark)'));
  add(345, 410, cyl(345, 410, 7, 78, '#8A6238', 0, 'url(#cgbark)'));
  add(655, 410, cyl(655, 410, 7, 78, '#8A6238', 0, 'url(#cgbark)'));
  add(500, 230, box(470, 212, 0, 60, 34, 8, '#9C7448', '#6E5A3C') + tree(500, 229, 24, 1.3));
  add(430, 285, log(385, 262, 495, 300, 7));
  add(520, 330, log(470, 320, 590, 345, 6));
  add(580, 370, boulder(580, 370, 22, 1));
  add(620, 300, boulder(620, 300, 15, 3));
  add(405, 375, boulder(405, 375, 9, 6));
  for (const [sx, sy, h] of [[560, 245, 10], [585, 262, 14], [608, 280, 18], [630, 260, 12]] as [number, number, number][]) add(sx, sy, stump(sx, sy, 9, h));
  add(340, 280, box(334, 230, 0, 18, 110, 12, '#9C7448', '#B98A55'));
  add(345, 300, person(343, 300, 'elder', '#C77B2B', '#E2B999'));
  add(452, 287, person(452, 280, 'kid', '#D9826B', '#C99A78', '#2E241C'));
  add(600, 368, person(596, 352, 'kid', '#6B8F4E', '#8D5A3E', '#1E1712'));
  add(415, 395, person(430, 392, 'kid', '#5B7FA6', '#E2B999', '#A5682E'));
  add(560, 400, person(560, 404, 'adult', '#3E7F8C', '#C99A78'));
  // Garden lab: towers, workbench, seed trays
  for (let i = 0; i < 5; i++) add(705 + i * 40, 205, tower(705 + i * 40, 205));
  add(780, 270, box(700, 258, 0, 190, 24, 24, '#B98A55', '#D8C3A3'));
  for (let i = 0; i < 6; i++) add(715 + i * 28, 268, box(708 + i * 28, 262, 24, 22, 14, 3, '#6B4A2E', '#5E9A45'));
  add(760, 245, person(760, 245, 'elder', '#B98A55', '#C99A78'));
  add(790, 250, person(790, 248, 'kid', '#E8A33D', '#E2B999', '#3A2A1E'));
  // Gym: rails, steps, beam, kettlebells
  add(740, 335, box(696, 326, 0, 4, 4, 30, '#7A7468') + box(776, 326, 0, 4, 4, 30, '#7A7468') + box(696, 326, 30, 84, 4, 3, '#C9C2B4'));
  add(740, 375, box(696, 366, 0, 4, 4, 30, '#7A7468') + box(776, 366, 0, 4, 4, 30, '#7A7468') + box(696, 366, 30, 84, 4, 3, '#C9C2B4'));
  add(735, 360, person(735, 352, 'elder', '#5B7FA6', '#E2B999'));
  for (const [i, h] of [[0, 6], [1, 12], [2, 18]] as [number, number][]) add(808 + i * 26, 395, box(800 + i * 26, 384, 0, 24, 20, h, '#C9A26E', '#E0C49A'));
  add(840, 345, box(800, 340, 0, 80, 7, 6, '#9C7448', '#C29A66'));
  add(850, 360, person(850, 354, 'kid', '#D9826B', '#8D5A3E', '#1E1712'));
  // Yard: raised beds, trees, log, boulder, mud kitchen, people
  for (let i = 0; i < 3; i++) {
    const bx = 590 + i * 55;
    add(bx + 20, 482, box(bx, 470, 0, 44, 26, 16, '#9C7448', '#5A3E26'));
    for (let k = 0; k < 4; k++) { const [cx, cy] = iso(bx + 6 + k * 10, 482, 18); add(bx + 22, 483, `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="url(#cgleaf${k % 2})"></circle>`); }
  }
  add(290, 520, tree(290, 520, 26, 2.1));
  add(720, 585, tree(720, 585, 30, 4.4));
  add(450, 600, tree(450, 600, 22, 0.7));
  add(360, 500, log(300, 492, 420, 510, 7));
  add(500, 560, boulder(500, 560, 18, 4));
  add(610, 495, box(560, 470, 0, 40, 18, 22, '#B98A55', '#9C7448'));
  add(395, 560, person(395, 560, 'elder', '#8E7BA8', '#C99A78'));
  add(380, 505, person(380, 498, 'kid', '#E8A33D', '#C99A78', '#3A2A1E'));
  add(620, 535, person(620, 535, 'kid', '#3E7F8C', '#8D5A3E', '#1E1712'));

  items.sort((a, b) => a.k - b.k);
  out.push(...items.map((i) => i.s));

  // front cut walls (low) and garage door frame
  out.push(box(88, 428, 0, 340, 6, 14, '#E3DACB', '#BDB3A2'));
  out.push(box(572, 428, 0, 340, 6, 14, '#E3DACB', '#BDB3A2'));
  out.push(box(906, 38, 0, 6, 390, 14, '#E3DACB', '#BDB3A2'));
  out.push(box(422, 426, 0, 8, 10, 70, '#8A8275') + box(570, 426, 0, 8, 10, 70, '#8A8275') + box(422, 426, 70, 156, 10, 8, '#8A8275'));
  // the door panel (moves when opened)
  let door = poly([iso(430, 432, 0), iso(570, 432, 0), iso(570, 432, 70), iso(430, 432, 70)], 'url(#cgdoor)', 'stroke="#6B4A2E" stroke-width="1"');
  for (let z = 10; z < 70; z += 10) door += line(iso(430, 432, z), iso(570, 432, z), '#6B4A2E', 0.8, 'opacity=".55"');
  for (let x = 450; x < 570; x += 20) door += poly([iso(x, 432, 50), iso(x + 14, 432, 50), iso(x + 14, 432, 58), iso(x, 432, 58)], 'url(#cgglass)', 'opacity=".9"');
  out.push(`<g data-doorpanel class="doorpanel">${door}</g>`);

  // skylight lantern over the hall (glass panels on slender posts)
  out.push('<g data-beams></g>');
  for (let i = 0; i < 4; i++) {
    const x0 = 352 + i * 78;
    out.push(poly([iso(x0, 175, 112), iso(x0 + 62, 175, 112), iso(x0 + 62, 395, 112), iso(x0, 395, 112)], 'url(#cgglass)', 'opacity=".16" stroke="#6F858C" stroke-width="1.2"'));
    for (let y = 175; y <= 395; y += 55) out.push(line(iso(x0, y, 112), iso(x0 + 62, y, 112), '#6F858C', 0.9, 'opacity=".75"'));
  }
  return out.join('\n');
}

export const skylights = [0, 1, 2, 3].map((i) => ({ x0: 352 + i * 78, x1: 414 + i * 78, y0: 175, y1: 395 }));
