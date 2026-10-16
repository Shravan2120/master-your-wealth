export interface Fund {
  name: string;
  category: string;
  risk: "Low" | "Moderate" | "High";
  rating: number;
  nav: number;
  returns1y: number;
  returns3y: number;
  returns5y: number;
  minSip: number;
  sparkline: number[];
}

export const funds: Fund[] = [
  {
    name: "Bluechip Equity Fund",
    category: "Large Cap",
    risk: "Moderate",
    rating: 5,
    nav: 86.42,
    returns1y: 18.4,
    returns3y: 14.2,
    returns5y: 16.8,
    minSip: 500,
    sparkline: [62, 65, 63, 68, 72, 70, 75, 78, 76, 82, 84, 86],
  },
  {
    name: "Flexi Growth Fund",
    category: "Flexi Cap",
    risk: "High",
    rating: 4,
    nav: 124.18,
    returns1y: 24.6,
    returns3y: 17.9,
    returns5y: 19.3,
    minSip: 500,
    sparkline: [80, 84, 90, 87, 95, 102, 98, 108, 112, 118, 116, 124],
  },
  {
    name: "Steady Hybrid Fund",
    category: "Aggressive Hybrid",
    risk: "Moderate",
    rating: 4,
    nav: 54.73,
    returns1y: 13.2,
    returns3y: 11.5,
    returns5y: 12.4,
    minSip: 1000,
    sparkline: [44, 45, 46, 47, 46, 48, 49, 50, 51, 52, 53, 54],
  },
  {
    name: "Small Cap Opportunities",
    category: "Small Cap",
    risk: "High",
    rating: 5,
    nav: 142.9,
    returns1y: 32.1,
    returns3y: 24.8,
    returns5y: 26.2,
    minSip: 1000,
    sparkline: [78, 86, 82, 94, 102, 96, 110, 118, 124, 130, 138, 142],
  },
  {
    name: "Corporate Bond Fund",
    category: "Debt",
    risk: "Low",
    rating: 4,
    nav: 28.36,
    returns1y: 7.4,
    returns3y: 6.8,
    returns5y: 7.1,
    minSip: 500,
    sparkline: [24, 24.4, 24.8, 25.2, 25.6, 26, 26.4, 26.8, 27.2, 27.6, 28, 28.4],
  },
  {
    name: "Index Nifty 50 Fund",
    category: "Index",
    risk: "Moderate",
    rating: 5,
    nav: 178.55,
    returns1y: 16.9,
    returns3y: 13.6,
    returns5y: 15.2,
    minSip: 100,
    sparkline: [130, 136, 134, 142, 148, 152, 150, 158, 164, 170, 174, 178],
  },
];

export function formatINR(value: number): string {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)} Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)} L`;
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function sipFutureValue(
  monthly: number,
  annualRate: number,
  years: number
) {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const invested = monthly * n;

  const fv =
    i === 0
      ? invested
      : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

  return { invested, fv, gains: fv - invested };
}

export function sipYearlySeries(monthly: number, annualRate: number, years: number) {
  const points: { year: number; invested: number; value: number }[] = [];
  for (let y = 1; y <= years; y++) {
    const { invested, fv } = sipFutureValue(monthly, annualRate, y);
    points.push({ year: y, invested, value: fv });
  }
  return points;
}
