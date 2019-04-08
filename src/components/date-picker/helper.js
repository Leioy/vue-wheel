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
  addMonth (date, n) {
    const month = getYearMonthDate(date)[1]
    const newMonth = month + n
    const copy = new Date(date)
    copy.setMonth(newMonth)
    return copy
  },
  addYear (date, n) {
    const [year] = getYearMonthDate(date)
    const newYear = year + n
    const copy = new Date(date)
    copy.setFullYear(newYear)
    return copy
  },
}
function getYearMonthDate (date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return [year, month, day]
}
