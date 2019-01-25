import dmm from "../src/dmm.js"

const cashflow = [
  {
    optimistic: [0, 0, 0, 80, 116, 153, 177, 223, 268, 314],
    default: [0, 0, 0, 52, 62, 74, 77, 89, 104, 122],
    pessimistic: [0, 0, 0, 20, 23, 24, 18, 20, 20, 22],
    discount: 0.15
  },
  {
    default: [-15, 0, -325],
    discount: 0.05
  }
]

const trial_count = 100000;

// Mathews S., Datar V., Johnson B. A practical method for valuing real options: The Boeing approach //Journal of Applied Corporate Finance. – 2007. – Т. 19. – №. 2. – С. 95-104

test('DMM Boeing test-case, [Mathews, Datar, Johnson, 2007]', () => {
  expect(dmm(trial_count, cashflow)).toBeGreaterThan(21);
  expect(dmm(trial_count, cashflow)).toBeLessThan(24);
});
