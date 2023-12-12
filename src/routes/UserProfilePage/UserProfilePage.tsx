import React from 'react';

import './ProfilePage.css';
import  UserSelfIntroduction  from './UserSelfIntroduction';

function formatNumber(num: number) {
  if (num >= 100000000) {
    return (Math.floor(num / 10000000) / 10).toFixed(1) + '억';
  }
  
  if (num >= 10000) {
    return (Math.floor(num / 1000) / 10).toFixed(1) + '만';
  }
  return num.toString();
}

const UserProfile: React.FC = () => {

  const likesCount = 12223243;
  const postCount = 1111110;

  const exampleText = '남의 소개글 test 중입니다. my profile에서 45자를 넘지 않습니다';

  return (
    <div className="profile-container" >
          <div className ="profile-self-introduction-title">
            자기소개
          </div>
          
      <div className="profile-header">
      
        <div className="profile-left-section">
          <p className="profile-self-introduction"> 
           <UserSelfIntroduction text={exampleText}/>
          </p>
        </div>
        <div className="profile-right-section">
        <div className="profile-stats" >
        <div className="profile-post-count" >
          <div className="profile-icon-number-container">
            <img src='./profile/profile_post_icon.png' alt="Post icon" className="profile-post-icon" />
          </div>
            <span className='profile-post-number'>{formatNumber(likesCount)}</span>
        </div>
        <div className="profile-likes-count">
          <div className="profile-icon-number-container">
            <img src='./profile/profile_like_icon.png' alt="Like icon" className="profile-likes-icon" />
          </div>
            <span className='profile-likes-number'>{formatNumber(postCount)}</span>
        </div>
      </div>
      </div>
    </div>
      <div className="profile-user-posts" style={{border: "7px solid gray"}}>
        <div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div><div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
