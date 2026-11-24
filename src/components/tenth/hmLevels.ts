// Levels 1 (Colorado) and 2 (the valley) of the Camp Hale zoom map, drawn in fine line on charcoal.
// Landmark positions use published coordinates; rivers, rail and terrain are simplified.
const FG = '#E8E4DA', HON = '#C99242', COOL = '#8FC1CB', WARM = '#D9826B', DIM = '#A8A397';
const f = (n: number) => n.toFixed(1);
type LL = [number, number]; // [lat, lon]

const txt = (x: number, y: number, s: string, o: { size?: number; fill?: string; op?: number; anchor?: string; ls?: number; rot?: number } = {}) =>
  `<text ${o.rot ? `transform="translate(${f(x)} ${f(y)}) rotate(${o.rot})"` : `x="${f(x)}" y="${f(y)}"`} font-size="${o.size ?? 9}" fill="${o.fill ?? FG}" fill-opacity="${o.op ?? 0.8}" letter-spacing="${o.ls ?? 1.6}" text-anchor="${o.anchor ?? 'start'}">${s}</text>`;
const smooth = (p: [number, number][]) => {
  // Catmull-Rom → cubic Bézier
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    d += ` C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
  }
  return d;
};
const legendRow = (y: number, sym: string, label: string) => `<g transform="translate(0 ${y})">${sym}${txt(40, 3, label, { size: 8.5, op: 0.8, ls: 1.2 })}</g>`;

// ───────────────────────── Level 1 · Colorado ─────────────────────────
// Colorado spans 37–41°N, 102.05–109.05°W (about 380 × 276 miles); the frame keeps that ratio.
export const CO = { X0: 140, Y0: 46, W: 720, H: 524 };
const cx = (lon: number) => CO.X0 + ((lon + 109.05) / 7) * CO.W;
const cy = (lat: number) => CO.Y0 + ((41 - lat) / 4) * CO.H;
const C = ([la, lo]: LL): [number, number] => [cx(lo), cy(la)];
export const haleCO = C([39.42, -106.32]);

export function buildColorado(): string {
  const o: string[] = [];
  const { X0, Y0, W, H } = CO;
  o.push(`<defs><pattern id="co-mtn" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M2 8 L5 4 L8 8" fill="none" stroke="${FG}" stroke-opacity=".22" stroke-width=".6"></path></pattern></defs>`);
  // mountains (very approximate envelope of the Colorado Rockies)
  const mtn: LL[] = [[41, -105.3], [40.4, -105.25], [39.7, -105.2], [39.0, -105.05], [38.4, -105.0], [37.8, -105.05], [37.3, -104.95], [37, -105.1], [37, -107.6], [37.5, -108.1], [38.1, -108.0], [38.7, -107.8], [39.2, -107.6], [39.6, -107.3], [40.0, -107.5], [40.5, -107.0], [41, -107.0]];
  o.push(`<polygon points="${mtn.map((p) => C(p).map(f).join(',')).join(' ')}" fill="url(#co-mtn)" stroke="${FG}" stroke-opacity=".18" stroke-width=".6" stroke-dasharray="2 3"></polygon>`);
  o.push(txt(cx(-107.0), cy(38.25), 'ROCKY MOUNTAINS', { size: 10, op: 0.45, ls: 4, anchor: 'middle' }));
  o.push(txt(cx(-103.4), cy(39.0), 'GREAT PLAINS', { size: 10, op: 0.35, ls: 4, anchor: 'middle' }));
  o.push(txt(cx(-108.55), cy(39.75), 'PLATEAU', { size: 9, op: 0.3, ls: 3, anchor: 'middle' }));
  // state frame + graticule ticks on the border only
  o.push(`<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" fill="none" stroke="${FG}" stroke-opacity=".85" stroke-width="1"></rect>`);
  for (let i = 0; i <= 7; i++) { const x = X0 + (W / 7) * i; o.push(`<path d="M${f(x)} ${Y0 + H} l0 6 M${f(x)} ${Y0} l0 -6" stroke="${FG}" stroke-opacity=".5"></path>`, txt(x, Y0 + H + 18, `${109 - i}°W`, { size: 8, fill: DIM, op: 1, ls: 0.5, anchor: 'middle' })); }
  for (let i = 0; i <= 4; i++) { const y = Y0 + (H / 4) * i; o.push(`<path d="M${X0} ${f(y)} l-6 0 M${X0 + W} ${f(y)} l6 0" stroke="${FG}" stroke-opacity=".5"></path>`, txt(X0 - 10, y + 3, `${41 - i}°N`, { size: 8, fill: DIM, op: 1, ls: 0.5, anchor: 'end' })); }
  // Continental Divide
  const divide: LL[] = [[41, -106.86], [40.5, -106.7], [40.25, -105.8], [39.9, -105.75], [39.6, -105.95], [39.4, -106.18], [39.1, -106.45], [38.7, -106.3], [38.3, -106.35], [37.9, -106.9], [37.5, -106.95], [37.0, -106.5]];
  o.push(`<path d="${smooth(divide.map(C))}" fill="none" stroke="${HON}" stroke-width="1.2" class="flow-slow"></path>`);
  o.push(txt(cx(-106.6) - 12, cy(40.6), 'CONTINENTAL DIVIDE', { size: 8.5, fill: HON, op: 1, anchor: 'end' }));
  // Denver → Camp Hale distance line
  const den = C([39.74, -104.99]);
  o.push(`<path d="M${f(den[0])} ${f(den[1])} L${f(haleCO[0])} ${f(haleCO[1])}" stroke="${FG}" stroke-opacity=".55" stroke-width=".7" stroke-dasharray="3 4"></path>`);
  const mid: [number, number] = [haleCO[0] * 0.4 + den[0] * 0.6, haleCO[1] * 0.4 + den[1] * 0.6];
  const ang = (Math.atan2(den[1] - haleCO[1], den[0] - haleCO[0]) * 180) / Math.PI;
  const ang2 = ang > 90 || ang < -90 ? ang + 180 : ang;
  o.push(`<text transform="translate(${f(mid[0])} ${f(mid[1])}) rotate(${f(ang2)}) translate(0 -6)" font-size="8" fill="${FG}" fill-opacity=".7" letter-spacing="1.2" text-anchor="middle">≈ 75 MI WEST OF DENVER</text>`);
  // places
  const places: { n: string; p: LL; a: 'start' | 'end'; dy?: number; cap?: boolean }[] = [
    { n: 'DENVER', p: [39.74, -104.99], a: 'start', cap: true },
    { n: 'COLORADO SPRINGS · CAMP CARSON', p: [38.74, -104.79], a: 'start' },
    { n: 'LEADVILLE', p: [39.25, -106.29], a: 'start', dy: 6 },
    { n: 'VAIL', p: [39.64, -106.37], a: 'end' },
    { n: 'ASPEN', p: [39.19, -106.82], a: 'end' },
  ];
  for (const pl of places) {
    const [x, y] = C(pl.p);
    o.push(pl.cap
      ? `<path d="M${f(x)} ${f(y - 5)} l1.5 3.4 3.6 .3 -2.8 2.4 .9 3.6 -3.2 -2 -3.2 2 .9 -3.6 -2.8 -2.4 3.6 -.3z" fill="${FG}"></path>`
      : `<circle cx="${f(x)}" cy="${f(y)}" r="2.6" fill="none" stroke="${FG}" stroke-opacity=".85"></circle>`);
    o.push(txt(x + (pl.a === 'start' ? 9 : -9), y + 3 + (pl.dy ?? 0), pl.n, { size: 9, op: pl.cap ? 0.95 : 0.75, anchor: pl.a }));
  }
  // Camp Hale target
  const [hx, hy] = haleCO;
  o.push(`<g class="hm-target"><circle cx="${f(hx)}" cy="${f(hy)}" r="22" fill="none" stroke="${HON}" stroke-width=".9"></circle><path d="M${f(hx - 32)} ${f(hy)} L${f(hx - 24)} ${f(hy)} M${f(hx + 24)} ${f(hy)} L${f(hx + 32)} ${f(hy)} M${f(hx)} ${f(hy - 32)} L${f(hx)} ${f(hy - 24)} M${f(hx)} ${f(hy + 24)} L${f(hx)} ${f(hy + 32)}" stroke="${HON}" stroke-width=".8"></path><circle cx="${f(hx)}" cy="${f(hy)}" r="3.5" fill="${HON}"></circle></g>`);
  o.push(`<path d="M${f(hx - 16)} ${f(hy - 16)} L${f(hx - 70)} ${f(hy - 110)} L${f(hx - 90)} ${f(hy - 110)}" fill="none" stroke="${HON}" stroke-opacity=".6" stroke-width=".6"></path>`);
  o.push(txt(hx - 96, hy - 112, 'CAMP HALE · 9,200 FT', { size: 11, fill: HON, op: 1, anchor: 'end', ls: 2 }));
  o.push(txt(hx - 96, hy - 98, 'ON THE DIVIDE, NEAR LEADVILLE · 1942–45', { size: 8, fill: DIM, op: 1, anchor: 'end', ls: 1.2 }));
  // legend (in the empty plains)
  const lx = cx(-103.75), ly = cy(38.15);
  o.push(`<g transform="translate(${f(lx)} ${f(ly)})"><rect x="-14" y="-20" width="220" height="118" fill="#1C1D1B" stroke="${FG}" stroke-opacity=".3"></rect>${txt(0, -4, 'KEY', { size: 8, fill: DIM, op: 1, ls: 2 })}` +
    legendRow(14, `<circle cx="14" cy="0" r="3.5" fill="${HON}"></circle>`, 'Camp Hale') +
    legendRow(34, `<path d="M0 0 L28 0" stroke="${HON}" stroke-width="1.2"></path>`, 'Continental Divide') +
    legendRow(54, `<rect x="0" y="-5" width="28" height="10" fill="url(#co-mtn)" stroke="${FG}" stroke-opacity=".3" stroke-dasharray="2 3"></rect>`, 'Mountains (approx.)') +
    legendRow(74, `<circle cx="14" cy="0" r="2.6" fill="none" stroke="${FG}"></circle>`, 'Town') + '</g>');
  // scale bar (≈1.9 px per mile)
  const sx = X0, sy = Y0 + H + 38, mi = W / 380;
  o.push(`<g transform="translate(${sx} ${sy})"><path d="M0 0 L${f(100 * mi)} 0 M0 -4 L0 4 M${f(50 * mi)} -3 L${f(50 * mi)} 3 M${f(100 * mi)} -4 L${f(100 * mi)} 4" stroke="${FG}" stroke-opacity=".7"></path>${txt(100 * mi + 8, 3, '100 MI', { size: 8, fill: DIM, op: 1, ls: 1 })}</g>`);
  o.push(txt(X0 + W, Y0 + H + 41, 'COLORADO · DIVIDE AND MOUNTAIN EDGE APPROXIMATE', { size: 8, fill: DIM, op: 1, anchor: 'end', ls: 1.2 }));
  o.push(txt(960, 34, 'N ↑', { size: 10, op: 0.7, anchor: 'end', ls: 2 }));
  return o.join('\n');
}

