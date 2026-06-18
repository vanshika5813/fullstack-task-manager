import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
  <div className="container">
    <h2>Login</h2>

    <input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button className="add-btn" onClick={handleLogin}>
      Login
    </button>

    <p>
      New User? <a href="/register">Register</a>
    </p>
  </div>
);
}

export default Login;