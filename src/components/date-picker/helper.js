export default {
  firstDayOfMonth (date) {
    let [year, month] = getYearMonthDate(date)
    return new Date(year, month, 1)
  },
  lastDayOfMonth (date) {
    let [year, month] = getYearMonthDate(date)
    return new Date(year, month + 1, 0)
  },
  getYearMonthDate,
}
function getYearMonthDate (date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  return [year, month]
}
