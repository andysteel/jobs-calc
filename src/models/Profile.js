const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()
    const data = await db.get('SELECT * FROM profile')
    await db.close()

    return {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': data.monthly_budget,
      'hours-per-day': data.hours_per_day,
      'days-per-week': data.days_per_week,
      'vacation-per-year': data.vacation_per_year,
      'value-hour': data.value_hour
    }
  },
  async update(newData) {
    const db = await Database()
    const stmt = await db.prepare(`
      UPDATE profile SET
      name = ?,
      avatar = ?,
      monthly_budget = ?,
      hours_per_day = ?,
      days_per_week = ?,
      vacation_per_year = ?,
      value_hour = ?
      WHERE
      id = ?
    `)
    await stmt.run(
      newData.name,
      newData.avatar,
      newData['monthly-budget'],
      newData['hours-per-day'],
      newData['days-per-week'],
      newData['vacation-per-year'],
      newData['value-hour'],
      Number(newData.id)
    )
    await stmt.finalize()

    await db.close()
  }
}
