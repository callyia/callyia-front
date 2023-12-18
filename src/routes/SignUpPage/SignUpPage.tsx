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
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            style={{ backgroundColor: "white", color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            style={{ backgroundColor: "white", color: "black" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            style={{ backgroundColor: "white", color: "black" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>
            <span>Female</span>
          </label>
          <input type="radio" name="gender" id="rd1" value="여성" checked />
          <label>Male</label>
          <input type="radio" name="gender" id="rd2" value="남성" />
        </div>

        <div>
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

        <div>
          <button type="button" onClick={handleSignUp} style={{ color: "red" }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
