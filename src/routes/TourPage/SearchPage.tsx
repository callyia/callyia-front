import { IoSearchCircleOutline } from "react-icons/io5";
import { Button } from "../../theme/daisyui";
import { useState } from "react";
import { Modal, ModalAction, ModalContent } from "./Modal";
import { UploadPage } from "../UploadPage";

interface SearchProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  searchCombo: string;
  setSearchCombo: (combo: string) => void;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchPage: React.FC<SearchProps> = ({
  searchKeyword,
  setSearchKeyword,
  searchCombo,
  setSearchCombo,
  onSearch,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const closeClicked = () => {
    setOpenModal(false); // 모달 닫기
  };

  const acceptClicked = () => {
    setOpenModal(false); // 모달 닫기
  };

  const openModalClicked = () => {
    setOpenModal(true); // 모달 열기
  };

  const getPlaceholder = () => {
    switch (searchCombo) {
      case "user":
        return "여행친구를 검색하세요!";
      case "food":
        return "지역 또는 음식점명을 검색해주세요";
      case "tour":
        return "지역 또는 관광지명을 검색해주세요";
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center border-4">
        <section className="border border-t-0 border-b-2 border-x-0 w-[540px] my-[200px]">
          <select
            onChange={(e) => setSearchCombo(e.target.value)}
            value={searchCombo}
            className="w-1/5"
          >
            <option value="user">유저</option>
            <option value="food">음식점</option>
            <option value="tour">관광지</option>
          </select>
          <input
            type="text"
            className="w-4/5"
            placeholder={getPlaceholder()}
            value={searchKeyword}
            onKeyDown={onSearch}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </section>
      </div>
      <section className="">
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
            className="p-4 bg-white rounded-lg h-[500px] w-[800px]"
          >
            <div>
              <h3 className="text-center">등록페이지입니다.</h3>
            </div>
            <div className="">
              <div className="acceptPage-container">
                <p>이름 : </p>
                <input className="acceptPage-cols" type="text" name="" id="" />
                <p>지역 : </p>
                <input className="acceptPage-cols" type="text" name="" id="" />
                <p>내용 : </p>
                <input className="acceptPage-cols " type="text" name="" id="" />
              </div>
              <div>
                <UploadPage />
              </div>
            </div>
            <div className="relative">
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
          </ModalContent>
        </Modal>
      </section>
    </div>
  );
};

export default SearchPage;
