import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './ListPage.css';

const List: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Access query parameters
  const searchCombo = searchParams.get('searchcombo');
  const searchKeyword = searchParams.get('searchkeyword');

  return (
    <div className="main-container">
          <a href="/">
            <img src="/topbar-logo.png" alt="Logo" className="logo" />
          </a>
      <p style={{backgroundColor: '#abcdef'}}>Search Combo: {searchCombo}</p>
      <p style={{backgroundColor: '#abcdef'}}>Search Keyword: {searchKeyword}</p>
    </div>
  );
};

export default List;
