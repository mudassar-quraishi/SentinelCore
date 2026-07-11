import EditIOC from "../pages/EditIOC";
import IOCList from "../pages/IOCList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import AddThreat from "../pages/AddThreat";
import ThreatList from "../pages/ThreatList";
import EditThreat from "../pages/EditThreat";

import AddIOC from "../pages/AddIOC";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Threat Module */}
        <Route path="/add-threat" element={<AddThreat />} />
        <Route path="/threat-list" element={<ThreatList />} />
        <Route path="/edit-threat/:id" element={<EditThreat />} />

        {/* IOC Module */}
        <Route path="/add-ioc" element={<AddIOC />} />

        <Route path="/ioc-list" element={<IOCList />} />
        <Route path="/edit-ioc/:id" element={<EditIOC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;