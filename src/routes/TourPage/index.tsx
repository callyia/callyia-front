import backImage from "../Images/주창배경.jpg";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import TListPage from "./TListPage";
import { UploadPage } from "../UploadPage";
import SearchPage from "./SearchPage";
import { useNavigate } from "react-router-dom";

export default function TourPage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCombo, setSearchCombo] = useState("user");

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤 위치에 따라 이미지 크기 동적으로 조절
  const imageSize = 570 - Math.min(scrollPosition, 100);

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      navigate(
        `/ListPage?searchcombo=${searchCombo}&searchkeyword=${searchKeyword}`
      );
    }
  };

  return (
    <div>
      <div>
        <SearchPage
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchCombo={searchCombo}
          setSearchCombo={setSearchCombo}
          onSearch={handleSearchKeyDown}
        />
      </div>
      <div>
        <TListPage />
      </div>
    </div>
  );
}
