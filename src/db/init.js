const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    monthly_budget INTEGER(6) NOT NULL,
    hours_per_day INT(2) NOT NULL,
    days_per_week INT(2) NOT NULL,
    vacation_per_year INT(2) NOT NULL,
    value_hour INT(6) NOT NULL
  )
  `)

    await db.exec(`
  CREATE TABLE IF NOT EXISTS job (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    daily_hours INT(2) NOT NULL,
    total_hours INT(3) NOT NULL,
    created_at DATETIME NOT NULL
  )
  `)

    await db.run(`
INSERT INTO profile (
  name,
  avatar,
  monthly_budget,
  hours_per_day,
  days_per_week,
  vacation_per_year,
  value_hour)
  VALUES
  (
    'Anderson Dias',
    'https://avatars.githubusercontent.com/u/1341627?v=4',
      3000,
      5,
      5,
      4,
      75
  );
  `)

    await db.run(`
INSERT INTO
  job (
    name,
    daily_hours,
    total_hours,
    created_at
  )
VALUES
  (
    'Pizzaria Guloso',
    2,
    1,
    1617848745797
  );

INSERT INTO
  job (
    name,
    daily_hours,
    total_hours,
    created_at
  )
VALUES
  (
    'One Two Project',
    3,
    47,
    1617848745797
  );
`)

    await db.run(`
INSERT INTO
  job (
    name,
    daily_hours,
    total_hours,
    created_at
  )
VALUES
  (
    'One Two Project',
    3,
    47,
    1617848745797
  );
`)

    await db.close()
  }
}

initDb.init()
