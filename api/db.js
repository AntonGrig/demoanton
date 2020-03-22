const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'docker',
  port: 5432,
});
module.exports = pool;