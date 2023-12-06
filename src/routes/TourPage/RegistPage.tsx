import { Modal, ModalAction, ModalContent } from "./Modal";
import { Button } from "../../theme/daisyui";
import Upload from "./Upload";
import { useState } from "react";

const RegistPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeClicked = () => {
    setOpenModal(false); // 모달 닫기
  };

  const acceptClicked = () => {
    alert("파일이 등록되었습니다.");
    setOpenModal(false); // 모달 닫기
  };

  const openModalClicked = () => {
    setOpenModal(true); // 모달 열기
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
          className="p-4 bg-white rounded-lg h-[500px] w-[800px] relative"
        >
          <div>
            <h3 className="mb-8 text-center">등록페이지입니다.</h3>
          </div>
          <div className="grid">
            <div className="flex items-center mb-2">
              <label className="mr-2">이름 :</label>
              <input
                className="flex-grow p-1 border rounded"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="mr-2">지역 :</label>
              <input
                className="flex-grow p-1 border rounded"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="mr-2">내용 :</label>
              <input
                className="flex-grow p-1 border rounded"
                type="text"
                name=""
                id=""
              />
            </div>
            <Upload />
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
        </ModalContent>
      </Modal>
    </section>
  );
};

export default RegistPage;
