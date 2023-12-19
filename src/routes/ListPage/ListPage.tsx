import React, { useState, useEffect } from 'react';
import './ListPage.css';

interface SearchResult {
  id: number;
  usernickname: string,
  title: string;
  description: string;
  imageUrl: string;
}

const ListPage = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchCombo, setSearchCombo] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

  useEffect(() => {
    const dummyData: SearchResult[] = [
      { id: 1, usernickname: '신중현', title: '신중현', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 2, usernickname: '전성모' ,title: '전성모', description: 'Description 2', imageUrl: 'https://picsum.photos/200' },
      { id: 3, usernickname: '이규훈' ,title: '이규훈', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 4, usernickname: '김지영' ,title: '김지영', description: 'Description 2', imageUrl: 'https://picsum.photos/200' },
      { id: 5, usernickname: '정영훈' ,title: '정영훈', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 6, usernickname: '임윤서' ,title: '임윤서', description: 'Description 2', imageUrl: 'https://picsum.photos/200' },
      { id: 7, usernickname: '홍희범' ,title: '홍희범', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 8, usernickname: '이해창' ,title: '이해창', description: 'Description 2', imageUrl: 'https://picsum.photos/200' },      
      { id: 9, usernickname: '임성훈' ,title: '임성훈', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 10, usernickname: '김준기' ,title: '김준기', description: 'Description 2', imageUrl: 'https://picsum.photos/200' },
      { id: 11, usernickname: '김상백' ,title: '김상백', description: 'Description 1', imageUrl: 'https://picsum.photos/200' },
      { id: 12, usernickname: '문영현' ,title: '문영현', description: 'Description 2', imageUrl: 'https://picsum.photos/200' }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    setSearchCombo(urlParams.get('searchcombo'));
    setSearchKeyword(urlParams.get('searchkeyword'));

    const filteredData = dummyData.filter(item => {
      if (!searchCombo || !searchKeyword) return true;
      const value = item[searchCombo as keyof SearchResult];
      return value?.toString().toLowerCase().includes(searchKeyword.toLowerCase());
    });

    setSearchResults(filteredData);
  }, []);

  return (
    <div className="list-page">
        <div className='list-search-keyword-header'><span className='list-search-combo'>{searchCombo}</span>로 선택하여 <span className='list-search-keyword'>{searchKeyword}</span>를 검색한 결과입니다.</div>
        <div className='list-page-search-keyword-bar'>
          <div className="image-grid">
          {searchResults.map(result => (
            <div key={result.id} className="image-item">
              <img src={result.imageUrl} alt={result.title} />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </div>
          ))} 
      </div>
      </div>
    </div>
  );
};

export default ListPage;
