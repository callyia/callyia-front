import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import './ProfilePage.css';

interface ScheduleData {
  sno: number;
  total_Day: number;
  member_email: string;
  sName: string;
  member_nickname: string;
  member_profile_image: string;
  regDate: Date;
}

interface DetailScheduleData {
  dno: number;
  tip: string;
  detailImages: string;
  day: number;
  sno: number;
  place_id: number;
}

const ScheduleContent = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [detailScheduleData, setDetailScheduleData] = useState<DetailScheduleData[]>([]);
  const matchingDetailImages: any[] = [];

  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});

  const DeleteSchedule = async (sno:number) => {
    try {
        // Assuming you have a function to delete the schedule, e.g., deleteScheduleAPI(sno)
        const response = await fetch(`http://localhost:8080/Callyia/Schedule/deleteSchedule?sno=${sno}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) throw new Error('Network response was not ok.');
        setScheduleData(scheduleData.filter(schedule => schedule.sno !== sno));
        window.location.reload();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };


  const handleMouseHover = (sno: number, isHovering: boolean) => {
    setHoverStates(prev => ({ ...prev, [sno]: isHovering }));
  };

    // scheduleData 배열 순회
    detailScheduleData.forEach((schedule) => { // 현재 scheduleData는 undefined => scheduleData <-> detailScheduleData
      // schedule.sno를 포함하는 detailScheduleData 요소 찾기
      const matchingDetails = detailScheduleData.filter(
        (detail) => detail.sno === schedule.sno
      );
  
      // 찾은 요소가 존재할 때 matchingDetailImages 배열에 추가
      if (matchingDetails.length > 0) {
        matchingDetailImages.push({
          sno: schedule.sno,
          detailImages: matchingDetails[0].detailImages,
        });
      }
    });
  
    // 모든 스케쥴 가져옴
    useEffect(() => {
      const fetchScheduleData = async () => {
        try {
          const email = localStorage.getItem('email');
          const response = await fetch(
            `http://localhost:8080/Callyia/Schedule/getMemberSchedule?email=${email}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          setScheduleData(data);
        } catch (error) {
          console.log("Error fetching tour data:", error);
        }
      };
      fetchScheduleData();
    }, []);
  
    // 모든 디테일스케쥴 가져옴
    useEffect(() => {
      const fetchDetailScheduleData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/Callyia/Schedule/getDetailSchedule`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          setDetailScheduleData(data);
        } catch (error) {
          console.log("Error fetching tour data:", error);
        }
      };
      fetchDetailScheduleData();
    }, []);
    
    return (
    <div className="profile-schedule-posts">
      {scheduleData.map((schedule) => {
            // schedule.sno에 해당하는 매칭 데이터 찾기
        const matchingDetail = matchingDetailImages.find(
          (detail) => detail.sno === schedule.sno
        );
        // 매칭 데이터가 있을 때 렌더링
         if(matchingDetail) { 
          return (
          <div key={schedule.sno} className="profile-list-card" onClick={() => navigate(`/SchedulePage/${matchingDetail.sno}`)}>
              <div onMouseEnter={() => handleMouseHover(schedule.sno, true)} onMouseLeave={() => handleMouseHover(schedule.sno, false)}>
              {hoverStates[schedule.sno] ? (
                  <IoMdCloseCircle className="profile-schedule-delete-button" onClick={() => DeleteSchedule(schedule.sno)}/>
                ) : (
                  <FaCircle className="profile-schedule-button"/>
                )}
              </div>
              <img
                className="profile-schedule-image"
                src={matchingDetail.detailImages}
                alt="Profile"
              />
            <div className="profile-schedule-details" >
              {schedule.sName}
            </div>
          </div>
           );
          }
          return null;
        })
        } 
    </div>
  );
};

export default ScheduleContent;
