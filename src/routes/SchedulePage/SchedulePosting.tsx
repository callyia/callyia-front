//SchedulePosting.tsx
import React, { useEffect, useState } from "react";
import ScheduleCard, { ScheduleItem } from "../../components/ScheduleCard";
import { Link } from "react-router-dom";
import "./SchedulePosting.css";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

// ScheduleItem을 확장하며, 추가적으로 day, images, comments 속성들을 추가
interface ExtendedScheduleItem extends ScheduleItem {
  day: number;
  images: string[];
  comments: string[];
}

// 세부 일정 내용들
const scheduleData: ExtendedScheduleItem[] = [
  {
    id: 1,
    day: 1,
    place: "광안리 해수욕장",
    content: "오전11시~오후3시까지 놀기",
    tip: "xx횟집 추천",
    lat: 35.15319914298131,
    lng: 129.11874363377248,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjNfNDYg%2FMDAxNjk1NDM2NzQ1MTYw.UZL4gCHsnhz04a5AuL630sEUnls3rs6uROBACAyXAQsg.boAW1VUtyrsonBBopxCtg2fj24_A_JUKwkyZUxVu264g.JPEG.j787646%2F20230903%25A3%25DF155228.jpg&type=l340_165",
    ],
    comments: [
      "악성댓글(惡性對글, malicious comment)은 타인을 악의적으로 비하할 목적으로 다는 댓글을 말한다. 약칭인 악플로 부르는 경우가 흔하며, 이는 악성 리플의 줄임말이다. 악플의 반댓말은 주로 선플(선성 리플)이라고 부른다. '리플'이란 단어가 댓글로 거의 완벽하게 대체된 이후로도 '악성 댓글'이나 줄임말 '악댓' 등은 마이너한 사용 빈도에 머무는 수준이고, '악플'이란 줄임말이 훨씬 폭넓게 쓰인다악성 댓글을 다는 사람을 흔히 악플러라고 부른다.",
      "댓2",
      "댓3",
      "댓4",
      "댓5",
    ],
  },
  {
    id: 2,
    day: 1,
    place: "광안대교",
    content: "4시쯤부터 드라이브",
    tip: "사진 찍기 좋은 장소",
    lat: 35.1448993375342,
    lng: 129.12800748092153,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMjdfMTQg%2FMDAxNzAxMDg1MjgyMTE3.MyaX_D172Q9xjtoktGL_noCQLjh9HLW3db3Nk1jFvlQg.p7omzLkm670F1jxuV3fsSdph96aC0Bjo9lNNVXVz23Ig.JPEG.jesuiseugene%2FKakaoTalk_20231127_203820194_03.jpg&type=a340",
    ],
    comments: ["댓글1"],
  },
  {
    id: 3,
    day: 1,
    place: "서면",
    content: "6시 방탈출",
    tip: "놀거리 많음",
    lat: 35.15536685769068,
    lng: 129.0599536519087,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMjBfMjUw%2FMDAxNzAwNDgzMzAxODk0.hRtXh8SnH9b8-EQOvW2BCrJzd28sPkhQZmdsktSd7C0g.TFidPMTzD2i08qB9WYsjdOUMZSrSL_-20vUu6DebDvsg.JPEG.daonsangga1019%2F%25B7%25AF%25BD%25BA%25C1%25F6%25C7%25CF_%25284%2529.jpg&type=a340",
    ],
    comments: ["댓글123123"],
  },
  {
    id: 4,
    day: 1,
    place: "자갈치 시장",
    content: "7시 저녁",
    tip: "먹거리 많음",
    lat: 35.09653899171667,
    lng: 129.03056681417587,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDRfMTU4%2FMDAxNjQ2MzQ0MTM1NDA2.rwZ8tzMObvtcpdcYWlTH4nKx2mwxtgKHPswjMxAAsTkg.nlRth0YTiduegIQLYezXTQIKzyU2u3WlwhGNOZPj3cYg.JPEG.lsh5755%2F%25C0%25DA%25B0%25A5%25C4%25A1_%25289%2529.jpg&type=a340",
    ],
    comments: [""],
  },
  {
    id: 5,
    day: 1,
    place: "달맞이 길",
    content: "10시 드라이브",
    tip: "드라이브 하기 좋은 장소",
    lat: 35.15648145591319,
    lng: 129.17905756423198,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTdfMjc2%2FMDAxNjc4OTkxMjM4MDk3.ZNTQ5LDn3PFKktkqMk2mjVlF_OyBr7zpE0qg6gXkExQg.71w_G17YILQRbzkksjeCVjmllMyZNrwbxUe5eRpeE_kg.JPEG.withdayfly%2F%25BA%25CE%25BB%25EA_%25B4%25DE%25B8%25C2%25C0%25CC%25B1%25E6_%25B4%25DE%25B8%25C2%25C0%25CC%25B0%25ED%25B0%25B3_%252825%2529.jpg&type=a340",
    ],
    comments: [""],
  },

  {
    id: 6,
    day: 2,
    place: "대연동",
    content: "2일차",
    tip: "맛집 숯불갈비",
    lat: 35.135804743232626,
    lng: 129.0986784144465,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA0MTBfMTU5%2FMDAxNTU0ODg4NjI2MzI5.s37HzKFtF8gXG-PD1TTa4ZA-NNj6MVsn4hD0NDr5iX4g.WbQuiAHuA70g4k_PXiU_bEfupsIG8RwMWM2V3lj0FMgg.JPEG.meline7554%2FIRS20190410_182909.jpg&type=a340",
    ],
    comments: [""],
  },
  {
    id: 7,
    day: 2,
    place: "감만부두",
    content: "",
    tip: "낚시터",
    lat: 35.10913463424172,
    lng: 129.0653909431872,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA0MjZfMjkx%2FMDAxNDkzMTc5Njg2MjQx.FiHzlEnHcijUri4h5b8n3Vf53SNfEWDbb69NUbncvNYg.e5gXQXl8aPltt8x5qfq-FPJIVJa2OK3IjsbldHZxx1Yg.JPEG.neces2%2F1Y6A9638.jpg&type=a340",
    ],
    comments: [""],
  },
  {
    id: 8,
    day: 2,
    place: "동의대",
    content: "",
    tip: "경사 엄청 심함",
    lat: 35.142143208587385,
    lng: 129.0340360368665,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5258%2F2019%2F12%2F12%2F0000127238_001_20191212145831445.jpg&type=a340",
    ],
    comments: [""],
  },
  {
    id: 9,
    day: 3,
    place: "벡스코",
    content: "",
    tip: "각종 행사 많음",
    lat: 35.1691065603009,
    lng: 129.1365727167521,
    images: [
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5001%2F2023%2F11%2F20%2F0000416626_001_20231120100201627.jpg&type=a340",
    ],
    comments: [""],
  },
  // 추가적인 일정 항목들을 필요에 따라 추가
];

