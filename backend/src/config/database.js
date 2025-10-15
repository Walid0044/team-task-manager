
import pg from 'pg';
const { Pool } = pg;

// Create a separate pool for sessions
const sessionPool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'team_task_manager',
  user: 'task_user',
  password: 'password123',
  // Session-specific settings
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { sessionPool };

