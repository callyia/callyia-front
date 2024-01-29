import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from "../../theme/daisyui";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowUp } from "react-icons/fa"; // react-icons에서 사용할 아이콘을 import

import { Modal, ModalAction, ModalContent } from "./../TourPage/Modal";
import Upload from '../TourPage/Upload';
import bglist from "./../TourPage/bglist";
import './ProfilePage.css';
import { Div } from '../../components';

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


const CartContent = () => {
  const [tourData, setTourData] = useState<TourData[]>([]);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [userBasketResults, setUserBasketResults] = useState([]); 
  const [openDetail, setOpenDetail] = useState(false);
  const [checkColumn, setCheckColumn] = useState<string>("전체");

  const openDetailClicked = (selectedTour: TourData) => {
    setSelectedTour(selectedTour); 
    setOpenDetail(true);
  };
  
  // 상세페이지 닫기
  const closeDetailClicked = () => {
    setSelectedTour(null); 
    setOpenDetail(false);
  };
  
  const basketClicked = async () => {
    console.log("placeId to check:", selectedTour?.placeId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/Callyia/Basket",
        JSON.stringify({
          bno: null, //bno 처리 어떻게 할건지
          placeId: selectedTour?.placeId,
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

      alert(`장바구니에 추가하였습니다. 내용: ${selectedTour?.placeId}`);
    } catch (error: any) {
      console.error("Error accepting data:", error.message);
      if (error.message.includes("409")) {
        alert("해당 파일은 이미 등록되어 있습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchUserTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Callyia/Tour/all`); // 특정 유저만 받아오게
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTourData(data.content);
      } catch (error) {
        console.error("Error fetching user tour data: ", error);
      }
    };
    fetchUserTourData();
  }, []);
  

  const renderTourItems = () => {
    // 검색 결과 유무에 따라 데이터 렌더링
    const dataToRender = userBasketResults.length > 0 ? userBasketResults : tourData;
    return dataToRender.map((tour) => (
      <div key={tour.placeId} className="cart-card">
        <div
          className="ListContent shadowList"
          role="button"
          tabIndex={0}
          onClick={() => openDetailClicked(tour)}
          onMouseOver={(e) => {
            const targetContent = e.currentTarget;

            // 마우스 오버 시 위로 올라가는 애니메이션 클래스 추가
            targetContent.classList.add("hoverAnimation");
          }}
          onMouseLeave={(e) => {
            const targetContent = e.currentTarget;

            // 마우스 떠날 때 아래로 내려가는 애니메이션 클래스 추가
            targetContent.classList.add("leaveAnimation");

            // 일정 시간 후 클래스 제거
            setTimeout(() => {
              targetContent.classList.remove(
                "hoverAnimation",
                "leaveAnimation"
              );
            }, 300);
          }}
        >
          <div>
            <div className="profile-cart-container">
              {tour.image && (
                <img
                  src={tour.image} // 이미지 소스를 동적으로 변경해야 할 것 같습니다.
                  className="proflie-cart-images"  
                  alt={`${tour} 이미지`}
                />
              )}
            </div>
            <div className="profile-cart-text-container">
              <span className="profile-cart-text-style">{tour.address}</span>
              <span className="profile-cart-text-style-second">{tour.placeName}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  
  return (
    <div className='profile-common-posts'>
      <div className="profile-edited-cart">{renderTourItems()}</div>
    </div>
  );
};

export default CartContent;
