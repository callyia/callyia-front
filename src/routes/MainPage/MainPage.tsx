import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../theme/daisyui";
import { CgArrowRightR, CgArrowLeftR } from "react-icons/cg";

import { Modal, ModalAction, ModalContent } from "./../TourPage/Modal";
import "./MainPage.css";

interface TourData {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  placeContent: string;
  checkColumn: string;
  image: string;
}

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

interface MainPageProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Main: React.FC<MainPageProps> = () => {
  const navigate = useNavigate();

  const [inputPlanValue, setInputPlanValue] = useState<string>("");
  const [tourData, setTourData] = useState<TourData[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [detailScheduleData, setDetailScheduleData] = useState<
    DetailScheduleData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const pagesToShow = 10;
  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

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

  // 상세페이지 열기
  const openDetailClicked = (selectedTour: TourData) => {
    setSelectedTour(selectedTour); // 클릭된 관광지 정보 저장
    setOpenDetail(true);
  };

  // 상세페이지 닫기
  const closeDetailClicked = () => {
    setSelectedTour(null); // 선택된 관광지 정보 초기화
    setOpenDetail(false);
  };

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Callyia/Tour/all?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setTourData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
  }, [currentPage]);

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

  // 장바구니 클릭 시 장바구니 등록
  const basketClicked = async () => {
    console.log("placeId to check:", selectedTour?.placeId);
    try {
      // 투어 정보를 데이터베이스에 저장
      const response = await axios.post(
        "http://localhost:8080/Callyia/Basket",
        JSON.stringify({
          bno: null,
          placeId: selectedTour?.placeId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = response.data;
      console.log("결과:", result);

      alert(`장바구니에 추가하였습니다. 내용: ${selectedTour?.placeId}`);
    } catch (error: any) {
      console.error("Error accepting data:", error.message);
      if (error.message.includes("409")) {
        alert("해당 파일은 이미 등록되어 있습니다.");
      }
    }
  };

  const handlePlanInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPlanValue(event.target.value);
  };

  const handleDayInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDay(parseInt(event.target.value));
  };

  const handlePlanClick = () => {
    navigate(`/PlanningPage?title=${inputPlanValue}&day=${selectedDay}`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const renderPagination = () => {
    let pages = [];

    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's first"
        onClick={() => goToPage(Math.ceil(currentPage / 10) * 10 - 10)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's last"
        onClick={() => goToPage(Math.ceil(currentPage / 10) * 10 + 1)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    );

    return pages;
  };

  return (
    <div className="main-trip-plan-container">
      <main className="main-frame">
        <div className="main-trip-plan-section-container">
          <section className="main-section-div-sm">
            <div className="main-trip-plan-section-div-title">
              <span className="main-trip-plan-section-span-title">
                여행의 문이 열릴 때, 당신의 모험이 시작됩니다. 여행 계획을
                펼쳐보세요.
              </span>
            </div>

            <div className="main-trip-plan-input-container">
              <select
                value={selectedDay}
                onChange={handleDayInputChange}
                className="main-combo-day-dropdown"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="main-trip-plan-input"
                placeholder="여행 날짜와 여행 계획의 제목을 입력해주세요."
                value={inputPlanValue}
                onChange={handlePlanInputChange}
              />
              <button
                type="button"
                className="main-trip-plan-button"
                onClick={handlePlanClick}
              >
                계획하러 가기
              </button>
            </div>
          </section>
        </div>
        <div className="middle-navigate">
          <div className="place-navigate">
            <span onClick={() => navigate(`/TourPage/Tourist`)}>Place</span>
          </div>
          <div className="restaurant-navigate">
            <span onClick={() => navigate(`/TourPage/Food`)}>Restaurant</span>
          </div>
          <div className="community-navigate">
            <span onClick={() => navigate(`/ScheduleListPage/`)}>
              Community
            </span>
          </div>
        </div>
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "33%" }}>
            <span className="main-section-span-title">여행 정보</span>
            <div className="main-tour-info-section">
              {tourData.map((tour) => (
                <div key={tour.placeId} onClick={() => openDetailClicked(tour)}>
                  {tour.image && (
                    <img
                      src={tour.image}
                      className="main-tour-info-image"
                      alt={tour.placeName}
                    />
                  )}
                  <h3 className="main-tour-info-text">{tour.placeName}</h3>
                </div>
              ))}
            </div>
            <Modal className="" open={openDetail}>
              <ModalContent
                onCloseIconClicked={closeDetailClicked}
                className="p-4 bg-white rounded-lg min-h-[500px] h-auto w-[800px] relative"
              >
                <div>
                  <h3 className="mb-8 text-center">상세페이지입니다.</h3>
                </div>
                {selectedTour && (
                  <div className="grid">
                    <div className="flex items-center mb-2">
                      <label className="mr-2">이름 : </label>
                      <p className="flex-grow p-1 border rounded">
                        {selectedTour.placeName}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="mr-2">지역 : </label>
                      <p className="flex-grow p-1 border rounded">
                        {selectedTour.address}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="mr-2">내용 : </label>
                      <p className="flex-grow h-auto p-1 border rounded">
                        {selectedTour.placeContent}
                      </p>
                    </div>
                    <div className="w-full h-auto">
                      <img
                        src={selectedTour.image}
                        className="w-auto h-auto max-h-[250px]"
                        alt={selectedTour.image}
                      />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 right-4">
                  <ModalAction className="absolute bottom-0 right-0 flex flex-row">
                    <Button
                      className="w-24 normal-case btn-primary btn-sm"
                      onClick={basketClicked}
                    >
                      Basket
                    </Button>
                    <Button
                      className="w-24 normal-case btn-sm"
                      onClick={closeDetailClicked}
                    >
                      Close
                    </Button>
                  </ModalAction>
                </div>
              </ModalContent>
            </Modal>
            <div className="main-info-pagination-controls">
              {renderPagination()}
            </div>
          </section>
        </div>
        <div className="main-section-container">
          <section
            className="main-section-div-community"
            style={{ marginLeft: "33%" }}
          >
            <span className="main-section-span-title">여행 공유 커뮤니티</span>

            {scheduleData.map((schedule) => {
              // schedule.sno에 해당하는 매칭 데이터 찾기
              const matchingDetail = matchingDetailImages.find(
                (detail) => detail.sno === schedule.sno
              );

              // 매칭 데이터가 있을 때 렌더링
              return (
                <div
                  key={schedule.sno}
                  className="list-card"
                  onClick={() => navigate(`/SchedulePage/${schedule.sno}`)}
                  style={{ cursor: "pointer" }}
                >
                  {/* 프로필 클릭 시 해당 유저페이지로 이동 */}
                  <span className="profile-info">
                    <img
                      className="profile-image"
                      src={schedule.member_profile_image}
                      alt="Profile"
                    />
                    <div className="profile-details">
                      <h1 style={{ fontSize: "20px", margin: 0 }}>
                        {schedule.member_nickname}
                        {/* <p>{schedule.regDate.toDateString()}</p> */}
                      </h1>
                      {/* Add other details as needed */}
                    </div>
                  </span>
                  <h1
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      margin: "15px",
                    }}
                  >
                    {schedule.sName}
                  </h1>
                </div>
              );
            })}
          </section>
        </div>
      </main>
      <button
        type="button"
        className="top-button"
        style={{ visibility: showTopButton ? "visible" : "hidden" }} // 스크롤이 조건이상 내려가면 보이게
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></button>
    </div>
  );
};

export default Main;
