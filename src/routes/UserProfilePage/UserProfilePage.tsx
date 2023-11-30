import React from 'react';
import './ProfilePage.css';

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-left-section">
          <img src="./dummyimages/image1.jpeg" alt="Profile" className="profile-picture"/>
          <div className="profile-id">ID : 남의 프로필</div>
        </div>
        <div className="profile-center-section">
          <p className="profile-self-introduction">남의 소개글</p>
        </div>
        <div className="profile-right-section">
          <div className="profile-stats">
            <p className="profile-post-count">남의 게시글 수: 인자로 받기 1</p>
            <p className="profile-likes-count">남의 좋아요 수 : 인자로 받기 2</p>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <a href="">서치바</a>
      </div>
        <h2>남의 글</h2>
        <table>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>11</td>
            <td>22</td>
            <td>33</td>
          </tr>
          <tr>
            <td>111</td>
            <td>222</td>
            <td>333333333333333333333333333333333333333333333333333333333</td>
          </tr>
        </table>
      </div>
  );
};

export default UserProfile;
