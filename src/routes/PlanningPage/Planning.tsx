import { useToggle } from "../../hooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Planning.css";
import Plan from "../../components/Plan";
import PlaceCard from "../../components/PlaceCard";
import toast, { Toaster } from "react-hot-toast";
import { Modal, ModalContent } from "../../theme/daisyui/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";

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
var pd: any[] = [];
// 2개의 좌표에 대한 라인의 생성 및 삭제를 담당하는 라인 변수
var polyline: any = null;
// 2개의 좌표에 대한 라인의 거리정보를 표시하기 위한 변수
var distance;
var distanceContent: any;
var distanceOverlay: any = null;

var planDay: any = null;

export default function Planning() {
  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);
  const [planData, setPlanData] = useState(plans);
  const [planData2, setPlanData2] = useState(plans);
  const [planData3, setPlanData3] = useState(plans);
  const [planData4, setPlanData4] = useState(plans);
  const [planData5, setPlanData5] = useState(plans);
  const [planData6, setPlanData6] = useState(plans);
  const [planData7, setPlanData7] = useState(plans);

  const [searchData, setSearchData] = useState([]);
  const [area1, toggleArea1] = useToggle();
  const [area2, toggleArea2] = useToggle();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPostModalOpen, setPostModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pnoParam = queryParams.get("pno");
  const titleParam = queryParams.get("title");
  const dayParam = queryParams.get("day");
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

    pd = [
      ...planData,
      ...planData2,
      ...planData3,
      ...planData4,
      ...planData5,
      ...planData6,
      ...planData7,
    ];

    markers = [];

    // planData.forEach((plan, index) => {
    pd.forEach((plan, index) => {
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
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // 같은 droppable 영역에서의 이동
    if (source.droppableId === destination.droppableId) {
      const items = getPlanDataByDroppableId(source.droppableId);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      updatePlanDataByDroppableId(source.droppableId, items);
    }
    // 다른 droppable 영역으로 이동
    else {
      const sourceItems = getPlanDataByDroppableId(source.droppableId);
      const destItems = getPlanDataByDroppableId(destination.droppableId);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      updatePlanDataByDroppableId(source.droppableId, sourceItems);
      updatePlanDataByDroppableId(destination.droppableId, destItems);
    }

    updateMarker();

    if (polyline) polyline.setMap(null);
  };

  const getPlanDataByDroppableId = (droppableId: any) => {
    switch (droppableId) {
      case "droppable1":
        return planData.slice();
      case "droppable2":
        return planData2.slice();
      case "droppable3":
        return planData3.slice();
      case "droppable4":
        return planData4.slice();
      case "droppable5":
        return planData5.slice();
      case "droppable6":
        return planData6.slice();
      case "droppable7":
        return planData7.slice();
      // Add more cases as needed for additional droppables
      default:
        return [];
    }
  };

  const updatePlanDataByDroppableId = (droppableId: any, items: any) => {
    switch (droppableId) {
      case "droppable1":
        setPlanData(items);
        break;
      case "droppable2":
        setPlanData2(items);
        break;
      case "droppable3":
        setPlanData3(items);
        break;
      case "droppable4":
        setPlanData4(items);
        break;
      case "droppable5":
        setPlanData5(items);
        break;
      case "droppable6":
        setPlanData6(items);
        break;
      case "droppable7":
        setPlanData7(items);
        break;

      // Add more cases as needed for additional droppables
      default:
        break;
    }
  };

  const Click = (
    lat: number,
    lng: number,
    index: number,
    droppableIndex: number
  ) => {
    const dropIndex = droppableIndex + 1;

    if (distanceOverlay) distanceOverlay.setMap(null);
    if (polyline) polyline.setMap(null);
    panTo(lat, lng);

    if (index >= 1) {
      if (dropIndex == 1) {
        var beforePos = new window.kakao.maps.LatLng(
          planData[index - 1].latitude,
          planData[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData[index].latitude,
          planData[index].longitude
        );
      } else if (dropIndex == 2) {
        var beforePos = new window.kakao.maps.LatLng(
          planData2[index - 1].latitude,
          planData2[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData2[index].latitude,
          planData2[index].longitude
        );
      } else if (dropIndex == 3) {
        var beforePos = new window.kakao.maps.LatLng(
          planData3[index - 1].latitude,
          planData3[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData3[index].latitude,
          planData3[index].longitude
        );
      } else if (dropIndex == 4) {
        var beforePos = new window.kakao.maps.LatLng(
          planData4[index - 1].latitude,
          planData4[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData4[index].latitude,
          planData4[index].longitude
        );
      } else if (dropIndex == 5) {
        var beforePos = new window.kakao.maps.LatLng(
          planData5[index - 1].latitude,
          planData5[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData5[index].latitude,
          planData5[index].longitude
        );
      } else if (dropIndex == 6) {
        var beforePos = new window.kakao.maps.LatLng(
          planData6[index - 1].latitude,
          planData6[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData6[index].latitude,
          planData6[index].longitude
        );
      } else if (dropIndex == 7) {
        var beforePos = new window.kakao.maps.LatLng(
          planData7[index - 1].latitude,
          planData7[index - 1].longitude
        );
        var currentPos = new window.kakao.maps.LatLng(
          planData7[index].latitude,
          planData7[index].longitude
        );
      }

      linePosition = [beforePos, currentPos];

      polyline = new window.kakao.maps.Polyline({
        path: linePosition, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#f21818", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      polyline.setMap(map);

      distance = Math.round(polyline.getLength());

      if (dropIndex == 1)
        distanceContent = getTimeHTML(distance, planData[index].placeName);
      else if (dropIndex == 2)
        distanceContent = getTimeHTML(distance, planData2[index].placeName);
      else if (dropIndex == 3)
        distanceContent = getTimeHTML(distance, planData3[index].placeName);
      else if (dropIndex == 4)
        distanceContent = getTimeHTML(distance, planData4[index].placeName);
      else if (dropIndex == 5)
        distanceContent = getTimeHTML(distance, planData5[index].placeName);
      else if (dropIndex == 6)
        distanceContent = getTimeHTML(distance, planData6[index].placeName);
      else if (dropIndex == 7)
        distanceContent = getTimeHTML(distance, planData7[index].placeName);

      showDistance(distanceContent, currentPos);
    } else if (index == 0) {
      if (dropIndex != 1) {
        if (dropIndex == 2) {
          var beforePos = new window.kakao.maps.LatLng(
            planData[planData.length - 1].latitude,
            planData[planData.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData2[index].latitude,
            planData2[index].longitude
          );
        } else if (dropIndex == 3) {
          var beforePos = new window.kakao.maps.LatLng(
            planData2[planData2.length - 1].latitude,
            planData2[planData2.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData3[index].latitude,
            planData3[index].longitude
          );
        } else if (dropIndex == 4) {
          var beforePos = new window.kakao.maps.LatLng(
            planData3[planData3.length - 1].latitude,
            planData3[planData3.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData4[index].latitude,
            planData4[index].longitude
          );
        } else if (dropIndex == 5) {
          var beforePos = new window.kakao.maps.LatLng(
            planData4[planData4.length - 1].latitude,
            planData4[planData4.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData5[index].latitude,
            planData5[index].longitude
          );
        } else if (dropIndex == 6) {
          var beforePos = new window.kakao.maps.LatLng(
            planData5[planData5.length - 1].latitude,
            planData5[planData5.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData6[index].latitude,
            planData6[index].longitude
          );
        } else if (dropIndex == 7) {
          var beforePos = new window.kakao.maps.LatLng(
            planData6[planData6.length - 1].latitude,
            planData6[planData6.length - 1].longitude
          );
          var currentPos = new window.kakao.maps.LatLng(
            planData7[index].latitude,
            planData7[index].longitude
          );
        }

        linePosition = [beforePos, currentPos];

        polyline = new window.kakao.maps.Polyline({
          path: linePosition, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: "#f21818", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });
        polyline.setMap(map);

        distance = Math.round(polyline.getLength());

        if (dropIndex == 1)
          distanceContent = getTimeHTML(distance, planData[index].placeName);
        else if (dropIndex == 2)
          distanceContent = getTimeHTML(distance, planData2[index].placeName);
        else if (dropIndex == 3)
          distanceContent = getTimeHTML(distance, planData3[index].placeName);
        else if (dropIndex == 4)
          distanceContent = getTimeHTML(distance, planData4[index].placeName);
        else if (dropIndex == 5)
          distanceContent = getTimeHTML(distance, planData5[index].placeName);
        else if (dropIndex == 6)
          distanceContent = getTimeHTML(distance, planData6[index].placeName);
        else if (dropIndex == 7)
          distanceContent = getTimeHTML(distance, planData7[index].placeName);

        showDistance(distanceContent, currentPos);
      }
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
    if (isBtnClick == true) {
      if (pd.length >= 99)
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

  useEffect(() => {
    const planDataArray = [
      planData,
      planData2,
      planData3,
      planData4,
      planData5,
      planData6,
      planData7,
    ];

    const updatedDroppables = droppables.map((item, index) => {
      return { ...item, data: planDataArray[index] };
    });

    setDroppables(updatedDroppables);
  }, [
    planData,
    planData2,
    planData3,
    planData4,
    planData5,
    planData6,
    planData7,
  ]);

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

  const fetchByPno = async (pno: number) => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await axios.get(
        `http://localhost:8080/Callyia/access/resource-by-pno/${pno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  const fetchSearch = (searchKeyword: string) => {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

      const planData_day = planData.map((plan, index) => {
        return { ...plan, day: 1 };
      });
      const planData2_day = planData2.map((plan, index) => {
        return { ...plan, day: 2 };
      });
      const planData3_day = planData3.map((plan, index) => {
        return { ...plan, day: 3 };
      });
      const planData4_day = planData4.map((plan, index) => {
        return { ...plan, day: 4 };
      });
      const planData5_day = planData5.map((plan, index) => {
        return { ...plan, day: 5 };
      });
      const planData6_day = planData6.map((plan, index) => {
        return { ...plan, day: 6 };
      });
      const planData7_day = planData7.map((plan, index) => {
        return { ...plan, day: 7 };
      });

      const planData_sum = [
        ...planData_day,
        ...planData2_day,
        ...planData3_day,
        ...planData4_day,
        ...planData5_day,
        ...planData6_day,
        ...planData7_day,
      ];

      const requestBody = {
        planDetailDTOs: planData_sum.map((plan, index) => ({
          pno: null,
          placeId: plan.placeId,
          day: plan.day,
          sequence: index,
        })),
        planDTO: {
          title: titleText.textContent,
          day: dayParam ? dayParam : 1,
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

      const planData_day = planData.map((plan, index) => {
        return { ...plan, day: 1 };
      });
      const planData2_day = planData2.map((plan, index) => {
        return { ...plan, day: 2 };
      });
      const planData3_day = planData3.map((plan, index) => {
        return { ...plan, day: 3 };
      });
      const planData4_day = planData4.map((plan, index) => {
        return { ...plan, day: 4 };
      });
      const planData5_day = planData5.map((plan, index) => {
        return { ...plan, day: 5 };
      });
      const planData6_day = planData6.map((plan, index) => {
        return { ...plan, day: 6 };
      });
      const planData7_day = planData7.map((plan, index) => {
        return { ...plan, day: 7 };
      });

      const planData_sum = [
        ...planData_day,
        ...planData2_day,
        ...planData3_day,
        ...planData4_day,
        ...planData5_day,
        ...planData6_day,
        ...planData7_day,
      ];

      const requestBody = {
        planDetailDTOs: planData_sum.map((plan, index) => ({
          pno: pnoParam,
          placeId: plan.placeId,
          day: plan.day,
          sequence: index,
        })),
        planDTO: {
          pno: pnoParam,
          title: titleText.textContent,
          day: dayParam ? dayParam : 1,
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

  const openPostModal = () => {
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
  };

  const updateTitle = () => {
    setModalOpen(false);
    const titleInput = document.querySelector(
      "#titleInput"
    ) as HTMLInputElement;
    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;
    const updateButton = document.querySelector(
      "#updateBtn"
    ) as HTMLButtonElement;

    if (titleInput.value != "") {
      titleText.textContent = titleInput.value;
      toast.success("이름 변경 성공!");
      titleInput.value = "";
    } else {
      toast.error("제목을 입력하세요.");
    }
    titleInput.blur();
    updateButton.blur();
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

  const setDay = (dayParam: number) => {
    const updatedDroppables = Array.from({ length: dayParam }, (_, index) => ({
      id: `droppable${index + 1}`,
      title: `Day ${index + 1}`,
      data: getPlanDataByDroppableId(`droppable${index + 1}`),
    }));

    return updatedDroppables;
  };

  const [droppables, setDroppables] = useState([
    { id: "droppable1", title: "Day 1", data: planData },
  ]);

  useEffect(() => {
    if (dayParam) {
      const updatedDroppables = setDay(parseInt(dayParam, 10));
      planDay = parseInt(dayParam, 10);
      setDroppables(updatedDroppables);
    } else if (!dayParam && !pnoParam) {
      planDay = 1;
    }
    console.log(planDay);
  }, []);

  useEffect(() => {
    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;

    if (titleParam) {
      titleText.textContent = titleParam;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      var planData_tour;
      var planData_day;
      if (pnoParam) {
        fetchByPno(parseInt(pnoParam, 10));

        const url1 = `http://localhost:8080/Callyia/planning/getDB?pno=${pnoParam}`;
        const url2 = `http://localhost:8080/Callyia/planning/getDay?pno=${pnoParam}`;

        try {
          const response1 = await fetch(url1);
          if (!response1.ok) {
            throw new Error(
              `Network response was not ok: ${response1.statusText}`
            );
          }
          const data1 = await response1.json();

          const response2 = await fetch(url2);
          if (!response2.ok) {
            throw new Error(
              `Network response was not ok: ${response2.statusText}`
            );
          }
          const data2 = await response2.json();

          var newd1: typeof plans = [];
          var newd2: typeof plans = [];
          var newd3: typeof plans = [];
          var newd4: typeof plans = [];
          var newd5: typeof plans = [];
          var newd6: typeof plans = [];
          var newd7: typeof plans = [];

          data1.map((data: any, index: any) => {
            if (data2[index] == 1) newd1 = [...newd1, data];
            else if (data2[index] == 2) newd2 = [...newd2, data];
            else if (data2[index] == 3) newd3 = [...newd3, data];
            else if (data2[index] == 4) newd4 = [...newd4, data];
            else if (data2[index] == 5) newd5 = [...newd5, data];
            else if (data2[index] == 6) newd6 = [...newd6, data];
            else if (data2[index] == 7) newd7 = [...newd7, data];
          });
          setPlanData([...planData, ...newd1]);
          setPlanData2([...planData, ...newd2]);
          setPlanData3([...planData, ...newd3]);
          setPlanData4([...planData, ...newd4]);
          setPlanData5([...planData, ...newd5]);
          setPlanData6([...planData, ...newd6]);
          setPlanData7([...planData, ...newd7]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pnoParam) {
      const url = `http://localhost:8080/Callyia/planning/getPlan?pno=${pnoParam}`;

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
          const titleText = document.querySelector(
            "#titleText"
          ) as HTMLHeadingElement;

          if (data.title) {
            titleText.textContent = data.title;
          }

          if (data.day) {
            planDay = data.day;
            setDroppables(setDay(planDay));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const [inputValues, setInputValues] = useState<
    Array<Array<{ [key: string]: string }>>
  >([]);

  const handleInputChange = (day: any, index: any, type: any, value: any) => {
    setInputValues((prevValues) => {
      // Copy the previous values
      const newValues = [...prevValues];
      // Initialize the array for the specific day if not exists
      newValues[day - 1] = newValues[day - 1] || [];
      // const placeId = [
      //   ...planData,
      //   ...planData2,
      //   ...planData3,
      //   ...planData4,
      //   ...planData5,
      //   ...planData6,
      //   ...planData7,
      // ][index].placeId;

      var placeId;

      if (day == 1) {
        placeId = planData[index].placeId;
      } else if (day == 2) {
        placeId = planData2[index].placeId;
      } else if (day == 3) {
        placeId = planData3[index].placeId;
      } else if (day == 4) {
        placeId = planData4[index].placeId;
      } else if (day == 5) {
        placeId = planData5[index].placeId;
      } else if (day == 6) {
        placeId = planData6[index].placeId;
      } else if (day == 7) {
        placeId = planData7[index].placeId;
      }

      // Update the value for the specific input
      newValues[day - 1][index] = newValues[day - 1][index] || {
        day,
        detailImages: "",
        tip: "",
        place_id: placeId,
        dno: null,
        sno: null,
      };
      newValues[day - 1][index][type] = value;
      return newValues;
    });
  };

  const handleButtonClick = () => {
    const flattenedValues = inputValues.flatMap((dayValues) => dayValues || []);
    console.log(flattenedValues);

    const planLength = [
      ...planData,
      ...planData2,
      ...planData3,
      ...planData4,
      ...planData5,
      ...planData6,
      ...planData7,
    ].length;

    if (planLength != flattenedValues.length) {
      toast.error("각 계획별로 사진이나 팁을 남겨주세요!");
      return;
    }

    console.log("AFTER");

    const titleText = document.querySelector(
      "#titleText"
    ) as HTMLHeadingElement;

    const url = `http://localhost:8080/Callyia/planning/post`;

    const requestBody = {
      detailScheduleDTOs: flattenedValues,
      scheduleDTO: {
        sno: null,
        total_Day: planDay,
        member_email: "Hello UserID",
        sName: titleText.textContent,
      },
    };

    console.log(JSON.stringify(requestBody));

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
        console.log(data);
        navigate("/SchedulePage/" + data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const dndListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#fbfbf2" : "white",
  });

  const dndTrashStyle = (isDraggingOver: any) => ({
    backgroundColor: isDraggingOver ? "#343a40" : "#e9ecef",
    backgroundImage: isDraggingOver
      ? `url("../../../dummyimages/trash_white.png")`
      : `url("../../../dummyimages/trash_black.png")`,
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });

  updateMarker();
  showBackgroundLine(pd);

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
          <div className="div-plan-list">
            {droppables.map((droppable, droppableIndex) => (
              <Droppable key={droppable.id} droppableId={droppable.id}>
                {(provided, snapshot) => (
                  <div
                    className="day-plan-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={dndListStyle(snapshot.isDraggingOver)}
                  >
                    <div className="day-plan-title">{droppable.title}</div>
                    <div>
                      {droppable.data.map((plan, index) => (
                        <Draggable
                          key={`${droppableIndex}-${index}`}
                          draggableId={`${droppableIndex}-${index}`}
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
                                  Click(
                                    plan.latitude,
                                    plan.longitude,
                                    index,
                                    droppableIndex
                                  )
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
          <Droppable droppableId="droppable_trash">
            {(provided, snapshot) => (
              <div
                className="div-plan-trash"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={dndTrashStyle(snapshot.isDraggingOver)}
              >
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="div-plan-button">
            <button className="float-right mt-1 mr-1 btn" onClick={openModal}>
              여행 이름 변경
            </button>
            <button
              className="float-right mt-1 mr-1 btn"
              onClick={saveBtnClick}
            >
              저장
            </button>
            <button
              className="float-right mt-1 mr-1 btn"
              onClick={openPostModal}
            >
              포스팅
            </button>
          </div>
        </DragDropContext>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={isModalOpen}>
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

      <Modal open={isPostModalOpen}>
        <ModalContent className="post-modal">
          <div className="post-modal-top">
            계획을 포스팅하여 사람들과 공유해보세요.
          </div>
          <div className="post-modal-div">
            {Array.from({ length: planDay }, (_, index) => (
              <div key={index} className="post-modal-day-div">
                <div className="post-modal-day-title">
                  <span className="post-modal-day-title-text">
                    Day {index + 1}
                  </span>
                </div>
                {index + 1 == 1 &&
                  planData.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 2 &&
                  planData2.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 3 &&
                  planData3.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 4 &&
                  planData4.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 5 &&
                  planData5.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 6 &&
                  planData6.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
                {index + 1 == 7 &&
                  planData7.map((plan, i) => (
                    <div key={`${index}-${i}`}>
                      <h1 className="post-modal-day-placeName">
                        {plan.placeName}
                      </h1>
                      <span>Image :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(
                            index + 1,
                            i,
                            "detailImages",
                            e.target.value
                          )
                        }
                        id={`detailImages-${index + 1}-${i}`}
                        className="ml-2"
                        type="text"
                      />
                      <span className="ml-4">Tip :</span>
                      <input
                        onChange={(e) =>
                          handleInputChange(index + 1, i, "tip", e.target.value)
                        }
                        id={`tip-${index + 1}-${i}`}
                        className="ml-2 w-96"
                        type="text"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className="post-modal-bottom">
            <button
              className="float-right btn btn-warning"
              onClick={closePostModal}
            >
              Close
            </button>
            <button
              className="float-right mr-1 btn btn-primary"
              onClick={handleButtonClick}
            >
              Post
            </button>
          </div>
        </ModalContent>
      </Modal>

      {/* 지도 관련 컴포넌트 (우측) */}
      <div className="div-right">
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
