import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api/api';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <div className="container py-5">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="card shadow-sm p-4">
                    <h1 className="mb-3">🐙 OctoFit Tracker</h1>
                    <p className="lead">Welcome to the modern multi-tier workout tracker.</p>
                    <div className="alert alert-info mt-4">
                      <p>
                        <strong>API Base URL:</strong> <code>{API_BASE_URL}</code>
                      </p>
                      <p className="small mb-0">
                        <strong>Note:</strong> Make sure <code>VITE_CODESPACE_NAME</code> is defined
                        in <code>.env.local</code> for Codespaces deployments.
                      </p>
                    </div>
                  </div>
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-light py-4 mt-auto border-top">
          <div className="container text-center">
            <p className="text-muted mb-0">
              OctoFit Tracker © 2026 | React 19 + Vite + Bootstrap 5
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
