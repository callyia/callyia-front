// Schedule.tsx
import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import "./Schedule.css";
import ScheduleCard, { ScheduleItem } from "../../components/ScheduleCard";

//일정 데이터
const Schedule: React.FC = () => {
  const scheduleData: ScheduleItem[] = [
    {
      id: 1,
      place: "광안리 해수욕장",
      content: "오전11시~오후3시까지 놀기",
      tip: "xx횟집 추천",
    },
    {
      id: 2,
      place: "광안대교",
      content: "4시쯤부터 드라이브",
      tip: "사진 찍기 좋은 장소",
    },
    { id: 3, place: "서면", content: "6시 방탈출", tip: "놀거리 많음" },
    { id: 4, place: "자갈치 시장", content: "7시 저녁", tip: "먹거리 많음" },
    {
      id: 5,
      place: "달맞이 길",
      content: "10시 드라이브",
      tip: "드라이브 하기 좋은 장소",
    },

    { id: 6, place: "대연동", content: "2일차", tip: "맛집 많음" },
    { id: 7, place: "감만부두", content: "", tip: "낚시터" },
    { id: 8, place: "동의대", content: "", tip: "경사 엄청 심함" },
    { id: 9, place: "벡스코", content: "", tip: "각종 행사 많음" },
    // 추가적인 일정 항목들을 필요에 따라 추가
  ];

  return (
    <div>
      <h2>여행 세부일정 DAY1, DAY2 해야함</h2>
      <div className="schedule-container">
        {scheduleData.map((item) => (
          <ScheduleCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default Schedule;
