const JobUtils = require('../utils/JobUtils')
const Job = require('../models/Job')
const Profile = require('../models/Profile')

module.exports = {
  newJob(req, res) {
    return res.render('job')
  },
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now()
    })

    return res.redirect('/')
  },
  async show(req, res) {
    const jobId = req.params.id
    const jobs = await Job.get()
    const job = jobs.find(({ id }) => Number(id) === Number(jobId))

    if (!job) {
      return res.send('Job not found !')
    }

    const profile = await Profile.get()
    job.amount = JobUtils.calculateAmount(job, profile)

    return res.render('job-edit', { job })
  },
  async update(req, res) {
    const jobId = req.params.id
    const jobs = await Job.get()
    const job = jobs.find(({ id }) => Number(id) === Number(jobId))

    if (!job) {
      return res.send('Job not found !')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    await Job.update(updatedJob)

    return res.redirect(`/job/${jobId}`)
  },
  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    return res.redirect('/')
  }
}
