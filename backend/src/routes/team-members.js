
import express from 'express';
import db from '../db.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

// Add member to team
router.post('/teams/:teamId/members', async (req, res) => {
  try {
    const { teamId } = req.params;
    const { email, role = 'member' } = req.body;

    // Find user by email
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already a member
    const existingMembership = await db('team_memberships')
      .where({ team_id: teamId, user_id: user.id })
      .first();

    if (existingMembership) {
      return res.status(400).json({ message: 'User is already a team member' });
    }

    // Add user to team
    const [membership] = await db('team_memberships')
      .insert({
        team_id: teamId,
        user_id: user.id,
        role
      })
      .returning('*');

    res.status(201).json({
      message: 'User added to team successfully',
      membership
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

