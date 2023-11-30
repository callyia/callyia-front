import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Implement your sign-in logic here
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          style={{backgroundColor: "gray", color: "white"}}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          style={{backgroundColor: "gray", color: "white"}}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
