//ScheduleCard.tsx
import React, { useState, useEffect } from "react";
import "../routes/SchedulePage/SchedulePosting.css"; // Schedule.css 파일을 import
import Swal from "sweetalert2"; //alert 디자인 임포트
import { FaPlus } from "react-icons/fa";

interface ScheduleItem {
  place_id: number[];
  day: number[];
  place_name: string[];
  place_content: string[];
  tip: string[];
  latitude: number[];
  longitude: number[];
  detailimages: string[];
  replys: string[];
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
  // onRemoveFromCart,
  isInCart,
  place_id,
  place_name,
  place_content,
  tip,
  latitude,
  longitude,
  detailimages,
  replys,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 페이지당 보여줄 댓글 수
  const totalPages = Math.ceil(replys.length / itemsPerPage);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const MapClick = (index: number) => {
    onClick(latitude[index], longitude[index], place_id[index]);
  };

  //댓글 클릭 시 alert창으로 전체 내용 보여줌
  const handlereplyClick = (reply: string) => {
    Swal.fire({
      text: `${reply}`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "닫기",
    });
    //alert(`${reply}`);
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
      const visiblereplys = replys.slice(startIdx, endIdx);
      const handlereplyClick = (reply: string) => {
        alert(`reply: ${reply}`);
      };
      const replyHeight = visiblereplys.reduce((height, _) => height + 20, 0);
      const updatedCardHeight = 500 + replyHeight; // 적절한 값을 설정하세요

      setCardHeight(updatedCardHeight);
    } else {
      setCardHeight(undefined);
    }
  }, [expanded, currentPage, replys]);

  return (
    <div
      className={`schedule-card ${expanded ? "expanded" : ""}`}
      onClick={() => MapClick(1)}
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
          {detailimages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
          <ul>
            {replys
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((reply, index) => (
                <li key={index} onClick={() => handlereplyClick(reply)}>
                  {reply}
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
            <input type="text" placeholder="댓글 입력" />
            <button>입력</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
export type { ScheduleItem };
