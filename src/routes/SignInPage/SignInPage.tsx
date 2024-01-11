import React, { useEffect, useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import "./SignInPage.css"; // Import your stylesheet
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginForm = document.querySelector("#loginBtn") as HTMLFormElement;

  const isEmailValid = (email: string): boolean => {
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (email === "") {
      alert("Email을 입력하세요.");
      // email.focus();
      return;
    } else {
      if (!isEmailValid(email)) {
        alert("유효한 Email을 입력하세요.");
        // if (refEmail.current !== null) refEmail.current.focus();
        return;
      }
    }
    // 비밀번호 유효성 검사
    if (password === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }
    if (loginForm) {
      loginForm.submit();
    }
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password);

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/Callyia/login",
        {
          username: email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/homepage");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패하였습니다.");
    }
  };

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
              <input
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input-wrap input-password">
              <i className="fas fa-key"></i>
              <input
                placeholder="Password"
                type="password"
                id="pw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login-btn-wrap">
            <form onSubmit={handleLogin}>
              <input
                type="submit"
                className="login-btn"
                id="loginBtn"
                value="로그인"
              ></input>
            </form>
            <a href="./findPW.tsx">비밀번호를 잊으셨습니까?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
