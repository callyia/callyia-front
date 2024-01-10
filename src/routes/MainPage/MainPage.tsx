import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

interface MainPageProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Main: React.FC<MainPageProps> = () => {
  const navigate = useNavigate();

  const [inputPlanValue, setInputPlanValue] = useState<string>(""); 
  const [tourData, setTourData] = useState<TourData[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [showTopButton, setShowTopButton] = useState(false);

  const itemsPerPage = 12;
  const numberOfPages = Math.ceil(tourData.length / itemsPerPage);
  const pagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Callyia/Tour/all?page=${currentPage}`);
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

  const handlePlanInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlanValue(event.target.value);
  }

  const handlePlanClick = () => {
    navigate(`/PlanningPage?title=${(inputPlanValue)}`)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const renderPagination = () => {
    let pages = [];

    pages.push(
      <button className="main-info-pagination-controls-key" key="page's first" onClick={() => goToPage(Math.ceil(currentPage/10)*10 - 10)} disabled={currentPage === 1}>
        {'<<'}
      </button>
    );
    pages.push(
      <button className="main-info-pagination-controls-key" key="prev" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>
    );

    // Page Number Buttons within the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => goToPage(i)} disabled={i === currentPage}>
          {i}
        </button>
      );
    }

    // Next and Last Page Buttons
    pages.push(
      <button className="main-info-pagination-controls-key" key="next" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        {'>'}
      </button>
    );
    pages.push(
      <button className="main-info-pagination-controls-key" key="page's last" onClick={() => goToPage(Math.ceil(currentPage/10)*10 + 1)} disabled={currentPage === totalPages}>
        {'>>'}
      </button>
    );

    return pages;
    }

  return (
    <div className="main-container">
      <main className="content">
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "13%" }}>
            <span className="main-section-span-title">여행 정보</span>
            <div className="main-tour-info-section">
            {tourData.map((tour) => (
              <div key={tour.placeId}>
                {tour.image && (
                  <img src={tour.image} alt={tour.placeName} style={{width: "300px", justifyItems:"center"}}/>
                  )}
                  <h3 className="main-tour-info-text">{tour.placeName}</h3>
              </div>
            ))}
          </div>
            <div className="main-info-pagination-controls">å
              {renderPagination()}
            </div>
          </section>
          
          <table style={{ paddingLeft: "-200px", paddingRight: "200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
        </div>
        <div className="main-section-container">
        <table style={{ paddingLeft: "200px", paddingRight: "-200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
          <section className="main-section-div" style={{ marginLeft: "13%" }}>
            <span className="main-section-span-title">여행 계획</span>
            <div></div>
            <input
              type="text"
              className="main-trip-plan-input"
              placeholder="여행 계획을 입력하세요!"
              value={inputPlanValue}
              onChange={handlePlanInputChange}
            />
            <button type="button" className="main-trip-plan-button" onClick={handlePlanClick}>
              검색
            </button>
          </section>
        </div>
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "13%" }}>
            <span className="main-section-span-title">여행 공유 커뮤니티</span>
            <h3>Title : 여행 공유 커뮤니티1</h3>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
          </section>
          <table style={{ paddingLeft: "-200px", paddingRight: "200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
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
