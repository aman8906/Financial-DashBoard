import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Portfolio from "./pages/Portfolio";
import Orders from "./pages/OrderHistory";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("userId");
  return isAuth ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/portfolio"
          element={
            <PrivateRoute>
              <Portfolio />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
