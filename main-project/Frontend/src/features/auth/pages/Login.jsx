import React from "react";
import Input from "../components/Input";
import { Eye, EyeOff, LockOpen, Mail } from "lucide-react";
import { useState } from "react";
import "../style/login.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Title */}
        <h1 className="login-title">Log in</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label={"Email"}
            type={"email"}
            id={"email"}
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon left">
                <LockOpen size={19} />
              </span>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="form-input"
                placeholder="Enter your email address"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={handlePasswordToggle} className="input-icon right">
                {passwordVisible ? <Eye size={19} /> : <EyeOff size={19} />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
