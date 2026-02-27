# PayInsight AI — Conversational UPI Analytics

A conversational analytics platform for leadership decision-making, built on 250,000 real UPI transactions from India (2024).

## Project Structure

```
payinsight/
├── index.html                        # App entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                      # React root mount
    ├── styles/
    │   ├── index.css                 # Global reset + animations
    │   └── theme.css                 # CSS design tokens / variables
    └── app/
        ├── App.jsx                   # Root component — layout wiring
        ├── App.module.css
        ├── data/
        │   └── transactionData.js    # Pre-computed analytics from 250K CSV
        ├── utils/
        │   ├── intentEngine.js       # NLP intent detection + response templates
        │   └── formatters.js         # Number / currency formatters
        ├── components/
        │   ├── Sidebar/              # Left nav panel
        │   ├── Chat/                 # Conversational AI interface
        │   ├── Dashboard/            # Chart components (recharts)
        │   ├── RightPanel/           # Quick insights + shortcuts
        │   └── Topbar.jsx            # Top header bar
        └── views/
            ├── FailureView.jsx       # Device & Network dashboard page
            ├── FraudView.jsx         # Fraud Analysis dashboard page
            └── SpendView.jsx         # Spend Trends dashboard page
```

## Getting Started

```bash
npm install
npm run dev
```

## Key Analytical Questions Answered

1. **Device × Network Failure Rates** — How do Android, iOS, and Web perform across 3G/4G/5G/WiFi during peak evening hours?
2. **Fraud by Geography & Age** — Which states and age groups face the highest fraud risk?
3. **Food & Entertainment Spend Patterns** — When do these categories peak on weekdays vs weekends?

## Data Source

`upi_transactions_2024.csv` — 250,000 UPI transactions with fields:
- transaction_id, timestamp, transaction_status, amount (INR)
- device_type, network_type, fraud_flag
- sender_state, sender_age_group, merchant_category
- hour_of_day, day_of_week, is_weekend
