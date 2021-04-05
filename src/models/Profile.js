let data = {
  name: 'Anderson Dias',
  avatar: 'https://avatars.githubusercontent.com/u/1341627?v=4',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'value-hour': 75
}

module.exports = {
  get() {
    return data
  },
  update(newData) {
    data = newData
  }
}
