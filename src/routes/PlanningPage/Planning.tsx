import { useToggle } from "../../hooks";
import React, { useEffect, useState } from "react";
import "./Planning.css";
import Plan from "../../components/Plan";
import PlaceCard from "../../components/PlaceCard";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import axios from "axios";

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
    lat: 35.155735,
    lng: 129.058165,
    name: "서면시장",
    content: "우마이",
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
    lat: 35.156638,
    lng: 129.055955,
    name: "롯데백화점",
    content: "서면롯데백화점.",
  },
  {
    id: 7,
    lat: 35.157032,
    lng: 129.06303,
    name: "NC백화점",
    content: "NC백화점 서면점",
  },
  {
    id: 8,
    lat: 35.15294,
    lng: 129.059568,
    name: "삼정타워",
    content: "삼정타워",
  },
  {
    id: 9,
    lat: 35.16177,
    lng: 129.062347,
    name: "부전역",
    content: "부전역",
  },
];

const placeCards1 = [
  { id: 1, lat: 33.306037, lng: 126.289577, name: "오설록" },
  { id: 2, lat: 35.150311, lng: 129.037077, name: "자취자취" },
  { id: 3, lat: 33.35, lng: 126.333, name: "여긴어디고" },
  { id: 5, lat: 35.14299044, lng: 129.03409987, name: "동의대" },
  { id: 4, lat: 35.147, lng: 129.04, name: "부드러운움직임" },
  { id: 6, lat: 35.154297, lng: 129.05977, name: "더조은" },
  { id: 2, lat: 35.150311, lng: 129.037077, name: "자취자취" },
];

const placeCards2 = [
  { id: 5, lat: 35.14299044, lng: 129.03409987, name: "동의대" },
  { id: 2, lat: 35.147, lng: 129.04, name: "부드러운움직임" },
  { id: 3, lat: 35.154297, lng: 129.05977, name: "더조은" },
  { id: 4, lat: 35.150311, lng: 129.037077, name: "자취자취" },
];

declare global {
  interface Window {
    kakao: any;
  }
}

// 마커 생성과 삭제를 담당하는 마커 배열 변수
let markers: any[] = [];

// 배경 라인의 생성을 위한 좌표 배열 변수
var backLinePosition = [];
// 배경 라인의 생성을 담당하는 라인 변수
var backPolyline: any = null;

// 2개의 좌표에 대한 라인의 생성 및 삭제를 위한 좌표 배열 변수
var linePosition = [];
// 2개의 좌표에 대한 라인의 생성 및 삭제를 담당하는 라인 변수
var polyline: any = null;
// 2개의 좌표에 대한 라인의 거리정보를 표시하기 위한 변수
var distance;
var distanceContent;
var distanceOverlay: any = null;
var planDataPosition: any[] = [];

