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
  'vacation-per-year': 4
}

routes.get('/', (req, res) => {
  res.render(`${views}index`, { profile })
})

routes.get('/job', (req, res) => {
  res.render(`${views}job`)
})

routes.get('/job/edit', (req, res) => {
  res.render(`${views}job-edit`)
})
routes.get('/profile', (req, res) => {
  res.render(`${views}profile`, { profile })
})

module.exports = routes
