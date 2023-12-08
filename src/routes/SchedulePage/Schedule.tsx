// Schedule.tsx
import React from "react";
import "./Schedule.css";
import ScheduleCard, { ScheduleItem } from "../../components/ScheduleCard";

// 'day' 속성이 추가된 타입 정의
interface ExtendedScheduleItem extends ScheduleItem {
  day: number;
}

const scheduleData: ExtendedScheduleItem[] = [
  {
    id: 1,
    day: 1,
    place: "광안리 해수욕장",
    content: "오전11시~오후3시까지 놀기",
    tip: "xx횟집 추천",
    lat: 35.15319914298131,
    lng: 129.11874363377248,
  },
  {
    id: 2,
    day: 1,
    place: "광안대교",
    content: "4시쯤부터 드라이브",
    tip: "사진 찍기 좋은 장소",
    lat: 35.1448993375342,
    lng: 129.12800748092153,
  },
  {
    id: 3,
    day: 1,
    place: "서면",
    content: "6시 방탈출",
    tip: "놀거리 많음",
    lat: 35.15536685769068,
    lng: 129.0599536519087,
  },
  {
    id: 4,
    day: 1,
    place: "자갈치 시장",
    content: "7시 저녁",
    tip: "먹거리 많음",
    lat: 35.09653899171667,
    lng: 129.03056681417587,
  },
  {
    id: 5,
    day: 1,
    place: "달맞이 길",
    content: "10시 드라이브",
    tip: "드라이브 하기 좋은 장소",
    lat: 35.15648145591319,
    lng: 129.17905756423198,
  },

  {
    id: 6,
    day: 2,
    place: "대연동",
    content: "2일차",
    tip: "맛집 많음",
    lat: 35.135804743232626,
    lng: 129.0986784144465,
  },
  {
    id: 7,
    day: 2,
    place: "감만부두",
    content: "",
    tip: "낚시터",
    lat: 35.10913463424172,
    lng: 129.0653909431872,
  },
  {
    id: 8,
    day: 2,
    place: "동의대",
    content: "",
    tip: "경사 엄청 심함",
    lat: 35.142143208587385,
    lng: 129.0340360368665,
  },
  {
    id: 9,
    day: 3,
    place: "벡스코",
    content: "",
    tip: "각종 행사 많음",
    lat: 35.1691065603009,
    lng: 129.1365727167521,
  },
  // 추가적인 일정 항목들을 필요에 따라 추가
];

// ScheduleCard를 DAY별로 그룹화하는 함수
const groupByDay = (schedule: ExtendedScheduleItem[]) => {
  const grouped: { [day: number]: ExtendedScheduleItem[] } = {};
  schedule.forEach((item) => {
    if (!grouped[item.day]) {
      grouped[item.day] = [];
    }
    grouped[item.day].push(item);
  });
  return grouped;
};

//일정 데이터
const Schedule: React.FC = () => {
  const groupedSchedule = groupByDay(scheduleData);

  return (
    <div className="Schedule">
      <h2>여행 세부일정</h2>
      {Object.entries(groupedSchedule).map(([day, items]) => (
        <div key={day} className="day-schedule">
          <div className="day-header">
            <h2>DAY {day}</h2>
          </div>
          <div className="schedule-container">
            {items.map((item) => (
              <ScheduleCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Schedule;
