import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Employees from './components/Employees';
// import Departments from './components/Departments';
// import Roles from './components/Roles';
// import PerformanceReviews from './components/PerformanceReviews';
import Register from './Register';
import Login from './login';
import Dashboard from './Dashboard';
import Employees from './Employees';
import Departments from './Departments';
import Roles from './Roles';
import PerformanceReviews from './PerformanceReviews';
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/employees" element={<Employees/>} />
      <Route path="/departments" element={<Departments/>} />
      <Route path="/roles" element={Roles} />
      <Route path="/performance-reviews" element={<PerformanceReviews/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

