const descriptions: Record<string, string> = {
  Clear: 'clear',
  Clouds: 'cloudy',
  Drizzle: 'drizzling',
  Fog: 'foggy',
  Mist: 'misty',
  Rain: 'raining',
  Snow: 'snowing',
  Thunderstorm: 'stormy',
};

export function weatherDescription(value: string) {
  return descriptions[value] ?? value.toLocaleLowerCase('en');
}
