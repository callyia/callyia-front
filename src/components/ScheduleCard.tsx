//ScheduleCard.tsx
import React, { useState, useEffect, useRef } from "react";
import "../routes/SchedulePage/SchedulePosting.css"; // Schedule.css 파일을 import
import Swal from "sweetalert2"; //alert 디자인 임포트
import { FaPlus } from "react-icons/fa";

interface ScheduleItem {
  id: number;
  day: number;
  place: string;
  content: string;
  tip: string;
  lat: number;
  lng: number;
  images: string[];
  comments: string[];
}

export interface ScheduleCardProps extends ScheduleItem {
  onClick: (lat: number, lng: number, id: number) => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  isInCart: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  onClick,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
  id,
  place,
  content,
  tip,
  lat,
  lng,
  images,
  comments,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 페이지당 보여줄 댓글 수
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const MapClick = () => {
    onClick(lat, lng, id);
  };

  //댓글 클릭 시 alert창으로 전체 내용 보여줌
  const handleCommentClick = (comment: string) => {
    Swal.fire({
      text: `${comment}`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "닫기",
    });
    //alert(`${comment}`);
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
      const visibleComments = comments.slice(startIdx, endIdx);
      const handleCommentClick = (comment: string) => {
        alert(`Comment: ${comment}`);
      };
      const commentHeight = visibleComments.reduce(
        (height, _) => height + 20,
        0
      );
      const updatedCardHeight = 500 + commentHeight; // 적절한 값을 설정하세요

      setCardHeight(updatedCardHeight);
    } else {
      setCardHeight(undefined);
    }
  }, [expanded, currentPage, comments]);

  return (
    <div
      className={`schedule-card ${expanded ? "expanded" : ""}`}
      onClick={MapClick}
      style={{ height: cardHeight }}
    >
      <span className="schedule-number">{place}</span>
      <h3>{content}</h3>

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
          {images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
          <ul>
            {comments
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((comment, index) => (
                <li key={index} onClick={() => handleCommentClick(comment)}>
                  {comment}
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
          <div className="comment">
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
