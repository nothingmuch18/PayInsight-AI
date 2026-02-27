/**
 * transactionData.js
 * Pre-computed analytics from 250,000 UPI transactions (India, 2024)
 * Source: upi_transactions_2024.csv
 */

export const STATS = {
  total:       250000,
  fraud:       480,
  failed:      12376,
  volume:      327939009,
  successRate: 95.05,
  fraudRate:   0.19,
  failureRate: 4.95,
};

/**
 * Q1 — Device × Network Failure Rates (Peak Evening 18:00–22:00)
 * Columns used: device_type, network_type, transaction_status, hour_of_day
 */
export const FAILURE_RATES = [
  { device: 'Android', network: '3G',   total: 3143,  failed: 164,  rate: 5.22 },
  { device: 'Android', network: '4G',   total: 38380, failed: 1897, rate: 4.94 },
  { device: 'Android', network: '5G',   total: 15990, failed: 792,  rate: 4.95 },
  { device: 'Android', network: 'WiFi', total: 6479,  failed: 300,  rate: 4.63 },
  { device: 'Web',     network: '3G',   total: 243,   failed: 21,   rate: 8.64 },
  { device: 'Web',     network: '4G',   total: 2557,  failed: 144,  rate: 5.63 },
  { device: 'Web',     network: '5G',   total: 1113,  failed: 49,   rate: 4.40 },
  { device: 'Web',     network: 'WiFi', total: 442,   failed: 19,   rate: 4.30 },
  { device: 'iOS',     network: '3G',   total: 795,   failed: 39,   rate: 4.91 },
  { device: 'iOS',     network: '4G',   total: 10355, failed: 506,  rate: 4.89 },
  { device: 'iOS',     network: '5G',   total: 4291,  failed: 199,  rate: 4.64 },
  { device: 'iOS',     network: 'WiFi', total: 1631,  failed: 83,   rate: 5.09 },
];

/**
 * Q2a — Fraud Counts by State
 * Columns used: sender_state, fraud_flag
 */
export const FRAUD_BY_STATE = [
  { state: 'Maharashtra',    count: 71 },
  { state: 'Karnataka',      count: 69 },
  { state: 'Uttar Pradesh',  count: 52 },
  { state: 'Delhi',          count: 50 },
  { state: 'Rajasthan',      count: 46 },
  { state: 'Gujarat',        count: 43 },
  { state: 'Tamil Nadu',     count: 40 },
  { state: 'Telangana',      count: 39 },
  { state: 'Andhra Pradesh', count: 35 },
  { state: 'West Bengal',    count: 35 },
];

/**
 * Q2b — Fraud vs Normal Avg Amount by Age Group
 * Columns used: sender_age_group, fraud_flag, amount (INR)
 */
export const FRAUD_BY_AGE = [
  { age: '18-25', cases: 143, fraudAmt: 1303.19, normalAmt: 1194.30 },
  { age: '26-35', cases: 163, fraudAmt: 1627.27, normalAmt: 1325.72 },
  { age: '36-45', cases: 116, fraudAmt: 1602.44, normalAmt: 1423.71 },
  { age: '46-55', cases: 31,  fraudAmt: 1482.55, normalAmt: 1332.94 },
  { age: '56+',   cases: 27,  fraudAmt: 1340.30, normalAmt: 1187.24 },
];

/**
 * Q3 — Food & Entertainment Spend by Hour (Weekday vs Weekend)
 * Columns used: merchant_category, hour_of_day, is_weekend, amount (INR)
 */
export const SPEND_HOURLY = [
  { h: '06:00', foodWd: 548.41, foodWe: 508.45, entWd: 409.36, entWe: 386.66 },
  { h: '08:00', foodWd: 501.30, foodWe: 525.84, entWd: 401.55, entWe: 383.97 },
  { h: '10:00', foodWd: 547.72, foodWe: 511.73, entWd: 406.14, entWe: 427.51 },
  { h: '12:00', foodWd: 552.09, foodWe: 551.00, entWd: 404.70, entWe: 427.05 },
  { h: '14:00', foodWd: 509.21, foodWe: 542.24, entWd: 444.31, entWe: 409.40 },
  { h: '16:00', foodWd: 513.42, foodWe: 519.95, entWd: 413.18, entWe: 431.34 },
  { h: '18:00', foodWd: 539.19, foodWe: 535.06, entWd: 396.57, entWe: 430.80 },
  { h: '20:00', foodWd: 508.76, foodWe: 523.44, entWd: 421.92, entWe: 395.18 },
  { h: '22:00', foodWd: 516.61, foodWe: 524.75, entWd: 412.13, entWe: 413.16 },
];

export const SPEND_SUMMARY = {
  foodWeekdayAvg: 532,
  foodWeekendAvg: 531,
  entWeekdayAvg:  414,
  entWeekendAvg:  411,
  foodTotalTxns:  37464,
  entTotalTxns:   20103,
};
