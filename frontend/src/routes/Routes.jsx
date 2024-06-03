import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from "../pages/Landing.jsx";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Logout } from "../pages/Logout.jsx";
import { EnergyCard } from "../components/EnergyCard.jsx";


export const AppRoutes = () => {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path=":id" element={<EnergyCard />} />
        </Route>
        <Route path="/logout" element={<Logout/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  </>
};
