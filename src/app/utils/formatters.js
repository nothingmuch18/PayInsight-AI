/**
 * formatters.js
 * Utility functions for formatting numbers, currency, and text
 */

/**
 * Format large numbers into crore/lakh notation
 */
export function formatVolume(n) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

/**
 * Format INR currency
 */
export function formatINR(n) {
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

/**
 * Format percentage
 */
export function formatPct(n, decimals = 2) {
  return `${Number(n).toFixed(decimals)}%`;
}

/**
 * Format large count numbers
 */
export function formatCount(n) {
  return Number(n).toLocaleString('en-IN');
}
