/**
 * Teams Component
 * Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
 */
import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/api';

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/teams');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError('Failed to load teams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  {team.description && (
                    <p className="card-text">{team.description}</p>
                  )}
                  <div className="mt-3">
                    <h6>Members ({team.members.length})</h6>
                    <ul className="list-unstyled">
                      {team.members.map((member) => (
                        <li key={member._id}>
                          <small>
                            {member.name} ({member.email})
                          </small>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <small className="text-muted">
                    Created: {new Date(team.createdAt).toLocaleDateString()}
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

export default Teams;
