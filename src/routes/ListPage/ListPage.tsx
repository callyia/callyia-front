import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ListPage.css';

interface SearchResult {
  userid: string;
  usernickname: string,
  useremail: string;
  imageUrl: string;
}

const ListPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchCombo, setSearchCombo] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 
  const numberOfPages = Math.ceil(searchResults.length / itemsPerPage);

  useEffect(() => {
    const dummyData: SearchResult[] = [
      { userid: 'aa1', usernickname: '신중현', useremail: '신중현', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa2', usernickname: '전성모' ,useremail: '전성모', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa3', usernickname: '이규훈' ,useremail: '이규훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa4', usernickname: '김지영' ,useremail: '김지영', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa5', usernickname: '정영훈' ,useremail: '정영훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa6', usernickname: '임윤서' ,useremail: '임윤서', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa7', usernickname: '홍희범' ,useremail: '홍희범', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aa8', usernickname: '이해창' ,useremail: '이해창', imageUrl: 'https://picsum.photos/200' },      
      { userid: 'aa9', usernickname: '임성훈' ,useremail: '임성훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa1', usernickname: '김준기' ,useremail: 'wnsrl123123123@naver.com', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa2', usernickname: '김상백' ,useremail: '김상백', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa3', usernickname: '문영현' ,useremail: '문영현', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa4', usernickname: '신중현부계', useremail: '신중현', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa5', usernickname: '전성모부계' ,useremail: '전성모', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa6', usernickname: '이규훈부계' ,useremail: '이규훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa7', usernickname: '김지영부계' ,useremail: '김지영', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa8', usernickname: '정영훈부계' ,useremail: '정영훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaa9', usernickname: '임윤서부계' ,useremail: '임윤서', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaaa1', usernickname: '홍희범부계' ,useremail: '홍희범', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaaa2', usernickname: '이해창부계' ,useremail: '이해창', imageUrl: 'https://picsum.photos/200' },      
      { userid: 'aaaa3', usernickname: '임성훈부계' ,useremail: '임성훈', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaaa4', usernickname: '김준기부계' ,useremail: '김준기', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaaa5', usernickname: '김상백부계' ,useremail: '김상백', imageUrl: 'https://picsum.photos/200' },
      { userid: 'aaaa6', usernickname: '문영현부계' ,useremail: '문영현', imageUrl: 'https://picsum.photos/200' },
      { userid: 'a', usernickname: 'a' ,useremail: 'a', imageUrl: 'https://picsum.photos/200' }
    ];

    const urlParams = new URLSearchParams(location.search);
    const newSearchCombo = urlParams.get('searchcombo');
    const newSearchKeyword = urlParams.get('searchkeyword');

    setSearchCombo(newSearchCombo);
    setSearchKeyword(newSearchKeyword);

    const filteredData = dummyData.filter(item => {
      if (!newSearchCombo || !newSearchKeyword) return true;
      return newSearchKeyword ? item.usernickname.toLowerCase().includes(newSearchKeyword.toLowerCase()) : true;
    });

    setSearchResults(filteredData);
  }, [location.search]);

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(numberOfPages, page));
    setCurrentPage(newPage);
  };

  return (
    <div className="list-page">
        <div className='list-search-keyword-header' >
          <span className='list-search-combo'>{searchCombo}</span>로 선택하여 
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
    {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(page => (
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
