const radians = Math.PI / 180;
const sin = (degrees: number) => Math.sin(degrees * radians);
const cos = (degrees: number) => Math.cos(degrees * radians);
const normalize = (degrees: number) => (degrees % 360 + 360) % 360;

/** Standard apparent horizon, including refraction. Mountain obstructions are excluded. */
export function kufsteinSolarTimes(date: string): { sunrise: number; sunset: number } {
  const midnight = Date.parse(`${date}T00:00:00Z`);
  const day = (midnight - Date.UTC(new Date(midnight).getUTCFullYear(), 0, 0)) / 86_400_000;
  const longitudeHours = 12.1627 / 15;
  function event(rising: boolean) {
    const approximateDay = day + ((rising ? 6 : 18) - longitudeHours) / 24;
    const anomaly = .9856 * approximateDay - 3.289;
    const longitude = normalize(anomaly + 1.916 * sin(anomaly) + .020 * sin(2 * anomaly) + 282.634);
    let ascension = normalize(Math.atan(.91764 * Math.tan(longitude * radians)) / radians);
    ascension += Math.floor(longitude / 90) * 90 - Math.floor(ascension / 90) * 90;
    const declinationSin = .39782 * sin(longitude);
    const hourAngle = Math.acos((cos(90.833) - declinationSin * sin(47.5824)) / (Math.sqrt(1 - declinationSin ** 2) * cos(47.5824))) / radians;
    const localMeanTime = (rising ? 360 - hourAngle : hourAngle) / 15 + ascension / 15 - .06571 * approximateDay - 6.622;
    const utcHours = ((localMeanTime - longitudeHours) % 24 + 24) % 24;
    return midnight + utcHours * 3_600_000;
  }
  return { sunrise: event(true), sunset: event(false) };
}
