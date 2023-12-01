import React from 'react';
import './ProfilePage.css';

const MyProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-left-section">
          <img src="./dummyimages/image1.jpeg" alt="Profile" className="profile-picture" style={{cursor:"pointer"}}/>
          <div className="profile-id">ID : 마이프로필</div>
        </div>
        <div className="profile-center-section">
          <p className="profile-self-introduction">자기 소개글</p>
        </div>
        <div className="profile-right-section">
          <div className="profile-stats">
            <p className="profile-post-count">게시글 수: 인자로 받기 1</p>
            <p className="profile-likes-count">좋아요 수 : 인자로 받기 2</p>
          </div>
        </div>
      </div>
      <div className="profile-user-posts">
        <h2>내 글</h2>
      </div>
    </div>
  );
};

export default MyProfile;