// ───────────────────────── Level 2 · The valley ─────────────────────────
// Local projection centered on Camp Hale, true to scale: 1 mile ≈ 50 px.
const LAT0 = 39.42, LON0 = -106.32, SC = 3450, KX = Math.cos((39.42 * Math.PI) / 180);
const vx = (lon: number) => 500 + (lon - LON0) * SC * KX;
const vy = (lat: number) => 375 + (LAT0 - lat) * SC;
const V = ([la, lo]: LL): [number, number] => [vx(lo), vy(la)];

export function buildValley(): string {
  const o: string[] = [];
  o.push(`<defs><pattern id="v-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 L0 7" stroke="${WARM}" stroke-opacity=".35" stroke-width=".8"></path></pattern></defs>`);
  // peaks as fine contour rings
  const rings = (c: [number, number], n: number, r0: number, seed: number) => {
    let s = '';
    for (let k = 0; k < n; k++) {
      const r = r0 + k * 13, ptsA: [number, number][] = [];
      for (let a = 0; a <= 360; a += 20) { const t = (a * Math.PI) / 180; const w = r * (1 + 0.16 * Math.sin(3 * t + seed + k * 0.4) + 0.08 * Math.cos(5 * t + seed)); ptsA.push([c[0] + w * Math.cos(t) * 1.15, c[1] + w * Math.sin(t)]); }
      s += `<path d="${smooth(ptsA)}" fill="none" stroke="${FG}" stroke-opacity="${(0.32 - k * 0.04).toFixed(2)}" stroke-width=".6"></path>`;
    }
    return s;
  };
  const homestake = V([39.3675, -106.4148]), resolution = V([39.4899, -106.2946]), pass = V([39.362, -106.311]), cooper = V([39.36, -106.3]);
  o.push(rings(homestake, 6, 8, 1), rings(resolution, 5, 8, 2.4), rings(V([39.47, -106.42]), 4, 14, 4), rings(V([39.39, -106.22]), 4, 12, 5.5));
  // valley floor: Eagle Park (wide meadow at the camp) narrowing into canyon north and south
  const course: LL[] = [[39.352, -106.315], [39.375, -106.318], [39.4, -106.322], [39.42, -106.322], [39.437, -106.326], [39.455, -106.338], [39.475, -106.358], [39.5, -106.376], [39.54, -106.39]];
  const cs = course.map(V);
  const half = (lat: number) => 14 + 52 * Math.exp(-(((lat - 39.42) / 0.022) ** 2)); // wide at Eagle Park, canyon above and below
  const fw: [number, number][] = cs.map((p, i) => [p[0] - half(course[i][0]) - 6, p[1]]);
  const fe: [number, number][] = cs.map((p, i) => [p[0] + half(course[i][0]) + 10, p[1]]).reverse();
  o.push(`<path d="${smooth(fw)} L${f(fe[0][0])} ${f(fe[0][1])} ${smooth(fe).replace(/^M[^C]+/, '')} Z" fill="${FG}" fill-opacity=".05" stroke="none"></path>`);
  const hach = (line: [number, number][], side: number) => {
    let s = '';
    for (let i = 0; i < line.length - 1; i++) {
      const [a, b] = [line[i], line[i + 1]];
      for (let t = 0; t < 1; t += 0.2) {
        const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
        const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
        const nx = (-dy / l) * side, ny = (dx / l) * side;
        s += `M${f(x)} ${f(y)} l${f(nx * 9)} ${f(ny * 9)} `;
      }
    }
    return `<path d="${s}" stroke="${FG}" stroke-opacity=".35" stroke-width=".6"></path>`;
  };
  o.push(hach(fw, -1), hach(fe, -1));
  o.push(txt(vx(-106.375), vy(39.405), 'EAGLE PARK', { size: 9, fill: DIM, op: 1, ls: 3, anchor: 'end' }));
  o.push(txt(vx(-106.375), vy(39.405) + 12, 'FLAT MEADOW', { size: 8, fill: DIM, op: 0.8, ls: 2, anchor: 'end' }));
  // D-Series maneuver area (approximate): the high country from Tennessee Pass north to Resolution Mountain
  const ds: LL[] = [[39.37, -106.295], [39.4, -106.29], [39.44, -106.285], [39.475, -106.31], [39.505, -106.305], [39.51, -106.27], [39.47, -106.245], [39.42, -106.24], [39.375, -106.26]];
  o.push(`<path d="${smooth([...ds, ds[0]].map(V))}" fill="url(#v-hatch)" stroke="${WARM}" stroke-opacity=".8" stroke-width=".9" stroke-dasharray="4 4" class="flow"></path>`);
  const dsl = V([39.452, -106.272]);
  o.push(txt(dsl[0], dsl[1], 'D-SERIES', { size: 9, fill: WARM, op: 1, anchor: 'middle', ls: 2 }), txt(dsl[0], dsl[1] + 12, 'MANEUVERS', { size: 9, fill: WARM, op: 1, anchor: 'middle', ls: 2 }), txt(dsl[0], dsl[1] + 25, 'MAR–APR 1944', { size: 8, fill: WARM, op: 0.8, anchor: 'middle', ls: 1.2 }));
  // Eagle River (flows north) and Resolution Creek
  const river: LL[] = [[39.355, -106.316], [39.375, -106.318], [39.4, -106.322], [39.42, -106.322], [39.437, -106.326], [39.455, -106.338], [39.475, -106.358], [39.5, -106.376], [39.535, -106.388]];
  const rv = river.map(V);
  o.push(`<path d="${smooth(rv)}" fill="none" stroke="${COOL}" stroke-width="1.8"></path>`, `<path d="${smooth(rv)}" fill="none" stroke="#1C1D1B" stroke-width=".7" stroke-dasharray="6 14" class="flow-rev"></path>`);
  const creek: LL[] = [[39.485, -106.3], [39.47, -106.307], [39.455, -106.316], [39.44, -106.325]];
  o.push(`<path d="${smooth(creek.map(V))}" fill="none" stroke="${COOL}" stroke-width="1" stroke-opacity=".85"></path>`);
  const rl = V([39.49, -106.374]);
  o.push(txt(rl[0] - 12, rl[1], 'EAGLE RIVER', { size: 9, fill: COOL, op: 1, anchor: 'end', ls: 2 }), txt(rl[0] - 12, rl[1] + 12, 'FLOWS NORTH ↑', { size: 8, fill: COOL, op: 0.75, anchor: 'end', ls: 1.2 }));
  const cl = V([39.465, -106.309]);
  o.push(txt(cl[0] + 8, cl[1] - 2, 'RESOLUTION CREEK', { size: 8, fill: COOL, op: 0.85, ls: 1.2 }));
  // railroad (D&RGW Tennessee Pass line) on the east side of the river
  const rail: LL[] = [[39.355, -106.31], [39.375, -106.312], [39.4, -106.314], [39.42, -106.314], [39.437, -106.318], [39.455, -106.331], [39.475, -106.35], [39.5, -106.369], [39.535, -106.381]];
  const rp = rail.map(V);
  o.push(`<path d="${smooth(rp)}" fill="none" stroke="${FG}" stroke-opacity=".85" stroke-width="1"></path>`);
  o.push(`<path d="${smooth(rp)}" fill="none" stroke="${FG}" stroke-opacity=".85" stroke-width="5" stroke-dasharray="1 7"></path>`);
  const tl = V([39.505, -106.366]);
  o.push(txt(tl[0] + 10, tl[1] + 2, 'D&amp;RGW RAILROAD', { size: 8.5, op: 0.85, ls: 1.4 }));
  // the camp
  const c0 = V([39.437, -106.335]), c1 = V([39.405, -106.305]);
  o.push(`<g class="hm-target"><rect x="${f(c0[0])}" y="${f(c0[1])}" width="${f(c1[0] - c0[0])}" height="${f(c1[1] - c0[1])}" fill="${HON}" fill-opacity=".08" stroke="${HON}" stroke-width="1.1"></rect></g>`);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) o.push(`<rect x="${f(c0[0] + 10 + c * 14)}" y="${f(c0[1] + 14 + r * 18)}" width="9" height="5" fill="none" stroke="${HON}" stroke-opacity=".55" stroke-width=".6"></rect>`);
  o.push(`<path d="M${f(c0[0])} ${f(c0[1] + 30)} L${f(c0[0] - 80)} ${f(c0[1] + 30)}" stroke="${HON}" stroke-opacity=".6" stroke-width=".6"></path>`);
  o.push(txt(c0[0] - 86, c0[1] + 28, 'CAMP HALE', { size: 11, fill: HON, op: 1, ls: 2.4, anchor: 'end' }), txt(c0[0] - 86, c0[1] + 42, 'ZOOM IN TO WALK THE CAMP', { size: 8, fill: DIM, op: 1, ls: 1.2, anchor: 'end' }));
  const pando = V([39.442, -106.33]);
  o.push(`<circle cx="${f(pando[0])}" cy="${f(pando[1])}" r="2.6" fill="${FG}"></circle>`, txt(pando[0] - 10, pando[1] - 4, 'PANDO', { size: 8.5, op: 0.85, anchor: 'end', ls: 1.4 }));
  // landmarks
  const peak = (p: [number, number], name: string, el: string, a: 'start' | 'end' | 'middle', dx: number, dy: number) =>
    `<path d="M${f(p[0] - 7)} ${f(p[1] + 5)} L${f(p[0])} ${f(p[1] - 7)} L${f(p[0] + 7)} ${f(p[1] + 5)}" fill="none" stroke="${FG}" stroke-width="1"></path>` +
    txt(p[0] + dx, p[1] + dy, name, { size: 9, op: 0.9, anchor: a, ls: 1.6 }) + txt(p[0] + dx, p[1] + dy + 12, el, { size: 8, fill: DIM, op: 1, anchor: a, ls: 1 });
  o.push(peak(homestake, 'HOMESTAKE PEAK', '13,209 FT', 'middle', 0, 26));
  o.push(peak(resolution, 'RESOLUTION MTN', '11,905 FT', 'start', 14, -2));
  o.push(`<path d="M${f(pass[0] - 6)} ${f(pass[1] - 4)} q6 6 12 0 M${f(pass[0] - 6)} ${f(pass[1] + 4)} q6 -6 12 0" fill="none" stroke="${FG}" stroke-width="1"></path>`);
  o.push(txt(pass[0] - 14, pass[1] + 4, 'TENNESSEE PASS', { size: 9, op: 0.9, anchor: 'end', ls: 1.6 }), txt(pass[0] - 14, pass[1] + 16, '10,424 FT · ON THE DIVIDE', { size: 8, fill: DIM, op: 1, anchor: 'end', ls: 1 }));
  // Cooper Hill: ski runs fanning down with the T-bar
  const ch = cooper;
  o.push(`<path d="M${f(ch[0] + 4)} ${f(ch[1] - 2)} L${f(ch[0] + 46)} ${f(ch[1] - 40)}" stroke="${HON}" stroke-width="1.3"></path><circle cx="${f(ch[0] + 46)}" cy="${f(ch[1] - 40)}" r="2.4" fill="${HON}"></circle><circle cx="${f(ch[0] + 4)}" cy="${f(ch[1] - 2)}" r="2.4" fill="${HON}"></circle>`);
  for (let k = 0; k < 3; k++) o.push(`<path d="M${f(ch[0] + 46)} ${f(ch[1] - 40)} q${-8 + k * 14} ${14 + k * 2} ${-30 + k * 20} ${34 - k * 4}" fill="none" stroke="${HON}" stroke-opacity=".5" stroke-width=".7" stroke-dasharray="2 3"></path>`);
  o.push(txt(ch[0] + 58, ch[1] - 36, 'COOPER HILL', { size: 9, fill: HON, op: 1, ls: 1.6 }), txt(ch[0] + 58, ch[1] - 24, 'TROOP-BUILT T-BAR · NOW SKI COOPER', { size: 8, fill: DIM, op: 1, ls: 1 }));
  // edges of the map: where the roads lead
  const nTop = V([39.528, -106.386]), sBot = V([39.356, -106.312]);
  o.push(txt(nTop[0] + 10, 24, '↑ RED CLIFF · MINTURN · VAIL', { size: 8, fill: DIM, op: 1, ls: 1.2 }));
  o.push(txt(sBot[0] + 14, 612, 'LEADVILLE ↓', { size: 8, fill: DIM, op: 1, ls: 1.2 }));
  // legend
  o.push(`<g transform="translate(40 74)"><rect x="-14" y="-18" width="200" height="146" fill="#1C1D1B" stroke="${FG}" stroke-opacity=".3"></rect>${txt(0, -3, 'KEY', { size: 8, fill: DIM, op: 1, ls: 2 })}` +
    legendRow(14, `<rect x="2" y="-6" width="24" height="12" fill="${HON}" fill-opacity=".1" stroke="${HON}"></rect>`, 'Camp Hale') +
    legendRow(34, `<path d="M0 0 L28 0" stroke="${COOL}" stroke-width="1.8"></path>`, 'River &amp; creek') +
    legendRow(54, `<path d="M0 0 L28 0" stroke="${FG}"></path><path d="M0 0 L28 0" stroke="${FG}" stroke-width="5" stroke-dasharray="1 7"></path>`, 'Railroad') +
    legendRow(74, `<path d="M0 -4 l6 8 M10 -4 l6 8 M20 -4 l6 8" stroke="${FG}" stroke-opacity=".5"></path>`, 'Valley wall') +
    legendRow(94, `<rect x="0" y="-6" width="28" height="12" fill="url(#v-hatch)" stroke="${WARM}" stroke-dasharray="3 3"></rect>`, 'Maneuver area (approx.)') +
    legendRow(114, `<path d="M7 5 L14 -7 L21 5" fill="none" stroke="${FG}"></path>`, 'Peak') + '</g>');
  // scale bar: 1 mile ≈ 50 px at this zoom
  const mi = SC / 69;
  o.push(`<g transform="translate(40 586)"><path d="M0 0 L${f(2 * mi)} 0 M0 -4 L0 4 M${f(mi)} -3 L${f(mi)} 3 M${f(2 * mi)} -4 L${f(2 * mi)} 4" stroke="${FG}" stroke-opacity=".7"></path>${txt(2 * mi + 8, 3, '2 MI', { size: 8, fill: DIM, op: 1, ls: 1 })}</g>`);
  o.push(txt(960, 596, 'LANDMARKS AT PUBLISHED COORDINATES · RIVER, RAIL, TERRAIN SIMPLIFIED', { size: 7.5, fill: DIM, op: 1, anchor: 'end', ls: 1 }));
  o.push(txt(960, 34, 'N ↑', { size: 10, op: 0.7, anchor: 'end', ls: 2 }));
  return o.join('\n');
}
