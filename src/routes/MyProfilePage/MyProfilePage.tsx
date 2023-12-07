import React from 'react';

import './ProfilePage.css';
import  SelfIntroduction  from './SelfIntroduction';

interface MyProfileProps {
  isEditing: boolean;
  toggleIsEditing: () => void;
  profileImage: string;
  handleProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyProfile: React.FC<MyProfileProps> = ({profileImage, handleProfileImageChange}) => {
  const [isEditing, setIsEditing] = React.useState(false);


  return (
    <div className="profile-container">
          <div className ="profile-self-introduction-title">
            자기소개
          </div>
          
          {/* 버튼 이름 주기 */}
          <button onClick={() => setIsEditing(!isEditing)}> 
            {isEditing ? '저장' : '수정'}
          </button>
      <div className="profile-header">
        <div className="profile-left-section">
          <p className="profile-self-introduction"> 
           <SelfIntroduction isEditing = {isEditing}/>
          </p>
        </div>
        <div className="profile-right-section">
        <div className="profile-stats">
        <div className="profile-post-count">
          <div className="profile-icon-text-container">
            <img src='./profile/profile_post_icon1.png' alt="Post icon" className="profile-post-icon" />
            <span>9999</span>
          </div>
        </div>
        <div className="profile-likes-count">
          <div className="profile-icon-text-container">
            <img src='./profile/profile_like_icon.png' alt="Like icon" className="profile-likes-icon" />
            <span>78</span>
          </div>
        </div>
      </div>
      </div>
    </div>
      {/* 이미지 디브 별로 3, 4씩 해서 스크롤 되게 */}
      <div className="profile-user-posts" style={{border: "7px solid gray"}}>
        {/* <h2>내 글</h2> */}
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
        <div className='test-test-test'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
