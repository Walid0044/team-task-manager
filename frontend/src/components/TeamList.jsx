
import React, { useState, useEffect } from 'react';
import teamsService from '../services/teams';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const teamsData = await teamsService.getTeams();
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await teamsService.createTeam(newTeam);
      setNewTeam({ name: '', description: '' });
      setShowCreateForm(false);
      loadTeams(); // Reload teams list
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading teams...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Your Teams</h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Create Team
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Create New Team</h4>
          <form onSubmit={handleCreateTeam} className="space-y-3">
            <input
              type="text"
              placeholder="Team Name"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newTeam.description}
              onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="2"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {teams.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No teams yet. Create your first team!</p>
          </div>
        ) : (
          teams.map((team) => (
            <div key={team.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{team.name}</h4>
                  {team.description && (
                    <p className="text-gray-600 text-sm mt-1">{team.description}</p>
                  )}
                  <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                    <span>Role: {team.role || 'member'}</span>
                    <span>Created: {new Date(team.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamList;

