const RECIPES = {
  "적동괴": { "적동석": 3 },
  "철": { "철광석": 2, "돌덩어리": 1 },
  "강철": { "철": 1, "정철광": 1, "갈옥": 2 },
  "자금": { "적동괴": 2, "청연광": 2, "신선옥": 1 },
  "백련강": { "강철": 1, "청연광": 2, "신선옥": 1 },
  "오철철": { "철": 2, "오철": 2, "적동괴": 2 },
  "무괴철": { "강철": 2, "묵철": 2, "흑옥": 2 },
  "강오철": { "오철철": 1, "강철": 1, "청연광": 2, "매화옥": 1 },
  "백현철": { "백련강": 1, "현철": 3, "자금": 1, "매화옥": 2 },
  "백련정강": { "백련강": 2, "청강석": 3, "흑옥": 1, "묵철": 2 },
  "설화강철": { "백련정강": 1, "무괴철": 2, "자금": 2, "빙옥": 3 },
  "설화오철": { "백련정강": 1, "강오철": 2, "백현철": 1, "빙옥": 3 },
  "오철한철": { "오철철": 5, "한철": 3, "강철": 3, "금강석": 1, "강오철": 1 }
};

const SAMPLE_RUNS = {
  "초록": 24,
  "파랑": 14,
  "노랑": 12,
  "빨강": 15
};

const RAW_TOTALS = {
  "초록": {
    "돌덩어리": 558,
    "철광석": 312,
    "적동석": 301,
    "정철광": 152,
    "갈옥": 84,
    "청연광": 96,
    "신선옥": 74,
    "광산초": 213
  },
  "파랑": {
    "돌덩어리": 313,
    "적동석": 172,
    "철광석": 179,
    "청강석": 26,
    "현철": 19,
    "한철": 3,
    "빙옥": 2,
    "광산초": 137
  },
  "노랑": {
    "돌덩어리": 257,
    "적동석": 156,
    "철광석": 137,
    "오철": 79,
    "정철광": 73,
    "금강석": 4,
    "광산초": 121
  },
  "빨강": {
    "돌덩어리": 342,
    "적동석": 169,
    "철광석": 167,
    "청연광": 52,
    "매화옥": 28,
    "묵철": 25,
    "흑옥": 20,
    "광산초": 143
  }
};

const ALIASES = {
  "돌": "돌덩어리"
};
const DISPLAY_NAMES = {
  "강오철": "강오금",
  "설화오철": "설화오금",
  "오철한철": "오금한철",
  "오철철": "오철"
};
const TARGET_ALIASES = {
  ...ALIASES,
  "강오금": "강오철",
  "설화오금": "설화오철",
  "오금한철": "오철한철",
  "오철": "오철철"
};

const MINE_NAMES = ["초록", "파랑", "노랑", "빨강"];
const MINE_CLASS = { "초록": "green", "파랑": "blue", "노랑": "yellow", "빨강": "red" };

const MINE_DATA = buildAverageYields(RAW_TOTALS, SAMPLE_RUNS);
const EPS = 1e-9;
const ROUTE_THRESHOLD = 3000;
const ROUTE_REVISIT_DISTANCE = 3000 * 5.5;
const ROUTE_CHUNK_SIZE = 10;
const ROUTE_MAX_STARTS = 16;
const ROUTE_MAP_WORLD_SIZE = 16000;
const ROUTE_MAP_WORLD_HALF = ROUTE_MAP_WORLD_SIZE / 2;

