import TListPage from "./TListPage";
import RegistPage from "./RegistPage";
import SearchPage from "./SearchPage";
import { useState } from "react";

export default function TourPage() {
  // 검색 결과를 저장하는 상태
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // SearchPage에서 검색 결과를 받아와서 상태 업데이트
  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <div>
        <SearchPage onSearchResults={handleSearchResults} />
      </div>
      <RegistPage />
      <TListPage searchResults={searchResults} />
    </div>
  );
}
