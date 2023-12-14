import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Policy from "./components/Policy/Policy";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ServiceLocations from "./components/ServiceLocations/ServiceLocations";
import EnrolledDevices from "./components/EnrolledDevices/EnrolledDevices";
import HourlyPrices from "./components/HourlyPrices/HourlyPrices";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '80px', boxSizing: 'border-box'}}>
      {/* <img src={logo} alt="logo" /> */}
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/locations" element={<ServiceLocations />} />
            <Route path="/dashboard/devices" element={<EnrolledDevices />} />
            <Route path="/dashboard/prices" element={<HourlyPrices />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;