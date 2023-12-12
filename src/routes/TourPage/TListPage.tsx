import dummyData from "./list";
import "./TListPage.css";
import { useState } from "react";
import { Modal, ModalAction, ModalContent } from "./Modal";
import { Button } from "../../theme/daisyui";

interface DummyItem {
  id: number;
  title: string;
  name: string;
  content: string;
  area: string;
  image: string;
}

const TListPage = ({ searchResults }: { searchResults: any }) => {
  const itemsPerPage = 12;
  const totalItems = searchResults.length || dummyData.dummy.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dummyDataLength = dummyData.dummy.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedDummy, setSelectedDummy] = useState<DummyItem | null>(null);

  const openDetailClicked = (selectedDummy: DummyItem) => {
    setSelectedDummy(selectedDummy); // 클릭된 관광지 정보 저장
    setOpenDetail(true); // 모달 열기
  };

  const closeDetailClicked = () => {
    setSelectedDummy(null); // 선택된 관광지 정보 초기화
    setOpenDetail(false); // 모달 닫기
  };

  const basketClicked = () => {
    alert("장바구니에 추가하였습니다.");
    setOpenDetail(false); // 모달 닫기
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
      : dummyData.dummy.slice(indexOfFirstItem, indexOfLastItem);
  const renderItems = currentItems.map((dummy: any, index: any) => (
    <div key={index} className="flex-wrap mr-10 mb-4 w-[320px]">
      <div
        className="ListContent shadowList"
        role="button"
        tabIndex={0}
        onClick={() => openDetailClicked(dummy)}
        onMouseOver={(e) => {
          const targetContent = e.currentTarget;

          // 마우스 오버 시 위로 올라가는 애니메이션 클래스 추가
          targetContent.classList.add("hoverAnimation");
        }}
        onMouseLeave={(e) => {
          const targetContent = e.currentTarget;

          // 마우스 떠날 때 아래로 내려가는 애니메이션 클래스 추가
          targetContent.classList.add("leaveAnimation");

          // 일정 시간 후 클래스 제거
          setTimeout(() => {
            targetContent.classList.remove("hoverAnimation", "leaveAnimation");
          }, 300);
        }}
      >
        <div>
          <div className="contentContainer">
            <img
              src={dummy.image} // 이미지 소스를 동적으로 변경해야 할 것 같습니다.
              className="images"
              alt={`Image ${index}`}
            />
          </div>
          <div className="textContainer">
            <span className="text-style">{dummy.area}</span>
            <span className="text-style-second">{dummy.name}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pageBtn ${
            currentPage === i ? "text-blue-700 font-bold" : ""
          }`}
          onMouseOver={(e) => {
            const targetButton = e.currentTarget;

            // 마우스 오버 시 위로 올라가는 애니메이션 클래스 추가
            targetButton.classList.add("hoverAnimation");
          }}
          onMouseLeave={(e) => {
            const targetButton = e.currentTarget;

            // 마우스 떠날 때 아래로 내려가는 애니메이션 클래스 추가
            targetButton.classList.add("leaveAnimation");

            // 일정 시간 후 클래스 제거
            setTimeout(() => {
              targetButton.classList.remove("hoverAnimation", "leaveAnimation");
            }, 300);
          }}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <section>
      <div className="mx-[220px] my-[80px]">
        <div className="mb-10 font-bold underline">List</div>
        <div className="flex flex-wrap">{renderItems}</div>
        <Modal className="" open={openDetail}>
          <ModalContent
            onCloseIconClicked={closeDetailClicked}
            className="p-4 bg-white rounded-lg min-h-[500px] h-auto w-[800px] relative"
          >
            <div>
              <h3 className="mb-8 text-center">상세페이지입니다.</h3>
            </div>
            {selectedDummy && (
              <div className="grid">
                <div className="flex items-center mb-2">
                  <label className="mr-2">이름 : </label>
                  <p className="flex-grow p-1 border rounded">
                    {selectedDummy.name}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="mr-2">지역 : </label>
                  <p className="flex-grow p-1 border rounded">
                    {selectedDummy.area}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="mr-2">내용 : </label>
                  <p className="flex-grow h-auto p-1 border rounded">
                    {selectedDummy.content}
                  </p>
                </div>
                <div className="w-full h-auto">
                  <img
                    src={selectedDummy.image}
                    className="w-auto h-auto max-h-[250px]"
                  />
                </div>
              </div>
            )}
            <div className="absolute bottom-4 right-4">
              <ModalAction className="absolute bottom-0 right-0 flex flex-row">
                <Button
                  className="w-24 normal-case btn-primary btn-sm"
                  onClick={basketClicked}
                >
                  Basket
                </Button>
                <Button
                  className="w-24 normal-case btn-sm"
                  onClick={closeDetailClicked}
                >
                  Close
                </Button>
              </ModalAction>
            </div>
          </ModalContent>
        </Modal>
      </div>
      <div className="ListPagenationWrapper">
        <button
          className="moveToFirstPage"
          onClick={() => {
            firstPage();
          }}
        >
          &lt;&lt;
        </button>
        {renderPageNumbers()}
        <button
          className="moveToLastPage"
          onClick={() => {
            lastPage();
          }}
        >
          &gt;&gt;
        </button>
      </div>
    </section>
  );
};

export default TListPage;
