import React, { useState, useEffect } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import dummyData from "./list";
import { FaArrowUp } from "react-icons/fa"; // react-icons에서 사용할 아이콘을 import
import "./SearchPage.css";
import "swiper/swiper-bundle.css";
import bglist from "./bglist";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SearchPage = ({ onSearchResults }: { onSearchResults: any }) => {
  const [searchOption, setSearchOption] = useState<string>("관광지");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    // 검색 결과를 찾는 로직
    const results = dummyData.dummy.filter((item) => {
      return (
        (item.name.toLowerCase() === searchTerm.toLowerCase() &&
          item.title.toLowerCase().includes(searchOption.toLowerCase())) ||
        (item.area.toLowerCase() === searchTerm.toLowerCase() &&
          item.title.toLowerCase().includes(searchOption.toLowerCase()))
      );
    });

    onSearchResults(results);
  };

  const getPlaceholder = () => {
    switch (searchOption) {
      case "음식점":
        return "지역 또는 음식점명을 검색해주세요";
      case "관광지":
        return "지역 또는 관광지명을 검색해주세요";
    }
  };

  return (
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
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="관광지">관광지</option>
          <option value="음식점">음식점</option>
        </select>
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/5"
        />
        <button onClick={handleSearch} className="w-1/5">
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
