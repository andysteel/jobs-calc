const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all('SELECT * FROM job')

    db.close()

    return jobs.map((job) => {
      return {
        id: job.id,
        name: job.name,
        'daily-hours': job.daily_hours,
        'total-hours': job.total_hours,
        created_at: job.created_at
      }
    })
  },
  async update(updatedJob) {
    const db = await Database()
    const stmt = await db.prepare(`
    UPDATE job SET
    name = ?,
    daily_hours = ?,
    total_hours = ?,
    created_at = ?
    WHERE
    id = ?
    `)
    await stmt.run(
      updatedJob.name,
      updatedJob['daily-hours'],
      updatedJob['total-hours'],
      updatedJob.created_at,
      updatedJob.id
    )
    await stmt.finalize()
    await db.close()
  },
  async delete(jobId) {
    const db = await Database()
    const stmt = await db.prepare(`
      DELETE FROM job WHERE id = ?
    `)
    await stmt.run(Number(jobId))
    stmt.finalize()
    db.close()
  },
  async create(newJob) {
    const db = await Database()
    const stmt = await db.prepare(`
      INSERT INTO job
      (
        name,
        daily_hours,
        total_hours,
        created_at
      )
      VALUES (?,?,?,?)
    `)
    await stmt.run(
      newJob.name,
      newJob['daily-hours'],
      newJob['total-hours'],
      newJob.created_at
    )
    await stmt.finalize()
    await db.close()
  }
}
