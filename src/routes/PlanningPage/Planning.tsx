import { useToggle } from "../../hooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Planning.css";
import Plan from "../../components/Plan";
import PlaceCard from "../../components/PlaceCard";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const plans: Array<{
  placeId: number;
  placeName: string;
  address: string;
  image: string;
  latitude: number;
  longitude: number;
  placeContent: string;
}> = [];

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

export default function Planning() {
  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);
  const [planData, setPlanData] = useState(plans);
  const [searchData, setSearchData] = useState([]);
  const [area1, toggleArea1] = useToggle();
  const [area2, toggleArea2] = useToggle();
  const [isModalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pnoParam = queryParams.get("pno");
  const titleParam = queryParams.get("title");
  const navigate = useNavigate();

  const showBackgroundLine = (planData: any[]) => {
    if (backPolyline) backPolyline.setMap(null);

    backLinePosition = planData.map(
      (plan) => new window.kakao.maps.LatLng(plan.latitude, plan.longitude)
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

    planData.forEach((plan, index) => {
      const imageSrc =
          "../../../dummyimages/NumberImage/number" + (index + 1) + ".png", // 마커이미지의 주소입니다
        imageSize = new window.kakao.maps.Size(35, 70), // 마커이미지의 크기입니다
        imageOption = { offset: new window.kakao.maps.Point(18, 48) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const markerPosition = new window.kakao.maps.LatLng(
        plan.latitude,
        plan.longitude
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
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
      console.log(planData[index - 1].placeName);
      console.log(planData[index].placeName);

      var beforePos = new window.kakao.maps.LatLng(
        planData[index - 1].latitude,
        planData[index - 1].longitude
      );
      var currentPos = new window.kakao.maps.LatLng(
        planData[index].latitude,
        planData[index].longitude
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
      distanceContent = getTimeHTML(distance, planData[index].placeName);
      console.log(distance);

      showDistance(distanceContent, currentPos);
    }
  };

  const plusClick = (
    placeId: number,
    placeName: string,
    address: string,
    image: string,
    latitude: number,
    longitude: number,
    placeContent: string,
    isBtnClick: boolean
  ) => {
    if (distanceOverlay) distanceOverlay.setMap(null);
    if (polyline) polyline.setMap(null);

    panTo(latitude, longitude);
    console.log(`id : ${placeId} / name : ${placeName}`);
    if (isBtnClick == true) {
      if (planData.length >= 99)
        toast.error("플랜은 최대 99개까지 저장할 수 있어요!");
      else {
        setPlanData([
          ...planData,
          {
            placeId: placeId,
            placeName: placeName,
            address: address,
            image: image,
            latitude: latitude,
            longitude: longitude,
            placeContent: placeContent,
          },
        ]);
        updateMarker();
      }
    }
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

  const getTimeHTML = (distance: any, placeName: string) => {
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
      '<div style="width: 200px; height: 135px; background-color: dimgray; border: 2px solid lightgray; border-radius: 5px;"><ul>';

    content += "    <li>";
    content +=
      '        <span style="display: inline-block; color: #4a4e69; font-weight: 900; text-align: center; width:100%; height:30px; line-height: 30px; background-color: lightgray">' +
      placeName +
      "</span>";
    content += "    </li>";

    content += "    <li>";
    content +=
      '        <span style="display: inline-block; width: 70px; padding: 5px; color: white">총거리 </span><span style="color: red; font-weight: bold;">' +
      distance +
      '</span><span style="font-weight: bold;color: white">m</span>';
    content += "    </li>";
    content += "    <li>";
    content +=
      '        <span style="color: white; display: inline-block; width: 70px; padding: 5px;">도보 </span><span style="color: white; font-weight: bold;">' +
      walkHour +
      walkMin +
      "</span>";
    content += "    </li>";
    content += "    <li>";
    content +=
      '        <span style="color: white; display: inline-block; width: 70px; padding: 5px;">자전거 </span><span style="color: white; font-weight: bold;">' +
      bycicleHour +
      bycicleMin +
      "</span>";
    content += "    </li>";
    content += "</ul></div>";

    return content;
  };

  const fetchSearch = (searchKeyword: string) => {
    // axios
    //   .get("http://localhost:8080/Callyia/planning/search", {
    //     params: { keyword: searchKeyword },
    //   })
    //   .then((response) => console.log(response));

    const url = `http://localhost:8080/Callyia/planning/search?keyword=${searchKeyword}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setSearchData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

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
        fetchSearch(text);
      } else toast.error("검색어를 입력해주세요.");
    }
  };

  const saveBtnClick = () => {
    if (!pnoParam) {
      const titleText = document.querySelector(
        "#titleText"
      ) as HTMLHeadingElement;

      const url = `http://localhost:8080/Callyia/planning/save`;

      const requestBody = {
        planDetailDTOs: planData.map((plan, index) => ({
          pno: null,
          placeId: plan.placeId,
          sequence: index,
        })),
        planDTO: {
          title: titleText.textContent,
          userId: "Hello UserID",
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 전송하는 데이터 타입 설정
        },
        body: JSON.stringify(requestBody), // 데이터를 JSON 문자열로 변환하여 전송
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("data : " + data);
          navigate("/PlanningPage?pno=" + data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      toast.success("저장 성공!");
    } else {
      const titleText = document.querySelector(
        "#titleText"
      ) as HTMLHeadingElement;

      const url = `http://localhost:8080/Callyia/planning/update`;

      const requestBody = {
        planDetailDTOs: planData.map((plan, index) => ({
          pno: pnoParam,
          placeId: plan.placeId,
          sequence: index,
        })),
        planDTO: {
          pno: pnoParam,
          title: titleText.textContent,
          userId: "Hello UserID",
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 전송하는 데이터 타입 설정
        },
        body: JSON.stringify(requestBody), // 데이터를 JSON 문자열로 변환하여 전송
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("data : " + data);
          navigate("/PlanningPage?pno=" + data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      toast.success("저장 성공!");
    }
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

  useEffect(() => {
    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;

    if (titleParam) {
      titleText.textContent = titleParam;
    }
  });

  useEffect(() => {
    if (pnoParam) {
      const planFromDB: any = null;

      const url = `http://localhost:8080/Callyia/planning/getDB?pno=${pnoParam}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setPlanData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (pnoParam) {
      const planFromDB: any = null;

      const url = `http://localhost:8080/Callyia/planning/getTitle?pno=${pnoParam}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.text();
        })
        .then((data) => {
          const titleText = document.querySelector(
            "#titleText"
          ) as HTMLHeadingElement;

          if (data) {
            titleText.textContent = data;
          }
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

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
            {searchData.map((placeCard, index) => (
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
            {/* {placeCards2.map((placeCard, index) => (
              <PlaceCard
                key={index}
                placeCard={placeCard}
                onClick={plusClick}
              />
            ))} */}
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
                          onClick={() =>
                            Click(plan.latitude, plan.longitude, index)
                          }
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
