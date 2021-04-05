const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')
const Job = require('../models/Job')

module.exports = {
  index(req, res) {
    const updatedJobs = Job.get().map((job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      return {
        ...job,
        remaining,
        status,
        amount: JobUtils.calculateAmount(job)
      }
    })
    return res.render('index', {
      profile: Profile.get(),
      updatedJobs
    })
  },
  newJob(req, res) {
    return res.render('job')
  },
  save(req, res) {
    const jobs = Job.get()
    const lastId = jobs[jobs.length - 1]?.id || 0
    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now()
    })
    return res.redirect('/')
  },
  show(req, res) {
    const jobId = req.params.id
    const jobs = Job.get()
    const job = jobs.find(({ id }) => Number(id) === Number(jobId))

    if (!job) {
      return res.send('Job not found !')
    }

    job.amount = JobUtils.calculateAmount(job)
    return res.render('job-edit', { job })
  },
  update(req, res) {
    const jobId = req.params.id
    const jobs = Job.get()
    const job = jobs.find(({ id }) => Number(id) === Number(jobId))

    if (!job) {
      return res.send('Job not found !')
    }

    const updatedJobs = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJobs
      }
      return job
    })

    Job.update(newJobs)

    return res.redirect(`/job/${jobId}`)
  },
  delete(req, res) {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect('/')
  }
}