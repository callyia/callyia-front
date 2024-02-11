import React, { useState } from "react";
import "./MyInformationPage.css";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";

type UserInfo = {
  email: string;
  nickname: string;
  name: string;
  phone: string;
};

const MyInformation = () => {
  // 개인 정보 상태
  const [email, setEmail] = useState("user@example.com");
  const [name, setName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickName, setNickName] = useState("Runa");
  const [readOnly, setReadOnly] = useState(true);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const navigate = useNavigate();
  const openWithdrawalModal = () => setIsWithdrawalModalOpen(true);
  const closeWithdrawalModal = () => setIsWithdrawalModalOpen(false);

  // 유효성 검사
  const isValidNickname = (nickname: string) =>
    /^[a-zA-Z가-힣]+$/.test(nickname);
  const isValidName = (name: string) => /^[가-힣]+$/.test(name);
  const isValidPhoneNumber = (phoneNumber: string) => {
    // 하이픈(-)을 제거한 문자열의 길이가 11이어야 함
    const strippedPhoneNumber = phoneNumber.replace(/-/g, "");
    if (strippedPhoneNumber.length !== 11) {
      return false;
    }

    // 맨 앞 3글자는 010 또는 011
    const prefix = strippedPhoneNumber.substring(0, 3);
    if (prefix !== "010" && prefix !== "011") {
      return false;
    }

    // 숫자와 하이픈만 입력 가능하고 하이픈은 4번째 자리와 9번째 자리에만 입력 가능
    if (!/^[0-9-]+$/.test(phoneNumber)) {
      return false;
    }

    if (phoneNumber[3] !== "-" || phoneNumber[8] !== "-") {
      return false;
    }

    return true;
  };

  // 상태 업데이트 함수
  const handleNameChange = (newName: any) => {
    setName(newName);
  };
  const handlePhoneNumberChange = (newPhoneNumber: any) => {
    setPhoneNumber(newPhoneNumber);
  };
  const handleNickNameChange = (newNickName: any) => {
    setNickName(newNickName);
  };

  const handleChangeClick = () => {
    console.log("NickName Change Clicked");
    setReadOnly(!readOnly);
  };

  // 회원 탈퇴 이벤트 핸들러
  const handleWithdrawalClick = () => {
    // 여기에 회원 탈퇴 로직 추가
    // 예: API 호출, 로컬 스토리지 클리어 등
    console.log("Withdrawal Clicked");
    openWithdrawalModal();
  };

  const handleWithdrawalConfirmed = async () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:8080/Callyia/member/deleteMember?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.error("Error fetching user withdrawal: ", error);
      });
    closeWithdrawalModal();
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("authorities");

    navigate("/");
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    if (!isValidName(name)) {
      toast.error("잘못된 이름 형식입니다.");
    } else if (!isValidNickname(nickName)) {
      toast.error("잘못된 닉네임 형식입니다.");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("잘못된 폰번호 형식입니다.");
    } else {
      axios
        .put(
          `http://localhost:8080/Callyia/member/modify?email=${email}`,
          {
            email: email,
            nickname: nickName,
            name: name,
            phone: phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success("저장");
          console.log("Save Clicked");
        })
        .catch((error) => {
          console.error("Error fetching modify:", error);
          if (error.response && error.response.status === 409) {
            const { data } = error.response;

            if (data.phone) {
              toast.error(`이미 사용 중인 전화번호입니다.`);
            }
            if (data.nickname) {
              toast.error(`이미 사용 중인 닉네임입니다.`);
            }
          } else {
            toast.error("저장을 실패했습니다.");
          }
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      return;
    }

    axios
      .get(`http://localhost:8080/Callyia/member/getUser?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setUserInfo(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error("유저 정보를 가져오지 못했습니다.", email);
      });
  }, []);

  useEffect(() => {
    // userInfo가 변경될 때마다 실행되는 로직
    console.log(userInfo);

    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setNickName(userInfo.nickname); // 속성 이름 수정
      setPhoneNumber(userInfo.phone); // 속성 이름 수정
    }
  }, [userInfo]);

  return (
    <section className="centered-section">
      <div className="info-container">
        <div className="title">내 정보</div>
        <div>
          <label className="mylabel">이메일</label>
          <input
            type="text"
            value={email}
            readOnly={readOnly}
            className="myinput"
          />
        </div>
        <div>
          <label className="mylabel">닉네임</label>
          <input
            type="text"
            value={nickName}
            onChange={(e) => handleNickNameChange(e.target.value)}
            readOnly={readOnly}
            className={`${!readOnly ? "editable" : "myinput"}`}
          />
        </div>
        <div>
          <label className="mylabel">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            readOnly={readOnly}
            className={`${!readOnly ? "editable" : "myinput"}`}
          />
        </div>
        <div>
          <label className="mylabel">전화번호</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            readOnly={readOnly}
            className={`${!readOnly ? "editable" : "myinput"}`}
          />
        </div>
        <div className="flex translate-y-10">
          <button className="btna" onClick={handleWithdrawalClick}>
            회원 탈퇴
          </button>
          <button className="btna" onClick={handleSaveClick}>
            변경 저장
          </button>
          <button
            className={`btna ${readOnly ? "" : "editModeButtonBackground"}`}
            onClick={handleChangeClick}
          >
            수정 모드
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={isWithdrawalModalOpen}>
        <ModalContent className="modal-content">
          <p>정말로 회원 탈퇴하시겠습니까?</p>
          <button className="accessBtn" onClick={handleWithdrawalConfirmed}>
            확인
          </button>
          <button className="cancelBtn" onClick={closeWithdrawalModal}>
            취소
          </button>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default MyInformation;