export default function Planning() {
  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);
  const [planData, setPlanData] = useState(plans);
  const [area1, toggleArea1] = useToggle();
  const [area2, toggleArea2] = useToggle();
  const [isModalOpen, setModalOpen] = useState(false);

  const showBackgroundLine = (planData: any[]) => {
    if (backPolyline) backPolyline.setMap(null);

    backLinePosition = planData.map(
      (plan) => new window.kakao.maps.LatLng(plan.lat, plan.lng)
    );
    backPolyline = new window.kakao.maps.Polyline({
      path: backLinePosition, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: "#5B5B5B", // 선의 색깔입니다
      strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });
    backPolyline.setMap(map);
  };

  // plan값의 리스트인 planData에 값에 따라 이전 마커들을 모두 지우고 새로운 마커로 업데이트해주는 함수
  const updateMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    markers = [];

    planData.forEach((plan) => {
      const markerPosition = new window.kakao.maps.LatLng(plan.lat, plan.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      markers.push(marker);
    });

    markers.forEach((marker) => {
      marker.setMap(map);
    });
  };

  // 드래그 앤 드롭이 끝났을 때 호출되는 함수
  const onDragEnd = (result: any) => {
    if (distanceOverlay) distanceOverlay.setMap(null);
    if (polyline) polyline.setMap(null);

    if (!result.destination) {
      // 리스트 외부로 드래그된 경우 처리
      return;
    }

    const updatedPlans = Array.from(planData); // 현재 아이템 배열을 복사
    const [movedPlan] = updatedPlans.splice(result.source.index, 1); // 드래그된 아이템을 소스 인덱스에서 제거

    console.log(result);
    if (result.destination.droppableId != "droppable_trash")
      updatedPlans.splice(result.destination.index, 0, movedPlan); // 목적지 인덱스에 드래그된 아이템 삽입

    setPlanData(updatedPlans); // 상태 업데이트
    console.log(updatedPlans);

    updateMarker();
    console.log(`markers : ${markers}`);
  };

  const Click = (lat: number, lng: number, index: number) => {
    if (distanceOverlay) distanceOverlay.setMap(null);
    if (polyline) polyline.setMap(null);
    panTo(lat, lng);
    console.log(`index : ${index}`);

    if (index >= 1) {
      console.log(planData[index - 1].name);
      console.log(planData[index].name);

      var beforePos = new window.kakao.maps.LatLng(
        planData[index - 1].lat,
        planData[index - 1].lng
      );
      var currentPos = new window.kakao.maps.LatLng(
        planData[index].lat,
        planData[index].lng
      );
      linePosition = [beforePos, currentPos];
      // console.log(linePosition[0]);
      // console.log(linePosition[1]);

      polyline = new window.kakao.maps.Polyline({
        path: linePosition, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#f21818", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      polyline.setMap(map);

      distance = Math.round(polyline.getLength());
      distanceContent = getTimeHTML(distance);
      console.log(distance);

      showDistance(distanceContent, currentPos);
    }
  };

  const plusClick = (
    id: number,
    lat: number,
    lng: number,
    name: string,
    isBtnClick: boolean
  ) => {
    if (distanceOverlay) distanceOverlay.setMap(null);
    if (polyline) polyline.setMap(null);

    panTo(lat, lng);
    console.log(`id : ${id} / name : ${name}`);
    if (isBtnClick == true) {
      setPlanData([
        ...planData,
        {
          id: id,
          lat: lat,
          lng: lng,
          name: name,
          content: "plus",
        },
      ]);
      updateMarker();
    }
  };

  const Marker = (lat: number, lng: number) => {
    var markerPosition = new window.kakao.maps.LatLng(lat, lng);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  };

  const showDistance = (content: any, position: any) => {
    if (distanceOverlay) {
      // 커스텀오버레이가 생성된 상태이면

      // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
      distanceOverlay.setPosition(position);
      distanceOverlay.setContent(content);
    } else {
      // 커스텀 오버레이가 생성되지 않은 상태이면

      // 커스텀 오버레이를 생성하고 지도에 표시합니다
      distanceOverlay = new window.kakao.maps.CustomOverlay({
        map: map, // 커스텀오버레이를 표시할 지도입니다
        content: content, // 커스텀오버레이에 표시할 내용입니다
        position: position, // 커스텀오버레이를 표시할 위치입니다.
        xAnchor: 0,
        yAnchor: 0,
        zIndex: 3,
      });
    }

    distanceOverlay.setMap(map);
  };

  const getTimeHTML = (distance: any) => {
    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    var walkkTime = (distance / 67) | 0;
    var walkHour = "",
      walkMin = "";

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
      walkHour =
        '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
    }
    walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    var bycicleTime = (distance / 227) | 0;
    var bycicleHour = "",
      bycicleMin = "";

    // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
    if (bycicleTime > 60) {
      bycicleHour =
        '<span class="number">' + Math.floor(bycicleTime / 60) + "</span>시간 ";
    }
    bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

    // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
    var content =
      '<div style="width: 200px; height: 105px; background-color: white; border: 2px solid lightgray; border-radius: 5px;"><ul>';
    content += "    <li>";
    content +=
      '        <span style="display: inline-block; width: 70px; padding: 5px;">총거리 </span><span style="color: red; font-weight: bold;">' +
      distance +
      '</span><span style="font-weight: bold;">m</span>';
    content += "    </li>";
    content += "    <li>";
    content +=
      '        <span style="display: inline-block; width: 70px; padding: 5px;">도보 </span><span style="font-weight: bold;">' +
      walkHour +
      walkMin +
      "</span>";
    content += "    </li>";
    content += "    <li>";
    content +=
      '        <span style="display: inline-block; width: 70px; padding: 5px;">자전거 </span><span style="font-weight: bold;">' +
      bycicleHour +
      bycicleMin +
      "</span>";
    content += "    </li>";
    content += "</ul></div>";

    return content;
  };

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
    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;

    // 여따가 나중에 백엔드에서 DB로 보내는 코드 작성할 것!
    console.log("");
    console.log("============저장을 시도합니다============");
    console.log("타이틀 : " + titleText.textContent);
    console.log("-----Plan Data-----");
    console.log(planData);
    console.log("=======================================");
    console.log("");
    // 저장 성공 시
    toast.success("저장 성공!");
  };

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
  }, []);

  const panTo = (lat: number, lng: number) => {
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };

  updateMarker();
  showBackgroundLine(planData);

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
            {placeCards1.map((placeCard, index) => (
              <PlaceCard
                key={index}
                placeCard={placeCard}
                onClick={plusClick}
              />
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
            {placeCards2.map((placeCard, index) => (
              <PlaceCard
                key={index}
                placeCard={placeCard}
                onClick={plusClick}
              />
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
                    key={`${index}`}
                    draggableId={`${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Plan
                          plan={plan}
                          onClick={() => Click(plan.lat, plan.lng, index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable_trash">
            {(provided) => (
              <div
                className="div-plan-trash"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
