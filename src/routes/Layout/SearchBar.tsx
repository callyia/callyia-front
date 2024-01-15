import React from "react";

import "./Header.css";

interface SearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  searchCombo: string;
  setSearchCombo: (combo: string) => void;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchKeyword, setSearchKeyword, searchCombo, setSearchCombo, onSearch }) => {
  
  const getPlaceholder = () => {
    switch (searchCombo) {
      case "user":
        return "여행친구를 검색하시고 ENTER를 누르세요!";
      case "location":
        return "가고 싶은 곳에 대한 정보를 드리겠습니다. 검색어를 입력하고 ENTER를 누르세요!";
      case "schedule":
        return "아름다운 여행 일정을 만들기 위해 참고하세요. 검색어를 입력하고 ENTER를 누르세요!";
    }
  };

  return (
    <div className="header-search-bar">
      <select onChange={(e) => setSearchCombo(e.target.value)} value={searchCombo} className="header-search-dropdown">
        <option value="user">유저</option>
        <option value="location">장소</option>
        <option value="schedule">일정</option>
      </select>
      <input
        type="text"
        className="header-search-input"
        placeholder={getPlaceholder()}
        value={searchKeyword}
        onKeyDown={onSearch}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