const ROUTE_MAP_POINTS = [
  {
    "name": "1",
    "x": -1093,
    "y": 701,
    "color": 0
  },
  {
    "name": "2",
    "x": -1038,
    "y": 14,
    "color": 0
  },
  {
    "name": "3",
    "x": -1837,
    "y": 944,
    "color": 0
  },
  {
    "name": "4",
    "x": -2599,
    "y": 2691,
    "color": 0
  },
  {
    "name": "5",
    "x": -4001,
    "y": 1579,
    "color": 0
  },
  {
    "name": "6",
    "x": 1085,
    "y": -199,
    "color": 0
  },
  {
    "name": "7",
    "x": -775,
    "y": 1986,
    "color": 0
  },
  {
    "name": "8",
    "x": 2605,
    "y": 1142,
    "color": 0
  },
  {
    "name": "9",
    "x": 752,
    "y": 1272,
    "color": 0
  },
  {
    "name": "10",
    "x": -4322,
    "y": 2810,
    "color": 1
  },
  {
    "name": "11",
    "x": 815,
    "y": -2558,
    "color": 2
  },
  {
    "name": "12",
    "x": -1913,
    "y": -3153,
    "color": 2
  },
  {
    "name": "13",
    "x": -3094,
    "y": -855,
    "color": 2
  },
  {
    "name": "14",
    "x": 7137,
    "y": 1668,
    "color": 1
  },
  {
    "name": "15",
    "x": 6123,
    "y": -486,
    "color": 1
  },
  {
    "name": "16",
    "x": 5709,
    "y": 3342,
    "color": 1
  },
  {
    "name": "17",
    "x": 3806,
    "y": -5436,
    "color": 3
  },
  {
    "name": "18",
    "x": 3542,
    "y": -6378,
    "color": 3
  },
  {
    "name": "19",
    "x": -6250,
    "y": -2367,
    "color": 3
  },
  {
    "name": "20",
    "x": -7547,
    "y": -623,
    "color": 3
  },
  {
    "name": "21",
    "x": -2854,
    "y": 5529,
    "color": 1
  },
  {
    "name": "22",
    "x": -5186,
    "y": -1256,
    "color": 1
  },
  {
    "name": "23",
    "x": 4301,
    "y": 3381,
    "color": 0
  },
  {
    "name": "24",
    "x": 5584,
    "y": -3322,
    "color": 1
  },
  {
    "name": "25",
    "x": 1998,
    "y": -4657,
    "color": 3
  },
  {
    "name": "26",
    "x": 2201,
    "y": 2740,
    "color": 0
  },
  {
    "name": "27",
    "x": -6540,
    "y": -516,
    "color": 3
  },
  {
    "name": "28",
    "x": 3701,
    "y": -2080,
    "color": 2
  },
  {
    "name": "29",
    "x": -4084,
    "y": -3035,
    "color": 2
  },
  {
    "name": "30",
    "x": 6217,
    "y": -4562,
    "color": 3
  },
  {
    "name": "31",
    "x": -563,
    "y": 6176,
    "color": 0
  },
  {
    "name": "32",
    "x": 1472,
    "y": 6472,
    "color": 0
  },
  {
    "name": "33",
    "x": 4214,
    "y": 4596,
    "color": 0
  },
  {
    "name": "34",
    "x": 1941,
    "y": 5632,
    "color": 0
  },
  {
    "name": "35",
    "x": -4657,
    "y": 4523,
    "color": 1
  },
  {
    "name": "36",
    "x": -4830,
    "y": 4303,
    "color": 1
  },
  {
    "name": "37",
    "x": -5480,
    "y": 1720,
    "color": 1
  },
  {
    "name": "38",
    "x": -6696,
    "y": 1145,
    "color": 3
  },
  {
    "name": "39",
    "x": -559,
    "y": 4593,
    "color": 0
  },
  {
    "name": "40",
    "x": 1487,
    "y": -5300,
    "color": 3
  },
  {
    "name": "41",
    "x": 1601,
    "y": -5485,
    "color": 3
  },
  {
    "name": "42",
    "x": 2129,
    "y": -6598,
    "color": 3
  },
  {
    "name": "43",
    "x": -960,
    "y": -2033,
    "color": 2
  },
  {
    "name": "44",
    "x": -2468,
    "y": -4433,
    "color": 2
  },
  {
    "name": "45",
    "x": -5443,
    "y": -4139,
    "color": 3
  },
  {
    "name": "46",
    "x": 4024,
    "y": -3356,
    "color": 3
  },
  {
    "name": "47",
    "x": 658,
    "y": -3900,
    "color": 2
  },
  {
    "name": "48",
    "x": -2121,
    "y": 3837,
    "color": 0
  },
  {
    "name": "49",
    "x": 4886,
    "y": -951,
    "color": 1
  },
  {
    "name": "50",
    "x": 4942,
    "y": 1193,
    "color": 1
  },
  {
    "name": "51",
    "x": 677,
    "y": -1433,
    "color": 2
  },
  {
    "name": "52",
    "x": -762,
    "y": 6601,
    "color": 0
  },
  {
    "name": "53",
    "x": 2657,
    "y": 5891,
    "color": 0
  },
  {
    "name": "54",
    "x": 2036,
    "y": 3624,
    "color": 0
  },
  {
    "name": "55",
    "x": -4098,
    "y": 55,
    "color": 1
  },
  {
    "name": "56",
    "x": -2006,
    "y": -127,
    "color": 0
  },
  {
    "name": "57",
    "x": -2264,
    "y": 1571,
    "color": 0
  },
  {
    "name": "58",
    "x": 3885,
    "y": 1415,
    "color": 0
  },
  {
    "name": "59",
    "x": -5054,
    "y": 2598,
    "color": 1
  },
  {
    "name": "60",
    "x": 3323,
    "y": -3939,
    "color": 3
  },
  {
    "name": "61",
    "x": 5258,
    "y": -5723,
    "color": 3
  },
  {
    "name": "62",
    "x": 1014,
    "y": 2648,
    "color": 0
  },
  {
    "name": "63",
    "x": 2705,
    "y": -2461,
    "color": 2
  },
  {
    "name": "64",
    "x": -4029,
    "y": -2321,
    "color": 2
  },
  {
    "name": "65",
    "x": -790,
    "y": -4284,
    "color": 2
  }
];

const ROUTE_BEACONS = [
  {
    "name": "마을",
    "x": -969,
    "y": 963
  },
  {
    "name": "경작지",
    "x": -963,
    "y": 733
  },
  {
    "name": "화수원",
    "x": -455,
    "y": 121
  },
  {
    "name": "괴암곡",
    "x": 1256,
    "y": 1690
  },
  {
    "name": "멸문문",
    "x": 3859,
    "y": 2481
  },
  {
    "name": "신선원",
    "x": -3568,
    "y": 2870
  },
  {
    "name": "천웅성",
    "x": 5714,
    "y": -4906
  },
  {
    "name": "매화곡",
    "x": 4022,
    "y": -443
  },
  {
    "name": "이매궁",
    "x": 1474,
    "y": -810
  },
  {
    "name": "검성지묘",
    "x": -5537,
    "y": 1279
  },
  {
    "name": "빙설곡",
    "x": 6514,
    "y": 2364
  },
  {
    "name": "빙궁",
    "x": 6507,
    "y": -1353
  },
  {
    "name": "협사곡곡",
    "x": -72,
    "y": -4196
  },
  {
    "name": "횡야성",
    "x": -2050,
    "y": -2259
  },
  {
    "name": "운해궁",
    "x": -1448,
    "y": -5363
  }
];

function $(id) {
  return document.getElementById(id);
}

function toPositiveInt(value, label) {
  const num = Number(value);
  if (!Number.isFinite(num) || !Number.isInteger(num) || num <= 0) {
    throw new Error(`${label}는 1 이상의 정수여야 합니다.`);
  }
  return num;
}

function parseSafetyPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) {
    throw new Error("안전 여유분(%)은 0 이상의 숫자여야 합니다.");
  }
  if (num > 1000) {
    throw new Error("안전 여유분(%)이 너무 큽니다. 1000 이하로 입력해주세요.");
  }
  return num;
}

function formatFixed(value, digits = 2) {
  const normalized = Math.abs(value) < EPS ? 0 : value;
  return normalized.toFixed(digits);
}

const ROUTE_STATE = {
  route: null,
  chunkIndex: 0
};
const PAGE_IDS = ["materialsCard", "rawNeedCard", "recipeCard", "routeCard"];
const PAGE_STATE = {
  activePage: "materialsCard"
};

const ROUTE_POINTS_BY_COLOR = [[], [], [], []];
for (let i = 0; i < ROUTE_MAP_POINTS.length; i++) {
  const c = ROUTE_MAP_POINTS[i].color;
  if (ROUTE_POINTS_BY_COLOR[c]) {
    ROUTE_POINTS_BY_COLOR[c].push(i);
  }
}

function routeDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildRouteDistMatrix(points) {
  const n = points.length;
  const dist = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = routeDistance(points[i], points[j]);
      dist[i][j] = d;
      dist[j][i] = d;
    }
  }
  return dist;
}

function buildBestBeaconToPoint(points, beacons) {
  return points.map((point) => {
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < beacons.length; i++) {
      const d = routeDistance(point, beacons[i]);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return { beaconIdx: bestIdx, distance: bestDist };
  });
}

const ROUTE_DIST = buildRouteDistMatrix(ROUTE_MAP_POINTS);
const ROUTE_BEST_BEACON = buildBestBeaconToPoint(ROUTE_MAP_POINTS, ROUTE_BEACONS);

