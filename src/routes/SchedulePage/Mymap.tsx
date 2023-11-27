import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const Mymap = () => {
  const markers: any[] = [
    //표시할 마커들 배열로 저장
    new window.kakao.maps.LatLng(33.45023, 126.572965),
    new window.kakao.maps.LatLng(33.455529, 126.561838),
  ];

  const setMarkers = (map: any) => {
    markers.forEach((obj) => {
      new window.kakao.maps.Marker({
        map: map,
        position: obj,
        // text: "동의대",
      });
    });
  };

  useEffect(() => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const mainPosition = new window.kakao.maps.LatLng(
      35.14299044,
      129.03409987
    );
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: mainPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const mainMarker = new window.kakao.maps.Marker({
      //메인마커
      position: mainPosition, //지도 중심좌표에 마커표시
    });

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    mainMarker.setMap(map); // 메인 위치 표시
    setMarkers(map); // 마커 배열 표시
  }, []);

  return (
    <div>
      <h2>지도</h2>
      <div id="map" style={{ width: "47vw", height: "50vh" }} />
    </div>
  );
};

export default Mymap;
