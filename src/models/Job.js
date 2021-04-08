let data = [
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

module.exports = {
  get() {
    return data
  },
  update(newJObs) {
    data = newJObs
  },
  delete(jobId) {
    data = data.filter(({ id }) => Number(id) !== Number(jobId))
  },
  create(newJob) {
    data.push(newJob)
  }
}
