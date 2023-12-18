// SignUpPage.tsx
import React from "react";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="shadow login-form-container">
        <div className="login-form-right-side">
          <div className="top-logo-wrap"></div>
          <h1>콜이야 트립</h1>
          <p>계정을 만들어 새로운 여행을 시작하세요!</p>
        </div>
        <div className="login-form-left-side">
          <div className="login-top-wrap">
            <span>이미 계정이 있으신가요?</span>
            <button className="login-btn shadow-light">로그인</button>
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
            <div className="login-input-wrap input-confirm-password">
              <i className="fas fa-key"></i>
              <input placeholder="Confirm Password" type="password" />
            </div>
          </div>
          <div className="login-btn-wrap">
            <button className="login-btn">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
