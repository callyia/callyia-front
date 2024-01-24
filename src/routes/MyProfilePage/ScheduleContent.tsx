
import React from 'react';

import './ProfilePage.css';

const ScheduleContent = () => {
  return (
    <div className="profile-cart-posts" style={{border: "5px gray solid"}}>
      기본 + 나의 일정 바로가기
      <div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
    </div>
  );
};

export default ScheduleContent;
