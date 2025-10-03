import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CollectorDashboard from "./pages/CollectorDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collector" element={<CollectorDashboard />} />
        <Route path="/expert" element={<ExpertDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
