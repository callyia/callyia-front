import React, { useState, useEffect } from "react";

import { MdOutlineDeleteOutline } from "react-icons/md";

import { ModalContent } from "../../theme/daisyui/Modal";
import "./ProfilePage.css";

interface BasketData {
  bno: number;
  placeId: number;
  userId: string;
  placeName: string;
  image: string;
}

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

  const removeCart = async (itemBno: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Basket/delete/${itemBno}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const fetchUserTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Callyia/Basket/getBasket?email=${email}`); // 특정 유저만 받아오게
        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTourData(data);
      } catch (error) {
        console.error("Error fetching user tour data: ", error);
      }
    };
    fetchUserTourData();
  }, []);

  const renderTourItems = () => {
    if (!tourData) {
      return (
        <ModalContent className="div-loading">
          <div className="div-loading-content">
            <div className="w-16 loading-dots loading" />
            <span className="text-lg font-semibold">잠시만 기다려주세요.</span>
          </div>
        </ModalContent>
      )
    }
    
    return tourData.map((tour, index) => (
      <div key={tour.placeId} className="cart-cards">
        <div
          className="ListContent shadowList cart-card"
          role="button"
          tabIndex={0}
        >
          {/* <MdOutlineDeleteOutline className="card-close-button" onClick={() => removeCart(tour.bno)}/> */}
          <MdOutlineDeleteOutline className="card-close-button"/>
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
              <span className="profile-cart-text-style-second">
                {tour.placeName}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="profile-common-posts">
      <div className="profile-edited-cart">{renderTourItems()}</div>
    </div>
  );
};

export default CartContent;
