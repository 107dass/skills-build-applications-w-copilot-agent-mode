/**
 * Leaderboard Component
 * Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
 */
import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/api';

export const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/leaderboard');
        // Sort by rank to ensure correct display
        const sorted = data.sort((a, b) => a.rank - b.rank);
        setEntries(sorted);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td>{entry.user.name}</td>
                  <td>{entry.user.email}</td>
                  <td>
                    <span className="badge bg-primary">{entry.score}</span>
                  </td>
                  <td>{new Date(entry.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
