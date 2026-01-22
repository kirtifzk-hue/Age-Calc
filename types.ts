export interface AgeDetails {
  years: number;
  months: number;
  days: number;
}

export interface RetirementDetails {
  retirementDate: Date;
  yearsLeft: number;
  monthsLeft: number;
  daysLeft: number;
  isRetired: boolean;
}

export interface CalculationResult {
  age: AgeDetails;
  retirement: RetirementDetails;
}

export interface GeminiInsightData {
  prediction: string;
  motivation: string;
}
