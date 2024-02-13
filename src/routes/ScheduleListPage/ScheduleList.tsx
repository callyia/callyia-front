import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScheduleList.css";

import { FaPlus, FaStar } from "react-icons/fa";

interface ScheduleData {
  sno: number;
  total_Day: number;
  member_email: string;
  sName: string;
  member_nickname: string;
  member_profile_image: string;
  regDate: string;
}

interface DetailScheduleData {
  dno: number;
  tip: string;
  detailImages: string;
  day: number;
  sno: number;
  place_id: number;
}

interface ScheduleStarDTO {
  starNum: number;
  starScore: number;
  sno: number;
}
export default function ScheduleList() {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [detailScheduleData, setDetailScheduleData] = useState<
    DetailScheduleData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsToShow, setCardsToShow] = useState(10);
  const [showTopButton, setShowTopButton] = useState(false);
  const [starData, setStarData] = useState<ScheduleStarDTO[]>([]);

  const navigate = useNavigate();
  //sno에 해당하는 detailImage중에서 첫 요소의 이미지
  const matchingDetailImages: any[] = [];

  // scheduleData 배열 순회
  scheduleData.forEach((schedule) => {
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
        const response = await fetch(
          `http://localhost:8080/Callyia/Schedule/getAllSchedule`
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
  }, [currentPage]);

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
  }, [currentPage]);

  const handleLoadMore = () => {
    // "더 보기" 버튼 클릭 시 추가로 10개의 카드를 보여줌
    setCardsToShow((prevCards) => prevCards + 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1700) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 별점 GET
  const fetchScheduleStarData = async (sno: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Star/getStar?sno=${sno}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStarData(data);
    } catch (error) {
      console.log("Error fetching star data:", error);
    }
  };

  // Calculate average star score for a given sno
  const calculateAverage = (sno: number) => {
    const filteredStarData = starData.filter((star) => star.sno === sno);

    if (filteredStarData.length === 0) {
      return 0;
    }

    const totalScore = filteredStarData.reduce(
      (acc, star) => acc + star.starScore,
      0
    );
    const averageScore = totalScore / filteredStarData.length;

    // Round to 1 decimal place
    return Math.round(averageScore * 10) / 10;
  };

  useEffect(() => {
    scheduleData.forEach((schedule) => fetchScheduleStarData(schedule.sno));
  }, [scheduleData]);

  const renderStars = (averageScore: number) => {
    const filledStars = Math.floor(averageScore); // 정수 부분
    const remainingStar = averageScore - filledStars; // 소수 부분
    return (
      <div style={{ display: "flex" }}>
        {Array.from({ length: filledStars }, (_, index) => (
          <FaStar
            key={index}
            size="13"
            style={{
              color: "#FFBF00",
              marginRight: "2px",
            }}
          />
        ))}
        {remainingStar > 0 && (
          <FaStar
            key={filledStars}
            size="13"
            style={{
              color: "#FFBF00",
              marginRight: "2px",
              clipPath: `polygon(0 0, ${remainingStar * 100}% 0, ${
                remainingStar * 100
              }% 100%, 0% 100%)`,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="ScheduleList-section-container">
      <section className="ScheduleList-section-div-community">
        <span className="ScheduleList-span-title">Community</span>
        <p className="ScheduleList-subtitle">
          여행 플랜 목록에서 클릭하여 풍부한 여행 정보를 확인하고, 소중한 경험을
          공유하며 다양한 이야기에 참여하세요!
        </p>
        {scheduleData.slice(0, cardsToShow).map((schedule) => {
          // schedule.sno에 해당하는 매칭 데이터 찾기
          const matchingDetail = matchingDetailImages.find(
            (detail) => detail.sno === schedule.sno
          );

          const averageScore = calculateAverage(schedule.sno);

          // 매칭 데이터가 있을 때 렌더링
          return (
            <div
              key={schedule.sno}
              className="ScheduleList-list-card"
              onClick={() => navigate(`/SchedulePage/${schedule.sno}`)}
            >
              {matchingDetail && (
                <img
                  className="schedule-list-card-thumbnail"
                  src={matchingDetail.detailImages}
                  alt={`Detail Img for ${schedule.sno}`}
                />
              )}
              <div className="schedule-card-info">
                <div className="schedule-card-info-top">
                  <div className="schedule-card-title">{schedule.sName}</div>
                  <div className="schedule-card-day">
                    {schedule.total_Day === 1 ? (
                      <span>{schedule.total_Day} day</span>
                    ) : (
                      <span>{schedule.total_Day} days</span>
                    )}
                    <span>{averageScore && renderStars(averageScore)}</span>
                  </div>
                </div>
                <div className="schedule-card-info-bottom">
                  <span className="ScheduleList-profile-info">
                    <img
                      className="ScheduleList-profile-image"
                      src={schedule.member_profile_image}
                      alt="Profile"
                      onClick={() => {
                        navigate(
                          `/UserProfilePage?userid=${schedule.member_email}`
                        );
                      }}
                    />
                    <div className="ScheduleList-profile-details">
                      <h1 style={{ fontSize: "20px", margin: 0 }}>
                        {schedule.member_nickname}
                      </h1>
                    </div>
                  </span>
                  <h1 className="scheduleList-date">
                    {schedule.regDate[0]}-{schedule.regDate[1]}-
                    {schedule.regDate[2]} {schedule.regDate[3]}:
                    {schedule.regDate[4]}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
        <div className="LoadMore">
          {cardsToShow < scheduleData.length && (
            <div className="LoadMore-button" onClick={handleLoadMore}>
              <FaPlus />
            </div>
          )}
        </div>
      </section>
      <button
        type="button"
        className="ScheduleList-top-button"
        style={{ visibility: showTopButton ? "visible" : "hidden" }} // 스크롤이 조건이상 내려가면 보이게
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></button>
    </div>
  );
}
