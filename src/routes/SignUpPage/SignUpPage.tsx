import React, { useState } from "react";

const SignUpPage = () => {
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          style={{ backgroundColor: "gray", color: "white" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          style={{ backgroundColor: "gray", color: "white" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          style={{ backgroundColor: "gray", color: "white" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
