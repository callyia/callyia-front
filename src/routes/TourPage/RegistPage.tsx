import { Modal, ModalAction, ModalContent } from "./Modal";
import { Button } from "../../theme/daisyui";
import Upload from "./Upload";
import { useState } from "react";
import RegistMap from "./RegistMap";

const RegistPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const closeClicked = () => {
    setOpenModal(false); // 모달 닫기
  };

  const acceptClicked = async () => {
    try {
      const response = await fetch("http://localhost:8080/Callyia/Tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeName: selectedPlace?.place_name,
          address:
            selectedPlace?.road_address_name || selectedPlace?.address_name,
          latitude: selectedPlace?.x,
          longitude: selectedPlace?.y,
          content: content,
        }),
      });
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      const responseData = await response.json();
      console.log("백엔드 응답 데이터:", responseData);
    } catch (error: any) {
      console.error("백엔드 통신 오류:", error.message);
    }
    alert(`파일이 등록되었습니다. 내용 : ${content}`);
    setOpenModal(false); // 모달 닫기
  };

  const openModalClicked = () => {
    setOpenModal(true); // 모달 열기
  };

  const handlePlaceSelected = (place: any) => {
    setSelectedPlace(place);
  };
  return (
    <section>
      <button
        type="button"
        onClick={openModalClicked}
        className="absolute text-orange-300 right-4 btn-lg"
      >
        등록
      </button>
      <Modal className="" open={openModal}>
        <ModalContent
          onCloseIconClicked={closeClicked}
          className="p-4 bg-white rounded-lg h-[800px] w-[1400px] relative"
        >
          <div>
            <h3 className="mb-8 text-center">등록페이지입니다.</h3>
          </div>
          <div className="flex flex-row h-[340px]">
            <div className="grid w-1/2">
              <div className="flex items-center mb-2">
                <label className="mr-2">이름 :</label>
                <div className="flex-grow p-1 border rounded">
                  {selectedPlace?.place_name}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <label className="mr-2">지역 :</label>
                <div className="flex-grow p-1 border rounded">
                  {selectedPlace?.road_address_name ||
                    selectedPlace?.address_name}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <label className="mr-2">좌표 :</label>
                <div className="flex-grow p-1 border rounded">
                  {selectedPlace?.x && selectedPlace?.y ? (
                    <>
                      위도: {selectedPlace.x}, 경도: {selectedPlace.y}
                    </>
                  ) : (
                    "좌표 정보 없음"
                  )}
                </div>
              </div>
              <div className="flex items-center mb-2">
                <label className="mr-2">내용 :</label>
                <input
                  className="flex-grow p-1 border rounded"
                  type="text"
                  name=""
                  id=""
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <Upload />
              </div>
              <div className="absolute bottom-4 right-4">
                <ModalAction className="absolute bottom-0 right-0 flex flex-row">
                  <Button
                    className="w-24 normal-case btn-primary btn-sm"
                    onClick={acceptClicked}
                  >
                    Accept
                  </Button>
                  <Button
                    className="w-24 normal-case btn-sm"
                    onClick={closeClicked}
                  >
                    Close
                  </Button>
                </ModalAction>
              </div>
            </div>
            <RegistMap onPlaceSelected={handlePlaceSelected} />
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default RegistPage;
