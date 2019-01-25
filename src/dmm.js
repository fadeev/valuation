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

// (() => {
//   let cashflow = [
//     {
//       optimistic: [0, 0, 0, 80, 116, 153, 177, 223, 268, 314],
//       default: [0, 0, 0, 52, 62, 74, 77, 89, 104, 122],
//       pessimistic: [0, 0, 0, 20, 23, 24, 18, 20, 20, 22],
//       discount: 0.15
//     },
//     {
//       default: [-15, 0, -325],
//       discount: 0.05
//     }
//   ]
//   let trial_count = 10000;
//   console.log(
//     dmm(trial_count, cashflow)
//   )
// })();

// (() => {
//   let cashflow = [
//     {
//       optimistic: [-3000, -3000, -1000, -1500, -1500, -3000, -1500, -1500, -1500, -2000, -2000],
//       default: [-3500, -4000, -1200, -1550, -1550, -3200, -1600, -1600, -1700, -2200, -2200],
//       pessimistic: [-6000, -6500, -3000, -1800, -1800, -4000, -2000, -2000, -2000, -2500, -2500],
//       discount: 0.05,
//     },
//     {
//       optimistic: [0, 0, 20000, 30000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
//       default: [0, 0, 10000, 18000, 27000, 35000, 35000, 35000, 35000, 35000, 35000],
//       pessimistic: [0, 0, 0, 3000, 5000, 5000, 5000, 7500, 7500, 7500, 7500],
//       discount: 0.2,
//     },
//     {
//       optimistic: [0, 0, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
//       default: [0, 0, 500, 500, 500, 500, 500, 500, 500, 500, 500],
//       pessimistic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       discount: 0.2,
//     },
//   ]


//   console.log(
//     fpom(cashflow)
//   )
// })();
// </script>