export type StatVisual =
  | { kind: "trend"; values: number[] }
  | { kind: "uptime"; days: number[] }
  | { kind: "distribution"; bins: number[]; max: number; marker: number }
  | { kind: "map"; points: [number, number][] };

export interface Stat {
  /** The final number. The band counts up to it. */
  value: number;
  /** Text before the number, such as "$". */
  prefix?: string;
  /** Text after the number, such as "%", "ms", or "+". */
  suffix?: string;
  /** Digits after the decimal point. Defaults to 0. */
  decimals?: number;
  /** `compact` shortens large numbers to 2.3M or 12K. The unit renders like a suffix. Defaults to `standard`. */
  notation?: "standard" | "compact";
  label: string;
  /** One short supporting line under the number. */
  detail?: string;
  /** One line of context that replaces the detail while the stat is hovered or focused, such as "Up from 41% last year". */
  context?: string;
  /** A tiny chart that draws in after the number lands. */
  visual?: StatVisual;
}

/** 90 days of uptime, oldest first: two short incidents, 11 minutes on day 52 and 1 minute on day 24. */
const uptimeDays = Array.from({ length: 90 }, (_, day) => day === 51 ? 99.24 : day === 23 ? 99.93 : 100);

/** 35 edge regions as [longitude, latitude]. */
const regions: [number, number][] = [
  [-122.4, 37.8], [-118.2, 34], [-96.8, 32.8], [-87.6, 41.9], [-77.5, 39], [-74, 40.7], [-79.4, 43.7], [-99.1, 19.4],
  [-74.1, 4.7], [-77, -12], [-46.6, -23.5], [-70.7, -33.4], [-58.4, -34.6],
  [-0.1, 51.5], [-6.3, 53.3], [2.35, 48.9], [4.9, 52.4], [8.7, 50.1], [18, 59.3], [-3.7, 40.4], [9.2, 45.5], [21, 52.2],
  [3.4, 6.5], [28, -26.2], [36.8, -1.3], [55.3, 25.3], [34.8, 32.1],
  [72.9, 19.1], [103.8, 1.35], [114.2, 22.3], [139.7, 35.7], [127, 37.6], [106.8, -6.2], [151.2, -33.9], [174.8, -36.8],
];

export const stats: Stat[] = [
  {
    value: 2_334_000, notation: "compact", decimals: 1, label: "Deploys in the last 12 months",
    detail: "Across 12,400 teams", context: "Up from 1.4M the year before",
    visual: { kind: "trend", values: [141, 148, 139, 162, 171, 184, 196, 203, 221, 238, 257, 274] },
  },
  {
    value: 99.99, decimals: 2, suffix: "%", label: "API uptime over 90 days",
    detail: "Measured every 30 seconds", context: "12 minutes down, 11 of them on July 14",
    visual: { kind: "uptime", days: uptimeDays },
  },
  {
    value: 38, suffix: "ms", label: "Median response time",
    detail: "At the edge, worldwide", context: "p95 is 96 ms, down from 141 ms",
    visual: { kind: "distribution", bins: [2, 8, 18, 26, 15, 10, 7, 5, 3, 2, 1.5, 1, .8, .7, .5, .3], max: 160, marker: 38 },
  },
  {
    value: 35, label: "Edge regions on six continents",
    detail: "Most people are under 20 ms away", context: "Eight added this year, including Lagos",
    visual: { kind: "map", points: regions },
  },
];
