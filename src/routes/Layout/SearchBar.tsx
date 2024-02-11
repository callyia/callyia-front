import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

interface RecentSearch {
  keyword: string;
  combo: string;
  date: string;
}

interface SearchBarProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  searchCombo: string;
  setDate: (date: string) => void | string;
  setSearchCombo: (combo: string) => void;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps & { email: string }> = ({
  searchKeyword,
  setSearchKeyword,
  searchCombo,
  setSearchCombo,
  setDate,
  onSearch,
  email,
}) => {
  const navigate = useNavigate();

  const localStorageKey = `recentSearches_${email}`;
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recentSearches));
  }, [recentSearches, localStorageKey]);

  const handleDeleteRecentSearch = (searchToRemove: RecentSearch) => {
    const filteredSearches = recentSearches.filter(
      (search) =>
        search.keyword !== searchToRemove.keyword ||
        search.combo !== searchToRemove.combo
    );
    setRecentSearches(filteredSearches);
  };

  const handleDeleteAllSearches = () => {
    setRecentSearches([]);
    localStorage.setItem(localStorageKey, JSON.stringify([]));
  };

  const handleFocus = () => {
    setShowRecentSearches(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowRecentSearches(false), 100);
  };

  const handleSelectRecentSearch = (search: {
    keyword: string;
    combo: string;
    date: string;
  }) => {
    setSearchKeyword(search.keyword);
    setDate(search.date);
    setSearchCombo(search.combo);

    setShowRecentSearches(false);
    navigate(
      `/ListPage?searchcombo=${search.combo}&searchkeyword=${search.keyword}`
    );
  };

  const displayComboText = (combo: string) => {
    switch (combo) {
<<<<<<< HEAD
      case "user":
        return "유저";
      case "location":
        return "장소";
      case "schedule":
        return "일정";
      default:
        return combo;
=======
      case "user": return "유저";
      case "location": return "장소";
      case "schedule": return "포스트";
      default: return combo;
>>>>>>> 7cb2810e0205b97345a8305a92ed6e2dfc10cf91
    }
  };

  const getPlaceholder = (searchCombo: string) => {
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
    <div className="header-search-bar" onBlur={handleBlur}>
      <select
        onChange={(e) => setSearchCombo(e.target.value)}
        value={searchCombo}
        className="header-search-dropdown"
      >
        <option value="user">유저</option>
        <option value="location">장소</option>
        <option value="schedule">포스트</option>
      </select>
      <input
        type="text"
        className="header-search-input"
        placeholder={getPlaceholder(searchCombo)}
        value={searchKeyword}
        onKeyDown={onSearch}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onFocus={handleFocus}
      />
      {showRecentSearches && (
        <div className="recent-searches-dropdown">
          {recentSearches.map((search, index) => (
            <div key={index} className="recent-search-item">
              <span className="recent-search-combo">
                {displayComboText(search.combo)}
              </span>
              <span className="recent-search-keyword-container">
                <span
                  className="recent-search-keyword"
                  onClick={() => handleSelectRecentSearch(search)}
                >
                  {search.keyword}
                </span>
              </span>
              <span className="recent-search-date">({search.date})</span>
              <button
                className="recent-search-delete"
                onClick={() => handleDeleteRecentSearch(search)}
              >
                x
              </button>
            </div>
          ))}
          {recentSearches.length > 0 && (
            <button
              className="recent-search-all-delete"
              onClick={handleDeleteAllSearches}
            >
              전체 삭제
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
