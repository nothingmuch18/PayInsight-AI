import Papa from 'papaparse';
import { formatCount, formatINR } from './formatters';

/**
 * Parses and analyzes a CSV file to generate a rich AI response
 * Computes: row/col counts, min/max/avg/median, outlier flags, top categories
 * @param {File} file - The uploaded CSV file
 * @returns {Promise<Object>} The structured AI response
 */
export function analyzeCSV(file) {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                try {
                    const data = results.data;
                    const meta = results.meta;

                    if (!data || data.length === 0) {
                        resolve({
                            badge: 'Analysis Failed', icon: '❌',
                            what: 'The uploaded file appears to be empty or improperly formatted.',
                            why: '', matters: '', note: '', chart: null,
                        });
                        return;
                    }

                    const rowCount = data.length;
                    const columns = meta.fields || [];

                    // Classify columns
                    const numericCols = [];
                    const categoricalCols = [];

                    columns.forEach(col => {
                        const validSamples = data.filter(r => r[col] !== null && r[col] !== undefined && r[col] !== '');
                        const numericSamples = validSamples.filter(r => typeof r[col] === 'number');
                        if (numericSamples.length > validSamples.length * 0.5) {
                            numericCols.push(col);
                        } else {
                            categoricalCols.push(col);
                        }
                    });

                    // ── Numeric Stats ──────────────────────────────────────────
                    const stats = {};
                    numericCols.forEach(col => {
                        const values = data
                            .map(r => r[col])
                            .filter(v => typeof v === 'number' && !isNaN(v))
                            .sort((a, b) => a - b);

                        if (values.length === 0) return;

                        const sum = values.reduce((a, b) => a + b, 0);
                        const count = values.length;
                        const avg = sum / count;
                        const min = values[0];
                        const max = values[count - 1];
                        const median = count % 2 === 0
                            ? (values[count / 2 - 1] + values[count / 2]) / 2
                            : values[Math.floor(count / 2)];

                        // Simple outlier detection: values > mean + 2*std
                        const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / count;
                        const std = Math.sqrt(variance);
                        const outlierCount = values.filter(v => Math.abs(v - avg) > 2 * std).length;

                        stats[col] = { sum, avg, min, max, median, count, std, outlierCount };
                    });

                    // ── Categorical Breakdown (top categories for first cat column) ──
                    let topCategories = null;
                    if (categoricalCols.length > 0) {
                        const firstCat = categoricalCols[0];
                        const freq = {};
                        data.forEach(r => {
                            const val = String(r[firstCat] || '').trim();
                            if (val) freq[val] = (freq[val] || 0) + 1;
                        });
                        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
                        topCategories = { column: firstCat, top: sorted.slice(0, 5) };
                    }

                    // ── Build Response ─────────────────────────────────────────
                    const isMoney = (col) =>
                        /amount|price|cost|revenue|salary|spend|fee|total/i.test(col);

                    const fmt = (col, val) => isMoney(col) ? formatINR(val.toFixed(2)) : formatCount(val.toFixed(2));

                    // WHAT
                    let whatText = `Successfully analyzed "${file.name}" — `;
                    whatText += `${formatCount(rowCount)} rows × ${columns.length} columns. `;
                    whatText += `Found ${numericCols.length} numeric and ${categoricalCols.length} categorical fields.`;

                    // WHY (metrics)
                    let whyText = '';
                    if (numericCols.length > 0) {
                        const lines = numericCols.map(col => {
                            const s = stats[col];
                            if (!s) return null;
                            let line = `• ${col}: avg ${fmt(col, s.avg)}, median ${fmt(col, s.median)}, `;
                            line += `range [${fmt(col, s.min)} – ${fmt(col, s.max)}]`;
                            if (s.outlierCount > 0) line += ` ⚠ ${s.outlierCount} outliers detected`;
                            return line;
                        }).filter(Boolean);
                        whyText = lines.join('\n');
                    } else {
                        whyText = 'No numeric columns found for statistical analysis.';
                    }

                    // MATTERS
                    let mattersText = '';
                    if (topCategories) {
                        mattersText += `Top values in "${topCategories.column}": `;
                        mattersText += topCategories.top.map(([v, c]) => `${v} (${c})`).join(', ') + '. ';
                    }
                    if (categoricalCols.length > 1) {
                        mattersText += `Other groupable fields: ${categoricalCols.slice(1).join(', ')}. `;
                    }
                    mattersText += 'Ask follow-up questions to drill into specific columns or trends.';

                    // NOTE
                    let noteText = `File size: ${(file.size / 1024).toFixed(1)} KB. `;
                    const totalOutliers = Object.values(stats).reduce((s, v) => s + (v.outlierCount || 0), 0);
                    if (totalOutliers > 0) {
                        noteText += `${totalOutliers} statistical outliers detected across all numeric fields — review for data quality.`;
                    }

                    resolve({
                        badge: 'Dataset Analysis Complete',
                        icon: '📊',
                        what: whatText,
                        why: whyText,
                        matters: mattersText,
                        note: noteText,
                        chart: null,
                    });

                } catch (err) {
                    resolve({
                        badge: 'Analysis Error', icon: '⚠️',
                        what: `An error occurred while analyzing the dataset: ${err.message}`,
                        why: '', matters: '', note: '', chart: null,
                    });
                }
            },
            error: (err) => {
                resolve({
                    badge: 'Parse Error', icon: '❌',
                    what: `Failed to read the CSV file: ${err.message}`,
                    why: '', matters: '', note: '', chart: null,
                });
            }
        });
    });
}
