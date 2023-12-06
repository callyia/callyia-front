import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import "../routes/SchedulePage/Schedule.css"; // Schedule.css 파일을 import

interface ScheduleItem {
  id: number;
  place: string;
  content: string;
  tip: string;
}

// 세부일정카드-----------------------------------------
const ScheduleCard: React.FC<ScheduleItem> = ({ id, place, content, tip }) => {
  //expanded는 상태값을 나타내며, 현재는 false로 초기화
  //setExpanded는 expanded 상태를 변경하기 위한 함수
  const [expanded, setExpanded] = useState(false);
  //확장시 늘어날 세부일정카드높이와 높이상태를 변경하기 위한 함수
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const [showDetails, setShowDetails] = useState(false); //false값으로 초기화

  // 더보기 버튼이 클릭될 때 호출되는 함수
  const handleToggleExpand = () => {
    // setExpanded 함수를 호출하고,
    //현재 expanded 상태의 반대값(!expanded)을 전달하여 상태를 토글
    setExpanded(!expanded); //간략히, 자세히
    setShowDetails(!showDetails); //더보기 버튼 클릭시 !showDetails로 true로 초기화하여 상세보기
  };

  //드래그 이벤트
  const [{ isDragging }, drag] = useDrag({
    type: "SCHEDULE_CARD", // 드래그 항목의 타입을 지정
    item: { id, type: "SCHEDULE_CARD", place, content, tip }, // 드래그 중인 항목의 정보를 지정
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // 현재 드래그 중인지 여부를 수집
    }),
  });

  useEffect(() => {
    if (expanded) {
      setCardHeight(500); //더보기 버튼 클릭시 늘어날 길이
    } else {
      setCardHeight(undefined);
    }
  }, [expanded, id]);

  return (
    <div
      ref={drag} // drag ref를 컴포넌트에 연결하여 드래그가 가능하도록 함
      className={`schedule-card ${expanded ? "expanded" : ""}
        ${isDragging ? "dragging" : ""}`}
      style={{ height: cardHeight }}
    >
      <span className="schedule-number">
        {id}번 일정 : {place}
      </span>
      <h3>{content}</h3>
      <p>
        TIP : {tip}
        <button onClick={handleToggleExpand}>
          {expanded ? "간략히" : "더보기"}
        </button>
      </p>

      {showDetails && (
        <div className="details">
          <img src="image_url" alt="Schedule Image" />
          <ul>
            <li>댓글 1</li>
            <li>댓글 2</li>
            <li>댓글 3</li>
            {/* 댓글 목록을 동적으로 렌더링 */}
          </ul>
          <div className="comment">
            <input type="text" placeholder="댓글 입력" />
            <button>입력</button>
          </div>
          <button className="LikeBtn">좋아요</button>
        </div>
      )}
    </div>
  );
};
//---------------------------------------------------------------------
export default ScheduleCard;
export type { ScheduleItem }; // ScheduleItem 내보내기
