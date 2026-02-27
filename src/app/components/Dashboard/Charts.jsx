/**
 * Dashboard/Charts.jsx
 * All recharts chart components used in dashboard views and chat responses
 */
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { FAILURE_RATES, FRAUD_BY_STATE, FRAUD_BY_AGE, SPEND_HOURLY } from '../../data/transactionData';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0d1f35', border: '1px solid #1e3a5f', borderRadius: 8, fontSize: 12 },
  labelStyle:   { color: '#94a3b8' },
};

/** Q1 — Device × Network failure rate bar chart */
export function FailureRateChart({ height = 200 }) {
  const networks = ['WiFi', '5G', '4G', '3G'];
  const devices  = ['Android', 'iOS', 'Web'];
  const data = networks.map(net => {
    const row = { net };
    devices.forEach(dev => {
      const r = FAILURE_RATES.find(x => x.device === dev && x.network === net);
      row[dev] = r?.rate || 0;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0d1f35" />
        <XAxis dataKey="net"  tick={{ fill: '#64748b', fontSize: 11 }} />
        <YAxis unit="%"       tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 10]} />
        <Tooltip {...TOOLTIP_STYLE} formatter={v => [`${v}%`, 'Failure Rate']} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
        <Bar dataKey="Android" fill="#10b981" radius={[3, 3, 0, 0]} />
        <Bar dataKey="iOS"     fill="#6366f1" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Web"     fill="#f59e0b" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Q2a — State fraud count horizontal bar chart */
export function FraudStateChart({ height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={FRAUD_BY_STATE} layout="vertical" margin={{ top: 4, right: 16, left: 90, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0d1f35" />
        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
        <YAxis type="category" dataKey="state" tick={{ fill: '#64748b', fontSize: 10 }} width={88} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Bar dataKey="count" name="Fraud Cases" radius={[0, 3, 3, 0]}>
          {FRAUD_BY_STATE.map((_, i) => (
            <Cell key={i} fill={i < 2 ? '#ef4444' : i < 5 ? '#f59e0b' : '#6366f1'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Q2b — Age group fraud vs normal avg amount */
export function FraudAgeChart({ height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={FRAUD_BY_AGE} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0d1f35" />
        <XAxis dataKey="age" tick={{ fill: '#64748b', fontSize: 11 }} />
        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[900, 1800]} />
        <Tooltip {...TOOLTIP_STYLE} formatter={v => [`₹${v}`]} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
        <Bar dataKey="fraudAmt"  name="Fraud Avg ₹"  fill="#ef4444" radius={[3, 3, 0, 0]} />
        <Bar dataKey="normalAmt" name="Normal Avg ₹" fill="#10b981" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Q3 — Food & Entertainment hourly spend line chart */
export function SpendingChart({ height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={SPEND_HOURLY} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0d1f35" />
        <XAxis dataKey="h"  tick={{ fill: '#64748b', fontSize: 10 }} />
        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[300, 620]} />
        <Tooltip {...TOOLTIP_STYLE} formatter={v => [`₹${v}`]} />
        <Legend wrapperStyle={{ fontSize: 10, color: '#64748b' }} />
        <Line type="monotone" dataKey="foodWd" name="Food Weekday"            stroke="#f59e0b" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="foodWe" name="Food Weekend"            stroke="#fb923c" strokeWidth={2} dot={false} strokeDasharray="4 3" />
        <Line type="monotone" dataKey="entWd"  name="Entertainment Weekday"   stroke="#6366f1" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="entWe"  name="Entertainment Weekend"   stroke="#a78bfa" strokeWidth={2} dot={false} strokeDasharray="4 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Map chart key → component */
export const CHART_MAP = {
  failure:     FailureRateChart,
  fraud_state: FraudStateChart,
  fraud_age:   FraudAgeChart,
  spending:    SpendingChart,
};
