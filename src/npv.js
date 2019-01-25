export default (cf, d) => {
  return cf.reduce((acc, val, index) => {
    return acc + val/Math.pow((1+d), index)
  })
}