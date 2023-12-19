import React, { useState } from "react";
import "./SignUpPage.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password);
  };

  return (
    <div className="page-container">
      <div className="shadow SignUp-form-container">
        <div className="SignUp-form-right-side">
          <div className="top-logo-wrap"></div>
          <h1>콜이야 트립</h1>
        </div>
        <div className="SignUp-form-left-side">
          <div className="auth-SignUp">
            <h2>Sign Up</h2>
          </div>
          <div className="SignUp-input-container">
            <div className="SignUp-input-wrap input-id">
              <input
                type="email"
                value={email}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="SignUp-input-wrap input-password">
              <input
                type="password"
                value={password}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="SignUp-input-wrap input-password">
                <input
                  type="password"
                  value={confirmPassword}
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
          <div className="SignUp-input-choice">
            <span id="ch1">Female</span>
            <input type="radio" name="gender" id="rd1" value="여성" checked />
            <span id="ch2">Male</span>
            <input type="radio" name="gender" id="rd2" value="남성" />
          </div>
          <div className="SignUp-input-phone">
            <h4>Phone</h4>
            <select id="tel1">
              <option value="">Select</option>
              <option value="010">010</option>
              <option value="011">011</option>
              <input
                type="text"
                value="직접 입력해주세요"
                placeholder="직접 입력해주세요"
              />
            </select>{" "}
            - <input type="text" id="tel2" />
            - <input type="text" id="tel3" />
          </div>
          <div className="SignUp-btn-wrap">
            <button className="login-btn">
              <h1>Sign Up</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
