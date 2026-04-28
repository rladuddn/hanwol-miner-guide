const RECIPES = {
  "적동괴": { "적동석": 3 },
  "철": { "철광석": 2, "돌덩어리": 1 },
  "강철": { "철": 1, "정철광": 1, "갈옥": 2 },
  "자금": { "적동괴": 2, "청연광": 2, "신선옥": 1 },
  "백련강": { "강철": 1, "청연광": 2, "신선옥": 1 },
  "오금철": { "철": 2, "오철": 2, "적동괴": 2 },
  "무괴철": { "강철": 2, "묵철": 2, "흑옥": 2 },
  "강오금": { "오금철": 1, "강철": 1, "청연광": 2, "매화옥": 1 },
  "백현철": { "백련강": 1, "현철": 3, "자금": 1, "매화옥": 2 },
  "백련정강": { "백련강": 2, "청강석": 3, "흑옥": 1, "묵철": 2 },
  "설화강철": { "백련정강": 1, "무괴철": 2, "자금": 2, "빙옥": 3 },
  "설화오금": { "백련정강": 1, "강오금": 2, "백현철": 1, "빙옥": 3 },
  "오금한철": { "오금철": 5, "한철": 3, "강철": 3, "금강석": 1, "강오금": 1 }
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
  "강오금": "강오금",
  "설화오금": "설화오금",
  "오금한철": "오금한철",
  "오금철": "오금철"
};
const TARGET_ALIASES = {
  ...ALIASES,
  "강오금": "강오금",
  "설화오금": "설화오금",
  "오금한철": "오금한철",
  "오금철": "오금철"
};

const MINE_NAMES = ["초록", "파랑", "노랑", "빨강"];
const MINE_CLASS = { "초록": "green", "파랑": "blue", "노랑": "yellow", "빨강": "red" };

const MINE_DATA = buildAverageYields(RAW_TOTALS, SAMPLE_RUNS);
const EPS = 1e-9;
const ROUTE_THRESHOLD = 7000;
const ROUTE_DISTANCE_SURCHARGE = 1.6;
const ROUTE_REVISIT_DISTANCE = 3000 * 5.5;
const ROUTE_DEFAULT_CHUNK_SIZE = 10;
const ROUTE_CHUNK_SIZE_MIN = 1;
const ROUTE_CHUNK_SIZE_MAX = 65;
const ROUTE_MAX_STARTS = 16;
const ROUTE_MAP_WORLD_SIZE = 16000;
const ROUTE_MAP_WORLD_HALF = ROUTE_MAP_WORLD_SIZE / 2;
const ROUTE_CANVAS_PADDING = 36;
const ROUTE_ZOOM_MIN = 0.7;
const ROUTE_ZOOM_MAX = 7;
const ROUTE_ZOOM_WHEEL_STEP = 0.0018;
const ROUTE_COLOR_LABEL = {
  0: "초록",
  1: "파랑",
  2: "노랑",
  3: "빨강"
};
const HORSE_SPEED_LABEL = {
  3000: "기본말",
  3500: "회색마",
  4200: "적마",
  5200: "백마",
  7000: "흑마"
};

const ROUTE_MAP_POINTS = [
  {
    "name": "1",
    "x": -1093,
    "y": 701,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "2",
    "x": -1038,
    "y": 14,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "3",
    "x": -1837,
    "y": 944,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "4",
    "x": -2599,
    "y": 2691,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "5",
    "x": -4001,
    "y": 1579,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "6",
    "x": 1085,
    "y": -199,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "7",
    "x": -775,
    "y": 1986,
    "color": 0,
    "island": true,
    "continent": "0"
  },
  {
    "name": "8",
    "x": 2605,
    "y": 1142,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "9",
    "x": 752,
    "y": 1272,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "10",
    "x": -4322,
    "y": 2810,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "11",
    "x": 815,
    "y": -2558,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "12",
    "x": -1913,
    "y": -3153,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "13",
    "x": -3094,
    "y": -855,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "14",
    "x": 7137,
    "y": 1668,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "15",
    "x": 6123,
    "y": -486,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "16",
    "x": 5709,
    "y": 3342,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "17",
    "x": 3806,
    "y": -5436,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "18",
    "x": 3542,
    "y": -6378,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "19",
    "x": -6250,
    "y": -2367,
    "color": 3,
    "island": false,
    "continent": "1"
  },
  {
    "name": "20",
    "x": -7547,
    "y": -623,
    "color": 3,
    "island": false,
    "continent": "1"
  },
  {
    "name": "21",
    "x": -2854,
    "y": 5529,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "22",
    "x": -5186,
    "y": -1256,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "23",
    "x": 4301,
    "y": 3381,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "24",
    "x": 5584,
    "y": -3322,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "25",
    "x": 1998,
    "y": -4657,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "26",
    "x": 2201,
    "y": 2740,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "27",
    "x": -6540,
    "y": -516,
    "color": 3,
    "island": false,
    "continent": "1"
  },
  {
    "name": "28",
    "x": 3701,
    "y": -2080,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "29",
    "x": -4084,
    "y": -3035,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "30",
    "x": 6217,
    "y": -4562,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "31",
    "x": -563,
    "y": 6176,
    "color": 0,
    "island": true,
    "continent": "2"
  },
  {
    "name": "32",
    "x": 1472,
    "y": 6472,
    "color": 0,
    "island": true,
    "continent": "2"
  },
  {
    "name": "33",
    "x": 4214,
    "y": 4596,
    "color": 0,
    "island": true,
    "continent": "0"
  },
  {
    "name": "34",
    "x": 1941,
    "y": 5632,
    "color": 0,
    "island": true,
    "continent": "2"
  },
  {
    "name": "35",
    "x": -4657,
    "y": 4523,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "36",
    "x": -4830,
    "y": 4303,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "37",
    "x": -5480,
    "y": 1720,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "38",
    "x": -6696,
    "y": 1145,
    "color": 3,
    "island": false,
    "continent": "1"
  },
  {
    "name": "39",
    "x": -559,
    "y": 4593,
    "color": 0,
    "island": true,
    "continent": "0"
  },
  {
    "name": "40",
    "x": 1487,
    "y": -5300,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "41",
    "x": 1601,
    "y": -5485,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "42",
    "x": 2129,
    "y": -6598,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "43",
    "x": -960,
    "y": -2033,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "44",
    "x": -2468,
    "y": -4433,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "45",
    "x": -5443,
    "y": -4139,
    "color": 3,
    "island": true,
    "continent": "1"
  },
  {
    "name": "46",
    "x": 4024,
    "y": -3356,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "47",
    "x": 658,
    "y": -3900,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "48",
    "x": -2121,
    "y": 3837,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "49",
    "x": 4886,
    "y": -951,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "50",
    "x": 4942,
    "y": 1193,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "51",
    "x": 677,
    "y": -1433,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "52",
    "x": -762,
    "y": 6601,
    "color": 0,
    "island": true,
    "continent": "2"
  },
  {
    "name": "53",
    "x": 2657,
    "y": 5891,
    "color": 0,
    "island": true,
    "continent": "2"
  },
  {
    "name": "54",
    "x": 2036,
    "y": 3624,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "55",
    "x": -4098,
    "y": 55,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "56",
    "x": -2006,
    "y": -127,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "57",
    "x": -2264,
    "y": 1571,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "58",
    "x": 3885,
    "y": 1415,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "59",
    "x": -5054,
    "y": 2598,
    "color": 1,
    "island": false,
    "continent": "0"
  },
  {
    "name": "60",
    "x": 3323,
    "y": -3939,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "61",
    "x": 5258,
    "y": -5723,
    "color": 3,
    "island": false,
    "continent": "0"
  },
  {
    "name": "62",
    "x": 1014,
    "y": 2648,
    "color": 0,
    "island": false,
    "continent": "0"
  },
  {
    "name": "63",
    "x": 2705,
    "y": -2461,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "64",
    "x": -4029,
    "y": -2321,
    "color": 2,
    "island": false,
    "continent": "0"
  },
  {
    "name": "65",
    "x": -790,
    "y": -4284,
    "color": 2,
    "island": false,
    "continent": "0"
  }
];

