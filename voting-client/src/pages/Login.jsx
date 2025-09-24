import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setUsername }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      setUsername(name);
      navigate("/vote");
    } else {
      alert("Please enter your name");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">  
          <h2>Log In</h2>
        </div>
        <div className="login-body">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your Name"
          />
          <button onClick={handleLogin}>Log In</button>
          <p className="signup-text">
            Don't have an account? <span>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
