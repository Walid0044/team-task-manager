import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'team_task_manager',
      user: 'task_user',
      password: 'password123'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
