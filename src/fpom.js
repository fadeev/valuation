import npv from './npv.js'

export default (cashflow) => {
  const typeNpv = (cashflow, types) => {
    return types.reduce((object, type, i) => {
      object[type] = cashflow.map(cf => npv(cf[type], cf.discount)).reduce((sum, val) => sum + val, 0)
      return object
    }, {})
  }
  const fuzzy = typeNpv(cashflow, ['optimistic', 'pessimistic', 'default'])
  const a = fuzzy.default
  const alpha = fuzzy.default - fuzzy.pessimistic
  const beta = fuzzy.optimistic - fuzzy.default
  const total = (fuzzy.optimistic - fuzzy.pessimistic) / 2
  let ea, positive, m, b
  if (fuzzy.pessimistic > 0) {
    ea = a + (beta - alpha) / 6
  } else if (fuzzy.default < 0 && fuzzy.optimistic > 0) {
    ea = Math.pow((alpha + beta), 3) / (6 * Math.pow(beta, 2))
  } else if (fuzzy.default > 0 && fuzzy.pessimistic < 0) {
    ea = a + (beta - alpha) / 6 + Math.pow((alpha - a), 3) / (6 * Math.pow(alpha, 2))
  } else if (fuzzy.optimistic < 0) {
    ea = 0
  }
  if (fuzzy.pessimistic < 0 && fuzzy.default > 0) {
    m = 1 / (fuzzy.default - fuzzy.pessimistic)
    b = -m * fuzzy.pessimistic
    positive = total + b * (fuzzy.pessimistic) / 2
  }
  return ea * positive / total
}