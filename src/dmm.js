import npv from './npv'

const mean = (array) => {
  return array.reduce((acc, val) => acc + val, 0) / array.length
}

const sample = (a, b, c) => {
  let u = Math.random();
  if (u < ((c - a) / (b - a)))
    return a + Math.sqrt(u * (b - a) * (c - a))
  return b - Math.sqrt((1 - u) * (b - a) * (b - c));
}

export default (trial_count, cashflow, discount) => {
  return mean([...Array(trial_count).keys()].map(trial_index => {
    return cashflow.map(cf => {
      if (cf.optimistic && cf.default && cf.pessimistic) {
        return npv(
          [...Array(cf.default.length).keys()].map(index => {
            return sample(cf.pessimistic[index], cf.optimistic[index], cf.default[index])
          }),
          cf.discount || discount
        )
      } else {
        return npv(cf.default, cf.discount || discount)
      }
    }).reduce((sum, val) => sum + val, 0)
  }).filter(val => val > 0))
}