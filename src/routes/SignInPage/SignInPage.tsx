import React, { useEffect } from "react";
import "./SignInPage.css"; // Import your stylesheet

const LoginPage: React.FC = () => {
  useEffect(() => {
    //validation check : 유효성 검사
    const emailInput = document.querySelector("#email") as HTMLInputElement;
    const pwInput = document.querySelector("#pw") as HTMLInputElement;
    const loginBtn = document.querySelector("#loginBtn") as HTMLInputElement;
    const loginForm = document.querySelector("#loginForm") as HTMLFormElement;

    if (loginBtn) {
      loginBtn.onclick = function (e) {
        e.preventDefault();
        if (emailInput.value === "") {
          alert("Email을 확인하세요");
          emailInput.focus();
          return;
        }
        if (pwInput.value === "") {
          alert("비밀번호를 확인하세요");
          pwInput.focus();
          return;
        }
        if (loginForm) {
          loginForm.submit();
        }
      };
    }
  }, []);
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
              <input placeholder="Email" type="text" id="email" />
            </div>
            <div className="login-input-wrap input-password">
              <i className="fas fa-key"></i>
              <input placeholder="Password" type="password" id="pw" />
            </div>
          </div>
          <div className="login-btn-wrap">
            <button className="login-btn" id="loginBtn">
              <h1>로그인</h1>
            </button>
            <a href="./findPW.tsx">비밀번호를 잊으셨습니까?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
