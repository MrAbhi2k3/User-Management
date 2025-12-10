import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-6">Welcome, {user.name}!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="text-white font-medium capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="text-white font-medium font-mono text-xs">{user.id}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Session Information</h3>
              <div className="space-y-3">
                <div className="bg-yellow-600 text-white px-4 py-3 rounded">
                  <p className="font-medium">Session expires in 5 minutes</p>
                  <p className="text-sm mt-1">Please save your work regularly</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-3 rounded">
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm mt-1">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded font-medium">
                Update Profile
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded font-medium"
              onClick={() => navigate('/updatepass')}
              >
                Change Password
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded font-medium">
                View Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
