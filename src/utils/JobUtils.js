module.exports = {
  remainingDays(job) {
    const totalDays = (job['total-hours'] / job['daily-hours']).toFixed()

    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(totalDays)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()

    const dayInMS = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs / dayInMS)

    return dayDiff
  },
  calculateAmount: (job, profile) => profile['value-hour'] * job['total-hours']
}
