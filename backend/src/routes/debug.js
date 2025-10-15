
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Debug route to check database state
router.get('/debug', async (req, res) => {
  try {
    const users = await db('users').select('*');
    const teams = await db('teams').select('*');
    const memberships = await db('team_memberships').select('*');
    const tasks = await db('tasks').select('*');

    res.json({
      users,
      teams,
      memberships,
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

