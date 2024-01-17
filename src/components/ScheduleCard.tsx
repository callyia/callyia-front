//ScheduleCard.tsx
import React, { useState, useEffect } from "react";
import "../routes/SchedulePage/SchedulePosting.css"; // Schedule.css 파일을 import
import Swal from "sweetalert2"; //alert 디자인 임포트
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
  dno,
  rno,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 페이지당 보여줄 댓글 수
  const totalPages = 3;
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const [inputData, setInputData] = useState("");

  const [comments, setComments] = useState<string[]>([]);
  const user = "sh@naver.com";
  const [editableCommentIndex, setEditableCommentIndex] = useState<
    number | null
  >(null);
  const [editableComment, setEditableComment] = useState<string>("");

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replyContents: inputData,
            replyer: user, //임시 유저
            dno: dno,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // 댓글이 성공적으로 저장되면 응답에서 얻은 데이터를 확인
      const data = await response.json();
      console.log("Response data:", data);

      // const newComment = data.reply_contents;
      // setComments([...comments, newComment]);

      //댓글 입력 완료 모달 띄움
      Swal.fire({
        text: "댓글 입력 완료",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "닫기",
      });

      setInputData(""); // 댓글 입력창 비우기
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (index: number) => {
    try {
      // 서버에 수정된 댓글을 전송
      const response = await fetch(
        "http://localhost:8080/Callyia/Schedule/modify",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rno: rno[index],
            replyContents: editableComment,
            replyer: user,
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

      console.log(editableComment);
      // 수정이 성공하면 댓글을 업데이트
      const updatedComments = [...comments];
      updatedComments[index] = editableComment;
      setComments(updatedComments);

      // 수정 완료 후 상태 초기화
      setEditableComment("");
      setEditableCommentIndex(null);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (rno: number) => {
    try {
      // 서버에 댓글 삭제를 요청
      const response = await fetch(
        `http://localhost:8080/Callyia/Schedule/delete/${rno}`,
        {
          method: "DELETE",
          headers: {
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

      // 댓글 삭제 후 UI 업데이트
      const updatedComments = comments.filter(
        (comment, index) => index !== rno
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  //댓글 클릭 시 alert창으로 전체 내용 보여줌
  const handlereplyClick = (replyContents: string, index: number) => {
    const isEditable = replyer[index] === user;

    Swal.fire({
      text: isEditable ? `${replyContents} - 내가 쓴 댓글` : `${replyContents}`,
      showConfirmButton: isEditable, // 수정 가능한 경우에만 확인 버튼 표시
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "수정", // 수정 가능한 경우에만 수정 버튼 표시
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed && isEditable) {
        // 수정 버튼을 눌렀고 수정 가능한 경우
        setEditableComment(replyContents);
        setEditableCommentIndex(index);
      } else if (!isEditable && result.isConfirmed) {
        // 삭제 버튼을 눌렀고, 삭제 가능한 경우
        handleDeleteComment(rno[index]);
      }
    });
  };

  const MapClick = () => {
    onClick(latitude, longitude, place_id);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setShowDetails(!showDetails);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (expanded) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const visiblereplys = reply_contents.slice(startIdx, endIdx);
      const replyHeight = visiblereplys.reduce((height, _) => height + 20, 0);
      const updatedCardHeight = 500 + replyHeight; // 적절한 값을 설정하세요

      setCardHeight(updatedCardHeight);
    } else {
      setCardHeight(undefined);
    }
  }, [expanded, currentPage, reply_contents]);

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
          {expanded ? "간략히" : "더보기"}
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
          <p>{detail_images}</p>
          <ul>
            {reply_contents
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((reply_contents, index) => (
                <li
                  key={index}
                  onClick={() => handlereplyClick(reply_contents, index)}
                >
                  {editableCommentIndex === index ? (
                    // 수정 중인 댓글의 경우
                    <>
                      <input
                        type="text"
                        value={editableComment}
                        onChange={(e) => setEditableComment(e.target.value)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 상위 엘리먼트의 onClick 이벤트 전파 방지
                          handleEditComment(index);
                        }}
                      >
                        완료
                      </button>
                    </>
                  ) : (
                    // 수정 중이 아닌 댓글의 경우
                    <>
                      {reply_contents} - {replyer[index]}
                      {replyer[index] === user && ( // 현재 사용자가 댓글 작성자인 경우에만 삭제 버튼 표시
                        <button
                          onClick={(e) => {
                            handleDeleteComment(rno[index]);
                            e.stopPropagation();
                          }}
                        >
                          삭제
                        </button>
                      )}
                    </>
                  )}
                </li>
              ))}
          </ul>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </button>
          <div className="reply">
            <input
              type="text"
              placeholder="댓글 입력"
              onChange={handleReplyChange}
              value={inputData}
            />
            <button onClick={handleRegister}>입력</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
export type { ScheduleItem };