function sumRemainingCounts(remaining) {
  return remaining[0] + remaining[1] + remaining[2] + remaining[3];
}

function canVisitMine(pointIdx, newTravelDist, lastVisitAt) {
  if (!lastVisitAt.has(pointIdx)) return true;
  return newTravelDist - lastVisitAt.get(pointIdx) + EPS >= ROUTE_REVISIT_DISTANCE;
}

function estimateNextDistance(pointIdx, remainingAfter) {
  let best = Infinity;
  for (let color = 0; color <= 3; color++) {
    if (remainingAfter[color] <= 0) continue;
    for (const idx of ROUTE_POINTS_BY_COLOR[color]) {
      const d = ROUTE_DIST[pointIdx][idx];
      if (d < best) best = d;
    }
  }
  return Number.isFinite(best) ? best : 0;
}

function enumerateRouteOptions(currentIdx, totalTravel, distSinceTeleport, remaining, lastVisitAt) {
  const options = [];
  for (let color = 0; color <= 3; color++) {
    if (remaining[color] <= 0) continue;
    for (const pointIdx of ROUTE_POINTS_BY_COLOR[color]) {
      const directCost = ROUTE_DIST[currentIdx][pointIdx];
      const directTotal = totalTravel + directCost;
      if (canVisitMine(pointIdx, directTotal, lastVisitAt)) {
        options.push({
          pointIdx,
          color,
          action: "travel",
          beaconIdx: null,
          cost: directCost,
          newTotal: directTotal,
          newDistSinceTeleport: Math.min(ROUTE_THRESHOLD, distSinceTeleport + directCost)
        });
      }

      const beaconMeta = ROUTE_BEST_BEACON[pointIdx];
      if (beaconMeta.beaconIdx >= 0) {
        const beaconCost = beaconMeta.distance;
        const beaconTotal = totalTravel + beaconCost;
        if (canVisitMine(pointIdx, beaconTotal, lastVisitAt)) {
          options.push({
            pointIdx,
            color,
            action: "beacon",
            beaconIdx: beaconMeta.beaconIdx,
            cost: beaconCost,
            newTotal: beaconTotal,
            newDistSinceTeleport: Math.min(ROUTE_THRESHOLD, distSinceTeleport + beaconCost)
          });
        }
      }

      if (distSinceTeleport + EPS >= ROUTE_THRESHOLD) {
        if (canVisitMine(pointIdx, totalTravel, lastVisitAt)) {
          options.push({
            pointIdx,
            color,
            action: "teleport",
            beaconIdx: null,
            cost: 0,
            newTotal: totalTravel,
            newDistSinceTeleport: 0
          });
        }
      }
    }
  }
  return options;
}

function pickBestRouteOption(options, remaining) {
  let best = null;
  let bestScore = Infinity;
  for (const option of options) {
    const remAfter = [...remaining];
    remAfter[option.color] -= 1;
    const future = estimateNextDistance(option.pointIdx, remAfter);
    const actionPenalty = option.action === "teleport" ? 2 : option.action === "beacon" ? 0.5 : 0;
    const score = option.cost + future * 0.12 + actionPenalty;

    if (score + EPS < bestScore) {
      bestScore = score;
      best = option;
      continue;
    }
    if (Math.abs(score - bestScore) <= EPS) {
      if (!best || option.cost + EPS < best.cost) {
        best = option;
      }
    }
  }
  return best;
}

function chooseRouteStartCandidates(remaining) {
  const pool = [];
  for (let color = 0; color <= 3; color++) {
    if (remaining[color] <= 0) continue;
    pool.push(...ROUTE_POINTS_BY_COLOR[color]);
  }
  if (pool.length <= ROUTE_MAX_STARTS) return pool;

  const sampled = [];
  const step = Math.max(1, Math.floor(pool.length / ROUTE_MAX_STARTS));
  for (let i = 0; i < pool.length && sampled.length < ROUTE_MAX_STARTS; i += step) {
    sampled.push(pool[i]);
  }
  return sampled;
}

function buildGreedyRouteFromStart(startIdx, requiredRuns) {
  const remaining = [...requiredRuns];
  const startColor = ROUTE_MAP_POINTS[startIdx].color;
  if (remaining[startColor] <= 0) return null;

  const steps = [{ pointIdx: startIdx, action: "start", beaconIdx: null, cost: 0, totalTravel: 0 }];
  const lastVisitAt = new Map();
  lastVisitAt.set(startIdx, 0);
  remaining[startColor] -= 1;

  let current = startIdx;
  let totalTravel = 0;
  let distSinceTeleport = 0;

  while (sumRemainingCounts(remaining) > 0) {
    const options = enumerateRouteOptions(current, totalTravel, distSinceTeleport, remaining, lastVisitAt);
    if (!options.length) {
      return null;
    }

    const picked = pickBestRouteOption(options, remaining);
    if (!picked) {
      return null;
    }

    totalTravel = picked.newTotal;
    distSinceTeleport = picked.newDistSinceTeleport;
    current = picked.pointIdx;
    remaining[picked.color] -= 1;
    lastVisitAt.set(current, totalTravel);
    steps.push({
      pointIdx: picked.pointIdx,
      action: picked.action,
      beaconIdx: picked.beaconIdx,
      cost: picked.cost,
      totalTravel
    });
  }

  return {
    steps,
    totalTravel,
    teleportCount: steps.filter(s => s.action === "teleport").length,
    beaconCount: steps.filter(s => s.action === "beacon").length
  };
}

function recommendRouteFromRuns(runs) {
  const requiredRuns = [runs[0] || 0, runs[1] || 0, runs[2] || 0, runs[3] || 0].map(v => Math.max(0, Number(v) || 0));
  if (sumRemainingCounts(requiredRuns) <= 0) {
    return { steps: [], totalTravel: 0, teleportCount: 0, beaconCount: 0 };
  }

  const starts = chooseRouteStartCandidates(requiredRuns);
  let best = null;
  for (const startIdx of starts) {
    const candidate = buildGreedyRouteFromStart(startIdx, requiredRuns);
    if (!candidate) continue;
    if (!best || candidate.totalTravel + EPS < best.totalTravel) {
      best = candidate;
      continue;
    }
    if (Math.abs(candidate.totalTravel - best.totalTravel) <= EPS) {
      if (
        candidate.teleportCount < best.teleportCount ||
        (candidate.teleportCount === best.teleportCount && candidate.beaconCount < best.beaconCount)
      ) {
        best = candidate;
      }
    }
  }

  return best;
}

