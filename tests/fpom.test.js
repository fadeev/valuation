import fpom from '../src/fpom.js'

const cashflow = [
  {
    optimistic: [-3000, -3000, -1000, -1500, -1500, -3000, -1500, -1500, -1500, -2000, -2000],
    default: [-3500, -4000, -1200, -1550, -1550, -3200, -1600, -1600, -1700, -2200, -2200],
    pessimistic: [-6000, -6500, -3000, -1800, -1800, -4000, -2000, -2000, -2000, -2500, -2500],
    discount: 0.05,
  },
  {
    optimistic: [0, 0, 20000, 30000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
    default: [0, 0, 10000, 18000, 27000, 35000, 35000, 35000, 35000, 35000, 35000],
    pessimistic: [0, 0, 0, 3000, 5000, 5000, 5000, 7500, 7500, 7500, 7500],
    discount: 0.2,
  },
  {
    optimistic: [0, 0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    default: [0, 0, 500, 500, 500, 500, 500, 500, 500, 500, 500],
    pessimistic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    discount: 0.2,
  },
]

// Collan M., Heikkilä M. Enhancing Patent Valuation with the Pay-off Method //Journal of Intellectual Property Rights. – 2011. – Т. 16. – С. 377-384

test('FPOM test-case, [Collan, Heikkilä, 2011]', () => {
  expect(Math.round(fpom(cashflow))).toBe(62444);
});