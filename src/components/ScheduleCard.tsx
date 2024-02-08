//ScheduleCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
import { TbBasketPlus, TbBasketCheck } from "react-icons/tb";

import "../routes/SchedulePage/SchedulePosting.css"; // Schedule.css 파일을 import

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
  replyer_img: string[];
  reply_regDate: Date[][];
  reply_modDate: Date[][];
}

export interface ScheduleCardProps extends ScheduleItem {
  onClick: (latitude: number, longitude: number, place_id: number) => void;
  onAddToCart: () => void;
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
  replyer_img,
  dno,
  rno,
  reply_regDate,
  reply_modDate,
}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const [inputData, setInputData] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value); //사용자가 입력한 텍스트를 setReply
  };

  const getSortedReplyIndices = () => {
    const indices = reply_contents.map((_, index) => index);
    indices.sort((a, b) => {
      const dateAObj = reply_modDate[a] || reply_regDate[a] || new Date();
      const dateBObj = reply_modDate[b] || reply_regDate[b] || new Date();
  
      const timestampA = dateAObj instanceof Date ? dateAObj.getTime() : 0;
      const timestampB = dateBObj instanceof Date ? dateBObj.getTime() : 0;
  
      return timestampB - timestampA;
    });
    return indices;
  };

  const handleRegister = async () => {
    try {
      if (inputData.trim() === "") {
        // 입력된 내용이 없는 경우
        swal("댓글 내용을 입력하세요.", {
          icon: "warning",
        });
        return;
      }

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
              if (newValue.trim() === "") {
                // 수정된 내용이 없는 경우
                swal("댓글 내용을 입력하세요.", {
                  icon: "warning",
                });
                return;
              }
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
    // setExpanded(!expanded);
  };

  const sortedReplyIndices = getSortedReplyIndices();

  return (
    <div
      className={`schedule-card ${expanded ? "expanded" : ""}`}
      onClick={() => MapClick()}
      style={{ height: cardHeight }}
    >
      <div className="before-card">
        <div>
          <span className="schedule-number">{place_name}</span>
          <h3>{place_content}</h3>
          <p>TIP : {tip}</p>
        </div>
        <div>
          <div className="card-buttons" style={{ display: "flex" }}>
            {isInCart ? (
              <button
                className="add-to-cart-btn"
                style={{
                  width: "100px",
                  height: "100px",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#BCF5A9",
                }}
              >
                <TbBasketCheck style={{ fontSize: "50px" }} />
              </button>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={onAddToCart}
                style={{
                  width: "100px",
                  height: "100px",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TbBasketPlus style={{ fontSize: "50px" }} />
              </button>
            )}
          </div>
          <button className="moreBtn" onClick={handleToggleExpand}>
            {showDetails ? "접기" : "더보기"}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="details">
          <img src={detail_images} />

          <ul>
            <div className="reply">
              <input
                type="text"
                placeholder="댓글 입력"
                onChange={handleReplyChange}
                value={inputData}
                style={{
                  backgroundColor: "white",
                  marginTop: "9px",
                  width: "88%",
                }}
              />
              <button onClick={handleRegister} style={{ width: "12%" }}>
                입력
              </button>
            </div>
            {sortedReplyIndices.map((reply, index) => (
              <li key={index} onClick={(e) => {
                e.stopPropagation(); 
                handlereplyClick(reply_contents[index], index)
              }}>
                <span
                  style={{
                    fontSize: "1.1em",
                    display: "flex",
                    justifyContent: "space-between", // 좌우 정렬
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      src={replyer_img[index]}
                      alt="프로필 이미지"
                      onClick={(e) => {
                        e.stopPropagation(); // 부모 태그로  이벤트 이벤트 전파 방지
                        // 클릭 시 UserProfilePage로 이동
                        navigate(`/UserProfilePage?userid=${replyer[index]}`);
                      }}
                      style={{
                        cursor: "pointer",
                        marginRight: "5px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    {replyer_nickname[index]}
                  </div>
                  <span
                    className="reply-Date"
                    style={{ float: "right", color: "#848484" }}
                  >
                    {reply_regDate[index]
                      ? reply_regDate[index][0].toString()
                      : "No Date"}
                    .
                    {reply_regDate[index]
                      ? reply_regDate[index][1].toString()
                      : "No Date"}
                    .
                    {reply_regDate[index]
                      ? reply_regDate[index][2].toString()
                      : "No Date"}
                    {"   "}
                    {reply_regDate[index]
                      ? reply_regDate[index][3].toString()
                      : "No Date"}
                    :
                    {reply_regDate[index]
                      ? reply_regDate[index][4].toString()
                      : "No Date"}
                  </span>
                </span>

                {"    "}
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {reply_contents[index]}
                </div>
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
