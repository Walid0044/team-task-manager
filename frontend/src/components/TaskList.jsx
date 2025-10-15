
import React, { useState, useEffect } from 'react';
import tasksService from '../services/tasks';
import teamsService from '../services/teams';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    team_id: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, teamsData] = await Promise.all([
        tasksService.getTasks(),
        teamsService.getTeams()
      ]);
      setTasks(tasksData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await tasksService.createTask(newTask);
      setNewTask({
        title: '',
        description: '',
        team_id: '',
        priority: 'medium',
        status: 'pending'
      });
      setShowCreateForm(false);
      loadData(); // Reload tasks list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await tasksService.updateTask(taskId, { status: newStatus });
      loadData(); // Reload tasks to reflect changes
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading tasks...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Create Task
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Create New Task</h4>
          <form onSubmit={handleCreateTask} className="space-y-3">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newTask.team_id}
                onChange={(e) => setNewTask({ ...newTask, team_id: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Create Task
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
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              
              {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span>Team: {task.team_name}</span>
                  {task.due_date && (
                    <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex space-x-1">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

