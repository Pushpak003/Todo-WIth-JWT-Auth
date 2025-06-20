require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,

});

pool
  .connect()
  .then((client) => {
    console.log('✅ PostgreSQL pool connected successfully');
    client.release();
  })
  .catch((err) => {
    console.log(`🔐 Type of PG_PASSWORD: ${typeof process.env.PG_PASSWORD}`);

  });

pool.on('error', (err, client) => {
  console.error('⚠️ Unexpected error on idle PostgreSQL client:', err.message);
});

module.exports = pool;