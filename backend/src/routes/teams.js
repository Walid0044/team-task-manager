
import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all teams for user
router.get('/', async (req, res) => {
  try {
    const teams = await db('teams')
      .select('teams.*', 'team_memberships.role')
      .leftJoin('team_memberships', function() {
        this.on('teams.id', '=', 'team_memberships.team_id')
             .andOn('team_memberships.user_id', '=', req.user.id);
      })
      .where('teams.created_by', req.user.id)
      .orWhere('team_memberships.user_id', req.user.id)
      .distinct();

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new team
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const [team] = await db('teams')
      .insert({
        name,
        description,
        created_by: req.user.id
      })
      .returning('*');

    // Add creator as team owner
    await db('team_memberships').insert({
      user_id: req.user.id,
      team_id: team.id,
      role: 'owner'
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team members
router.get('/:id/members', async (req, res) => {
  try {
    const members = await db('team_memberships')
      .select('users.id', 'users.username', 'users.email', 'team_memberships.role')
      .join('users', 'team_memberships.user_id', 'users.id')
      .where('team_memberships.team_id', req.params.id);

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

