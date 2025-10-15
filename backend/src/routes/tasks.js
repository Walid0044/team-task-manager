
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all tasks for user's teams
router.get('/', async (req, res) => {
  try {
    const tasks = await db('tasks')
      .select(
        'tasks.*', 
        'teams.name as team_name',
        'creator.username as created_by_name',
        'assignee.username as assigned_to_name'
      )
      .join('teams', 'tasks.team_id', 'teams.id')
      .leftJoin('users as creator', 'tasks.created_by', 'creator.id')
      .leftJoin('users as assignee', 'tasks.assigned_to', 'assignee.id')
      .leftJoin('team_memberships', 'teams.id', 'team_memberships.team_id')
      .where('team_memberships.user_id', req.user.id)
      .orWhere('tasks.assigned_to', req.user.id)
      .orWhere('tasks.created_by', req.user.id)
      .distinct();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, team_id, assigned_to, priority, due_date, status } = req.body;
    
    const [task] = await db('tasks')
      .insert({
        title,
        description,
        team_id,
        assigned_to,
        priority: priority || 'medium',
        status: status || 'pending',
        due_date,
        created_by: req.user.id
      })
      .returning('*');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority, assigned_to, due_date } = req.body;
    
    const [task] = await db('tasks')
      .where({ id: req.params.id })
      .update({
        title,
        description,
        status,
        priority,
        assigned_to,
        due_date,
        updated_at: new Date()
      })
      .returning('*');

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await db('tasks').where({ id: req.params.id }).delete();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

