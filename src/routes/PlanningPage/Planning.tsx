import { useToggle } from "../../hooks";
import React, { useEffect, useState } from "react";
import "./Planning.css";
import Plan from "../../pages/Plan";
import PlaceCard from "../../pages/PlaceCard";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Planning() {
  const Click = (lat: number, lng: number) => {
    panTo(lat, lng);
  };

  // const Marker = (lat: number, lng: number) => {
  //   var markerPosition = new window.kakao.maps.LatLng(lat, lng);

  //   // 마커를 생성합니다
  //   const marker = new window.kakao.maps.Marker({
  //     position: markerPosition,
  //   });

  //   marker.setMap(map);
  // };

  const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchBtn = document.getElementById("searchBtn");
      if (searchBtn) {
        searchBtn.click();
      }
    }
  };

  const searchBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (searchInput) {
      const text = searchInput.value;
      if (text !== "") alert(`${text}`);
    }
  };

  const saveBtnClick = () => {
    toast.success("저장 성공!");
  };

  const [area1, toggleArea1] = useToggle();
  const [area2, toggleArea2] = useToggle();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateTitle = () => {
    setModalOpen(false);
    const titleInput = document.querySelector(
      "#titleInput"
    ) as HTMLInputElement;
    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;
    titleText.textContent = titleInput.value;
    titleInput.value = "";

    toast.success("이름 변경 성공!");
  };

  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);

  useEffect(() => {
    const mainPosition = new window.kakao.maps.LatLng(
      35.14299044,
      129.03409987
    );
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: mainPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const newMap = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMap(newMap);

    var markerPosition = new window.kakao.maps.LatLng(
      35.14299044,
      129.03409987
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(newMap);
  }, []);

  const panTo = (lat: number, lng: number) => {
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };

  return (
    <div className="div-container">
      {/* 토글 버튼 관련 컴포넌트 */}
      {area1 && (
        <div
          style={{ width: "800px", height: "350px" }}
          className="toggle-right-up toggle-div bg-slate-600"
        >
          <div className="toggle-right-search-div1">
            <button
              className="toggle-right-up-X"
              onClick={toggleArea1}
            ></button>
          </div>
          <div className="toggle-right-search-div2">
            <input
              id="searchInput"
              type="text"
              className="toggle-search-input"
              onKeyPress={searchEnter}
            />
            <button
              id="searchBtn"
              className="toggle-search-button"
              onClick={searchBtnClick}
            >
              검색
            </button>
          </div>
          <div className="toggle-right-search-div3">
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
          </div>
        </div>
      )}
      {!area1 && (
        <button
          className="toggle-right-up btn circle-btn btn-primary"
          onClick={toggleArea1}
        >
          click
        </button>
      )}
      {area2 && (
        <div
          style={{ width: "800px", height: "350px" }}
          className="toggle-right-down toggle-div bg-slate-300"
        >
          <div className="toggle-right-basket-div1">
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
              onClick={Click}
            />
            <PlaceCard
              placeCard={{
                lat: 35.14299044,
                lng: 129.03409987,
                name: "동의대",
              }}
              onClick={Click}
            />
          </div>
          <div className="toggle-right-basket-div2">
            <button
              className="toggle-right-down-X"
              onClick={toggleArea2}
            ></button>
          </div>
        </div>
      )}
      {!area2 && (
        <button
          className="toggle-right-down btn btn-lg btn-primary circle-btn"
          onClick={toggleArea2}
        >
          click
        </button>
      )}

      {/* 플랜 리스트 관련 컴포넌트 (좌측) */}
      <div className="div-left">
        <div className="div-left-title">
          <h2 id="titleText">초기 제목</h2>
        </div>
        <div className="div-left-writer">
          <h1>Writer</h1>
        </div>
        <div className="div-plan-list">
          <Plan
            plan={{ lat: 35.14299044, lng: 129.03409987, name: "동의대" }}
            onClick={Click}
          />
          <Plan
            plan={{ lat: 35.147, lng: 129.04, name: "부드러운움직임" }}
            onClick={Click}
          />
          <Plan
            plan={{
              lat: 33.306037,
              lng: 126.289577,
              name: "오설록",
            }}
            onClick={Click}
          />
          <Plan
            plan={{ lat: 35.154297, lng: 129.05977, name: "더조은" }}
            onClick={Click}
          />
          <Plan
            plan={{ lat: 35.150311, lng: 129.037077, name: "자취자취" }}
            onClick={Click}
          />
          <Plan
            plan={{ lat: 33.35, lng: 126.333, name: "여긴어디고" }}
            onClick={Click}
          />
          <Plan plan={{ lat: 10, lng: 10.23, name: "name" }} onClick={Click} />
          <Plan plan={{ lat: 10, lng: 10.23, name: "name" }} onClick={Click} />
        </div>
        <div className="div-plan-button">
          <button className="float-right m-1 btn" onClick={openModal}>
            여행 이름 변경
          </button>
          <button className="float-right mt-1 btn" onClick={saveBtnClick}>
            저장
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={isModalOpen}>
        asdasd
        <ModalContent>
          <h1>변경할 여행의 이름을 입력하세요.</h1>
          <div className="w-full h-6"></div>
          <input type="text" id="titleInput" className="w-full border-b-2" />
          <div className="w-full h-6"></div>
          <button className="float-right btn btn-warning" onClick={closeModal}>
            Close
          </button>
          <button
            className="float-right mr-1 btn btn-success"
            onClick={updateTitle}
          >
            Save
          </button>
        </ModalContent>
      </Modal>

      {/* 지도 관련 컴포넌트 (우측) */}
      <div className="div-right">
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
