import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ListPage.css';
import { dummyUser } from './../UserProfilePage/dummydata';

interface SearchResult {
  userid: string;
  usernickname: string,
  useremail: string;
  imageUrl: string;
  likesCount: number;
  postCount: number;
  userselfintroduction?: string;
}

const ListPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchCombo, setSearchCombo] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const numberOfPages = Math.ceil(searchResults.length / itemsPerPage);
  const pagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, numberOfPages);

  const [isValidQuery, setIsValidQuery] = useState(true);

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const newSearchCombo = urlParams.get('searchcombo');
    const newSearchKeyword = urlParams.get('searchkeyword');

    setSearchCombo(newSearchCombo);
    setSearchKeyword(newSearchKeyword);

    const filteredData = dummyUser.filter(item => {
      if (!newSearchCombo || !newSearchKeyword) return true;
      return newSearchKeyword ? item.usernickname.toLowerCase().includes(newSearchKeyword.toLowerCase()) : true;
    });

    setSearchResults(filteredData);

    if (!newSearchCombo || !newSearchKeyword) {
      setIsValidQuery(false);
      return; 
    }
    setIsValidQuery(true); 

  }, [location.search, currentPage]);

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(numberOfPages, page));
    setCurrentPage(newPage);
  };

  if (!isValidQuery) {
    return (
      <div className="list-page">
        <div className='list-search-keyword-header' >
        <span className='list-search-keyword'>검색 keyword를 입력하여 주세요</span>
        </div>
      </div>
    );
  }
   return (
    <div className="list-page" >
        <div className='list-search-keyword-header' >
          <span className='list-search-combo'>'
            {searchCombo === 'user' && '유저'}
            {searchCombo === 'location' && '장소'}
            {searchCombo === 'schedule' && '일정'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.</div>
        <div className='list-page-search-keyword-bar' >
          <div className="list-image-grid">
          {paginatedResults.map(result => (
            <div key={result.userid} className="list-image-item">
              <img src={result.imageUrl} alt={`${result.usernickname}의 profile`}/>
              <p>
                <a className='list-user-nickname' href={`/UserProfilePage?userid=${result.userid}`}>{result.usernickname}</a>
              </p> 
              <p>
                <span className='list-user-email'>{result.useremail}</span>
              </p>
            </div>
          ))} 
      </div>
      </div>
            {searchResults.length > itemsPerPage && (
  <div className="list-pagination-controls">
    <button onClick={() => goToPage(Math.ceil(currentPage/10)*10 - 10)} disabled={currentPage === 1}>
      {'<<'}
    </button>
    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
      {'<'}
    </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <span
              key={page}
              className={`list-page-number ${currentPage === page ? 'list-current-page' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </span>
       ))}
    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === numberOfPages}>
      {'>'}
    </button>
    <button onClick={() => goToPage(Math.ceil(currentPage/10)*10 + 1)} disabled={currentPage === numberOfPages}>
      {'>>'}
    </button>
  </div>
)}

    </div>
  );
};

export default ListPage;
