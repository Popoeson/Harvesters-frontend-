import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Future imports can go here
// import TeachingPage from './pages/TeachingPage';
// import CampusesPage from './pages/CampusesPage';
// import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Future pages */}
        {/* <Route path="/teaching/:id" element={<TeachingPage />} /> */}
        {/* <Route path="/campuses" element={<CampusesPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
