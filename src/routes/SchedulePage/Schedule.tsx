// Schedule.tsx
import React, { useState, useEffect } from "react";
import "./Schedule.css"; // Schedule.css 파일을 import

interface ScheduleItem {
  id: number;
  content: string;
  tip: string;
}

// 세부일정카드-----------------------------------------
const ScheduleCard: React.FC<ScheduleItem> = ({ id, content, tip }) => {
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

  useEffect(() => {
    if (expanded) {
      setCardHeight(500); //더보기 버튼 클릭시 늘어날 길이
    } else {
      setCardHeight(undefined);
    }
  }, [expanded, id]);

  return (
    <div
      className={`schedule-card ${expanded ? "expanded" : ""}`}
      style={{ height: cardHeight }}
    >
      <span className="schedule-number">{id}</span>
      <h3>{content}</h3>
      <p>
        {tip}
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

//일정 데이터
const Schedule: React.FC = () => {
  const scheduleData: ScheduleItem[] = [
    { id: 1, content: "광안리 해변", tip: "xx횟집 추천" },
    { id: 2, content: "광안 대교", tip: "사진 찍기 좋은 장소" },
    { id: 3, content: "달맞이 길", tip: "드라이브 하기 좋은 장소" },
    { id: 4, content: "서면", tip: "놀거리 많음" },
    { id: 5, content: "자갈치 시장", tip: "먹거리 많음" },
    { id: 6, content: "대연동", tip: "맛집 많음" },
    { id: 7, content: "감만부두", tip: "낚시터" },
    { id: 8, content: "동의대", tip: "경사 엄청 심함" },
    { id: 9, content: "벡스코", tip: "각종 행사 많음" },
    // 추가적인 일정 항목들을 필요에 따라 추가
  ];

  return (
    <div>
      <h2>여행 세부일정</h2>
      <div className="schedule-container">
        {scheduleData.map((item) => (
          <ScheduleCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default Schedule;
