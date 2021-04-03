const express = require('express')
const path = require('path')
const routes = express.Router()

const viewsPath = path.join(__dirname, '/views/')

const Profile = {
  data: {
    name: 'Anderson Dias',
    avatar: 'https://avatars.githubusercontent.com/u/1341627?v=4',
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },
  controllers: {
    index(req, res) {
      return res.render(`${viewsPath}profile`, { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body

      const weeksPerYear = 52

      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

      const weekTotalHours = data['hours-per-day'] * data['days-per-week']

      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      data['value-hour'] = data['monthly-budget'] / monthlyTotalHours

      Profile.data = data

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'One Two Project',
      'daily-hours': 3,
      'total-hours': 47,
      created_at: Date.now()
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          amount: Job.services.calculateAmount(job)
        }
      })
      return res.render(`${viewsPath}index`, {
        profile: Profile.data,
        updatedJobs
      })
    },
    newJob(req, res) {
      return res.render(`${viewsPath}job`)
    },
    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0
      Job.data.push({
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
      const job = Job.data.find(({ id }) => Number(id) === Number(jobId))

      if (!job) {
        return res.send('Job not found !')
      }

      job.amount = Job.services.calculateAmount(job)
      return res.render(`${viewsPath}job-edit`, { job })
    },
    update(req, res) {
      const jobId = req.params.id
      const job = Job.data.find(({ id }) => Number(id) === Number(jobId))

      if (!job) {
        return res.send('Job not found !')
      }

      const updatedJobs = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJobs
        }
        return job
      })

      return res.redirect(`/job/${jobId}`)
    },
    delete(req, res) {
      const jobId = req.params.id
      Job.data = Job.data.filter(({ id }) => Number(id) !== Number(jobId))

      return res.redirect('/')
    }
  },
  services: {
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
    calculateAmount: (job) => Profile.data['value-hour'] * job['total-hours']
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.newJob)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes
