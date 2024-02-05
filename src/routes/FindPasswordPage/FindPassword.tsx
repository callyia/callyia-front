import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPassword.css";
import swal from "sweetalert";

interface MemberData {
  email: string;
  name: string;
  gender: string;
  nickname: string;
  profileImage: string;
  aboutMe: string;
  join_date: Date;
}

const FindPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phoneCheck, setPhoneCheck] = useState("");
  const [memberData, setMemberData] = useState<MemberData[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");

  const [showCertification, setShowCertification] = useState(false);

  const handleCertificationClick = () => {
    // 인증번호 버튼을 클릭하면 해당 부분을 보이게 함
    setShowCertification(true);
    // TODO: 인증번호를 요청하거나 관련 로직을 추가할 수 있음
  };

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

  // 이메일 유효성 검사 정규식
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const modifyPassword = async (newPassword: string) => {
    try {
      // 서버에 수정된 댓글을 전송
      const response = await fetch(
        "http://localhost:8080/Callyia/member/modifyPassword",
        {
          method: "PUT",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: newPassword,
            gender: memberData[2],
            nickname: memberData[4],
            name: memberData[3],
          }),
        }
      );
      console.log(email);
      if (!response.ok) {
        const errorMessage = await response.text(); // 실패한 경우 응답 본문을 가져옴
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error modifying password:", error);
    }
  };

  const handleFind = async (e: React.FormEvent) => {
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

    // 전화번호 생성
    const phone = `${tel1}-${tel2}-${tel3}`;

    //email에 해당하는 전화번호를 가져와서 입력받은 phone과 일치하고 핸드폰인증이 된 경우 비밀번호 변경 모달 띄우기
    const findMember = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Callyia/member/user?email=${email}`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMemberData(data);
        setPhoneCheck(data.phone);
        console.log(memberData);
      } catch (error) {
        console.log("Error fetching tour data:", error);
      }
    };
    await findMember();
    if (phone === phoneCheck) {
      swal({
        text: "변경할 비밀번호를 입력하세요:",
        content: {
          element: "input",
          attributes: {
            placeholder: "변경할 비밀번호를 입력하세요.",
          },
        },
        buttons: {
          confirm: {
            text: "완료",
            closeModal: false,
          },
          cancel: {
            text: "취소",
            value: null,
            visible: true,
            closeModal: true,
          },
        },
      }).then(async (newValue) => {
        if (newValue === null) {
          // 취소 버튼이 눌렸을 때
          swal("비밀번호 변경이 취소되었습니다.", {
            icon: "info",
          });
          return;
        }

        if (newValue.trim() === "") {
          // 수정된 내용이 없는 경우
          swal("비밀번호를 입력하세요.", {
            icon: "warning",
          });
          return;
        }

        modifyPassword(newValue);

        swal(`비밀번호가 변경되었습니다.`).then(() => {
          // 로그인페이지로 네비게이트
          navigate(`/SignInPage`);
        });
      });
    }
  };

  return (
    <div className="page-container">
      <div className="shadow Find-form-container">
        <div className="Find-form-right-side">
          <div className="top-logo-wrap"></div>
          <h1>콜이야 트립</h1>
        </div>
        <div className="Find-form-left-side">
          <div className="auth-Find">
            <h2>비밀번호 찾기</h2>
          </div>
          <div className="Find-input-container">
            <form className="Find-input-wrap input-id" id="email">
              <input
                type="email"
                value={email}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </form>
            <h4 style={{ marginTop: "30px" }}>전화번호</h4>
            <div className="Find-input-phone">
              <select
                id="tel1"
                value={tel1}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #dddddd",
                }}
                onChange={handleTel1Change}
              >
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
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #dddddd",
                }}
              />
              -{" "}
              <input
                type="text"
                id="tel3"
                onChange={handleTel3Change}
                maxLength={4}
                value={tel3}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #dddddd",
                }}
              />
              <button
                className="certification"
                onClick={handleCertificationClick}
              >
                인증번호 받기
              </button>
            </div>
            {showCertification && (
              <div
                className="certification-number"
                style={{ marginTop: "30px" }}
              >
                <h4>인증번호</h4>
                <input
                  type="text"
                  id="인증번호"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "solid 2px #2178ff",
                  }}
                  placeholder="인증번호"
                />
                <button className="certification">인증확인</button>
              </div>
            )}
          </div>
          <div className="Find-btn-wrap">
            <form onSubmit={handleFind}>
              <input type="submit" value="찾기" className="SignUp-btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
