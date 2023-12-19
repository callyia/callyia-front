import React from "react";
import "./SignInPage.css";

const LoginPage: React.FC = () => {
  return (
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
              <a href="/SignUpPage">회원가입</a>
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
            <button className="login-btn">
              <h1>로그인</h1>
            </button>
            <a href="#">비밀번호를 잊으셨습니까?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