function buildRouteStepLabel(step) {
  const pointName = ROUTE_MAP_POINTS[step.pointIdx]?.name || "?";
  if (step.action === "teleport") return `${pointName}(t)`;
  if (step.action === "beacon") {
    const beaconName = ROUTE_BEACONS[step.beaconIdx]?.name || `??${(step.beaconIdx ?? 0) + 1}`;
    return `${beaconName}(${pointName})`;
  }
  return pointName;
}

function buildFullRouteText(route) {
  const lines = [];
  route.steps.forEach((step, idx) => {
    lines.push(`${idx + 1}. ${buildRouteStepLabel(step)}`);
  });
  return lines.join("\n");
}

function getRouteChunkCount(route) {
  return Math.ceil(route.steps.length / ROUTE_CHUNK_SIZE);
}

function getRouteChunkRange(route, chunkIndex) {
  const start = chunkIndex * ROUTE_CHUNK_SIZE;
  const end = Math.min(route.steps.length, start + ROUTE_CHUNK_SIZE);
  return { start, end };
}

function buildChunkRouteText(route, chunkIndex) {
  const { start, end } = getRouteChunkRange(route, chunkIndex);
  const lines = [];
  for (let i = start; i < end; i++) {
    lines.push(`${i + 1}. ${buildRouteStepLabel(route.steps[i])}`);
  }
  return lines.join("\n");
}

function routeBounds() {
  return {
    maxAbsX: ROUTE_MAP_WORLD_HALF,
    maxAbsY: ROUTE_MAP_WORLD_HALF
  };
}

const ROUTE_BOUNDS = routeBounds();

function routeToCanvas(x, y, width, height, padding) {
  const w = Math.max(1, width - padding * 2);
  const h = Math.max(1, height - padding * 2);
  const scaleX = w / (ROUTE_BOUNDS.maxAbsX * 2);
  const scaleY = h / (ROUTE_BOUNDS.maxAbsY * 2);
  const scale = Math.max(0.0001, Math.min(scaleX, scaleY));
  return {
    x: width * 0.5 + x * scale,
    // Route coordinates are in mathematical axes, so draw +Y upward on canvas.
    y: height * 0.5 - y * scale
  };
}

