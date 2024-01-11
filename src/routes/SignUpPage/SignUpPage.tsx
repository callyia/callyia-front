import React, { useState, useCallback } from "react";
import { FormEvent, ChangeEvent } from "react";
import "./SignUpPage.css";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");

  const handleTel1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTel1(e.target.value);
  };

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

  const isNameValid = (name: string): boolean => {
    // 정규식을 사용하여 영어 또는 한국어 문자로만 이루어진지 확인
    const nameRegex = /^[a-zA-Z가-힣]+$/;

    // 자음 또는 모음만 있는 경우를 확인
    const consonantVowelRegex =
      /^[^aeiouAEIOUㄱ-ㅎㅏ-ㅣ]*[aeiouAEIOUㄱ-ㅎㅏ-ㅣ]+[^aeiouAEIOUㄱ-ㅎㅏ-ㅣ]*$/;

    // 특수 기호가 포함되어 있는지 확인
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      nameRegex.test(name) &&
      !consonantVowelRegex.test(name) &&
      !specialCharacterRegex.test(name)
    );
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // 이메일 유효성 검사
    if (email === "") {
      alert("Email을 입력하세요.");
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
    } else {
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        return;
      }
    }
    // 이름 유효성 검사
    if (name === "") {
      alert("이름을 입력해주세요.");
      // if (name.current !== null) name.current.focus();
      return;
    } else {
      if (!isNameValid(name)) {
        alert("올바른 이름을 입력해주세요.");
        return;
      }
    }
    if (tel1 !== "010" && tel1 !== "011") {
      alert("전화번호 앞자리를 선택해주세요");
      return;
    }
    if (tel2 === "" || tel3 === "") {
      alert("전화번호를 입력해주세요");
      return;
    }
    // Implement your sign-up logic here
    console.log("Signing up with:", email, password, tel2, tel3);

    // 리액트 코드 예시
    const memberData = {
      id: "userId123",
      password: "userPassword123",
      gender: "male",
      name: "John Doe",
      nickname: "johnny",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      profileImage: "profile.jpg",
      aboutMe: "Hello, I am John Doe.",
      joinDate: "2022-01-01", // 예시로 지정한 필드, 실제 데이터에 맞게 수정
      roleSet: ["ROLE_USER"],
    };

    // API 호출을 통해 서버로 데이터 전송
    axios
      .post("http://localhost:8080/Callyia/member", memberData)
      .then((response: any) => {
        // 성공적으로 처리된 경우
        console.log(response.data);
      })
      .catch((error: any) => {
        // 오류 발생 시 처리
        console.error(error);
      });
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
            <h2>Membership</h2>
          </div>
          <div className="SignUp-input-container">
            <form className="SignUp-input-wrap input-id" id="email">
              <input
                type="email"
                value={email}
                style={{ backgroundColor: "white", color: "black" }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </form>
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

              <div className="SignUp-input-wrap input-name">
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: "white", color: "black" }}
                  placeholder="Name"
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
              <select id="tel1" value={tel1} onChange={handleTel1Change}>
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
            <form onSubmit={handleSignUp}>
              <input type="submit" value="Sign Up" className="SignUp-btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
