//SchedulePosting.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import ScheduleCard, { ScheduleItem } from "../../components/ScheduleCard";
import "./SchedulePosting.css";
import { TbBasket, TbBasketMinus, TbMapPin2 } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import swal from "sweetalert";
import { TiDocumentDelete } from "react-icons/ti";

// 지도
declare global {
  interface Window {
    kakao: any;
  }
}

//back쪽 DTO에 있는 변수명이랑 완전 똑같이
interface ScheduleDTO {
  sno: number;
  total_Day: number;
  member_email: string;
  sName: string;
  member_nickname: string;
  regdate: Date;
  moddate: Date;
}

interface ScheduleStarDTO {
  starNum: number;
  starScore: number;
  sno: number;
}

//back쪽 DTO에 있는 변수명이랑 완전 똑같이
interface DetailScheduleItem {
  dno: number;
  tip: string;
  detailImages: string;
  day: number;
  sno: number;
  place_id: number;
}

//back쪽 DTO에 있는 변수명이랑 완전 똑같이
interface ReplyDTO {
  rno: number;
  replyContents: string;
  dno: number;
  replyer: string;
  replyer_nickname: string;
  replyer_img: string;
  reply_regDate: Date[];
  reply_modDate: Date[];
}

//back쪽 DTO에 있는 변수명이랑 완전 똑같이
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

//back쪽 DTO에 있는 변수명이랑 완전 똑같이
interface MemberDTO {
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  aboutMe: string;
}

interface BasketDTO {
  bno: number;
  placeId: number;
  userId: string;
  placeName: string;
  image: string;
}

interface ScheduleData {
  scheduleDTO: ScheduleDTO | null;
  detailScheduleDTOList: DetailScheduleItem[];
  replyDTOList: ReplyDTO[];
  tourDTOList: TourDTO[];
  memberDTO: MemberDTO | null;
}

