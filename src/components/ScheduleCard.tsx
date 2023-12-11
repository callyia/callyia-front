import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import "../routes/SchedulePage/Schedule.css"; // Schedule.css 파일을 import

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

const ScheduleCard: React.FC<ScheduleItem> = ({
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
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setShowDetails(!showDetails);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [{ isDragging }, drag] = useDrag({
    type: "SCHEDULE_CARD",
    item: { id, type: "SCHEDULE_CARD", place, content, tip, lat, lng },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (expanded) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const visibleComments = comments.slice(startIdx, endIdx);

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
      ref={(node) => {
        drag(node);
        cardRef.current = node;
      }}
      className={`schedule-card ${expanded ? "expanded" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      style={{ height: cardHeight }}
    >
      <span className="schedule-number">{place}</span>
      <h3>{content}</h3>
      <p>
        TIP : {tip}
        <button onClick={handleToggleExpand}>
          {expanded ? "간략히" : "더보기"}
        </button>
      </p>

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
                <li key={index}>{comment}</li>
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