function drawRouteArrow(ctx, a, b, color, dashed = false, width = 2) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dashed ? [7, 5] : []);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.setLineDash([]);

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (len > 8) {
    const ux = dx / len;
    const uy = dy / len;
    const size = 7;
    const px = -uy;
    const py = ux;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x - ux * size + px * size * 0.5, b.y - uy * size + py * size * 0.5);
    ctx.lineTo(b.x - ux * size - px * size * 0.5, b.y - uy * size - py * size * 0.5);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawRouteChunk(route, chunkIndex, canvasRef = "routeCanvas") {
  const canvas = typeof canvasRef === "string" ? $(canvasRef) : canvasRef;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const measuredW = rect.width || canvas.width || 360;
  const measuredH = rect.height || rect.width || canvas.height || 360;
  const side = Math.max(360, Math.floor(Math.min(measuredW, measuredH)));
  const width = side;
  const height = side;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(39,55,77,0.35)";
  ctx.fillRect(0, 0, width, height);

  const padding = 28;
  const origin = routeToCanvas(0, 0, width, height, padding);

  ctx.save();
  ctx.strokeStyle = "rgba(221,230,237,0.2)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padding, origin.y);
  ctx.lineTo(width - padding, origin.y);
  ctx.moveTo(origin.x, padding);
  ctx.lineTo(origin.x, height - padding);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(221,230,237,0.65)";
  ctx.font = "11px Pretendard, sans-serif";
  ctx.fillText("(0,0)", origin.x + 6, origin.y - 6);
  ctx.restore();

  ROUTE_MAP_POINTS.forEach((p) => {
    const pos = routeToCanvas(p.x, p.y, width, height, padding);
    ctx.beginPath();
    ctx.fillStyle = "rgba(157,178,191,0.35)";
    ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const { start, end } = getRouteChunkRange(route, chunkIndex);
  const usedBeaconIdx = new Set();
  for (let i = Math.max(start + 1, 1); i < end; i++) {
    if (i - 1 < start) continue;
    const prev = route.steps[i - 1];
    const curr = route.steps[i];
    const prevPoint = ROUTE_MAP_POINTS[prev.pointIdx];
    const currPoint = ROUTE_MAP_POINTS[curr.pointIdx];
    const a = routeToCanvas(prevPoint.x, prevPoint.y, width, height, padding);
    const b = routeToCanvas(currPoint.x, currPoint.y, width, height, padding);

    if (curr.action === "teleport") {
      drawRouteArrow(ctx, a, b, "rgba(252,165,165,0.95)", true, 1.7);
    } else if (curr.action === "beacon" && curr.beaconIdx !== null && curr.beaconIdx >= 0) {
      const beacon = ROUTE_BEACONS[curr.beaconIdx];
      const c = routeToCanvas(beacon.x, beacon.y, width, height, padding);
      usedBeaconIdx.add(curr.beaconIdx);
      drawRouteArrow(ctx, a, c, "rgba(221,230,237,0.85)", true, 1.5);
      drawRouteArrow(ctx, c, b, "rgba(157,178,191,0.95)", false, 2.1);
    } else {
      drawRouteArrow(ctx, a, b, "rgba(157,178,191,0.95)", false, 2.1);
    }
  }

  usedBeaconIdx.forEach((idx) => {
    const beacon = ROUTE_BEACONS[idx];
    if (!beacon) return;
    const pos = routeToCanvas(beacon.x, beacon.y, width, height, padding);

    ctx.beginPath();
    ctx.fillStyle = "rgba(251,191,36,0.95)";
    ctx.strokeStyle = "rgba(39,55,77,0.95)";
    ctx.lineWidth = 1.5;
    ctx.arc(pos.x, pos.y, 4.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(251,191,36,0.98)";
    ctx.font = "11px Pretendard, sans-serif";
    ctx.fillText(beacon.name, pos.x + 7, pos.y + 12);
  });

  for (let i = start; i < end; i++) {
    const step = route.steps[i];
    const p = ROUTE_MAP_POINTS[step.pointIdx];
    const pos = routeToCanvas(p.x, p.y, width, height, padding);
    const isStart = i === start;
    const isEnd = i === end - 1;
    const radius = isStart || isEnd ? 7 : 5;

    ctx.beginPath();
    ctx.fillStyle = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#DDE6ED";
    ctx.strokeStyle = "rgba(39,55,77,0.95)";
    ctx.lineWidth = 1.6;
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(221,230,237,0.95)";
    ctx.font = "11px Pretendard, sans-serif";
    ctx.fillText(String(p.name), pos.x + 8, pos.y - 8);
  }
}

function copyTextToClipboard(text) {
  if (!text) return Promise.resolve(false);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (_) {
    ok = false;
  }
  temp.remove();
  return Promise.resolve(ok);
}

function isRoutePopupOpen() {
  const modal = $("routePopupModal");
  return !!modal && !modal.classList.contains("hidden");
}

function closeRoutePopup() {
  const modal = $("routePopupModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function openRoutePopup() {
  if (!ROUTE_STATE.route || !ROUTE_STATE.route.steps.length) return;
  const modal = $("routePopupModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  refreshRoutePanel();
}

function refreshRoutePanel() {
  const route = ROUTE_STATE.route;
  if (!route || !route.steps.length) return;

  const chunkCount = getRouteChunkCount(route);
  ROUTE_STATE.chunkIndex = Math.max(0, Math.min(ROUTE_STATE.chunkIndex, chunkCount - 1));
  const chunkNo = ROUTE_STATE.chunkIndex + 1;
  const atStart = ROUTE_STATE.chunkIndex <= 0;
  const atEnd = ROUTE_STATE.chunkIndex >= chunkCount - 1;

  $("chunkInfo").textContent = `${chunkNo} / ${chunkCount}`;
  $("prevChunkBtn").disabled = atStart;
  $("nextChunkBtn").disabled = atEnd;
  if ($("routePopupChunkInfo")) $("routePopupChunkInfo").textContent = `${chunkNo} / ${chunkCount}`;
  if ($("prevChunkPopupBtn")) $("prevChunkPopupBtn").disabled = atStart;
  if ($("nextChunkPopupBtn")) $("nextChunkPopupBtn").disabled = atEnd;
  if ($("openRoutePopupBtn")) {
    $("openRoutePopupBtn").disabled = false;
  }
  $("routeText").value = buildChunkRouteText(route, ROUTE_STATE.chunkIndex);
  $("routeMeta").textContent = `총 이동거리 ${formatFixed(route.totalTravel, 2)} | 텔레포트 ${route.teleportCount}회 | 비콘 ${route.beaconCount}회 | 재방문 제한 ${formatFixed(ROUTE_REVISIT_DISTANCE, 0)}`;
  drawRouteChunk(route, ROUTE_STATE.chunkIndex);
  if (isRoutePopupOpen()) {
    drawRouteChunk(route, ROUTE_STATE.chunkIndex, "routeCanvasPopup");
  }
}

function setActivePage(pageId) {
  if (!PAGE_IDS.includes(pageId)) {
    return;
  }
  PAGE_STATE.activePage = pageId;

  PAGE_IDS.forEach((id) => {
    const panel = $(id);
    if (!panel) return;
    if (id === pageId) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  });

  document.querySelectorAll(".page-btn").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    if (btn.dataset.page === pageId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (pageId === "routeCard" && ROUTE_STATE.route) {
    refreshRoutePanel();
  }
}

function buildAverageYields(rawTotals, runs) {
  const result = {};
  for (const mine of Object.keys(rawTotals)) {
    result[mine] = {};
    for (const [item, total] of Object.entries(rawTotals[mine])) {
      result[mine][item] = total / runs[mine];
    }
  }
  return result;
}

function normalizeName(name) {
  const trimmed = String(name || "").trim();
  return ALIASES[trimmed] || trimmed;
}

function normalizeTargetItem(name) {
  const trimmed = String(name || "").trim();
  return TARGET_ALIASES[trimmed] || trimmed;
}

function toDisplayName(name) {
  return DISPLAY_NAMES[name] || name;
}

function expandRequirements(item, qty, acc = {}) {
  item = normalizeName(item);
  if (!RECIPES[item]) {
    acc[item] = (acc[item] || 0) + qty;
    return acc;
  }
  for (const [sub, subQty] of Object.entries(RECIPES[item])) {
    expandRequirements(sub, qty * subQty, acc);
  }
  return acc;
}

function collectCraftedTotals(item, qty, acc = {}) {
  item = normalizeName(item);
  if (!RECIPES[item]) {
    return acc;
  }

  acc[item] = (acc[item] || 0) + qty;
  for (const [sub, subQty] of Object.entries(RECIPES[item])) {
    collectCraftedTotals(sub, qty * subQty, acc);
  }
  return acc;
}

function buildCraftedRows(craftedTotals) {
  const rows = Object.entries(craftedTotals).map(([item, qty]) => {
    const directChildren = Object.entries(RECIPES[item] || {}).map(([sub, subQty]) => {
      const normalized = normalizeName(sub);
      return {
        item: normalized,
        qty: subQty * qty,
        isRaw: !RECIPES[normalized]
      };
    });

    directChildren.sort((a, b) => {
      if (b.qty !== a.qty) return b.qty - a.qty;
      return toDisplayName(a.item).localeCompare(toDisplayName(b.item), "ko");
    });

    return { item, qty, directChildren };
  });

  rows.sort((a, b) => {
    if (b.qty !== a.qty) return b.qty - a.qty;
    return toDisplayName(a.item).localeCompare(toDisplayName(b.item), "ko");
  });

  return rows;
}

function renderRecipeAccordion(craftedRows) {
  const box = $("recipeAccordion");
  box.innerHTML = "";

  if (!craftedRows.length) {
    const empty = document.createElement("div");
    empty.className = "subtle";
    empty.textContent = "표시할 제작 재료가 없습니다.";
    box.appendChild(empty);
    return;
  }

  craftedRows.forEach((row, idx) => {
    const details = document.createElement("details");
    details.className = "drop-item";
    details.open = false;

    const summary = document.createElement("summary");
    summary.className = "drop-summary";

    const title = document.createElement("span");
    title.className = "drop-title";
    title.textContent = toDisplayName(row.item);

    const meta = document.createElement("span");
    meta.className = "drop-meta";
    meta.textContent = `필요 ${row.qty}`;

    const childCount = document.createElement("span");
    childCount.className = "drop-count";
    childCount.textContent = `원재료 ${row.directChildren.length}개`;

    summary.appendChild(title);
    summary.appendChild(meta);
    summary.appendChild(childCount);
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "drop-body";
    const grid = document.createElement("div");
    grid.className = "ingredient-grid";

    if (!row.directChildren.length) {
      body.textContent = "원재료 아이템입니다.";
    } else {
      row.directChildren.forEach((child) => {
        const chip = document.createElement("div");
        chip.className = `ingredient-chip ${child.isRaw ? "raw" : "crafted"}`;

        const name = document.createElement("div");
        name.className = "ingredient-name";
        name.textContent = toDisplayName(child.item);

        const qty = document.createElement("div");
        qty.className = "ingredient-qty";
        qty.textContent = `x ${child.qty}`;

        const kind = document.createElement("div");
        kind.className = "ingredient-kind";
        kind.textContent = child.isRaw ? "원재료" : "제작재료";

        chip.appendChild(name);
        chip.appendChild(qty);
        chip.appendChild(kind);
        grid.appendChild(chip);
      });
      body.appendChild(grid);
    }

    details.appendChild(body);
    box.appendChild(details);
  });
}

function materialBestYield(material) {
  let best = 0;
  for (const mine of MINE_NAMES) {
    best = Math.max(best, MINE_DATA[mine][material] || 0);
  }
  return best;
}

function isRareMaterial(material) {
  const best = materialBestYield(material);
  return best > 0 && best <= 2;
}

function applySafetyMargin(required, percent, mode) {
  const out = {};
  const ratio = Math.max(0, percent) / 100;
  const resolvedMode = ["all", "rare", "none"].includes(mode) ? mode : "all";

  for (const [mat, qty] of Object.entries(required)) {
    if (resolvedMode === "none") {
      out[mat] = qty;
    } else if (resolvedMode === "rare") {
      out[mat] = isRareMaterial(mat) ? Math.ceil(qty * (1 + ratio)) : qty;
    } else {
      out[mat] = Math.ceil(qty * (1 + ratio));
    }
  }

  return out;
}

function calcExpected(material, runs) {
  let sum = 0;
  for (let i = 0; i < MINE_NAMES.length; i++) {
    sum += (MINE_DATA[MINE_NAMES[i]][material] || 0) * runs[i];
  }
  return sum;
}

function exactOptimizeRuns(materials, needed) {
  const matCount = materials.length;
  const mineCount = MINE_NAMES.length;
  const neededVec = materials.map(mat => needed[mat] || 0);
  const yieldsByMine = MINE_NAMES.map(mine =>
    materials.map(mat => MINE_DATA[mine][mat] || 0)
  );

  // futureBest[i][m]: i번째 광산 이후(포함)에서 재료 m의 최대 기대 획득량
  const futureBest = Array.from({ length: mineCount + 1 }, () =>
    new Array(matCount).fill(0)
  );
  for (let i = mineCount - 1; i >= 0; i--) {
    for (let m = 0; m < matCount; m++) {
      futureBest[i][m] = Math.max(futureBest[i + 1][m], yieldsByMine[i][m]);
    }
  }

  for (let m = 0; m < matCount; m++) {
    if (futureBest[0][m] <= 0) {
      throw new Error(`재료 '${materials[m]}'은 어떤 광산에서도 얻을 수 없습니다.`);
    }
  }

  const initialRuns = new Array(mineCount).fill(0);
  for (let m = 0; m < matCount; m++) {
    let bestMineIdx = 0;
    let bestYield = yieldsByMine[0][m];
    for (let i = 1; i < mineCount; i++) {
      if (yieldsByMine[i][m] > bestYield) {
        bestYield = yieldsByMine[i][m];
        bestMineIdx = i;
      }
    }
    const needRuns = Math.ceil((neededVec[m] - EPS) / bestYield);
    initialRuns[bestMineIdx] += Math.max(0, needRuns);
  }

  let bestRuns = initialRuns;
  let bestSum = bestRuns.reduce((sum, count) => sum + count, 0);
  bestSum = Math.max(1, bestSum);

  function lowerBoundFromProduced(produced, startIndex) {
    let maxNeed = 0;

    for (let m = 0; m < matCount; m++) {
      const remaining = neededVec[m] - produced[m];
      if (remaining <= EPS) continue;

      const bestFutureYield = futureBest[startIndex][m];
      if (bestFutureYield <= 0) return Infinity;

      const minRuns = Math.ceil((remaining - EPS) / bestFutureYield);
      maxNeed = Math.max(maxNeed, minRuns);
    }

    return maxNeed;
  }

  function dfs(index, partialRuns, produced, currentSum) {
    if (currentSum >= bestSum) return;

    const lb = lowerBoundFromProduced(produced, index);
    if (!Number.isFinite(lb) || currentSum + lb >= bestSum) return;

    if (index === mineCount) {
      bestSum = currentSum;
      bestRuns = [...partialRuns];
      return;
    }

    const limit = bestSum - currentSum - 1;
    if (limit < 0) return;

    const mineYields = yieldsByMine[index];

    if (index === mineCount - 1) {
      let minNeeded = 0;

      for (let m = 0; m < matCount; m++) {
        const remaining = neededVec[m] - produced[m];
        if (remaining <= EPS) continue;

        const y = mineYields[m];
        if (y <= 0) {
          minNeeded = Infinity;
          break;
        }
        minNeeded = Math.max(minNeeded, Math.ceil((remaining - EPS) / y));
      }

      if (Number.isFinite(minNeeded) && currentSum + minNeeded < bestSum) {
        const candidate = [...partialRuns];
        candidate[index] = minNeeded;
        bestSum = currentSum + minNeeded;
        bestRuns = candidate;
      }
      return;
    }

    const nextProduced = produced.slice();
    for (let count = 0; count <= limit; count++) {
      partialRuns[index] = count;
      dfs(index + 1, partialRuns, nextProduced, currentSum + count);
      for (let m = 0; m < matCount; m++) {
        nextProduced[m] += mineYields[m];
      }
    }
    partialRuns[index] = 0;
  }

  dfs(
    0,
    new Array(mineCount).fill(0),
    new Array(matCount).fill(0),
    0
  );

  if (!bestRuns) {
    throw new Error("최적 조합을 찾지 못했습니다. 데이터 또는 입력을 확인해주세요.");
  }

  return bestRuns;
}

function parseMultiInput(text) {
  const lines = String(text)
    .split("\n")
    .map(v => v.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("여러 목표 입력란이 비어 있습니다.");
  }

  const result = [];
  for (const line of lines) {
    const parts = line.split(/[,\t，]/).map(v => v.trim()).filter(Boolean);
    if (parts.length !== 2) {
      throw new Error(`입력 형식이 잘못되었습니다: ${line}`);
    }

    const item = normalizeTargetItem(parts[0]);
    const qty = toPositiveInt(parts[1], "개수");

    if (!item) {
      throw new Error(`입력 값이 잘못되었습니다: ${line}`);
    }

    result.push({ item, qty });
  }

  return result;
}

function mergeTargets(targets) {
  const merged = new Map();
  for (const target of targets) {
    merged.set(target.item, (merged.get(target.item) || 0) + target.qty);
  }
  return Array.from(merged.entries()).map(([item, qty]) => ({ item, qty }));
}

function aggregateTargets(targets) {
  const totalRequired = {};
  const craftedTotals = {};

  for (const t of targets) {
    const req = expandRequirements(t.item, t.qty, {});
    for (const [mat, qty] of Object.entries(req)) {
      totalRequired[mat] = (totalRequired[mat] || 0) + qty;
    }
    collectCraftedTotals(t.item, t.qty, craftedTotals);
  }

  return { totalRequired, craftedRows: buildCraftedRows(craftedTotals) };
}

function calculate(targets, safetyPercent, safetyMode) {
  const mergedTargets = mergeTargets(targets);
  const { totalRequired, craftedRows } = aggregateTargets(mergedTargets);
  const withSafety = applySafetyMargin(totalRequired, safetyPercent, safetyMode);
  const materials = Object.keys(withSafety).sort((a, b) => a.localeCompare(b, "ko"));
  const runs = exactOptimizeRuns(materials, withSafety);

  const expected = {};
  for (const mat of materials) {
    expected[mat] = calcExpected(mat, runs);
  }

  return {
    targets: mergedTargets,
    totalRequired,
    withSafety,
    craftedRows,
    materials,
    runs,
    expected
  };
}

function render(result) {
  $("emptyState").classList.remove("bad");
  $("emptyState").classList.add("hidden");
  $("resultArea").classList.remove("hidden");
  $("barCard").classList.remove("hidden");
  $("targetSummaryCard").classList.remove("hidden");
  $("pageShell").classList.remove("hidden");

  const totalRuns = result.runs[0] + result.runs[1] + result.runs[2] + result.runs[3];
  $("totalRuns").textContent = totalRuns;
  $("runGreen").textContent = result.runs[0];
  $("runBlue").textContent = result.runs[1];
  $("runYellow").textContent = result.runs[2];
  $("runRed").textContent = result.runs[3];

  const maxRun = Math.max(1, ...result.runs);
  $("mineBars").innerHTML = "";

  MINE_NAMES.forEach((name, idx) => {
    const width = (result.runs[idx] / maxRun) * 100;
    $("mineBars").insertAdjacentHTML("beforeend", `
      <div class="bar-item">
        <div><span class="tag">4성 ${name}</span></div>
        <div class="bar"><div class="fill ${MINE_CLASS[name]}" style="width:${width}%"></div></div>
        <div>${result.runs[idx]}회</div>
      </div>
    `);
  });

  $("targetSummary").innerHTML = result.targets
    .map(t => `<span class="tag">${toDisplayName(t.item)} x ${t.qty}</span>`)
    .join("");

  $("materialsTableBody").innerHTML = "";
  result.materials.forEach(mat => {
    const baseNeed = result.totalRequired[mat] || 0;
    const safetyNeed = result.withSafety[mat] || 0;
    const got = result.expected[mat] || 0;
    const over = got - safetyNeed;
    const ok = got + 1e-9 >= safetyNeed;

    $("materialsTableBody").insertAdjacentHTML("beforeend", `
      <tr>
        <td>${mat} ${isRareMaterial(mat) ? '<span class="tag">희귀</span>' : ''}</td>
        <td>${baseNeed}</td>
        <td>${safetyNeed}</td>
        <td>${formatFixed(got, 2)}</td>
        <td class="${over > 0 ? 'warn' : ''}">${formatFixed(over, 2)}</td>
        <td class="${ok ? 'good' : 'bad'}">${ok ? '충족' : '부족'}</td>
      </tr>
    `);
  });

  $("rawNeedTableBody").innerHTML = "";
  result.materials.forEach(mat => {
    const baseNeed = result.totalRequired[mat] || 0;
    const safetyNeed = result.withSafety[mat] || 0;
    $("rawNeedTableBody").insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${toDisplayName(mat)}</td>
        <td>${baseNeed}</td>
        <td>${safetyNeed}</td>
      </tr>
    `
    );
  });

  renderRecipeAccordion(result.craftedRows);

  const recommended = recommendRouteFromRuns(result.runs);
  if (!recommended || !recommended.steps || !recommended.steps.length) {
    ROUTE_STATE.route = null;
    ROUTE_STATE.chunkIndex = 0;
    closeRoutePopup();
    $("chunkInfo").textContent = "0 / 0";
    if ($("routePopupChunkInfo")) $("routePopupChunkInfo").textContent = "0 / 0";
    $("routeText").value = "경로 생성 실패: 재방문 제한(16500) 조건을 만족하는 경로를 찾지 못했습니다.";
    $("routeMeta").textContent = "광산 횟수 조합을 줄이거나 조건을 확인해주세요.";
    $("prevChunkBtn").disabled = true;
    $("nextChunkBtn").disabled = true;
    if ($("prevChunkPopupBtn")) $("prevChunkPopupBtn").disabled = true;
    if ($("nextChunkPopupBtn")) $("nextChunkPopupBtn").disabled = true;
    if ($("openRoutePopupBtn")) $("openRoutePopupBtn").disabled = true;
    const canvas = $("routeCanvas");
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const popupCanvas = $("routeCanvasPopup");
    const popupCtx = popupCanvas?.getContext("2d");
    if (popupCtx) {
      popupCtx.clearRect(0, 0, popupCanvas.width, popupCanvas.height);
    }
  } else {
    ROUTE_STATE.route = recommended;
    ROUTE_STATE.chunkIndex = 0;
  }
  setActivePage(PAGE_STATE.activePage);
}

function showError(message) {
  closeRoutePopup();
  $("emptyState").classList.add("bad");
  $("emptyState").classList.remove("hidden");
  $("emptyState").textContent = String(message);
  $("resultArea").classList.add("hidden");
  $("barCard").classList.add("hidden");
  $("targetSummaryCard").classList.add("hidden");
  $("pageShell").classList.add("hidden");
  PAGE_IDS.forEach((id) => $(id).classList.add("hidden"));
  if ($("prevChunkPopupBtn")) $("prevChunkPopupBtn").disabled = true;
  if ($("openRoutePopupBtn")) $("openRoutePopupBtn").disabled = true;
  if ($("nextChunkPopupBtn")) $("nextChunkPopupBtn").disabled = true;
  if ($("routePopupChunkInfo")) $("routePopupChunkInfo").textContent = "0 / 0";
  ROUTE_STATE.route = null;
  ROUTE_STATE.chunkIndex = 0;
}

function renderAvgYieldBox() {
  const box = $("avgYieldAccordion");
  box.innerHTML = "";

  MINE_NAMES.forEach((mine, idx) => {
    const details = document.createElement("details");
    details.className = "drop-item avg-drop-item";
    details.open = false;

    const summary = document.createElement("summary");
    summary.className = "avg-summary";

    const left = document.createElement("span");
    left.textContent = mine;
    left.className = "avg-mine";

    const right = document.createElement("span");
    right.textContent = `${SAMPLE_RUNS[mine]}회 기준`;
    right.className = "avg-run";

    summary.appendChild(left);
    summary.appendChild(right);
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "drop-body";
    const entries = Object.entries(MINE_DATA[mine]).sort((a, b) =>
      a[0].localeCompare(b[0], "ko")
    );

    const list = document.createElement("div");
    list.className = "avg-grid";
    entries.forEach(([item, avg]) => {
      const row = document.createElement("div");
      row.className = "avg-chip";
      row.innerHTML = `<span>${toDisplayName(item)}</span><b>${formatFixed(avg, 2)}</b>`;
      list.appendChild(row);
    });
    body.appendChild(list);
    details.appendChild(body);
    box.appendChild(details);
  });
}

function populateTargetSelect() {
  const select = $("targetItem");
  select.innerHTML = "";

  const items = Object.keys(RECIPES).sort((a, b) =>
    toDisplayName(a).localeCompare(toDisplayName(b), "ko")
  );

  for (const item of items) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = toDisplayName(item);
    select.appendChild(option);
  }

  if (items.includes("설화강철")) {
    select.value = "설화강철";
  } else if (items.length > 0) {
    select.selectedIndex = 0;
  }
}

function bindEvents() {
  $("fillDemoBtn").addEventListener("click", () => {
    $("targetItem").value = "설화오철";
    $("targetQty").value = 1;
    $("safetyPercent").value = 25;
    $("safetyMode").value = "rare";
    $("multiInput").value = "설화강철,2\n설화오금,1\n오금한철,1";
  });

  $("clearMultiBtn").addEventListener("click", () => {
    $("multiInput").value = "";
  });

  $("calcSingleBtn").addEventListener("click", () => {
    try {
      const item = normalizeTargetItem($("targetItem").value);
      const qty = toPositiveInt($("targetQty").value, "개수");
      const safetyPercent = parseSafetyPercent($("safetyPercent").value || 0);
      const safetyMode = $("safetyMode").value;

      if (!item) throw new Error("아이템이 선택되지 않았습니다.");
      if (!RECIPES[item]) throw new Error(`유효한 제작 아이템이 아닙니다: ${toDisplayName(item)}`);

      const result = calculate([{ item, qty }], safetyPercent, safetyMode);
      render(result);
    } catch (err) {
      showError(err.message || "계산 중 오류가 발생했습니다.");
    }
  });

  $("calcMultiBtn").addEventListener("click", () => {
    try {
      const safetyPercent = parseSafetyPercent($("safetyPercent").value || 0);
      const safetyMode = $("safetyMode").value;
      const targets = parseMultiInput($("multiInput").value);

      for (const t of targets) {
        if (!RECIPES[t.item]) {
          throw new Error(`제작 아이템이 아닙니다: ${toDisplayName(t.item)}`);
        }
      }

      const result = calculate(targets, safetyPercent, safetyMode);
      render(result);
    } catch (err) {
      showError(err.message || "계산 중 오류가 발생했습니다.");
    }
  });
}

function bindRouteEvents() {
  $("prevChunkBtn").addEventListener("click", () => {
    if (!ROUTE_STATE.route) return;
    ROUTE_STATE.chunkIndex = Math.max(0, ROUTE_STATE.chunkIndex - 1);
    refreshRoutePanel();
  });

  $("nextChunkBtn").addEventListener("click", () => {
    if (!ROUTE_STATE.route) return;
    ROUTE_STATE.chunkIndex += 1;
    refreshRoutePanel();
  });

  $("copyRouteBtn").addEventListener("click", async () => {
    if (!ROUTE_STATE.route) return;
    const fullText = buildFullRouteText(ROUTE_STATE.route);
    const copied = await copyTextToClipboard(fullText);
    $("routeMeta").textContent = copied
      ? "경로 텍스트를 클립보드에 복사했습니다."
      : "복사에 실패했습니다. 브라우저 권한을 확인해주세요.";
    setTimeout(() => {
      if (ROUTE_STATE.route) refreshRoutePanel();
    }, 1100);
  });

  $("openRoutePopupBtn")?.addEventListener("click", () => {
    openRoutePopup();
  });

  $("closeRoutePopupBtn")?.addEventListener("click", () => {
    closeRoutePopup();
  });

  $("prevChunkPopupBtn")?.addEventListener("click", () => {
    if (!ROUTE_STATE.route) return;
    ROUTE_STATE.chunkIndex = Math.max(0, ROUTE_STATE.chunkIndex - 1);
    refreshRoutePanel();
  });

  $("nextChunkPopupBtn")?.addEventListener("click", () => {
    if (!ROUTE_STATE.route) return;
    ROUTE_STATE.chunkIndex += 1;
    refreshRoutePanel();
  });

  $("routePopupModal")?.addEventListener("click", (event) => {
    if (event.target === $("routePopupModal")) {
      closeRoutePopup();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isRoutePopupOpen()) {
      closeRoutePopup();
    }
  });

  window.addEventListener("resize", () => {
    if (ROUTE_STATE.route) {
      refreshRoutePanel();
    }
  });
}

function bindPageEvents() {
  document.querySelectorAll(".page-btn").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.addEventListener("click", () => {
      const pageId = btn.dataset.page || "";
      setActivePage(pageId);
    });
  });
}

function init() {
  populateTargetSelect();
  renderAvgYieldBox();
  bindEvents();
  bindRouteEvents();
  bindPageEvents();
  if ($("prevChunkPopupBtn")) $("prevChunkPopupBtn").disabled = true;
  if ($("openRoutePopupBtn")) $("openRoutePopupBtn").disabled = true;
  if ($("nextChunkPopupBtn")) $("nextChunkPopupBtn").disabled = true;
}

window.addEventListener("DOMContentLoaded", init);