export default function SchedulePosting() {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    scheduleDTO: null,
    memberDTO: null,
    detailScheduleDTOList: [],
    replyDTOList: [],
    tourDTOList: [],
  });
  const [cartData, setCartData] = useState<BasketDTO[]>([]);

  const navigate = useNavigate();
  const { sno } = useParams();

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // const [redirectCountdown, setRedirectCountdown] = useState(2);
  const [starData, setStarData] = useState<ScheduleStarDTO[]>([]);
  const [starMemberData, setStarMemberData] = useState<ScheduleStarDTO>();
  const [selectedStars, setSelectedStars] = useState<number>(0);

  const DeleteSchedule = async () => {
    try {
      // 댓글 삭제 여부를 묻는 모달 띄우기
      const willDelete = await swal({
        title: "삭제 확인",
        text: "일정후기를 삭제하시겠습니까?",
        icon: "warning",
        buttons: ["취소", "삭제"], // 취소 버튼 누르면 false, 삭제 버튼 누르면 true 반환
        dangerMode: true,
      });

      if (willDelete) {
        // 서버에 삭제를 요청
        const response = await fetch(
          `http://localhost:8080/Callyia/Schedule/deleteSchedule?sno=${sno}`,
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

        // 삭제 완료 모달 띄우기
        swal("삭제되었습니다.", {
          icon: "success",
        }).then(() => {
          navigate("http://localhost:3000/");
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleStarClick = async (index: number) => {
    if (!starMemberData) {
      setSelectedStars((prevStars) => {
        const newStars = index + 1;
        submitRating(newStars); // 최신 값으로 submitRating 호출
        window.location.reload();
        return newStars;
      });
    } else {
      setSelectedStars((prevStars) => {
        const modStars = index + 1;
        modifyRating(modStars); // 최신 값으로 submitRating 호출
        window.location.reload();
        return modStars;
      });
    }
  };

  const modifyRating = async (stars: number) => {
    try {
      // 서버에 수정된 댓글을 전송
      const response = await fetch(
        "http://localhost:8080/Callyia/Star/modifyStar",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            starNum: starMemberData?.starNum,
            starScore: stars,
            sno: sno,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // 실패한 경우 응답 본문을 가져옴
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const submitRating = async (stars: number) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Callyia/Star/registerStar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            starScore: stars,
            sno: sno,
            email: email,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle success (optional)
      console.log("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // 로그인한 멤버가 현재 여행후기에 평가한 별점 GET
  const StarMemberData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Star/getStarMember?email=${email}&sno=${sno}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStarMemberData(data);
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };
  useEffect(() => {
    StarMemberData();
  }, [email, sno]);

  const renderStars = (averageScore: number) => {
    const filledStars = Math.floor(averageScore); // 정수 부분
    const remainingStar = averageScore - filledStars; // 소수 부분
    return (
      <div style={{ display: "flex" }}>
        {Array.from({ length: filledStars }, (_, index) => (
          <FaStar
            key={index}
            size="13"
            style={{
              color: "#FFBF00",
              marginRight: "2px",
            }}
          />
        ))}
        {remainingStar > 0 && (
          <FaStar
            key={filledStars}
            size="13"
            style={{
              color: "#FFBF00",
              marginRight: "2px",
              clipPath: `polygon(0 0, ${remainingStar * 100}% 0, ${
                remainingStar * 100
              }% 100%, 0% 100%)`,
            }}
          />
        )}
      </div>
    );
  };

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

  // Schedule GET
  const fetchScheduleData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Schedule/posting?sno=${sno}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
        memberDTO: data.memberDTO,
      });
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };
  useEffect(() => {
    fetchScheduleData();
  }, [sno]);

  // 별점 GET
  const fetchScheduleStarData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Star/getStar?sno=${sno}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStarData(data);
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };
  useEffect(() => {
    fetchScheduleStarData();
  }, [sno]);

  // starScore의 평균 1단위 계산
  const calculateAverage = () => {
    if (starData.length === 0) {
      return 0;
    }

    const totalScore = starData.reduce((acc, star) => acc + star.starScore, 0);
    const averageScore = totalScore / starData.length;

    // 소수점 2번째 자리까지 반올림
    return Math.round(averageScore * 10) / 10;
  };
  const averageScore = calculateAverage();

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
  //--------------------------------------------------------------------------------------

  // Cart --------------------------------------------------------------------------------
  // cart GET
  const fetchCartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Basket/getBasketPosting?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCartData(data);
    } catch (error) {
      console.log("Error fetching tour data:", error);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [email]);
  // cartData

  //장바구니에 추가
  const registerCart = async (item: ScheduleItem) => {
    try {
      // 댓글을 서버에 저장하는 API 호출
      const response = await fetch(
        "http://localhost:8080/Callyia/Basket/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placeId: item.place_id,
            userId: email,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // 장바구니에서 삭제
  const removeCart = async (itemBno: number) => {
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

  // --------------------------------------------------------------------------------------
  const transformToScheduleItem = (
    detailItem: DetailScheduleItem,
    tourList: TourDTO[],
    basketList: BasketDTO[]
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

    const replyerNickname = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.replyer_nickname);

    const replyerImg = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.replyer_img);

    const rno = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.rno);

    const reply_regdate = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.reply_regDate);

    const reply_moddate = scheduleData.replyDTOList
      .filter((reply) => reply.dno === detailItem.dno)
      .map((reply) => reply.reply_modDate);

    return {
      ...detailItem,
      place_name: tourItem.placeName,
      latitude: tourItem.latitude,
      longitude: tourItem.longitude,
      place_content: tourItem.placeContent,
      detail_images: detailItem.detailImages,
      reply_contents: replyContents,
      replyer: replyer,
      replyer_nickname: replyerNickname,
      replyer_img: replyerImg,
      rno: rno,
      reply_modDate: reply_moddate,
      reply_regDate: reply_regdate,
    };
  };

  return (
    <div className="WholePage" style={{ display: "flex", height: "1100px" }}>
      <div className="left">
        <div style={{ flex: 1 }}>
          {/* 왼쪽 상단 */}
          <div className="Schedule">
            <div className="Schedule-header">
              <div className="Schedule-profile-info">
                <div className="Schedule-profile-icon">
                  <img
                    src={scheduleData.memberDTO?.profileImage}
                    alt="프로필 이미지"
                    onClick={() => {
                      // 클릭 시 UserProfilePage로 이동
                      navigate(
                        `/UserProfilePage?userid=${scheduleData.memberDTO?.email}`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  <p
                    style={{
                      fontSize: "18px",
                      color: "black",
                      marginTop: "10px",
                    }}
                  >
                    {scheduleData.scheduleDTO?.member_nickname}
                  </p>
                </div>
                <div style={{ display: "flex", width: "650px" }}>
                  <h2 className="min-w-[320px] max-w-[320px] overflow-hidden text-nowrap overflow-ellipsis">
                    {scheduleData.scheduleDTO?.sName}
                    <p style={{ fontSize: "15px" }}>
                      평균평점({averageScore}) / 평가인원(
                      {starData.length}명)
                      {averageScore && renderStars(averageScore)}
                    </p>
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    <p>평가하기</p>
                    <div className="star">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          size="40"
                          style={{
                            color:
                              index < (starMemberData?.starScore ?? 0)
                                ? "#FFBF00"
                                : "#BDBDBD",
                            marginRight: "2px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleStarClick(index);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    {scheduleData.scheduleDTO?.member_email === email && (
                      <button
                        onClick={() => DeleteSchedule()}
                        style={{ fontSize: "100px" }}
                      >
                        <TiDocumentDelete />
                      </button>
                    )}
                  </div>
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
                      scheduleData.tourDTOList,
                      cartData
                    );
                    return (
                      <ScheduleCard
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
                        onAddToCart={() => registerCart(transformedItem)}
                        isInCart={cartData.some(
                          (cartItem) => cartItem.placeId === item.place_id
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
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TbMapPin2
                style={{
                  fontSize: "50px",
                  marginTop: "7px",
                  marginRight: "5px",
                }}
              />
              지도
            </h2>
            <div id="map" style={{ width: "47vw", height: "50vh" }} />
          </div>
        </div>
        {/* 오른쪽 하단 */}
        <div className="right-bottom">
          {/* <Cart /> */}
          <div className={`cart  "hovered" : ""}`}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TbBasket
                style={{
                  fontSize: "50px",
                  marginTop: "7px",
                  marginRight: "5px",
                }}
              />
              장바구니
            </h2>
            <div className="cart-area">
              {cartData.map((item, index) => (
                <div className="schedule-card-cart">
                  <img src={item.image} />
                  <div style={{ height: "100px" }}>
                    <span className="schedule-number">{item.placeName}</span>
                    <button
                      onClick={() => removeCart(item.bno)}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        float: "right",
                      }}
                    >
                      <TbBasketMinus
                        style={{
                          fontSize: "50px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
