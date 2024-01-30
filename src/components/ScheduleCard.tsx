//ScheduleCard.tsx
import React, { useState, useEffect } from "react";
import "../routes/SchedulePage/SchedulePosting.css"; // Schedule.css 파일을 import
import swal from "sweetalert";
import { FaPlus } from "react-icons/fa";

interface ScheduleItem {
  place_id: number;
  day: number;
  place_name: string;
  place_content: string;
  tip: string;
  latitude: number;
  longitude: number;
  detail_images: string;
  reply_contents: string[];
  replyer: string[];
  dno: number;
  rno: number[];
  sno: number;
  replyer_nickname: string[];
  reply_regDate: Date[][];
  reply_modDate: Date[][];
}

export interface ScheduleCardProps extends ScheduleItem {
  onClick: (latitude: number, longitude: number, place_id: number) => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  isInCart: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  onClick,
  onAddToCart,
  isInCart,
  place_id,
  place_name,
  place_content,
  tip,
  latitude,
  longitude,
  detail_images,
  reply_contents,
  replyer,
  replyer_nickname,
  dno,
  rno,
  // schedule_regdate,
  // schedule_moddate,
  reply_regDate,
  reply_modDate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const [inputData, setInputData] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value); //사용자가 입력한 텍스트를 setReply
  };

  const handleRegister = async () => {
    try {
      // 댓글을 서버에 저장하는 API 호출
      const response = await fetch(
        "http://localhost:8080/Callyia/Schedule/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replyContents: inputData,
            replyer: email, //임시 유저
            dno: dno,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 댓글 입력 완료 모달 띄움
      swal({
        text: "댓글 입력 완료",
        buttons: {
          confirm: {
            text: "닫기",
            value: true,
            visible: true,
          },
        },
        closeOnClickOutside: false,
      }).then(() => {
        window.location.reload();
      });
      setInputData(""); // 댓글 입력창 비우기
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (index: number, content: string) => {
    try {
      // 서버에 수정된 댓글을 전송
      const response = await fetch(
        "http://localhost:8080/Callyia/Schedule/modify",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rno: rno[index],
            replyContents: content,
            replyer: email,
            dno: dno,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // 실패한 경우 응답 본문을 가져옴
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (rno: number) => {
    try {
      // 댓글 삭제 여부를 묻는 모달 띄우기
      const willDelete = await swal({
        title: "삭제 확인",
        text: "댓글을 삭제하시겠습니까?",
        icon: "warning",
        buttons: ["취소", "삭제"], // 취소 버튼 누르면 false, 삭제 버튼 누르면 true 반환
        dangerMode: true,
      });

      if (willDelete) {
        // 서버에 댓글 삭제를 요청
        const response = await fetch(
          `http://localhost:8080/Callyia/Schedule/delete/${rno}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
          );
        }

        // 삭제 완료 모달 띄우기
        swal("댓글이 삭제되었습니다.", {
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // 댓글 클릭 시 alert창으로 전체 내용 보여줌
  const handlereplyClick = (replyContents: string, index: number) => {
    const isEditable = replyer[index] === email;

    swal({
      text: isEditable
        ? `${replyContents} - 내가 쓴 댓글`
        : `${replyContents} - ${replyer_nickname[index]}`,
      buttons: {
        confirm: {
          text: "수정",
          value: "edit", // 수정 버튼에 "edit" 값을 할당
          visible: isEditable,
        },
        delete: {
          text: "삭제",
          value: "delete", // 삭제 버튼에 "delete" 값을 할당
          visible: isEditable, // 수정 불가능한 경우에만 삭제 버튼 표시
          className: "Modal-delete-button",
        },
        cancel: {
          text: "닫기",
          value: "cancel", // 취소 버튼에 "cancel" 값을 할당
          visible: true,
        },
      },
      closeOnClickOutside: false,
    }).then((value) => {
      switch (value) {
        case "edit":
          if (isEditable) {
            swal({
              text: "댓글을 수정하세요:",
              content: {
                element: "input",
                attributes: {
                  placeholder: "댓글을 입력하세요",
                },
              },
              buttons: {
                confirm: {
                  text: "완료",
                  closeModal: false,
                },
              },
            }).then(async (newValue) => {
              handleEditComment(index, newValue);
              swal(`수정된 댓글: ${newValue}`).then(() => {
                window.location.reload();
              });
            });
          }
          break;
        case "delete":
          if (isEditable) {
            // 삭제 버튼을 눌렀고, 삭제 가능한 경우
            handleDeleteComment(rno[index]);
          }
          break;

        default:
          // 닫기
          break;
      }
    });
  };

  const MapClick = () => {
    onClick(latitude, longitude, place_id);
  };

  const handleToggleExpand = () => {
    setShowDetails(!showDetails);
  };

  // Date 객체를 받아서 "YYYY,MM,DD,HH,MM" 형식으로 포맷팅하는 함수
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 각 값을 두 자리 숫자로 포맷팅
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // 포맷팅된 문자열 반환
    return `${year},${formattedMonth},${formattedDay},${formattedHours},${formattedMinutes}`;
  };

  return (
    <div
      className={`schedule-card ${expanded ? "expanded" : ""}`}
      onClick={() => MapClick()}
      style={{ height: cardHeight }}
    >
      <span className="schedule-number">{place_name}</span>
      <h3>{place_content}</h3>

      <p>
        TIP : {tip}
        <button className="moreBtn" onClick={handleToggleExpand}>
          {expanded ? "접기" : "더보기"}
        </button>
      </p>
      <div className="card-buttons">
        {isInCart ? (
          <div></div>
        ) : (
          <button className="add-to-cart-btn" onClick={onAddToCart}>
            <FaPlus />
            장바구니에 추가
          </button>
        )}
      </div>
      {showDetails && (
        <div className="details">
          <img src={detail_images} />
          <div className="reply">
            <input
              type="text"
              placeholder="댓글 입력"
              onChange={handleReplyChange}
              value={inputData}
              style={{ backgroundColor: "white" }}
            />
            <button onClick={handleRegister}>입력</button>
          </div>
          <ul>
            {reply_contents.map((reply, index) => (
              <li key={index} onClick={() => handlereplyClick(reply, index)}>
                <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                  {replyer_nickname[index]}
                </span>
                {"    "}
                {reply}

                <span className="reply-Date">
                  {"    "}
                  {reply_regDate[index]
                    ? reply_regDate[index].toString()
                    : "No Date"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
export type { ScheduleItem };
