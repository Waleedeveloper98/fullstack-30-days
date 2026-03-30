import React from "react";
import "../style/signup.scss";
import { Eye, EyeOff, LockOpen, Mail, User } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");
    const success = await handleRegister({ username, email, password });

    if (success) {
      navigate("/login");
    }
  };

  const passwordStrongChecker = (password) => {
    let obj = {};
    if (password.length > 10)
      return (obj = {
        class: "strength-fill strong",
        text: "Now your password is strong",
      });
    else if (password.length > 6 && password.length <= 10)
      return (obj = {
        class: "strength-fill medium",
        text: "Now your password has medium strength!",
      });
    else if (password.length < 6)
      return (obj = {
        class: "strength-fill weak",
        text: "Weak! Please add more strength!",
      });
    else
      return (obj = {
        class: "strength-fill weak",
        text: "Weak! Please add more strength!",
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* Title */}
        <h1 className="signup-title">Sign up</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          <Input
            label={"Username"}
            type={"text"}
            id={"username"}
            icon={User}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            {/* Strength bar */}
            <div className="strength-bar">
              <div
                className={`strength-fill ${passwordStrongChecker(password).class}`}
              ></div>
            </div>
            <p className="strength-text">
              {passwordStrongChecker(password).text}
            </p>
          </div>

          {/* Submit */}
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
