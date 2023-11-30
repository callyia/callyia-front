// SearchBar.tsx
import React from "react";

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
        return "유저를 검색하세요!";
      case "location":
        return "장소를 검색하세요!";
      case "schedule":
        return "일정을 검색하세요!";
      default:
        return "검색항목을 선택하세요!";
    }
  };

  return (
    <div className="search-bar">
      <select onChange={(e) => setSearchCombo(e.target.value)} value={searchCombo} className="search-dropdown">
        <option value="user">유저</option>
        <option value="location">장소</option>
        <option value="schedule">일정</option>
      </select>
      <input
        type="text"
        className="search-input"
        placeholder={getPlaceholder()}
        value={searchKeyword}
        onKeyDown={onSearch}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