ROUTE_MAP_POINTS.forEach((point) => {
  point.island = point.island === true || Number(point.island) === 1;
  if (point.continent === undefined || point.continent === null) {
    point.continent = null;
    return;
  }
  const token = String(point.continent).trim();
  point.continent = token ? token : null;
});

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
    "name": "멸문",
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
    "name": "협사곡",
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
  chunkIndex: 0,
  chunkSize: ROUTE_DEFAULT_CHUNK_SIZE,
  threshold: ROUTE_THRESHOLD,
  horseLabel: HORSE_SPEED_LABEL[ROUTE_THRESHOLD] || "흑마",
  selectedColors: [0, 1, 2, 3],
  calcRuns: null,
  sourceMode: "manual"
};
const PAGE_IDS = ["materialsCard", "rawNeedCard", "recipeCard", "routeCard"];
const PAGE_STATE = {
  activePage: "materialsCard"
};

function createDefaultRouteView() {
  return {
    zoom: 1,
    panX: 0,
    panY: 0,
    dragging: false,
    pointerId: null,
    startClientX: 0,
    startClientY: 0,
    startPanX: 0,
    startPanY: 0,
    dragMoved: false
  };
}

const ROUTE_VIEW_STATE = {
  routeCanvas: createDefaultRouteView(),
  routeCanvasPopup: createDefaultRouteView()
};

const ROUTE_POINTS_BY_COLOR = [[], [], [], []];
for (let i = 0; i < ROUTE_MAP_POINTS.length; i++) {
  const c = ROUTE_MAP_POINTS[i].color;
  if (ROUTE_POINTS_BY_COLOR[c]) {
    ROUTE_POINTS_BY_COLOR[c].push(i);
  }
}

