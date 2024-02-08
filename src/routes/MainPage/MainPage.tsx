import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../theme/daisyui";
import toast, { Toaster } from "react-hot-toast";
import { BsFillQuestionCircleFill } from "react-icons/bs";
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

interface TipData {
  sno: number;
  tip: string;
}

const Main: React.FC<MainPageProps> = () => {
  const navigate = useNavigate();

  const [inputPlanValue, setInputPlanValue] = useState<string>("");
  const [tourData, setTourData] = useState<TourData[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [detailScheduleData, setDetailScheduleData] = useState<
    DetailScheduleData[]
  >([]);
  const [tipData, setTipData] = useState<TipData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tipCurrentPage, setTipCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tipTotalPages, setTipTotalPages] = useState(1);
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [tourCount, setTourCount] = useState<number>(0);

  const tooltipLeft =
    "예) 3일의 여행을 계획할 때,\n 위의 숫자를 클릭 후에 3을 선택.";
  const tooltipRight =
    "검색 가능한 여행 계획의 제목 입력\n 예) 부산 투어, 서울 배낭여행 등";

  const pagesToShow = 10;
  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const startTipPage =
    Math.floor((tipCurrentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endTipPage = Math.min(startTipPage + pagesToShow - 1, tipTotalPages);

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

  useEffect(() => {
    const fetchTourCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Callyia/Tour/getCount`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTourCount(data);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourCount();
  }, []);

  // 모든 스케쥴 가져옴
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Callyia/Schedule/getRecentSchedule`
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
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log("placeId to check:", selectedTour?.placeId);
    try {
      // 투어 정보를 데이터베이스에 저장
      const response = await axios.post(
        "http://localhost:8080/Callyia/Basket",
        JSON.stringify({
          bno: null,
          placeId: selectedTour?.placeId,
          userId: email,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = response.data;
      console.log("결과:", result);

      toast.success(
        `장바구니에 추가하였습니다. 내용: ${selectedTour?.placeId}`
      );
    } catch (error: any) {
      console.error("Error accepting data:", error.message);
      if (error.message.includes("409")) {
        toast.error("해당 파일은 이미 등록되어 있습니다.");
      }
    }
  };

  // 상세페이지의 관련 Tip 가져오기

  useEffect(() => {
    if (selectedTour) {
      axios
        .get(
          `http://localhost:8080/Callyia/Schedule/getTip?placeId=${selectedTour?.placeId}&page=${tipCurrentPage}`
        )
        .then((response) => {
          console.log(response.data);
          console.log(">>>>>>>>", response.data.totalPages);

          setTipData(response.data.content);
          setTipTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching get Tip:", error);
        });
    }
  }, [selectedTour, tipCurrentPage]);

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

  const goToTipPage = (page: number) => {
    setTipCurrentPage(Math.max(1, Math.min(tipTotalPages, page)));
  };

  const renderTipPagination = () => {
    let pages = [];

    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's first"
        onClick={() => goToTipPage(Math.ceil(tipCurrentPage / 10) * 10 - 10)}
        disabled={tipCurrentPage === 1}
      >
        {"<<"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="prev"
        onClick={() => goToTipPage(tipCurrentPage - 1)}
        disabled={tipCurrentPage === 1}
      >
        {"<"}
      </button>
    );

    for (let i = startTipPage; i <= endTipPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToTipPage(i)}
          disabled={i === tipCurrentPage}
        >
          {i}
        </button>
      );
    }

    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="next"
        onClick={() => goToTipPage(tipCurrentPage + 1)}
        disabled={tipCurrentPage === tipTotalPages}
      >
        {">"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's last"
        onClick={() => goToTipPage(Math.ceil(tipCurrentPage / 10) * 10 + 1)}
        disabled={tipCurrentPage === tipTotalPages}
      >
        {">>"}
      </button>
    );

    return pages;
  };

  return (
    <div className="main-trip-plan-container">
      <main className="main-frame ">
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
              <div className="main-tooltip-container">
                <BsFillQuestionCircleFill className="main-tooltip-button" />
                <span className="main-tooltip-text-left">{tooltipLeft}</span>
                <span className="main-tooltip-text-right">{tooltipRight}</span>
                <span className="main-tooltip-text">HELP</span>
              </div>
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
          <section className="main-section-div-community-left">
            <span className="main-community-section-span-title">
              회원들이 공유한 특별한 여행 일정들을 만나보세요.
            </span>
          </section>
          <section className="main-section-div-community-right">
            <div className="main-section-div-community-top-right">
              <span className="ml-4 text-xl font-semibold">
                가장 최근에 공유된 여행 일정들입니다.
              </span>
              <button
                className="mr-4 btn btn-sm"
                onClick={() => navigate(`/ScheduleListPage/`)}
              >
                일정 공유 커뮤니티로 이동하기
              </button>
            </div>

            <div className="main-section-div-community-grid-right">
              {scheduleData.map((schedule) => {
                // schedule.sno에 해당하는 매칭 데이터 찾기
                matchingDetailImages.find(
                  (detail) => detail.sno === schedule.sno
                );

                // 매칭 데이터가 있을 때 렌더링
                return (
                  <div
                    key={schedule.sno}
                    className="list-card test-btn"
                    onClick={() => navigate(`/SchedulePage/${schedule.sno}`)}
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
            </div>
          </section>
        </div>
        <div className="main-section-container">
          <section className="main-section-div-tour-left">
            <div className="main-tour-info-section">
              {tourData.map((tour) => (
                <div
                  className="main-tour-info-div"
                  key={tour.placeId}
                  onClick={() => openDetailClicked(tour)}
                >
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
            <Toaster position="top-center" reverseOrder={false} />
            <Modal className="" open={openDetail}>
              <ModalContent
                onCloseIconClicked={closeDetailClicked}
                className="p-4 bg-white rounded-lg  h-[auto] w-[700px] relative"
              >
                <div className="flex flex-row mt-3">
                  <div className="flex items-center justify-center flex-1">
                    {selectedTour && (
                      <div className="w-full h-auto">
                        <img
                          src={selectedTour.image}
                          alt={"그림"}
                          style={{ width: "250px", height: "250px" }}
                          className="shadow-md shadow-slate-500 rounded-2xl"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    {selectedTour && (
                      <div>
                        <div className="flex items-center mt-2">
                          <p className="flex-grow max-h-[28px] max-w-[334px] p-1 text-style">
                            {selectedTour.address}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="flex-grow max-h-[59px] max-w-[334px] p-1 text-style-second">
                            {selectedTour.placeName}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="flex-grow min-h-[150px] max-h-[150px] p-1">
                            {selectedTour.placeContent}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="modalActionbtn">
                      <ModalAction className="flex flex-row">
                        <Button
                          className="w-24 mr-2 normal-case btn-primary btn-sm"
                          onClick={basketClicked}
                        >
                          장바구니
                        </Button>
                        <Button
                          className="w-24 normal-case btn-sm"
                          onClick={closeDetailClicked}
                        >
                          취소
                        </Button>
                      </ModalAction>
                    </div>
                  </div>
                </div>
                <div className="tipTitle">관련 팁</div>
                <div className="tipCollect">
                  {tipData.map((tipData, index) => (
                    <div
                      className="tipStyle"
                      key={index}
                      onClick={() => {
                        navigate(`/SchedulePage/${tipData.sno}`);
                      }}
                    >
                      {tipData.tip}
                    </div>
                  ))}
                </div>
                <div className="main-info-pagination-controls">
                  {renderTipPagination()}
                </div>
              </ModalContent>
            </Modal>
            <div className="main-info-pagination-controls">
              {renderPagination()}
            </div>
          </section>
          <section className="main-section-div-tour-right">
            <div>
              <span className="main-tour-section-span-title-count">
                {tourCount.toLocaleString()}
              </span>
              <span className="main-tour-section-span-title">
                개의 멋진 장소가 여러분을 기다리고 있습니다.
              </span>
            </div>
          </section>
        </div>
        <div className="main-section-container"></div>
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
