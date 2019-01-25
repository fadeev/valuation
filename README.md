# Tools for Project Analysis and Valuation

Functions for evaluating projects using DCF-based (discounted cash flow) methods. Currently, Datar–Mathews method (DMM) and fuzzy pay-off method (FPOM) are implemented.

This is work in progress and almost everything is subject to change.

Cashflow is modeled as an array of cashflow objects with possibly distinct discount rate values.

```
const cashflow = [
  {
    optimistic: [0, 268, 314],
    default: [0, 104, 122],
    pessimistic: [0, 20, 22],
    discount: 0.15
  },
  {
    default: [-15, 0, -325],
    discount: 0.05
  }
]
```

## Installing

```
npm install
```

## Building

```
npm run build
```

## Testing

```
npm run test
```