function routeDistance(a, b) {
  const base = Math.hypot(a.x - b.x, a.y - b.y);
  const isMineA = Number.isInteger(Number(a.color));
  const isMineB = Number.isInteger(Number(b.color));
  if (!isMineA || !isMineB) {
    return base;
  }
  const islandPenalty = !!a.island || !!b.island;
  const continentA = a.continent ? String(a.continent) : null;
  const continentB = b.continent ? String(b.continent) : null;
  const crossContinent = continentA !== null && continentB !== null && continentA !== continentB;
  return (islandPenalty || crossContinent) ? base * ROUTE_DISTANCE_SURCHARGE : base;
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

function buildBeaconDistMatrix(points, beacons) {
  if (!beacons.length) return [];
  return points.map((point) =>
    beacons.map((beacon) => Math.hypot(point.x - beacon.x, point.y - beacon.y))
  );
}

const ROUTE_DIST = buildRouteDistMatrix(ROUTE_MAP_POINTS);
const ROUTE_BEST_BEACON = buildBestBeaconToPoint(ROUTE_MAP_POINTS, ROUTE_BEACONS);
const ROUTE_BEACON_DIST = buildBeaconDistMatrix(ROUTE_MAP_POINTS, ROUTE_BEACONS);

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

function enumerateRouteOptions(currentIdx, totalTravel, distSinceTeleport, remaining, lastVisitAt, threshold) {
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
          newDistSinceTeleport: Math.min(threshold, distSinceTeleport + directCost)
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
            newDistSinceTeleport: Math.min(threshold, distSinceTeleport + beaconCost)
          });
        }
      }

      if (distSinceTeleport + EPS >= threshold) {
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

function buildGreedyRouteFromStart(startIdx, requiredRuns, threshold) {
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
    const options = enumerateRouteOptions(current, totalTravel, distSinceTeleport, remaining, lastVisitAt, threshold);
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

function recommendRouteFromRuns(runs, threshold = ROUTE_THRESHOLD) {
  const requiredRuns = [runs[0] || 0, runs[1] || 0, runs[2] || 0, runs[3] || 0].map(v => Math.max(0, Number(v) || 0));
  if (sumRemainingCounts(requiredRuns) <= 0) {
    return { steps: [], totalTravel: 0, teleportCount: 0, beaconCount: 0 };
  }

  const starts = chooseRouteStartCandidates(requiredRuns);
  let best = null;
  for (const startIdx of starts) {
    const candidate = buildGreedyRouteFromStart(startIdx, requiredRuns, threshold);
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

function chooseStartPoints(indices, approxStarts = 0) {
  if (!indices.length) return [];
  if (approxStarts <= 0 || approxStarts >= indices.length) {
    return [...indices];
  }
  const sampled = [];
  const step = Math.max(1, Math.floor(indices.length / approxStarts));
  for (let i = 0; i < indices.length && sampled.length < approxStarts; i += step) {
    sampled.push(indices[i]);
  }
  return sampled;
}

function greedyOrderSubset(indices, startIdx) {
  if (!indices.length) return [];
  if (indices.length === 1) return [...indices];

  const indexSet = new Set(indices);
  const visited = new Set([startIdx]);
  const order = [startIdx];
  let current = startIdx;

  for (let step = 0; step < indices.length - 1; step++) {
    let nextIdx = -1;
    let bestDist = Infinity;
    for (const idx of indexSet) {
      if (visited.has(idx)) continue;
      const d = ROUTE_DIST[current][idx];
      if (d + EPS < bestDist) {
        bestDist = d;
        nextIdx = idx;
      }
    }
    if (nextIdx < 0) break;
    visited.add(nextIdx);
    order.push(nextIdx);
    current = nextIdx;
  }
  return order;
}

function buildColorPriorityOrderApprox(colorGroups, approxStarts = 0) {
  if (!colorGroups.length) return [];

  const firstGroup = colorGroups[0];
  let bestOrder = [];
  let bestCost = Infinity;

  for (const start of chooseStartPoints(firstGroup, approxStarts)) {
    const order = [];
    let prevLast = null;

    const firstOrder = greedyOrderSubset(firstGroup, start);
    order.push(...firstOrder);
    prevLast = order.length ? order[order.length - 1] : null;

    for (let i = 1; i < colorGroups.length; i++) {
      const group = colorGroups[i];
      if (!group.length) continue;
      let groupStart = group[0];
      if (prevLast !== null) {
        groupStart = group.reduce((best, idx) =>
          ROUTE_DIST[prevLast][idx] + EPS < ROUTE_DIST[prevLast][best] ? idx : best
        , group[0]);
      }
      let groupOrder = greedyOrderSubset(group, groupStart);
      if (prevLast !== null && groupOrder.length >= 2) {
        const dStart = ROUTE_DIST[prevLast][groupOrder[0]];
        const dEnd = ROUTE_DIST[prevLast][groupOrder[groupOrder.length - 1]];
        if (dEnd + EPS < dStart) {
          groupOrder = [...groupOrder].reverse();
        }
      }
      order.push(...groupOrder);
      prevLast = order[order.length - 1];
    }

    let cost = 0;
    for (let i = 1; i < order.length; i++) {
      cost += ROUTE_DIST[order[i - 1]][order[i]];
    }
    if (cost + EPS < bestCost) {
      bestCost = cost;
      bestOrder = order;
    }
  }

  return bestOrder;
}

function optimizeTeleportsForOrder(order, threshold) {
  if (!order.length) {
    return { totalTravel: 0, actions: [] };
  }

  const states = [{ dist: 0, cost: 0, prev: null, action: "start" }];
  let frontier = [0];
  const hasBeacons = ROUTE_BEACON_DIST.length > 0;

  for (let i = 1; i < order.length; i++) {
    const prevPoint = order[i - 1];
    const currPoint = order[i];
    const directDist = ROUTE_DIST[prevPoint][currPoint];
    const candidates = [];

    for (const sid of frontier) {
      const state = states[sid];
      const travelOptions = [[directDist, "travel"]];
      if (hasBeacons) {
        const beaconList = ROUTE_BEACON_DIST[currPoint] || [];
        for (let bIdx = 0; bIdx < beaconList.length; bIdx++) {
          travelOptions.push([beaconList[bIdx], `beacon:${bIdx}`]);
        }
      }

      for (const [travelDist, action] of travelOptions) {
        let newDist = state.dist + travelDist;
        if (newDist > threshold) newDist = threshold;
        candidates.push([newDist, state.cost + travelDist, sid, action]);
      }

      if (state.dist + EPS >= threshold) {
        candidates.push([0, state.cost, sid, "teleport"]);
      }
    }

    candidates.sort((a, b) => {
      if (Math.abs(b[0] - a[0]) > EPS) return b[0] - a[0];
      return a[1] - b[1];
    });

    const kept = [];
    let bestCost = Infinity;
    for (const candidate of candidates) {
      const cost = candidate[1];
      if (cost + EPS >= bestCost) continue;
      kept.push(candidate);
      bestCost = cost;
    }
    kept.reverse();

    frontier = [];
    for (const [dist, cost, prev, action] of kept) {
      states.push({ dist, cost, prev, action });
      frontier.push(states.length - 1);
    }
  }

  let endState = frontier[0];
  for (const sid of frontier) {
    if (states[sid].cost + EPS < states[endState].cost) {
      endState = sid;
    }
  }

  const actions = [];
  let cursor = endState;
  while (cursor !== null) {
    actions.push(states[cursor].action);
    cursor = states[cursor].prev;
  }
  actions.reverse();

  return { totalTravel: states[endState].cost, actions };
}

function buildRouteFromOrderAndActions(order, actions) {
  if (!order.length) {
    return { steps: [], totalTravel: 0, teleportCount: 0, beaconCount: 0 };
  }

  const steps = [];
  let totalTravel = 0;
  let teleportCount = 0;
  let beaconCount = 0;

  for (let i = 0; i < order.length; i++) {
    const pointIdx = order[i];
    const rawAction = actions[i] || (i === 0 ? "start" : "travel");
    let action = rawAction;
    let beaconIdx = null;
    let cost = 0;

    if (i > 0) {
      if (rawAction === "teleport") {
        action = "teleport";
        cost = 0;
        teleportCount += 1;
      } else if (String(rawAction).startsWith("beacon:")) {
        action = "beacon";
        const parsed = Number(String(rawAction).split(":")[1]);
        beaconIdx = Number.isInteger(parsed) ? parsed : null;
        const beaconDist = beaconIdx !== null ? (ROUTE_BEACON_DIST[pointIdx]?.[beaconIdx] ?? 0) : 0;
        cost = beaconDist;
        beaconCount += 1;
      } else {
        action = "travel";
        cost = ROUTE_DIST[order[i - 1]][pointIdx];
      }
    } else {
      action = "start";
      cost = 0;
    }

    totalTravel += cost;
    steps.push({
      pointIdx,
      action,
      beaconIdx,
      cost,
      totalTravel
    });
  }

  return { steps, totalTravel, teleportCount, beaconCount };
}

function recommendRouteForTargets(targetIndices, threshold, selectedColors = []) {
  if (!Array.isArray(targetIndices) || targetIndices.length === 0) {
    return { steps: [], totalTravel: 0, teleportCount: 0, beaconCount: 0 };
  }

  const uniqueTargets = Array.from(new Set(targetIndices));
  const targetSet = new Set(uniqueTargets);
  const colorGroups = [];
  for (const color of selectedColors) {
    const group = (ROUTE_POINTS_BY_COLOR[color] || []).filter((idx) => targetSet.has(idx));
    if (group.length) colorGroups.push(group);
  }

  if (colorGroups.length > 1) {
    const order = buildColorPriorityOrderApprox(colorGroups, 0);
    const { actions } = optimizeTeleportsForOrder(order, threshold);
    return buildRouteFromOrderAndActions(order, actions);
  }

  const searchGroup = colorGroups.length === 1 ? colorGroups[0] : uniqueTargets;
  let best = null;
  for (const start of chooseStartPoints(searchGroup, 0)) {
    const order = greedyOrderSubset(searchGroup, start);
    const { totalTravel, actions } = optimizeTeleportsForOrder(order, threshold);
    const candidate = buildRouteFromOrderAndActions(order, actions);
    candidate.totalTravel = totalTravel;
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

function normalizeRouteChunkSize(value) {
  const num = Math.floor(Number(value));
  if (!Number.isFinite(num)) return ROUTE_DEFAULT_CHUNK_SIZE;
  return Math.max(ROUTE_CHUNK_SIZE_MIN, Math.min(ROUTE_CHUNK_SIZE_MAX, num));
}

function getRouteChunkCount(route, chunkSize = ROUTE_STATE.chunkSize) {
  const size = normalizeRouteChunkSize(chunkSize);
  return Math.ceil(route.steps.length / size);
}

function getRouteChunkRange(route, chunkIndex, chunkSize = ROUTE_STATE.chunkSize) {
  const size = normalizeRouteChunkSize(chunkSize);
  const start = chunkIndex * size;
  const end = Math.min(route.steps.length, start + size);
  return { start, end };
}

function buildChunkRouteText(route, chunkIndex, chunkSize = ROUTE_STATE.chunkSize) {
  const { start, end } = getRouteChunkRange(route, chunkIndex, chunkSize);
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

function getRouteViewState(canvasId) {
  if (!canvasId) return createDefaultRouteView();
  if (!ROUTE_VIEW_STATE[canvasId]) {
    ROUTE_VIEW_STATE[canvasId] = createDefaultRouteView();
  }
  return ROUTE_VIEW_STATE[canvasId];
}

function resetRouteView(canvasId) {
  const state = getRouteViewState(canvasId);
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  state.dragging = false;
  state.pointerId = null;
  state.dragMoved = false;
}

function getRouteScale(width, height, padding, zoom = 1) {
  const w = Math.max(1, width - padding * 2);
  const h = Math.max(1, height - padding * 2);
  const scaleX = w / (ROUTE_BOUNDS.maxAbsX * 2);
  const scaleY = h / (ROUTE_BOUNDS.maxAbsY * 2);
  const scale = Math.max(0.0001, Math.min(scaleX, scaleY));
  return scale * Math.max(ROUTE_ZOOM_MIN, Math.min(ROUTE_ZOOM_MAX, zoom));
}

function routeToCanvas(x, y, width, height, padding, viewState = null) {
  const state = viewState || createDefaultRouteView();
  const scale = getRouteScale(width, height, padding, state.zoom);
  return {
    x: width * 0.5 + state.panX + x * scale,
    // Route coordinates are in mathematical axes, so draw +Y upward on canvas.
    y: height * 0.5 + state.panY - y * scale
  };
}

function canvasToRoute(x, y, width, height, padding, viewState = null) {
  const state = viewState || createDefaultRouteView();
  const scale = getRouteScale(width, height, padding, state.zoom);
  return {
    x: (x - width * 0.5 - state.panX) / scale,
    y: -(y - height * 0.5 - state.panY) / scale
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

function drawRouteBackdrop(ctx, width, height, padding, viewState) {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "rgba(39,55,77,0.95)");
  grad.addColorStop(1, "rgba(14,25,39,0.96)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const worldMin = -ROUTE_MAP_WORLD_HALF;
  const worldMax = ROUTE_MAP_WORLD_HALF;
  const topLeft = routeToCanvas(worldMin, worldMax, width, height, padding, viewState);
  const bottomRight = routeToCanvas(worldMax, worldMin, width, height, padding, viewState);
  const mapWidth = bottomRight.x - topLeft.x;
  const mapHeight = bottomRight.y - topLeft.y;

  ctx.save();
  ctx.fillStyle = "rgba(82,109,130,0.18)";
  ctx.fillRect(topLeft.x, topLeft.y, mapWidth, mapHeight);
  ctx.strokeStyle = "rgba(157,178,191,0.42)";
  ctx.lineWidth = 1.3;
  ctx.strokeRect(topLeft.x, topLeft.y, mapWidth, mapHeight);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(157,178,191,0.18)";
  ctx.lineWidth = 1;
  for (let v = -6000; v <= 6000; v += 2000) {
    const vxA = routeToCanvas(v, worldMin, width, height, padding, viewState);
    const vxB = routeToCanvas(v, worldMax, width, height, padding, viewState);
    const hyA = routeToCanvas(worldMin, v, width, height, padding, viewState);
    const hyB = routeToCanvas(worldMax, v, width, height, padding, viewState);
    ctx.beginPath();
    ctx.moveTo(vxA.x, vxA.y);
    ctx.lineTo(vxB.x, vxB.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(hyA.x, hyA.y);
    ctx.lineTo(hyB.x, hyB.y);
    ctx.stroke();
  }
  ctx.restore();

  const origin = routeToCanvas(0, 0, width, height, padding, viewState);
  ctx.save();
  ctx.strokeStyle = "rgba(221,230,237,0.35)";
  ctx.lineWidth = 1.1;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(topLeft.x, origin.y);
  ctx.lineTo(bottomRight.x, origin.y);
  ctx.moveTo(origin.x, topLeft.y);
  ctx.lineTo(origin.x, bottomRight.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(221,230,237,0.8)";
  ctx.font = "12px Pretendard, sans-serif";
  ctx.fillText("(0,0)", origin.x + 8, origin.y - 8);
  ctx.restore();
}

function drawRouteLegend(ctx) {
  const x = 12;
  const y = 12;
  const w = 245;
  const h = 70;
  ctx.save();
  ctx.fillStyle = "rgba(14,25,39,0.72)";
  ctx.strokeStyle = "rgba(157,178,191,0.42)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, 10);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.fill();
  ctx.stroke();

  ctx.font = "11px Pretendard, sans-serif";
  ctx.fillStyle = "rgba(221,230,237,0.96)";
  ctx.fillText("Wheel: zoom | Drag: pan | Double click: reset", x + 10, y + 18);

  const lineY = y + 38;
  drawRouteArrow(ctx, { x: x + 10, y: lineY }, { x: x + 58, y: lineY }, "rgba(157,178,191,0.95)", false, 2);
  ctx.fillText("Move", x + 66, lineY + 4);
  drawRouteArrow(ctx, { x: x + 108, y: lineY }, { x: x + 155, y: lineY }, "rgba(221,230,237,0.9)", true, 1.6);
  ctx.fillText("Beacon TP", x + 162, lineY + 4);
  drawRouteArrow(ctx, { x: x + 10, y: y + 56 }, { x: x + 58, y: y + 56 }, "rgba(252,165,165,0.95)", true, 1.7);
  ctx.fillText("Mine TP", x + 66, y + 60);
  ctx.restore();
}

function drawRouteChunk(route, chunkIndex, canvasRef = "routeCanvas", chunkSize = ROUTE_STATE.chunkSize) {
  const canvas = typeof canvasRef === "string" ? $(canvasRef) : canvasRef;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const viewState = getRouteViewState(canvas.id || "routeCanvas");
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
  const padding = ROUTE_CANVAS_PADDING;
  drawRouteBackdrop(ctx, width, height, padding, viewState);

  ROUTE_MAP_POINTS.forEach((p) => {
    const pos = routeToCanvas(p.x, p.y, width, height, padding, viewState);
    const color = Number(p.color);
    const fill =
      color === 0 ? "rgba(34,197,94,0.45)" :
      color === 1 ? "rgba(59,130,246,0.48)" :
      color === 2 ? "rgba(250,204,21,0.5)" :
      "rgba(244,63,94,0.5)";
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.arc(pos.x, pos.y, 2.7, 0, Math.PI * 2);
    ctx.fill();
  });

  const { start, end } = getRouteChunkRange(route, chunkIndex, chunkSize);
  const usedBeaconIdx = new Set();
  for (let i = Math.max(start + 1, 1); i < end; i++) {
    if (i - 1 < start) continue;
    const prev = route.steps[i - 1];
    const curr = route.steps[i];
    const prevPoint = ROUTE_MAP_POINTS[prev.pointIdx];
    const currPoint = ROUTE_MAP_POINTS[curr.pointIdx];
    const a = routeToCanvas(prevPoint.x, prevPoint.y, width, height, padding, viewState);
    const b = routeToCanvas(currPoint.x, currPoint.y, width, height, padding, viewState);

    if (curr.action === "teleport") {
      drawRouteArrow(ctx, a, b, "rgba(252,165,165,0.95)", true, 1.7);
    } else if (curr.action === "beacon" && curr.beaconIdx !== null && curr.beaconIdx >= 0) {
      const beacon = ROUTE_BEACONS[curr.beaconIdx];
      const c = routeToCanvas(beacon.x, beacon.y, width, height, padding, viewState);
      usedBeaconIdx.add(curr.beaconIdx);
      drawRouteArrow(ctx, a, c, "rgba(221,230,237,0.9)", true, 1.6);
      drawRouteArrow(ctx, c, b, "rgba(157,178,191,0.96)", false, 2.2);
    } else {
      drawRouteArrow(ctx, a, b, "rgba(157,178,191,0.96)", false, 2.2);
    }
  }

  usedBeaconIdx.forEach((idx) => {
    const beacon = ROUTE_BEACONS[idx];
    if (!beacon) return;
    const pos = routeToCanvas(beacon.x, beacon.y, width, height, padding, viewState);

    ctx.beginPath();
    ctx.fillStyle = "rgba(251,191,36,0.98)";
    ctx.strokeStyle = "rgba(14,25,39,0.95)";
    ctx.lineWidth = 1.7;
    ctx.arc(pos.x, pos.y, 5.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(251,191,36,0.99)";
    ctx.font = "11px Pretendard, sans-serif";
    ctx.fillText(beacon.name, pos.x + 8, pos.y + 12);
  });

  for (let i = start; i < end; i++) {
    const step = route.steps[i];
    const p = ROUTE_MAP_POINTS[step.pointIdx];
    const pos = routeToCanvas(p.x, p.y, width, height, padding, viewState);
    const isStart = i === start;
    const isEnd = i === end - 1;
    const radius = isStart || isEnd ? 7.5 : 5.2;

    ctx.beginPath();
    ctx.fillStyle = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#DDE6ED";
    ctx.strokeStyle = "rgba(14,25,39,0.98)";
    ctx.lineWidth = 1.8;
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(221,230,237,0.97)";
    ctx.font = "12px Pretendard, sans-serif";
    ctx.fillText(String(p.name), pos.x + 8, pos.y - 8);
  }

  drawRouteLegend(ctx);
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

function redrawRouteCanvases() {
  if (!ROUTE_STATE.route || !ROUTE_STATE.route.steps.length) return;
  const chunkSize = normalizeRouteChunkSize(ROUTE_STATE.chunkSize);
  drawRouteChunk(ROUTE_STATE.route, ROUTE_STATE.chunkIndex, "routeCanvas", chunkSize);
  if (isRoutePopupOpen()) {
    drawRouteChunk(ROUTE_STATE.route, ROUTE_STATE.chunkIndex, "routeCanvasPopup", chunkSize);
  }
}

function zoomRouteCanvasAt(canvas, clientX, clientY, nextZoom) {
  if (!canvas) return false;
  const state = getRouteViewState(canvas.id || "routeCanvas");
  const clampedZoom = Math.max(ROUTE_ZOOM_MIN, Math.min(ROUTE_ZOOM_MAX, nextZoom));
  if (!Number.isFinite(clampedZoom) || Math.abs(clampedZoom - state.zoom) < EPS) {
    return false;
  }

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width || canvas.clientWidth || canvas.width || 360);
  const height = Math.max(1, rect.height || canvas.clientHeight || canvas.height || 360);
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const worldBefore = canvasToRoute(localX, localY, width, height, ROUTE_CANVAS_PADDING, state);

  state.zoom = clampedZoom;
  const scale = getRouteScale(width, height, ROUTE_CANVAS_PADDING, state.zoom);
  state.panX = localX - width * 0.5 - worldBefore.x * scale;
  state.panY = localY - height * 0.5 + worldBefore.y * scale;
  return true;
}

function bindRouteCanvasInteraction(canvasId) {
  const canvas = $(canvasId);
  if (!canvas) return;
  const state = getRouteViewState(canvasId);

  canvas.addEventListener("wheel", (event) => {
    if (!ROUTE_STATE.route) return;
    event.preventDefault();
    const multiplier = Math.exp(-event.deltaY * ROUTE_ZOOM_WHEEL_STEP);
    const nextZoom = state.zoom * multiplier;
    const changed = zoomRouteCanvasAt(canvas, event.clientX, event.clientY, nextZoom);
    if (changed) {
      redrawRouteCanvases();
    }
  }, { passive: false });

  canvas.addEventListener("pointerdown", (event) => {
    if (!ROUTE_STATE.route) return;
    if (event.button !== 0) return;
    state.dragging = true;
    state.dragMoved = false;
    state.pointerId = event.pointerId;
    state.startClientX = event.clientX;
    state.startClientY = event.clientY;
    state.startPanX = state.panX;
    state.startPanY = state.panY;
    canvas.classList.add("dragging");
    if (canvas.setPointerCapture) {
      canvas.setPointerCapture(event.pointerId);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging || state.pointerId !== event.pointerId || !ROUTE_STATE.route) return;
    const dx = event.clientX - state.startClientX;
    const dy = event.clientY - state.startClientY;
    if (!state.dragMoved && Math.hypot(dx, dy) > 2) {
      state.dragMoved = true;
    }
    state.panX = state.startPanX + dx;
    state.panY = state.startPanY + dy;
    redrawRouteCanvases();
  });

  const endDrag = (event) => {
    if (state.pointerId !== event.pointerId) return;
    const wasClick = !state.dragMoved;
    state.dragging = false;
    state.dragMoved = false;
    state.pointerId = null;
    canvas.classList.remove("dragging");
    if (canvas.releasePointerCapture && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    if (wasClick && ROUTE_STATE.route) {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width || canvas.clientWidth || canvas.width || 360);
      const height = Math.max(1, rect.height || canvas.clientHeight || canvas.height || 360);
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const world = canvasToRoute(localX, localY, width, height, ROUTE_CANVAS_PADDING, state);
      const scale = getRouteScale(width, height, ROUTE_CANVAS_PADDING, state.zoom);
      state.panX = -world.x * scale;
      state.panY = world.y * scale;
      redrawRouteCanvases();
    }
  };

  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("pointerleave", (event) => {
    if (state.dragging && state.pointerId === event.pointerId) {
      endDrag(event);
    }
  });

  canvas.addEventListener("dblclick", (event) => {
    if (!ROUTE_STATE.route) return;
    event.preventDefault();
    resetRouteView(canvasId);
    redrawRouteCanvases();
  });
}

function getPlannerThreshold() {
  const raw = Number($("horseSpeedSelect")?.value ?? ROUTE_THRESHOLD);
  if (!Number.isFinite(raw) || raw <= 0) return ROUTE_THRESHOLD;
  return raw;
}

function getPlannerChunkSize() {
  return normalizeRouteChunkSize($("routeChunkSizeInput")?.value ?? ROUTE_STATE.chunkSize);
}

function getPlannerHorseLabel(threshold) {
  return HORSE_SPEED_LABEL[threshold] || `${threshold}`;
}

function getPlannerSelectedColors() {
  const checks = Array.from(document.querySelectorAll(".route-color-check"));
  const colors = checks
    .filter((el) => el instanceof HTMLInputElement && el.checked)
    .map((el) => Number(el.value))
    .filter((v) => Number.isInteger(v) && v >= 0 && v <= 3);
  return Array.from(new Set(colors)).sort((a, b) => a - b);
}

function isCalcRouteMode() {
  const toggle = $("routeUseCalcToggle");
  return !!(toggle instanceof HTMLInputElement && toggle.checked);
}

function updateRouteModeUI() {
  const useCalc = isCalcRouteMode();
  const colorGroup = $("routeColorGroup");
  if (colorGroup) {
    colorGroup.classList.toggle("is-disabled", useCalc);
  }
  const checks = Array.from(document.querySelectorAll(".route-color-check"));
  checks.forEach((el) => {
    if (el instanceof HTMLInputElement) {
      el.disabled = useCalc;
    }
  });
  const hint = $("routeModeHint");
  if (hint) {
    hint.textContent = useCalc
      ? "주괴 계산 결과(광산 분배) 기준 경로"
      : "수동 색상 선택 기준 경로";
  }
}

function setRouteUnavailable(message, detail = "") {
  ROUTE_STATE.route = null;
  ROUTE_STATE.chunkIndex = 0;
  resetRouteView("routeCanvas");
  resetRouteView("routeCanvasPopup");
  closeRoutePopup();
  if ($("chunkInfo")) $("chunkInfo").textContent = "0 / 0";
  if ($("routePopupChunkInfo")) $("routePopupChunkInfo").textContent = "0 / 0";
  if ($("routeText")) $("routeText").value = message;
  if ($("routeMeta")) $("routeMeta").textContent = detail;
  if ($("prevChunkBtn")) $("prevChunkBtn").disabled = true;
  if ($("nextChunkBtn")) $("nextChunkBtn").disabled = true;
  if ($("prevChunkPopupBtn")) $("prevChunkPopupBtn").disabled = true;
  if ($("nextChunkPopupBtn")) $("nextChunkPopupBtn").disabled = true;
  if ($("openRoutePopupBtn")) $("openRoutePopupBtn").disabled = true;
  const canvas = $("routeCanvas");
  const ctx = canvas?.getContext("2d");
  if (canvas) canvas.classList.remove("dragging");
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  const popupCanvas = $("routeCanvasPopup");
  const popupCtx = popupCanvas?.getContext("2d");
  if (popupCanvas) popupCanvas.classList.remove("dragging");
  if (popupCtx) popupCtx.clearRect(0, 0, popupCanvas.width, popupCanvas.height);
}

function calculateRouteFromPlannerOptions() {
  updateRouteModeUI();
  const threshold = getPlannerThreshold();
  const chunkSize = getPlannerChunkSize();
  const horseLabel = getPlannerHorseLabel(threshold);
  const selectedColors = getPlannerSelectedColors();
  const useCalcMode = isCalcRouteMode();
  ROUTE_STATE.threshold = threshold;
  ROUTE_STATE.chunkSize = chunkSize;
  ROUTE_STATE.horseLabel = horseLabel;
  ROUTE_STATE.selectedColors = selectedColors;
  ROUTE_STATE.sourceMode = useCalcMode ? "calc" : "manual";
  if ($("routeChunkSizeInput")) $("routeChunkSizeInput").value = String(chunkSize);

  let recommended = null;

  if (useCalcMode) {
    const runs = Array.isArray(ROUTE_STATE.calcRuns) ? ROUTE_STATE.calcRuns : null;
    if (!runs || runs.length < 4) {
      setRouteUnavailable("주괴 계산 결과가 없습니다.", "먼저 단일/다중 계산을 실행해주세요.");
      return;
    }
    const totalRunCount = runs.reduce((acc, value) => acc + Math.max(0, Number(value) || 0), 0);
    if (totalRunCount <= 0) {
      setRouteUnavailable("주괴 계산 결과의 광산 분배가 0입니다.", "계산 조건을 확인해주세요.");
      return;
    }
    recommended = recommendRouteFromRuns(runs, threshold);
    if (!recommended || !recommended.steps || !recommended.steps.length) {
      setRouteUnavailable("결과 기반 경로를 만들 수 없습니다.", "광산 분배 결과를 확인해주세요.");
      return;
    }
    recommended.threshold = threshold;
    recommended.horseLabel = horseLabel;
    recommended.targetCount = totalRunCount;
    recommended.routeSource = "calc";
    recommended.runs = [...runs];
  } else {
    if (selectedColors.length === 0) {
      setRouteUnavailable("선택된 광산 색이 없습니다.", "최소 1개 이상의 색을 선택해주세요.");
      return;
    }

    const targets = ROUTE_MAP_POINTS
      .map((point, idx) => ({ idx, color: Number(point.color) }))
      .filter((item) => selectedColors.includes(item.color))
      .map((item) => item.idx);

    if (!targets.length) {
      setRouteUnavailable("해당 색상 광산이 없습니다.", "색상 선택을 확인해주세요.");
      return;
    }

    recommended = recommendRouteForTargets(targets, threshold, selectedColors);
    if (!recommended || !recommended.steps || !recommended.steps.length) {
      setRouteUnavailable("경로를 만들 수 없습니다.", "조건을 바꿔 다시 시도해주세요.");
      return;
    }

    recommended.selectedColors = [...selectedColors];
    recommended.targetCount = targets.length;
    recommended.threshold = threshold;
    recommended.horseLabel = horseLabel;
    recommended.routeSource = "manual";
  }

  ROUTE_STATE.route = recommended;
  ROUTE_STATE.chunkIndex = 0;
  resetRouteView("routeCanvas");
  resetRouteView("routeCanvasPopup");
  refreshRoutePanel();
}

function refreshRoutePanel() {
  const route = ROUTE_STATE.route;
  if (!route || !route.steps.length) return;

  const chunkSize = normalizeRouteChunkSize(ROUTE_STATE.chunkSize);
  const chunkCount = getRouteChunkCount(route, chunkSize);
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
  $("routeText").value = buildChunkRouteText(route, ROUTE_STATE.chunkIndex, chunkSize);
  const threshold = Number(route.threshold || ROUTE_STATE.threshold || ROUTE_THRESHOLD);
  const horseLabel = route.horseLabel || ROUTE_STATE.horseLabel || getPlannerHorseLabel(threshold);
  const source = route.routeSource || ROUTE_STATE.sourceMode || "manual";
  const sourceText = source === "calc" ? "주괴 결과 기준" : "색상 선택 기준";
  let detail = "";
  if (source === "calc" && Array.isArray(route.runs) && route.runs.length >= 4) {
    detail = ` | 분배 G${route.runs[0]} B${route.runs[1]} Y${route.runs[2]} R${route.runs[3]}`;
  } else {
    const colors = Array.isArray(route.selectedColors) ? route.selectedColors : ROUTE_STATE.selectedColors;
    const colorText = (colors || []).map((c) => ROUTE_COLOR_LABEL[c] || c).join(", ");
    detail = ` | 색상 ${colorText}`;
  }
  $("routeMeta").textContent = `총 이동거리 ${formatFixed(route.totalTravel, 2)} | 말 ${horseLabel} (${threshold}) | 화면 ${chunkSize}개 | ${sourceText} | 텔레포트 ${route.teleportCount}회 | 비콘 ${route.beaconCount}회${detail}`;
  redrawRouteCanvases();
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

  const hasResult = !$("resultArea").classList.contains("hidden");
  const hideOverviewCards = pageId === "routeCard" || !hasResult;
  if (hideOverviewCards) {
    $("barCard").classList.add("hidden");
    $("targetSummaryCard").classList.add("hidden");
  } else {
    $("barCard").classList.remove("hidden");
    $("targetSummaryCard").classList.remove("hidden");
  }

  if (pageId === "routeCard") {
    if (!ROUTE_STATE.route) {
      calculateRouteFromPlannerOptions();
    } else {
      refreshRoutePanel();
    }
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
  ROUTE_STATE.calcRuns = [...result.runs];
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
  calculateRouteFromPlannerOptions();
  setActivePage(PAGE_STATE.activePage);
}

function showError(message) {
  $("emptyState").classList.add("bad");
  $("emptyState").classList.remove("hidden");
  $("emptyState").textContent = String(message);
  $("resultArea").classList.add("hidden");
  $("barCard").classList.add("hidden");
  $("targetSummaryCard").classList.add("hidden");
  $("pageShell").classList.remove("hidden");
  if (!PAGE_IDS.includes(PAGE_STATE.activePage)) {
    PAGE_STATE.activePage = "materialsCard";
  }
  setActivePage(PAGE_STATE.activePage);
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
    $("targetItem").value = "설화오금";
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
  $("calcRoutePlanBtn")?.addEventListener("click", () => {
    calculateRouteFromPlannerOptions();
  });

  $("routeUseCalcToggle")?.addEventListener("change", () => {
    updateRouteModeUI();
    if (PAGE_STATE.activePage === "routeCard") {
      calculateRouteFromPlannerOptions();
    }
  });

  const applyChunkSize = () => {
    const chunkSize = getPlannerChunkSize();
    ROUTE_STATE.chunkSize = chunkSize;
    if ($("routeChunkSizeInput")) $("routeChunkSizeInput").value = String(chunkSize);
    ROUTE_STATE.chunkIndex = 0;
    if (ROUTE_STATE.route) {
      refreshRoutePanel();
    }
  };

  $("routeChunkSizeInput")?.addEventListener("change", applyChunkSize);
  $("routeChunkSizeInput")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    applyChunkSize();
  });

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

  bindRouteCanvasInteraction("routeCanvas");
  bindRouteCanvasInteraction("routeCanvasPopup");
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
  if ($("routeChunkSizeInput")) $("routeChunkSizeInput").value = String(ROUTE_STATE.chunkSize);
  updateRouteModeUI();
  $("pageShell")?.classList.remove("hidden");
  setActivePage(PAGE_STATE.activePage);
}

window.addEventListener("DOMContentLoaded", init);
