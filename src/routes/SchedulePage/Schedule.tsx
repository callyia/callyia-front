// Schedule.tsx
import React from 'react'
import './Schedule.css' // Schedule.css 파일을 import

interface ScheduleItem {
  id: number
  content: string
  tip: string
}

const ScheduleCard: React.FC<ScheduleItem> = ({id, content, tip}) => {
  return (
    <div className="schedule-card">
      <span className="schedule-number">{id}</span>
      <h3>{content}</h3>
      <p>{tip}</p>
    </div>
  )
}

const Schedule: React.FC = () => {
  const scheduleData: ScheduleItem[] = [
    {id: 1, content: '광안리 해변', tip: 'xx횟집 추천'},
    {id: 2, content: '광안 대교', tip: '사진 찍기 좋은 장소'},
    {id: 3, content: '달맞이 길', tip: '드라이브 하기 좋은 장소'},
    {id: 4, content: '서면', tip: '놀거리 많음'},
    {id: 5, content: '자갈치 시장', tip: '먹거리 많음'},
    {id: 6, content: '대연동', tip: '맛집 많음'},
    {id: 7, content: '감만부두', tip: '낚시터'},
    {id: 8, content: '동의대', tip: '경사 엄청 심함'},
    {id: 9, content: '벡스코', tip: '각종 행사 많음'}
    // 추가적인 일정 항목들을 필요에 따라 추가할 수 있습니다.
  ]

  return (
    <div>
      <h2>여행 세부일정</h2>
      <div className="schedule-container">
        {scheduleData.map(item => (
          <ScheduleCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
export default Schedule
