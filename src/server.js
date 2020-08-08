const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})