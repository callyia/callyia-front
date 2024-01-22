//SchedulePosting.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ScheduleCard, { ScheduleItem } from "../../components/ScheduleCard";
import "./SchedulePosting.css";

// 지도
declare global {
  interface Window {
    kakao: any;
  }
}

interface ScheduleDTO {
  sno: number;
  total_Day: number;
  member_email: string;
  sName: string;
}

interface DetailScheduleItem {
  dno: number;
  tip: string;
  detailImages: string;
  day: number;
  sno: number;
  place_id: number;
}

interface ReplyDTO {
  rno: number;
  replyContents: string;
  dno: number;
  replyer: string;
}

interface TourDTO {
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
  scheduleDTO: ScheduleDTO | null;
  detailScheduleDTOList: DetailScheduleItem[];
  replyDTOList: ReplyDTO[];
  tourDTOList: TourDTO[];
}

export default function SchedulePosting() {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    scheduleDTO: null,
    detailScheduleDTOList: [],
    replyDTOList: [],
    tourDTOList: [],
  });

  const { sno } = useParams();

  const fetchScheduleData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Schedule/posting?sno=${sno}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setScheduleData({
        scheduleDTO: data.scheduleDTO,
        detailScheduleDTOList: data.detailScheduleDTOList,
        replyDTOList: data.replyDTOList,
        tourDTOList: data.tourDTOList,
      });
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };

  //GET
  useEffect(() => {
    fetchScheduleData();
  }, [sno]);

  // ScheduleCard를 DAY별로 그룹화하는 함수
  const groupByDay = (schedule: DetailScheduleItem[]) => {
    const grouped: { [day: number]: DetailScheduleItem[] } = {};
    schedule.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });
    return grouped;
  };
  const groupedSchedule = groupByDay(scheduleData.detailScheduleDTOList);

  //Map -------------------------------------------------------------------------------
  var moreOverlay: any = null;
  var previousOverlay: any = null;

  const linePath = scheduleData.tourDTOList.map(
    (place: TourDTO) =>
      new window.kakao.maps.LatLng(place.latitude, place.longitude)
  );

  const Defaultpolyline = new window.kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 5,
    strokeColor: "gray",
    strokeOpacity: 0.6,
    strokeStyle: "solid",
  });

  //Map Click
  const DivClick = (
    latitude: number,
    longitude: number,
    place_name: String,
    tip: String,
    detail_images: String
  ) => {
    panTo(latitude, longitude);

    if (moreOverlay && previousOverlay === moreOverlay) {
      moreOverlay.setMap(null);
      moreOverlay = null;
    } else if (!moreOverlay) {
      const customOverlayOptions = {
        position: new window.kakao.maps.LatLng(latitude, longitude),
        tip: getOverlayHTML(place_name, tip, detail_images),
        xAnchor: 0.3,
        yAnchor: 0.91,
      };
      moreOverlay = new window.kakao.maps.CustomOverlay(customOverlayOptions);
      moreOverlay.setMap(map);
    }

    previousOverlay = moreOverlay;
  };

  //수정해야함 구현안됨
  const getOverlayHTML = (place_name: String, tip: String, images: String) => {
    var CustomOverlayContent =
      "<div style=\"position:relative;width:100%;height:100%;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png') no-repeat;padding:15px 10px;\">" +
      "<div style=\"color:#fff;font-size:16px;font-weight:bold;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png') no-repeat right 120px center;margin-bottom:8px;\">" +
      place_name +
      "</div>" +
      "<div style=\"position:relative;width:250px;height:140px;background:url('" +
      images +
      "') no-repeat;margin-bottom:8px;\">" +
      "</div>" +
      '<ul style="width:250px">' +
      '<li style="width:250px;height:100%;position:relative;margin-bottom:2px;background:#2b2d36;padding:5px 10px;color:#aaabaf;line-height: 1; white-space: pre-line;">' +
      '    <span style="max-width:250px">tip: ' +
      tip +
      "</span>" +
      "</li>" +
      "</ul>" +
      "</div>";

    return CustomOverlayContent;
  };

  // 마커 이미지를 저장할 배열
  const markerImages = Array.from(
    { length: scheduleData.tourDTOList.length },
    (_, index) => {
      const imageSrc = `../../../dummyimages/NumberImage/number${
        index + 1
      }.png`;
      const imageSize = new window.kakao.maps.Size(35, 70);
      const imageOption = { offset: new window.kakao.maps.Point(18, 48) };

      return new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
    }
  );

  //Map, Marker load
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

    const mainPosition =
      scheduleData.tourDTOList.length > 0
        ? new window.kakao.maps.LatLng(
            scheduleData.tourDTOList[0].latitude,
            scheduleData.tourDTOList[0].longitude
          )
        : new window.kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: mainPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const newmap = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMap(newmap);

    // 지도가 로드될 때까지 기다리는 이벤트 리스너
    const waitForMapToLoad = () => {
      if (newmap) {
        scheduleData.tourDTOList.forEach((place: TourDTO, index: number) => {
          if (place.latitude && place.longitude) {
            const markerPosition = new window.kakao.maps.LatLng(
              place.latitude,
              place.longitude
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              title: place.placeName,
              image: markerImages[index], // 적절한 마커 이미지 사용
            });

            marker.setMap(newmap);
          }
        });

        Defaultpolyline.setMap(newmap);
      } else {
        // 아직 지도가 로드되지 않았으면 재시도
        setTimeout(waitForMapToLoad, 100);
      }
    };

    // tilesloaded 이벤트 대신 로드가 완료될 때까지 대기
    waitForMapToLoad();
  }, [scheduleData.tourDTOList]);

  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);
  const panTo = (latitude: number, longitude: number) => {
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
      map.panTo(moveLatLon);
    }
  };

  // Cart --------------------------------------------------------------------------------
  const [cart, setCart] = useState<ScheduleItem[]>([]);

  const handleAddToCart = (item: ScheduleItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.place_id !== itemId));
  };

  const transformToScheduleItem = (
    detailItem: DetailScheduleItem,
    tourList: TourDTO[]
  ): ScheduleItem => {
    const tourItem = tourList.find(
      (tour) => tour.placeId === detailItem.place_id
    );
    if (!tourItem) {
      throw new Error(
        `Tour item with placeId ${detailItem.place_id} not found.`
      );
    }

    const replyContents = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.replyContents);

    const replyer = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.replyer);

    const rno = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.rno);

    return {
      ...detailItem,
      place_name: tourItem.placeName,
      latitude: tourItem.latitude,
      longitude: tourItem.longitude,
      place_content: tourItem.placeContent,
      detail_images: detailItem.detailImages,
      reply_contents: replyContents,
      replyer: replyer,
      rno: rno,
    };
  };

  return (
    <div className="WholePage" style={{ display: "flex", height: "100%" }}>
      <div className="left">
        <div style={{ flex: 1 }}>
          {/* 왼쪽 상단 */}
          <div className="Schedule">
            <div className="Schedule-header">
              <div className="Schedule-profile-info">
                <div className="Schedule-profile-icon">
                  <Link to="/UserProfilePage">
                    <img
                      src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn2.ppomppu.co.kr%2Fzboard%2Fdata3%2F2022%2F0509%2F20220509173224_d9N4ZGtBVR.jpeg&type=sc960_832"
                      alt="프로필 이미지"
                    />
                  </Link>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    {scheduleData.scheduleDTO?.member_email}
                  </p>
                </div>
                <div>
                  <h2>{scheduleData.scheduleDTO?.sName}</h2>
                </div>
              </div>
            </div>
            {Object.entries(groupedSchedule).map(([day, items]) => (
              <div key={day} className="day-schedule">
                <div className="day-header">
                  <h2>DAY {day}</h2>
                </div>

                <div className="schedule-container">
                  {items.map((item, index) => {
                    const transformedItem = transformToScheduleItem(
                      item,
                      scheduleData.tourDTOList
                    );
                    return (
                      <ScheduleCard
                        key={transformedItem.place_id}
                        {...transformedItem}
                        onClick={() =>
                          DivClick(
                            transformedItem.latitude,
                            transformedItem.longitude,
                            transformedItem.place_name,
                            transformedItem.tip,
                            transformedItem.detail_images
                          )
                        }
                        onAddToCart={() => handleAddToCart(transformedItem)}
                        onRemoveFromCart={() =>
                          handleRemoveFromCart(item.place_id)
                        }
                        isInCart={cart.some(
                          (cartItem) => cartItem.place_id === item.place_id
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rightArea">
        <div className="right-top">
          {/* 오른쪽 상단 */}
          {/* <Mymap /> */}

          <div className="MapArea">
            <h2>지도</h2>
            <div id="map" style={{ width: "47vw", height: "50vh" }} />
          </div>
        </div>
        {/* 오른쪽 하단 */}
        <div className="right-bottom">
          {/* <Cart /> */}

          <div className={`cart  "hovered" : ""}`}>
            <h2>장바구니</h2>
            {cart.map((item, index) => (
              <div className="schedule-card-cart" key={item.place_id}>
                <span className="schedule-number">{item.place_name}</span>
                <h3>{item.place_name}</h3>
                <h3>Tip : {item.tip}</h3>

                <button onClick={() => handleRemoveFromCart(item.place_id)}>
                  제거
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
