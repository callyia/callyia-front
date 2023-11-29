import { useToggle } from "../../hooks";
import React, { useEffect } from "react";
import "./Planning.css";

// dnd 관련 import
import BoardList from "../../pages/BoardList";
import { useLists } from "../../store/useLists";
import { ListDroppable } from "../../components";
import CreateListForm from "../../pages/Board/CreateListForm";
import { useMemo } from "react";
import { DragDropContext } from "react-beautiful-dnd";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Planning() {
  // ------------- dnd 설정 위치 --------------
  const { lists, onRemoveList, onCreateList, onMoveList, onDragEnd } =
    useLists();

  const children = useMemo(
    () =>
      lists.map((list, index) => (
        <BoardList
          key={list.uuid}
          list={list}
          onRemoveList={onRemoveList(list.uuid)}
          index={index}
          onMoveList={onMoveList}
        />
      )),
    [lists, onRemoveList, onMoveList]
  );
  // -----------------------------------------

  const [area1, toggleArea1] = useToggle();
  const [area2, toggleArea2] = useToggle();

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

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <div className="div-container">
      {area1 && (
        <div
          style={{ width: "800px", height: "350px" }}
          className="toggle-right-up toggle-div w-96 h-96 bg-slate-600"
          onClick={toggleArea1}
        ></div>
      )}
      {!area1 && (
        <button
          className="toggle-right-up btn btn-sm btn-primary"
          onClick={toggleArea1}
        >
          click
        </button>
      )}
      {area2 && (
        <div
          style={{ width: "800px", height: "350px" }}
          className="toggle-right-down toggle-div w-96 h-96 bg-slate-300"
          onClick={toggleArea2}
        ></div>
      )}
      {!area2 && (
        <button
          className="toggle-right-down btn btn-sm btn-primary"
          onClick={toggleArea2}
        >
          click
        </button>
      )}

      <div className="div-left">
        <div className="div-left-title">
          <h2>Title</h2>
        </div>
        <div className="div-left-writer">
          <h1>Writer</h1>
        </div>
        <div className="div-plan-list">
          <DragDropContext onDragEnd={onDragEnd}>
            <ListDroppable className="flex flex-row p-2 mt-4">
              <div className="flex flex-wrap p-2 mt-4">
                {children}
                <CreateListForm onCreateList={onCreateList} />
              </div>
            </ListDroppable>
          </DragDropContext>
        </div>
      </div>
      <div className="div-right">
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
