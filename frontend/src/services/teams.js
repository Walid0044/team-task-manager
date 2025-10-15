
import api from './api';

export const teamsService = {
  // Get all teams for the current user
  getTeams: async () => {
    const response = await api.get('/teams');
    return response.data;
  },

  // Create a new team
  createTeam: async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data;
  },

  // Get team members
  getTeamMembers: async (teamId) => {
    const response = await api.get(`/teams/${teamId}/members`);
    return response.data;
  },
};

export default teamsService;

