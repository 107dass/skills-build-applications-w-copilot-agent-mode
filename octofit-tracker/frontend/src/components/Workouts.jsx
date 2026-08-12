/**
 * Workouts Component
 * Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
 */
import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api/api';

const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'badge bg-success';
    case 'medium':
      return 'badge bg-warning text-dark';
    case 'hard':
      return 'badge bg-danger';
    default:
      return 'badge bg-secondary';
  }
};

export const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load workouts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  {workout.description && (
                    <p className="card-text">{workout.description}</p>
                  )}
                  <div className="mt-3">
                    <p className="mb-2">
                      <strong>Duration:</strong> {workout.durationMinutes} minutes
                    </p>
                    <p className="mb-2">
                      <strong>Difficulty:</strong>{' '}
                      <span className={getDifficultyBadgeClass(workout.difficulty)}>
                        {workout.difficulty.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <small className="text-muted">
                    Created: {new Date(workout.createdAt).toLocaleDateString()}
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

export default Workouts;
