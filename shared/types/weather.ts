export interface Weather {
  location: string;
  description: string;
  temperature: number;
  conditionCode?: number;
}
