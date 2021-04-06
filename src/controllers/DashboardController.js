const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')
const Job = require('../models/Job')

module.exports = {
  index(req, res) {
    const statusCount = {
      progress: 0,
      done: 0,
      total: 0
    }

    let jobTotalHoursInProgress = 0

    const updatedJobs = Job.get().map((job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      statusCount[status] += 1

      if (status === 'progress') {
        jobTotalHoursInProgress += Number(job['daily-hours'])
      }

      return {
        ...job,
        remaining,
        status,
        amount: JobUtils.calculateAmount(job)
      }
    })

    statusCount.total = updatedJobs.length

    const freeHours = Profile.get()['hours-per-day'] - jobTotalHoursInProgress

    return res.render('index', {
      profile: Profile.get(),
      updatedJobs,
      statusCount,
      freeHours
    })
  }
}
