import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CollectorDashboard from "./pages/CollectorDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditCoin from "./pages/EditCoin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/collector"
          element={
            <ProtectedRoute allowedRoles={["collector"]}>
              <CollectorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collector/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["collector"]}>
              <EditCoin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expert"
          element={
            <ProtectedRoute allowedRoles={["expert"]}>
              <ExpertDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