// 지도
declare global {
  interface Window {
    kakao: any;
  }
}

export default function SchedulePosting() {
  // ScheduleCard를 DAY별로 그룹화하는 함수------------------------------
  const groupByDay = (schedule: ExtendedScheduleItem[]) => {
    const grouped: { [day: number]: ExtendedScheduleItem[] } = {};
    schedule.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });
    return grouped;
  };
  const groupedSchedule = groupByDay(scheduleData);

  //Map -------------------------------------------------------------------------------
  const Click = (lat: number, lng: number) => {
    panTo(lat, lng);
  };

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const mainPosition = new window.kakao.maps.LatLng( //Default위치 설정
      scheduleData[0].lat,
      scheduleData[0].lng
    );

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: mainPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const newmap = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    setMap(newmap);

    //ScheduleData에 있는 각 장소에 대한 마커 생성
    scheduleData.forEach((place) => {
      const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        title: place.place,
      });

      marker.setMap(newmap);
    });

    const linePath = scheduleData.map(
      (place) => new window.kakao.maps.LatLng(place.lat, place.lng)
    );

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "red",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    if (newmap) {
      polyline.setMap(newmap);
    }
  }, []);

  const [map, setMap] = useState<Window["kakao"]["maps"]["Map"] | null>(null);
  const panTo = (lat: number, lng: number) => {
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };
  //--------------------------------------------------------------------------------

  return (
    <div
      className="WholePage" // Adjust the class name as needed
      style={{ display: "flex", height: "100%" }}
    >
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
                  <p style={{ fontSize: "12px", color: "gray" }}>김준기</p>
                </div>
                <div>
                  <h2>부산 여행</h2>
                </div>
              </div>
            </div>
            {Object.entries(groupedSchedule).map(([day, items]) => (
              <div key={day} className="day-schedule">
                <div className="day-header">
                  <h2>DAY {day}</h2>
                </div>

                <div className="schedule-container">
                  {/* 여기에 Draggable */}
                  {items.map((item, index) => (
                    <ScheduleCard key={item.id} {...item} onClick={Click} />
                  ))}
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
          {/* 여기에 Droppable */}
          <div className="MapArea">
            <h2>지도</h2>
            <div id="map" style={{ width: "47vw", height: "50vh" }} />
          </div>
        </div>
        {/* 오른쪽 하단 */}
        <div className="right-bottom">
          {/* <Cart /> */}
          {/* 여기에 Droppable */}
          <div className={`cart  "hovered" : ""}`}>
            <h2>장바구니</h2>
            <div>원하는 일정을 여기에 드래그 해주세요!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
