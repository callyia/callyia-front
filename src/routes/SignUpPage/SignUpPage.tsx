import React, { useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import "./SignUpPage.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");

  const handleTel2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 정규식을 사용하여 숫자 4자리로 제한
    const value = e.target.value.replace(/\D/g, "");
    setTel2(value);
  };
  const handleTel3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 정규식을 사용하여 숫자 4자리로 제한
    const value = e.target.value.replace(/\D/g, "");
    setTel3(value);
  };

  const isEmailValid = (email: string): boolean => {
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    // 이메일 유효성 검사
    if (!isEmailValid(email)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }
    // 비밀번호 유효성 검사
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password, tel2, tel3);
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
            <div className="SignUp-input-wrap input-id" id="email">
              <input
                type="email"
                value={email}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="SignUp-input-wrap input-password" id="pw">
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
            <div className="SignUp-input-choice" id="choice">
              <span id="ch1">
                Female
                <input
                  type="radio"
                  name="gender"
                  id="rd1"
                  value="여성"
                  checked
                />
              </span>
              <span id="ch2">
                Male
                <input type="radio" name="gender" id="rd2" value="남성" />
              </span>
            </div>
            <div className="SignUp-input-phone">
              <h4>Phone</h4>
              <select id="tel1">
                <option value="">Select</option>
                <option value="010">010</option>
                <option value="011">011</option>
              </select>{" "}
              -{" "}
              <input
                type="text"
                id="tel2"
                onChange={handleTel2Change}
                maxLength={4}
                value={tel2}
              />
              -{" "}
              <input
                type="text"
                id="tel3"
                onChange={handleTel3Change}
                maxLength={4}
                value={tel3}
              />
            </div>
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
