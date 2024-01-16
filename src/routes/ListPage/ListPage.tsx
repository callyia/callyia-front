import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ListPage.css';
import { dummyUser } from './../UserProfilePage/dummydata';
import { dummyLocation } from './../UserProfilePage/dummyLocation';
import { dummySchedule } from './../UserProfilePage/dummySchedule';

interface UserSearchResult {
  userid: string;
  usernickname: string,
  useremail: string;
  imageUrl: string;
  postCount: number;
  userselfintroduction?: string;
}

interface LocationSearchResult {
  latitude: number,
  longitude: number,
  place_id: number,
  address: string, 
  check_column: string, 
  image: string, 
  place_content: string, 
  place_name: string
}

interface ScheduleSearchResult {
  sno: number,
  s_name: string,
  total_day: number,
  member_email: string
}

const ListPage = () => {
  const location = useLocation();
  const [UserSearchResult, setUserSearchResult] = useState<UserSearchResult[]>([]);
  const [LocationSearchResult, setLocationSearchResult] = useState<LocationSearchResult[]>([]);
  const [ScheduleSearchResult, setScheduleSearchResult] = useState<ScheduleSearchResult[]>([]);
  const [searchCombo, setSearchCombo] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const pagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const userNumberOfPages = Math.ceil(UserSearchResult.length / itemsPerPage);
  const locationNumberOfPages = Math.ceil(LocationSearchResult.length / itemsPerPage);
  const scheduleNumberOfPages = Math.ceil(ScheduleSearchResult.length / itemsPerPage);
  const userEndPage = Math.min(startPage + pagesToShow - 1, userNumberOfPages);
  const locationEndPage = Math.min(startPage + pagesToShow - 1, locationNumberOfPages);
  const scheduleEndPage = Math.min(startPage + pagesToShow - 1, scheduleNumberOfPages);

  const [isValidQuery, setIsValidQuery] = useState(true);

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const newSearchCombo = urlParams.get('searchcombo');
    const newSearchKeyword = urlParams.get('searchkeyword');

    if (newSearchCombo !== searchCombo || newSearchKeyword !== searchKeyword) {
      setCurrentPage(1); 
    }

    setSearchCombo(newSearchCombo);
    setSearchKeyword(newSearchKeyword);

    const userFilteredData = dummyUser.filter(item => {
      if (!newSearchCombo || !newSearchKeyword) return true;
      return newSearchKeyword ? item.usernickname.toLowerCase().includes(newSearchKeyword.toLowerCase()) : true;
    });

    const locationFilteredData = dummyLocation.filter(item => {
      if (!newSearchCombo || !newSearchKeyword) return true;
      return newSearchKeyword ? item.place_name.toLowerCase().includes(newSearchKeyword.toLowerCase()) : true;
    });

    const scheduleFilteredData = dummySchedule.filter(item => {
      if (!newSearchCombo || !newSearchKeyword) return true;
      return newSearchKeyword ? item.s_name.toLowerCase().includes(newSearchKeyword.toLowerCase()) : true;
    });

    setUserSearchResult(userFilteredData);
    setLocationSearchResult(locationFilteredData);
    setScheduleSearchResult(scheduleFilteredData);

    if (!newSearchCombo || !newSearchKeyword) {
      setIsValidQuery(false);
      return; 
    }
    setIsValidQuery(true); 

  }, [location.search, searchCombo, searchKeyword]);

  const userPaginatedResults = UserSearchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const locationPaginatedResults = LocationSearchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const schedulePaginatedResults = ScheduleSearchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const userGoToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(userNumberOfPages, page));
    setCurrentPage(newPage);
  };

  const locationGoToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(locationNumberOfPages, page));
    setCurrentPage(newPage);
  };

  const scheduleGoToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(scheduleNumberOfPages, page));
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

  if (UserSearchResult.length === 0 && LocationSearchResult.length === 0 && ScheduleSearchResult.length === 0) {
    return (
      <div className="list-page">
        <div className='list-search-keyword-header'>
        <span className='list-search-combo'>'
            {searchCombo === 'user' && '유저'}
            {searchCombo === 'location' && '장소'}
            {searchCombo === 'schedule' && '일정'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.
          <div></div>

          <span className='list-search-keyword'>
          {searchCombo === 'user' && '유저'}
          {searchCombo === 'location' && '장소'}
          {searchCombo === 'schedule' && '일정'}
            (을)를 찾을 수 없습니다. 다시 한번 더 확인바랍니다.</span>
        </div>
      </div>
    );
  }
  
   if(searchCombo === 'user') 
   { 
    return (
    <div className="list-page" >
        <div className='list-search-keyword-header' >
          <span className='list-search-combo'>'
            {searchCombo === 'user' && '유저'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.</div>
        <div className='list-page-search-keyword-bar' >
          <div className="list-image-grid">
          {userPaginatedResults.map(result => (
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
            {UserSearchResult.length > itemsPerPage && (
  <div className="list-pagination-controls">
    <button onClick={() => userGoToPage(Math.ceil(currentPage/10)*10 - 10)} disabled={currentPage === 1}>
      {'<<'}
    </button>
    <button onClick={() => userGoToPage(currentPage - 1)} disabled={currentPage === 1}>
      {'<'}
    </button>
      {Array.from({ length: userEndPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <span
              key={page}
              className={`list-page-number ${currentPage === page ? 'list-current-page' : ''}`}
              onClick={() => userGoToPage(page)}
            >
              {page}
            </span>
       ))}
    <button onClick={() => userGoToPage(currentPage + 1)} disabled={currentPage === userNumberOfPages}>
      {'>'}
    </button>
    <button onClick={() => userGoToPage(Math.ceil(currentPage/10)*10 + 1)} disabled={currentPage === userNumberOfPages}>
      {'>>'}
    </button>
  </div>
)}

    </div>
  );
  };

if(searchCombo === 'location') 
   { 
    return (
    <div className="list-page" >
        <div className='list-search-keyword-header' >
          <span className='list-search-combo'>'
            {searchCombo === 'location' && '장소'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.</div>
        <div className='list-page-search-keyword-bar' >
          <div className="list-image-grid">
          {locationPaginatedResults.map(result => (
            <div key={result.place_id} className="list-image-item">
            <img src={result.image} alt={`${result.place_name}의 location`}/>
            <p>
              <a className='list-user-nickname' href={`/UserProfilePage?location=${result.place_name}`}>{result.place_name}</a>
            </p> 
            <p>
              <span className='list-user-email'>{result.address}</span>
            </p>
          </div>
        ))} 
      </div>
      </div>
            {LocationSearchResult.length > itemsPerPage && (
  <div className="list-pagination-controls">
    <button onClick={() => locationGoToPage(Math.ceil(currentPage/10)*10 - 10)} disabled={currentPage === 1}>
      {'<<'}
    </button>
    <button onClick={() => locationGoToPage(currentPage - 1)} disabled={currentPage === 1}>
      {'<'}
    </button>
      {Array.from({ length: locationEndPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <span
              key={page}
              className={`list-page-number ${currentPage === page ? 'list-current-page' : ''}`}
              onClick={() => locationGoToPage(page)}
            >
              {page}
            </span>
       ))}
    <button onClick={() => locationGoToPage(currentPage + 1)} disabled={currentPage === locationNumberOfPages}>
      {'>'}
    </button>
    <button onClick={() => locationGoToPage(Math.ceil(currentPage/10)*10 + 1)} disabled={currentPage === locationNumberOfPages}>
      {'>>'}
    </button>
    </div>
    )}
    </div>
    );
  };


if(searchCombo === 'schedule') 
   { 
    return (
    <div className="list-page" >
        <div className='list-search-keyword-header' >
          <span className='list-search-combo'>'
            {searchCombo === 'schedule' && '일정'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.</div>
        <div className='list-page-search-keyword-bar' >
          <div className="list-image-grid">
          {schedulePaginatedResults.map(result => (
            <div key={result.sno} className="list-image-item">
              <p>
                <a className='list-user-nickname' href={`/UserProfilePage?sno=${result.sno}`}>{result.s_name}</a>
              </p>
            </div>
          ))} 
      </div>
      </div>
            {schedulePaginatedResults.length > itemsPerPage && (
  <div className="list-pagination-controls">
    <button onClick={() => scheduleGoToPage(Math.ceil(currentPage/10)*10 - 10)} disabled={currentPage === 1}>
      {'<<'}
    </button>
    <button onClick={() => scheduleGoToPage(currentPage - 1)} disabled={currentPage === 1}>
      {'<'}
    </button>
      {Array.from({ length: scheduleEndPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <span
              key={page}
              className={`list-page-number ${currentPage === page ? 'list-current-page' : ''}`}
              onClick={() => scheduleGoToPage(page)}
            >
              {page}
            </span>
       ))}
    <button onClick={() => scheduleGoToPage(currentPage + 1)} disabled={currentPage === scheduleNumberOfPages}>
      {'>'}
    </button>
    <button onClick={() => scheduleGoToPage(Math.ceil(currentPage/10)*10 + 1)} disabled={currentPage === scheduleNumberOfPages}>
      {'>>'}
    </button>
  </div>
)}

    </div>
  );
  };


return (
  <div></div>
  )
}
export default ListPage;
