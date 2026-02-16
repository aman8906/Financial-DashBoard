import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/invest-anytime.png"; 
import "../styles/Login.css";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ username, password });

      if (res.data.success) {

        // Store username (client101) for UI + socket
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.username); // ✅ IMPORTANT FIX

        navigate("/dashboard");

      } else {
        setError("Invalid login. Contact admin for password enquiry.");
      }

    } catch {
      setError("Invalid login. Contact admin for password enquiry.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="logo-box">
          <img src={logo} alt="FundzBazar" className="logo-img" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        {error && <p className="error-msg">{error}</p>}

        <p className="forgot-text">
          Forgot password? <span>Contact admin.</span>
        </p>

      </div>
    </div>
  );
}
