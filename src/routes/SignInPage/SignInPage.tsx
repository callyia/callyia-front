import React, { useState } from "react";
import { FormEvent } from "react";
import "./SignInPage.css"; // Import your stylesheet
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email: string): boolean => {
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // 이메일 유효성 검사
    if (email === "") {
      toast.error("Email을 입력하세요.");
      // email.focus();
      return;
    } else {
      if (!isEmailValid(email)) {
        toast.error("유효한 Email을 입력하세요.");
        // if (refEmail.current !== null) refEmail.current.focus();
        return;
      }
    }
    // 비밀번호 유효성 검사
    if (password === "") {
      toast.error("비밀번호를 입력하세요.");
      return;
    }
    // if (loginForm) {
    //   loginForm.submit();
    // }
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password);

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/Callyia/auth/login",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem(
        "authorities",
        JSON.stringify(response.data.authorities)
      );
      navigate("/");
      console.log("실행되었습니다.");
      console.log(response.data);
    } catch (error) {
      console.error("로그인 실패", error);
      toast.error("로그인에 실패하였습니다.");
    }
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(e);
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
                style={{ backgroundColor: "white", color: "black" }}
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
                style={{ backgroundColor: "white", color: "black" }}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
              />
            </div>
          </div>
          <div className="login-btn-wrap">
            <form id="loginForm">
              <button
                type="submit"
                className="login-btn"
                id="loginBtn"
                value="로그인"
                onClick={handleLogin}
              >
                로그인
              </button>
            </form>
            <a href="http://localhost:3000/FindPasswordPage">
              비밀번호를 잊으셨습니까?
            </a>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
