import React, { useEffect, useRef, useState } from "react";
import "./RegistMap.css";
import toast, { Toaster } from "react-hot-toast";

declare global {
  interface Window {
    kakao: any;
  }
}

const RegistMap = ({
  onPlaceSelected,
}: {
  onPlaceSelected: (place: any) => void;
}) => {
  const infowindow = useRef(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
  const markers = useRef<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  useEffect(() => {
    let mapContainer = document.getElementById("map");
    const mainPosition = new window.kakao.maps.LatLng(
      35.14299044,
      129.03409987
    );

    let mapOption = {
      center: mainPosition,
      level: 3,
    };

    if (mapContainer) {
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // <지도에서 장소를 검색하기 위한 동작을 수행>
      const searchPlaces = () => {
        if (!keyword.trim()) {
          return false; // 검색을 중단하고 false 반환
        }

        // kakao maps api를 사용하여 장소 검색 서비스 생성
        const ps = new window.kakao.maps.services.Places();
        // 생성된 장소 검색 서비스를 사용하여 키워드 검색 요청
        // keyword: 검색어, paceSearchCB: 검색 결과 처리 콜백 함수
        ps.keywordSearch(keyword, placesSearchCB);
      };

      // <장소 검색 결과를 기반으로 검색 결과 목록에 표시될 리스트 아이템을 생성하는 역할>
      const getListItem = (index: number, places: any) => {
        // 새로운 li 엘리먼트 생성
        const el = document.createElement("li");

        // li 엘리먼트 내용을 구성하는 문자열
        let itemStr =
          `<span class="markerbg marker_${index + 1}"></span>` + //마커 배경
          '<div class="info">' + // 정보를 담을 div 엘리먼트 시작
          `   <h5>${places.place_name}</h5>`; // 장소명 추가

        // 도로명 주소(road_address_name)이 존재하는 경우
        if (places.road_address_name) {
          itemStr +=
            `    <span>${places.road_address_name}</span>` + // 도로명 주소 추가
            `   <span class="jibun gray">${places.address_name}</span>`; //  지번 주소 추가
        } else {
          // 도로명 주소가 없는 경우
          itemStr += `    <span>${places.address_name}</span>`; //지번 주소만 추가
        }

        // 전화번소 추가
        itemStr += `  <span class="tel">${places.phone}</span>` + "</div>";

        // li 엘리먼트의 HTML 내용 설정으로 itemStr을 넣는다.
        el.innerHTML = itemStr;
        // li 엘리먼트에 클래스 "itme" 추가
        el.className = "item";

        return el;
      };

      // <Kakao Maps Places 서비스를 통한 장소 검색 요청의 결과를 처리하는 역할>
      const placesSearchCB = (
        data: string,
        status: string,
        pagination: number
      ) => {
        // 검색 상태가 "OK"인 경우
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색 결과를 표시하는 함수 호출
          displayPlaces(data);
          // 페이지 정보를 표시하는 함수 호출
          displayPagination(pagination);
        }
        // 검색 결과가 없는 경우
        else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          toast.error("검색 결과가 존재하지 않습니다.");
          return;
        }
        // 검색 중 오류 발생 시
        else if (status === window.kakao.maps.services.Status.ERROR) {
          toast.error("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      };

      // <검색된 장소들을 지도에 표시하고, 검색 결과를 목록으로 나타내는 역할>
      const displayPlaces = (places: any) => {
        // DOM 엘리먼트를 참조하기 위한 변수들
        const listEl = document.getElementById("placesList"),
          menuEl = document.getElementById("menu_wrap"),
          fragment = document.createDocumentFragment(), // DocumentFragment을 사용하여 메모리상에서 작업을 수행
          bounds = new window.kakao.maps.LatLngBounds(); // 검색된 장소들의 좌표를 포함하는 Bounds 객체

        // 검색 결과 목록과 마커를 초기화
        removeAllChildNods(listEl); // 검색 결과 목록의 자식 노드들을 모두 제거
        removeMarker(); // 현재 지도에 표시된 마커를 모두 제거

        // 메뉴 엘리먼가 없으면 오류를 콘솔에 출력하고 함수 종료
        if (!menuEl) {
          console.error("menuEl is null");
          return;
        }

        // 검색된 각 장소에 대해 처리
        for (let i = 0; i < places.length; i++) {
          // 현재 장소의 좌표 생성
          const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x
            ),
            // 현재 장소에 대한 마커 추가
            marker = addMarker(placePosition, i),
            // 현재 장소에 대한 목록 아이템 생성
            itemEl = getListItem(i, places[i]);

          // 검색된 장소의 좌표를 Bounds에 추가
          bounds.extend(placePosition);

          // 마커와 목록 아이템에 대한 이벤트 리스너 등록
          (function (marker, title) {
            // 마커에 마우스 오버 시, 인포윈도우 표시  (마우스를 마커에 가져다 놓았을 떄, 지도 위에 말풍선 모양의 콘텐츠 표시 정보 창 표시 )
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
              displayInfowindow(marker, title);
            });

            // 마커에서 마우스 아웃 시, 인포윈도우 닫기
            window.kakao.maps.event.addListener(marker, "mouseout", () => {
              infowindow.current.close();
            });

            // 목록 아이템에 마우스 오버시, 인포윈도우 표시
            itemEl.onmouseover = () => {
              displayInfowindow(marker, title);
            };

            // 목록 아이템에 마우스 아웃 시, 인포윈도우 닫기
            itemEl.onmouseout = () => {
              infowindow.current.close();
            };

            // 목록 아이템에 마우스 클릭 시, 이름 지역 설정
            itemEl.onclick = () => {
              // 외부로 정보 전달
              onPlaceSelected(places[i]);
            };
          })(
            // IIFE를 사용함으로써 각 반복에서의 marker와 title을 독립적으로 유지하면서 이벤트 리스너를 등록
            marker,
            places[i].place_name
          );

          // 목록 아이템을 DocumentFragment에 추가
          fragment.appendChild(itemEl);
        }

        // 검색 결과 목록을 표시하는 엘리먼트에 DocumentFragment을 추가
        // listEl?. 은 내용이 없을 수 있어서 없으면 null 있으면 추가
        listEl?.appendChild(fragment);

        // 검색된 장소들의 좌표를 기반으로 지도의 확대/축소 조절
        map.setBounds(bounds);
      };

      // <카카오 맵에 마커를 추가하는 함수>
      const addMarker = (position: any, idx: any) => {
        // 마커 이미지 URL
        const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
          // 마커 이미지 크기
          imageSize = new window.kakao.maps.Size(36, 37),
          // 마커 이미지 옵션
          imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          },
          // 마커 이미지 객체 생성
          markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          // 새로운 마커 객체 생성
          marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
          });

        // 지도에 마커 표시
        marker.setMap(map);
        // markers 배열에 생성된 마커 추가
        markers.current.push(marker);

        return marker;
      };

      // <markers 배열에 있는 모든 마커를 지도에서 제거>
      const removeMarker = () => {
        // markers 배열에 있는 것을 null로 변경
        for (let i = 0; i < markers.current.length; i++) {
          markers.current[i].setMap(null);
        }
        // markers 배열 초기화
        markers.current = [];
      };

      // <페이징 표시 역할>
      const displayPagination = (pagination: any) => {
        // pagination을 표시할 HTML 엘리먼트
        const paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment();

        // paginationEl이 null이면 오류 메시지 출력 후 종료
        if (!paginationEl) {
          console.error("paginationEl is null");
          return;
        }

        // paginationEl의 자식 노드들을 모두 제거
        // paginationEl이 null값이면 이미 비워져 있기에 ?. 표시
        // lastChild가 있으면 하나하나 지움
        // 생성하기 전에 지우는거!!
        while (paginationEl?.hasChildNodes()) {
          const lastChild = paginationEl.lastChild;

          if (lastChild) {
            paginationEl.removeChild(lastChild);
          }
        }

        // 1부터 pagination.last까지의 페이지 번호에 대해 각각의 페이지 링크를 생성
        for (let i = 1; i <= pagination.last; i++) {
          const el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i.toString();

          // 현재 페이지인 경우 'on'클래스 추가
          if (i === pagination.current) {
            el.className = "on";
          }
          // pagination.gotoPage(i) 페이지 이동 이벤트
          else {
            el.onclick = (() => {
              return () => {
                pagination.gotoPage(i);
              };
            })();
          }

          // 생성된 페이지 번호를 fragment에 추가
          fragment.appendChild(el);
        }
        // paginationEl에 fragment를 추가하여 페이지 번호 표시
        paginationEl.appendChild(fragment);
      };

      // <인포윈도우(정보창)을 지도에 표시하는 역할>
      const displayInfowindow = (marker: any, title: any) => {
        // 인포윈도우에 표시될 HTML 생성
        const content =
          '<div style="padding:5px;z-index:1;">' + title + "</div>";
        // infowindow.current에 생성된 HTML 설정
        infowindow.current.setContent(content);
        // infowindow.current를 특정 마커와 함께 지도에 열어준다.
        infowindow.current.open(map, marker);
      };

      // <el의 모든 자식 노드를 제거하는 역할>
      const removeAllChildNods = (el: any) => {
        // 주어진 el가 자식노드를 가지고 있는 동안 반복
        while (el.hasChildNodes()) {
          // 마지막 자식 노드를 찾아서 제거
          el.removeChild(el.lastChild);
        }
      };

      // 검색 키워드를 초기화면에서 한 번 호출합니다
      searchPlaces();
    }
  }, [searchClick]); // useEffect는 키워드가 변경될 때마다 실행되도록 설정

  return (
    <div className="map_wrap">
      <div id="map" className="w-full h-full"></div>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchClick(!searchClick);
              }}
            >
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                size={17}
                className="regist-map-input"
                placeholder="키워드를 작성해주세요"
                style={{ backgroundColor: "white", fontSize: "1rem" }}
              />
              <button type="submit" className="regist-map-button">
                검색
              </button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default RegistMap;
