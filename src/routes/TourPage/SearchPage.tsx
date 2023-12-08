import React, { useState } from "react";
import dummyData from "./list";
import TListPage from "./TListPage";

interface DummyItem {
  id: number;
  name: string;
  area: string;
  title: string;
  content: string;
  image: string;
}

const SearchPage = ({ onSearchResults }: { onSearchResults: any }) => {
  const [searchOption, setSearchOption] = useState<string>("관광지");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DummyItem[]>([]);

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

    setSearchResults(results);

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
    <section className="flex flex-row justify-center border-4">
      <div className="border border-t-0 border-b-2 border-x-0 w-[540px] my-[200px]">
        <div>
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
    </section>
  );
};

export default SearchPage;
