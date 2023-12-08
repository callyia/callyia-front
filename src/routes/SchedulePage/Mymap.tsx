import { useEffect, useState } from "react";
import { ScheduleItem } from "../../components/ScheduleCard";
import { useDrop } from "react-dnd";

declare global {
  interface Window {
    kakao: any;
  }
}

const Mymap = () => {
  const [droppedItem, setDroppedItem] = useState<ScheduleItem | null>(null);

  const [{ isOver }, drop] = useDrop({
    //"SCHEDULE_CARD"에 해당하는(드롭된카드) item속성들 가져옴
    accept: "SCHEDULE_CARD",
    drop: (item: ScheduleItem) => {
      setDroppedItem(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const mainPosition = new window.kakao.maps.LatLng( //Default위치 설정
      35.14299044,
      129.03409987
    );

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: mainPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    //드롭된 카드가 있을 경우
    if (droppedItem) {
      //드롭된 카드의 위도, 경도 설정
      const selectionPosition = new window.kakao.maps.LatLng(
        droppedItem.lat,
        droppedItem.lng
      );
      //드롭된 카드의 위도, 경도 설정
      const selectionOptions = {
        center: selectionPosition,
        level: 4,
      };

      const marker = new window.kakao.maps.Marker({
        position: selectionPosition,
      });

      const selectionMap = new window.kakao.maps.Map( //드롭된 카드의 위치 지도로 띄움
        container,
        selectionOptions
      );
      marker.setMap(selectionMap);
    } else {
      //드롭된 카드가 없을경우 default장소 지도출력
      const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }
  }, [droppedItem]);

  return (
    <div className="MapArea">
      <h2>지도</h2>
      원하는 일정을 지도에 드래그 해주세요!
      <div id="map" style={{ width: "47vw", height: "50vh" }} ref={drop} />
    </div>
  );
};

export default Mymap;
