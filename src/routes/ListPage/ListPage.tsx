import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ListPage.css';

interface UserSearchResult {
  name: string;
  nickname: string,
  email: string;
  profileImage: string;
  aboutMe: string;
  phone: string;
}

interface LocationSearchResult {
  latitude: number,
  longitude: number,
  placeId: number,
  address: string, 
  checkColumn: string, 
  image: string, 
  placeContent: string, 
  placeName: string
}

interface ScheduleSearchResult {
  sno: number,
  sName: string,
  total_Day: number,
  member_nickname: string
}

interface Tips {
  user: string[];
  location: string[];
  schedule: string[];
}

const ListPage = () => {
  const location = useLocation();

  const [UserSearchResult, setUserSearchResult] = useState<UserSearchResult[]>([]);
  const [LocationSearchResult, setLocationSearchResult] = useState<LocationSearchResult[]>([]);
  const [ScheduleSearchResult, setScheduleSearchResult] = useState<ScheduleSearchResult[]>([]); // 페이지 처리
  const [searchCombo, setSearchCombo] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const pagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const userNumberOfPages = Math.ceil(UserSearchResult.length / itemsPerPage);
  const locationNumberOfPages = Math.ceil(LocationSearchResult.length / itemsPerPage);
  const scheduleNumberOfPages = Math.ceil(ScheduleSearchResult.length / itemsPerPage); // 페이지 처리 
  const userEndPage = Math.min(startPage + pagesToShow - 1, userNumberOfPages);
  const locationEndPage = Math.min(startPage + pagesToShow - 1, locationNumberOfPages);
  const scheduleEndPage = Math.min(startPage + pagesToShow - 1, scheduleNumberOfPages);
  const [dataFetched, setDataFetched] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const [isValidQuery, setIsValidQuery] = useState(true);

  const tips: Tips = {
    user: ["- 유저의 경우에는 닉네임을 기반으로 검색합니다.", "- 닉네임이 기억나지 않을 때는 올린 글을 참조해서 찾아보세요.", "- 해당 유저가 탈퇴한 경우는 찾을 수 없습니다."],
    location: ["- 장소의 경우에는 이름과 주소를 기반으로 검색합니다.", "- 장소의 경우 카카오맵을 기반으로 하고 있습니다."],
    schedule: ["- 일정의 경우에는 일정 이름을 기반으로 검색합니다.", "- 일정 이름의 경우 유저가 변경했을 수도 있습니다."]
  };
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const newSearchCombo = urlParams.get('searchcombo');
        const newSearchKeyword = urlParams.get('searchkeyword');
        
        setSearchCombo(newSearchCombo);
        setSearchKeyword(newSearchKeyword);

        if (!newSearchCombo || !newSearchKeyword) {
          setIsValidQuery(false);
          return; 
        }
        setIsValidQuery(true); 
        
        if (newSearchCombo !== searchCombo || newSearchKeyword !== searchKeyword) {
          setCurrentPage(1); 
        }
    
        let userResponse, locationResponse, scheduleResponse;

        if(newSearchCombo === 'location') {
          locationResponse = await fetch(`http://localhost:8080/Callyia/Tour/all`);
        } 
  
        else if(newSearchCombo === 'user') {
          userResponse = await fetch(`http://localhost:8080/Callyia/member/getAll`);
        } 
  
        else if(newSearchCombo === 'schedule') {
          scheduleResponse = await fetch(`http://localhost:8080/Callyia/Schedule/getAllSchedule`);
        } 
  
        if (userResponse) {
          const JsonUserData = await userResponse.json();
          const userData = JsonUserData.filter((user: UserSearchResult) => user.nickname.toLowerCase().includes(newSearchKeyword.toLowerCase()));
          setUserSearchResult(userData);
        }
        if (locationResponse) {
          const JsonLocationData = await locationResponse.json();
          const JsonLocationContent = JsonLocationData.content;
          const locationData = JsonLocationContent.filter((location: LocationSearchResult) => location.placeName.toLowerCase().includes(newSearchKeyword.toLowerCase()) || location.address.includes(newSearchKeyword));
          setLocationSearchResult(locationData);
        }
        if (scheduleResponse) {
          const JsoncheduleData = await scheduleResponse.json();
          const scheduleData = JsoncheduleData.filter((schedule: ScheduleSearchResult) => schedule.sName.toLowerCase().includes(newSearchKeyword.toLowerCase()));
          setScheduleSearchResult(scheduleData);
        }
  
        setDataFetched(true);

        } catch (error) {
          console.log("error >> ", error);
        }
      };
    fetchData();
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

//   if (!dataFetched) {
//     return <div>Loading...</div>;
// }

  if (dataFetched && UserSearchResult.length === 0 && LocationSearchResult.length === 0 && ScheduleSearchResult.length === 0) {
    return (
      <div className="list-page">
        <div className='list-search-keyword-header'>
        <span className='list-search-combo'>'
            {searchCombo === 'user' && '유저'}
            {searchCombo === 'location' && '장소'}
            {searchCombo === 'schedule' && '일정'}
          '</span>(으)로 선택하여 
          <span className='list-search-keyword'> {searchKeyword}</span>를 검색한 결과입니다.
          <div className='list-page-search-keyword-bar' /> 
          <span className='list-search-keyword'>해당하는{' '} 
          {searchCombo === 'user' && '유저'}
          {searchCombo === 'location' && '장소'}
          {searchCombo === 'schedule' && '일정'}
            (을)를 찾을 수 없습니다. 해당하는 TIP을 확인바랍니다.</span>
        </div>
        <div className='list-tips-cards'>
        {['user', 'location', 'schedule'].map((type, index) => (
          <div 
            className='list-tips-card' 
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            key={index}
          >
            <div className='list-tips-card-title'>{`${type === 'user' ? '유저' : type === 'location' ? '장소' : '일정'}에 관한 검색 TIP`}
            <div className='list-tips-card-content'>앞에 선택하는 콤보박스와 오타를 확인하세요!</div>
            {hoveredCard === index && (
              <div className='list-tips-card-hover-content' >
              {tips[type as keyof Tips].map((tip: string, tipIndex: number) => (
                <p key={tipIndex}>{tip}</p>
              ))}
              </div>
            )}
          </div>
          </div>
        ))}
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
            <div key={result.email} className="list-image-item">
              <img src={result.profileImage} alt={`${result.nickname}의 profile`}/>
              <p>
                <a className='list-user-nickname' href={`/UserProfilePage?userid=${result.email}`}>{result.nickname}</a>
              </p> 
              <p>
                <span className='list-user-email'>{result.email}</span>
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
            <div key={result.placeId} className="list-image-item-square">
            <img src={result.image} alt={`${result.placeName}의 location`}/>
            <p>
              <a className='list-user-nickname' href={`/UserProfilePage?location=${result.placeName}`}>{result.placeName}</a>
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
              <div key={result.sno} className="list-normal-item">
                <p>
                  <a className='list-user-nickname' href={`/SchedulePage/${result.sno}`}>{result.sName}</a>
                </p>
                <p>
                  <a className='list-total-day'  href={`/SchedulePage/${result.sno}`}> {result.total_Day}일 계획</a>
                </p>
                <p>
                  <a className='list-total-day' href={`/SchedulePage/${result.sno}`}> made by {result.member_nickname}</a> 
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
