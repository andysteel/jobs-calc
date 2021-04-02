const express = require('express')
const path = require('path')
const routes = express.Router()

const views = path.join(__dirname, '/views/')

const profile = {
  name: 'Anderson Dias',
  avatar: 'https://avatars.githubusercontent.com/u/1341627?v=4',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 5,
  'vacation-per-year': 4,
  'value-hour': 75
}

const jobs = [
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
]

function remainingDays(job) {
  const totalDays = (job['total-hours'] / job['daily-hours']).toFixed()

  const createdDate = new Date(job.created_at)
  const dueDay = createdDate.getDate() + Number(totalDays)
  const dueDateInMs = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDateInMs - Date.now()

  const dayInMS = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMs / dayInMS)

  return dayDiff
}

routes.get('/', (req, res) => {
  const updatedJobs = jobs.map((job) => {
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'

    return {
      ...job,
      remaining,
      status,
      amount: profile['value-hour'] * job['total-hours']
    }
  })
  res.render(`${views}index`, { profile, updatedJobs })
})

routes.get('/job', (req, res) => {
  res.render(`${views}job`)
})

routes.post('/job', (req, res) => {
  const lastId = jobs[jobs.length - 1]?.id || 0
  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now()
  })
  res.redirect('/')
})

routes.get('/job/edit', (req, res) => {
  res.render(`${views}job-edit`)
})
routes.get('/profile', (req, res) => {
  res.render(`${views}profile`, { profile })
})

module.exports = routes
