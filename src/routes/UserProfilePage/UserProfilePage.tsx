import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './ProfilePage.css';
import  UserSelfIntroduction  from './UserSelfIntroduction';

interface User {
  // password, gender, phone, profileImage, postCount
  email: string;
  nickname: string;
  name: string;
  aboutMe: string;
  postCount: 4;
}

function formatNumber(num: number) {
  // if (num >= 100000000) {
  //   return (Math.floor(num / 10000000) / 10).toFixed(1) + '억';
  // }
  if (num === undefined || num === null) {
    return 4444; // or any default value you prefer
  }

  if (num >= 10000) {
    return (Math.floor(num / 1000) / 10).toFixed(1) + '만';
  }
  return num.toString();
}

const UserProfile: React.FC = () => {

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('userid');

  const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => { const fetchUserData = async () => {
      try {
        // setLoading(true);
        const response = await fetch(`http://localhost:8080/Callyia/member/user?email=${email}`);
        if (!response.ok) {
          throw new Error('네트워크 에러');
        }
        const userData = await response.json();
        console.log('유저 데이터:', userData);
        
        setUser(userData);
      } catch (error) {
        console.error('패치 에러:', error);
      } /* finally {
        setLoading(false);
      } */
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  // if(loading) {
  //   return <p>loading..</p>
  // }
  
  if(!user) {
    return <p>유저를 찾을 수 없습니다.</p>
  }
  
  return (
    <div className="user-profile-container">
          <div className ="user-profile-self-introduction-title">
            자기소개
          </div>
      <div className="user-profile-header" >
        <div className="user-profile-left-section">
          <p className="user-profile-self-introduction"> 
           <UserSelfIntroduction text={user.aboutMe}/>
          </p>
        </div>
        <div className="user-profile-right-section">
        <div className="user-profile-stats" >
        <div className="user-profile-post-count" >
          <div className="user-profile-icon-number-container">
            <img src='./profile/profile_post_icon.png' alt="Post icon" className="user-profile-post-icon" />
          </div>
            <span className='user-profile-post-number'>{user ? formatNumber(user.postCount) : formatNumber(33333)}</span>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
