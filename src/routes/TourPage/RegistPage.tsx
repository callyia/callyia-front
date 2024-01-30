import { Modal, ModalAction, ModalContent } from "./Modal";
import { Button } from "../../theme/daisyui";
import Upload from "./Upload";
import RegistMap from "./RegistMap";
import CheckBox from "./CheckBox";
import React, { useState, useEffect } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowUp } from "react-icons/fa"; // react-icons에서 사용할 아이콘을 import
import "swiper/swiper-bundle.css";
import bglist from "./bglist";
import "./RegistPage.css";
import axios from "axios";
import { IoSearchCircleOutline } from "react-icons/io5";

// 관광지 데이터의 타입 정의
interface TourData {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  placeContent: string;
  checkColumn: string;
  image: string;
}

interface RegistPageProps {
  checkColumnData: string;
}

SwiperCore.use([Navigation, Pagination, Autoplay]);

const RegistPage: React.FC<RegistPageProps> = ( {checkColumnData} ) => {
  // 상태 관리
  const [openModal, setOpenModal] = useState(false); //등록페이지 열림 닫힘 상태
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const [selectedImageUrl, setSelectedImageUrl] = useState<
    string | undefined
  >();
  const [clearUploadImage, setClearUploadImage] = useState(false); //등록페이지 이미지 초기화
  const [selectedCheck, setSelectedCheck] = useState("관광지");
  const [checkColumn, setCheckColumn] = useState<string>(checkColumnData || "전체"); //검색 옵션 지정
  const [keyword, setKeyword] = useState<string>(""); //검색 keyword 저장 공간
  const [searchResults, setSearchResults] = useState([]); //검색 결과 저장 공간
  const [tourData, setTourData] = useState<TourData[]>([]); //fetchTourData로 Tour의 전체 데이터 저장 공간
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null); //List에 선택한 데이터 정보 저장 공간
  const [totalPages, setTotalPages] = useState<number>(1); //전체 페이지

  const itemsPerPage = 12;
  const numberOfPages = Math.ceil(searchResults.length / itemsPerPage);

  const pagesToShow = 10;
  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  console.log(checkColumn);
  
  // 상세페이지 열기
  const openDetailClicked = (selectedTour: TourData) => {
    setSelectedTour(selectedTour); // 클릭된 관광지 정보 저장
    setOpenDetail(true);
  };

  // 상세페이지 닫기
  const closeDetailClicked = () => {
    setSelectedTour(null); // 선택된 관광지 정보 초기화
    setOpenDetail(false);
  };

  // 등록페이지 열기
  const openClicked = () => {
    setClearUploadImage(false);
    setOpenModal(true); // 모달 열기
  };

  // 등록페이지 닫기
  const closeClicked = () => {
    // 등록이 완료되면 상태 초기화
    setSelectedPlace(null);
    setContent("");

    setClearUploadImage(true);
    setOpenModal(false);
  };

  const jwtToken = localStorage.getItem("token");

  // 장바구니 클릭 시 장바구니 등록
  const basketClicked = async () => {
    console.log("placeId to check:", selectedTour?.placeId);
    try {
      // 투어 정보를 데이터베이스에 저장
      const response = await axios.post(
        "http://localhost:8080/Callyia/Basket",
        JSON.stringify({
          bno: null,
          placeId: selectedTour?.placeId,
        }),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = response.data;
      console.log("결과:", result);

      alert(`장바구니에 추가하였습니다. 내용: ${selectedTour?.placeId}`);
    } catch (error: any) {
      console.error("Error accepting data:", error.message);
      if (error.message.includes("409")) {
        alert("해당 파일은 이미 등록되어 있습니다.");
      }
    }
  };

  const fetchTourData = async () => {
    try {
      // Spring Boot 서버에 페이징 처리된 투어 데이터 요청
      const response = await fetch(
        `http://localhost:8080/Callyia/Tour/all?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`Http error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTourData(data.content);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error("Error fetching tour data: ", error.message);
    }
  };

  // checkColumn과 keyword를 통해 검색
  const fetchSearchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Callyia/Tour/search?checkColumn=${checkColumn}&keyword=${keyword}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.content);
      setTotalPages(data.totalPages);
      console.log(
        "Request sent with checkColumn:",
        checkColumn,
        "keyword:",
        keyword,
        "Data received:",
        data
      );
    } catch (error: any) {
      console.error("Error searching tour data: ", error.message);
    }
  };

  // 투어 아이템 렌더링
  const renderTourItems = () => {
    // 검색 결과 유무에 따라 데이터 렌더링
    const dataToRender = searchResults.length > 0 ? searchResults : tourData;

    return dataToRender.map((tour) => (
      <div key={tour.placeId} className="flex-wrap mr-10 mb-4 w-[320px]">
        <div
          className="ListContent shadowList"
          role="button"
          tabIndex={0}
          onClick={() => openDetailClicked(tour)}
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
              targetContent.classList.remove(
                "hoverAnimation",
                "leaveAnimation"
              );
            }, 300);
          }}
        >
          <div>
            <div className="contentContainer">
              {tour.image && (
                <img
                  src={tour.image} // 이미지 소스를 동적으로 변경해야 할 것 같습니다.
                  className="images"
                  alt={`Image ${tour}`}
                />
              )}
            </div>
            <div className="textContainer">
              <span className="text-style">{tour.address}</span>
              <span className="text-style-second">{tour.placeName}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // useEffect를 사용하여 초기 데이터 로딩
  const searchBtnClick = async () => {
    if (keyword === "" && checkColumn === "전체") {
      setSearchResults([]);
      await fetchTourData();
    } else {
      setTourData([]);
      await fetchSearchData();
    }
    setCurrentPage(1); // 페이지를 1페이지로 초기화
    renderTourItems();
  };

  useEffect(() => {
    const currentPageCheck = async () => {
      if (keyword === "" && checkColumn === "전체") {
        setSearchResults([]);
        await fetchTourData();
      } else {
        setTourData([]);
        await fetchSearchData();
      }
      renderTourItems();
    };
    currentPageCheck();
  }, [currentPage]);


  // 검색어 입력창의 placeholder 설정
  const getPlaceholder = () => {
    switch (checkColumn) {
      case "전체":
        return "지역 또는 제목을 검색해주세요";
      case "음식점":
        return "지역 또는 음식점명을 검색해주세요";
      case "관광지":
        return "지역 또는 관광지명을 검색해주세요";
    }
  };

  // 등록 처리 함수
  const acceptClicked = async () => {
    try {
      // 이미지 파일 업로드를 위한 FormData 생성
      const formData = new FormData();
      if (selectedImageUrl) {
        // 이미지 파일로 변환
        const blob = await fetch(selectedImageUrl).then((res) => res.blob());

        // 이미지 파일이 선택된 경우에만 FormData에 추가
        formData.append("file", blob, "selectedImage.jpg");
      }

      // 이미지를 서버에 업로드

      const uploadResponse = await axios.post(
        "http://localhost:8080/Callyia/Tour/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
      }

      const uploadResult = uploadResponse.data;
      // const imagePath = uploadResult.imageUrl; // 이미지가 저장된 경로
      const imagePath = uploadResult.imagePath; // 이미지가 저장된 경로

      // 투어 정보를 데이터베이스에 저장
      const response = await axios.post(
        "http://localhost:8080/Callyia/Tour",
        {
          placeId: null,
          placeName: selectedPlace?.place_name,
          address:
            selectedPlace?.road_address_name || selectedPlace?.address_name,
          latitude: selectedPlace?.x,
          longitude: selectedPlace?.y,
          placeContent: content,
          checkColumn: selectedCheck,
          image: imagePath, // 이미지가 저장된 경로를 전송
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      switch (response.status) {
        case 200:
          const result = response.data;
          console.log("결과:", result);
          fetchTourData();
          alert(`파일이 등록되었습니다. 내용: ${selectedPlace?.place_name}`);
          // 등록이 완료되면 상태 초기화
          setSelectedPlace(null);
          setContent("");
          setOpenModal(false); // 모달 닫기
          setClearUploadImage(true);
          break;
        case 409:
          alert("해당 파일은 이미 등록되어 있습니다.");
          break;
        default:
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error accepting data:", error.message);
      if (error.message.includes("409")) {
        alert("해당 파일은 이미 등록되어 있습니다.");
      }
    }
  };

  // 체크박스 변경 시 처리 함수
  const handleCheckBoxChange = (check: string) => {
    setSelectedCheck(check);
  };

  // 이미지 선택 시 처리 함수
  const handleSelectedImagesChange = (image: string | null) => {
    if (image) {
      setSelectedImageUrl(image); // 이미지 URL 저장
    } else {
      setSelectedImageUrl(undefined);
    }
  };

  // 선택된 장소 처리 함수
  const handlePlaceSelected = (place: any) => {
    setSelectedPlace(place);
  };


  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const renderPagination = () => {
    let pages = [];

    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's first"
        onClick={() => goToPage(Math.ceil(currentPage / 10) * 10 - 10)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
    );

    // Page Number Buttons within the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    // Next and Last Page Buttons
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    );
    pages.push(
      <button
        className="main-info-pagination-controls-key"
        key="page's last"
        onClick={() => goToPage(Math.ceil(currentPage / 10) * 10 + 1)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    );

    return pages;
  };

  return (
    <div>
      <div>
        <div>
          <div className="swiper-container h-[540px]">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000 }}
              className="swiper-wrapper"
            >
              {bglist.bg.map((item: any) => (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-row justify-center bg-center bg-no-repeat bg-cover border-4"
                  style={{ backgroundImage: `url('${item.bgimage}')` }}
                ></SwiperSlide>
              ))}
            </Swiper>
            <button
              className="fixed p-2 transition-transform transform bg-blue-200 rounded-full cursor-pointer bottom-4 right-4 hover:scale-110"
              onClick={() => window.scrollTo(0, 0)}
            >
              <FaArrowUp size={20} color="#16578F" />
            </button>
          </div>
          <div className="relative left-[720px] border border-t-0 border-b-2 border-x-0 w-[540px] mt-8">
            <select
              className="w-1/5"
              value={checkColumn}
              style={{ backgroundColor: "white" }}
              onChange={(e) => setCheckColumn(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="관광지">관광지</option>
              <option value="음식점">음식점</option>
            </select>
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ backgroundColor: "white" }}
              className="w-3/5 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchBtnClick();
                }
              }}
            />
            <button className="relative w-1/5" onClick={searchBtnClick}>
              <IoSearchCircleOutline className="absolute text-2xl transform -translate-y-1/2 right-2 top-1/2" />
            </button>
          </div>
        </div>
      </div>
      <section>
        <button
          type="button"
          onClick={openClicked}
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
                <CheckBox onCheckChange={handleCheckBoxChange} />
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
                    style={{ backgroundColor: "white" }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div>
                  <Upload
                    onSelectedImageChange={handleSelectedImagesChange}
                    clearSelectedImage={clearUploadImage}
                  />
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
      <section>
        <div className="mx-[220px] my-[80px]">
          <div className="mb-10 text-3xl font-bold underline">여행정보</div>
          <div className="flex flex-wrap">{renderTourItems()}</div>
          <Modal className="" open={openDetail}>
            <ModalContent
              onCloseIconClicked={closeDetailClicked}
              className="p-4 bg-white rounded-lg min-h-[500px] h-auto w-[800px] relative"
            >
              <div>
                <h3 className="mb-8 text-center">상세페이지입니다.</h3>
              </div>
              {selectedTour && (
                <div className="grid">
                  <div className="flex items-center mb-2">
                    <label className="mr-2">이름 : </label>
                    <p className="flex-grow p-1 border rounded">
                      {selectedTour.placeName}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <label className="mr-2">지역 : </label>
                    <p className="flex-grow p-1 border rounded">
                      {selectedTour.address}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <label className="mr-2">내용 : </label>
                    <p className="flex-grow h-auto p-1 border rounded">
                      {selectedTour.placeContent}
                    </p>
                  </div>
                  <div className="w-full h-auto">
                    <img
                      src={selectedTour.image}
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
        <div className="main-info-pagination-controls">
          {renderPagination()}
        </div>
      </section>
    </div>
  );
};

export default RegistPage;
