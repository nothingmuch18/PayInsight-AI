/**
 * intentEngine.js
 * Detects user query intent and maps to analytical responses
 * Mimics NLP layer: intent detection + entity extraction
 */

/**
 * Detect intent from a natural language query
 * @param {string} query
 * @returns {string} intent key
 */
export function detectIntent(query) {
  const t = query.toLowerCase();

  if (t.match(/device|android|ios|web|network|wifi|5g|4g|3g|fail|success|evening|peak|platform/))
    return 'failure';

  if (t.match(/state|region|where|maharashtra|karnataka|delhi|geo|location|city/))
    return 'fraud_state';

  if (t.match(/age|group|young|old|26|35|18|who.*fraud|fraud.*who|people/))
    return 'fraud_age';

  if (t.match(/fraud|fake|suspicious|cheat|flag|scam|risk/))
    return 'fraud_state';

  if (t.match(/food|entertainment|spend|weekend|weekday|categor|time|hour|when|money|peak|earn/))
    return 'spending';

  return 'unknown';
}

/**
 * Response templates — structured as What / Why / Matters
 * Each maps to a chart type rendered by Dashboard components
 */
export const RESPONSES = {
  failure: {
    badge:   'Device & Network Analysis',
    icon:    '📡',
    what:    'During peak evening hours (6–10 PM), Web users on 3G face the highest failure rate at 8.64% — nearly double the platform average. Android on WiFi is the most reliable combination at 4.63%. iOS on WiFi comes in at 5.09%, slightly worse than Android on the same network.',
    why:     'Browser-based (Web) payment flows lack the offline retry logic of native apps. 3G bandwidth is insufficient for real-time payment validation under evening network congestion. Native Android and iOS apps gracefully handle poor connectivity through local caching.',
    matters: 'Engineering should urgently optimize the Web payment flow for 3G users. Push high-value users toward native apps. Android + WiFi is your golden path — nudge users toward it during peak hours.',
    note:    'Based on 85,562 evening-hour transactions. Web+3G has only 243 samples — treat as directional.',
    chart:   'failure',
  },
  fraud_state: {
    badge:   'Geo Fraud Intelligence',
    icon:    '🗺️',
    what:    'Maharashtra leads fraud cases (71), closely followed by Karnataka (69) and Uttar Pradesh (52). These three states alone account for 40% of all fraud. Delhi (50 cases) is notable given its smaller geographic footprint.',
    why:     'These are high-volume transaction states, so higher absolute fraud counts are partially expected. Karnataka\'s fraud density relative to its transaction volume is disproportionately high and warrants special attention.',
    matters: 'Deploy step-up authentication (OTP + biometric) for high-value transactions from Maharashtra and Karnataka. Set tighter velocity limits for these geographies.',
    note:    '480 total fraud cases in 250,000 transactions. Overall fraud rate is 0.19%.',
    chart:   'fraud_state',
  },
  fraud_age: {
    badge:   'Age Group Risk Profile',
    icon:    '👥',
    what:    'The 26–35 age group has the most fraud exposure — 163 cases with an average fraud transaction of ₹1,627, which is 23% higher than their normal average of ₹1,326. Even the 56+ group shows elevated fraud amounts (₹1,340 vs ₹1,187 normal).',
    why:     'Younger, higher-spending users (26–45) are both the most active and the most targeted. Fraudsters intentionally push transaction amounts above the user\'s baseline — a strong detection signal regardless of age.',
    matters: 'Implement a personal baseline model: flag any transaction ₹300+ above a user\'s 30-day average for enhanced verification. This pattern is visible across all age groups.',
    note:    'Age segments 46–55 (31 cases) and 56+ (27 cases) are statistically small. Directional insights only.',
    chart:   'fraud_age',
  },
  spending: {
    badge:   'Category Spend Patterns',
    icon:    '🛍️',
    what:    'Food dominates in spend value (avg ₹532/txn vs ₹413 for Entertainment). Food peaks sharply at noon (₹552) and 6–7 PM (₹539–547) on weekdays — clear meal-time behavior. Entertainment is flat (~₹413) with a modest late-night rise.',
    why:     'Food follows habitual meal-time triggers. Entertainment is more impulsive and event-driven. Weekend Food spending is nearly identical to weekdays (₹531 vs ₹532), confirming it\'s a daily necessity — not a weekend luxury.',
    matters: 'Run Food cashback offers at 11 AM and 5 PM for maximum conversion. For Entertainment, target weekday evenings (8–10 PM) for promotions. Weekend mornings show a mild Entertainment spike — ideal for content partnership campaigns.',
    note:    'Based on 37,464 Food and 20,103 Entertainment transactions across 2024.',
    chart:   'spending',
  },
  unknown: {
    badge:   'How Can I Help?',
    icon:    '💡',
    what:    'I can analyze your 250,000 UPI transaction dataset. Try asking about device/network failure rates, fraud patterns by state or age group, or Food & Entertainment spending behavior by time of day.',
    why:     '',
    matters: '',
    note:    '',
    chart:   null,
  },
};
