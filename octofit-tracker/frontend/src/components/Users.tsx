import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/api';

interface User {
  _id: string;
  name: string;
  email: string;
  team?: {
    _id: string;
    name: string;
  };
  joinedAt: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi<User>('/users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  {user.team && (
                    <p className="text-muted">
                      Team: <strong>{user.team.name}</strong>
                    </p>
                  )}
                  <small className="text-muted">
                    Joined: {new Date(user.joinedAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
