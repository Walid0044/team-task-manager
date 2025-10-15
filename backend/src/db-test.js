import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig.development);

// Test connection
db.raw('SELECT 1+1 as result')
  .then((result) => {
    console.log('✅ Database connected successfully!');
    console.log('Test query result:', result.rows[0]);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
