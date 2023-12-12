<<<<<<< HEAD
import React from "react";
import "./SignInPage.css";
=======
import React, { useState } from "react";
import "./SignInPage.css"; // 스타일 파일을 만들어주세요

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Implement your sign-in logic here
  };
>>>>>>> 0286f4445d315a136013972a492b2bd65ce37702

const LoginPage: React.FC = () => {
  return (
<<<<<<< HEAD
    <div className="page-container">
      <div className="shadow login-form-container">
        <div className="login-form-right-side">
          <div className="top-logo-wrap"></div>
          <h1>콜이야 트립</h1>
        </div>
        <div className="login-form-left-side">
          <div className="login-top-wrap">
            <span>계정이 없으신가요?</span>
            <button className="create-account-btn shadow-light">
              회원가입
            </button>
          </div>
          <div className="login-input-container">
            <div className="login-input-wrap input-id">
              <i className="far fa-envelope"></i>
              <input placeholder="Email" type="text" />
            </div>
            <div className="login-input-wrap input-password">
              <i className="fas fa-key"></i>
              <input placeholder="Password" type="password" />
            </div>
          </div>
          <div className="login-btn-wrap">
            <button className="login-btn">로그인</button>
            <a href="#">비밀번호를 잊으셨습니까?</a>
          </div>
        </div>
      </div>
=======
    <div className="auth-container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
>>>>>>> 0286f4445d315a136013972a492b2bd65ce37702
    </div>
  );
};

export default LoginPage;
