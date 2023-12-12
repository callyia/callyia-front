import { useToggle } from "../../hooks";
import React, { useEffect, useState } from "react";
import "./Planning.css";
import Plan from "../../pages/Plan";
import PlaceCard from "../../pages/PlaceCard";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const plans = [
  {
    id: 1,
    lat: 35.14299044,
    lng: 129.03409987,
    name: "동의대",
    content: "경사가 쌉에바",
  },
  {
    id: 2,
    lat: 35.147,
    lng: 129.04,
    name: "부드러운움직임",
    content: "아따 부드럽다",
  },
  {
    id: 3,
    lat: 33.306037,
    lng: 126.289577,
    name: "오설록",
    content: "맛도리",
  },
  {
    id: 4,
    lat: 35.154297,
    lng: 129.05977,
    name: "더조은",
    content: "학원 ~",
  },
  {
    id: 5,
    lat: 35.150311,
    lng: 129.037077,
    name: "자취자취",
    content: "자취 ~",
  },
  {
    id: 6,
    lat: 33.35,
    lng: 126.333,
    name: "여긴어디고",
    content: "어디 ~",
  },
];

const placeCards1 = [
  { id: 1, lat: 33.306037, lng: 126.289577, name: "오설록" },
  { id: 2, lat: 35.150311, lng: 129.037077, name: "자취자취" },
  { id: 3, lat: 33.35, lng: 126.333, name: "여긴어디고" },
];

const placeCards2 = [
  { id: 1, lat: 35.14299044, lng: 129.03409987, name: "동의대" },
  { id: 2, lat: 35.147, lng: 129.04, name: "부드러운움직임" },
  { id: 3, lat: 35.154297, lng: 129.05977, name: "더조은" },
  { id: 4, lat: 35.150311, lng: 129.037077, name: "자취자취" },
];

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Planning() {
  const [planData, setPlanData] = useState(plans);

  // 드래그 앤 드롭이 끝났을 때 호출되는 함수
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      // 리스트 외부로 드래그된 경우 처리
      return;
    }

    const updatedPlans = Array.from(planData); // 현재 아이템 배열을 복사
    const [movedPlan] = updatedPlans.splice(result.source.index, 1); // 드래그된 아이템을 소스 인덱스에서 제거
    updatedPlans.splice(result.destination.index, 0, movedPlan); // 목적지 인덱스에 드래그된 아이템 삽입

    setPlanData(updatedPlans); // 상태 업데이트
    console.log(updatedPlans);
  };

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

  const updateEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updateBtn = document.getElementById("updateBtn");
      if (updateBtn) {
        updateBtn.click();
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
      if (text !== "") {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="사람사진"
                  />
                </div>
                <div className="flex-1 ml-3">
                  <p className="text-sm font-medium text-gray-900">콜이야</p>
                  <p className="mt-1 text-sm text-gray-500">
                    검색 내용 : {text}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex items-center justify-center w-full p-4 text-sm font-medium text-indigo-600 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
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
    if (titleInput.value != "") {
      titleText.textContent = titleInput.value;
      toast.success("이름 변경 성공!");
      titleInput.value = "";
    } else {
      toast.error("제목을 입력하세요.");
    }
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
            {placeCards1.map((placeCard) => (
              <PlaceCard placeCard={placeCard} onClick={Click} />
            ))}
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
            {placeCards2.map((placeCard) => (
              <PlaceCard placeCard={placeCard} onClick={Click} />
            ))}
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
          className="toggle-right-down btn btn-primary circle-btn"
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className="div-plan-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {planData.map((plan, index) => (
                  <Draggable
                    key={plan.id}
                    draggableId={plan.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Plan plan={plan} onClick={Click} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* <div className="div-plan-list">
          {plans.map((plan) => (
            <Plan plan={plan} onClick={Click} />
          ))}
        </div> */}
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
          <input
            type="text"
            id="titleInput"
            className="w-full border-b-2"
            onKeyPress={updateEnter}
          />
          <div className="w-full h-6"></div>
          <button className="float-right btn btn-warning" onClick={closeModal}>
            Close
          </button>
          <button
            className="float-right mr-1 btn btn-success"
            id="updateBtn"
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
