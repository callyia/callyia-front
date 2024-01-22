import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserProfile from './UserProfilePage';
import UserSelfIntroduction from './UserSelfIntroduction';

interface User {
  email: string;
  nickname: string;
  profileImage: string;
  aboutMe: string;
  phone: string;
  // postCount: number; // 어떻게 하실건가요?
}

export default function UserProfilePage() {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('userid');

  const [user, setUser] = useState<any>(null); 
  const [profileImage, setProfileImage] = useState<string>('./dummyimages/image1.jpeg'); // 기본 이미지

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Callyia/member/user?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        setUser(userData);
        setProfileImage(userData.profileImage || './dummyimages/image1.jpeg');
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  // if (!user) {
  //   return (
  //     <div className="user-profile-page">
  //       <div className='user-profile-search-keyword-header' >
  //       <span className='user-profile-search-keyword'>USER를 찾을 수 없습니다. 다시 한번 더 확인바랍니다.</span>
  //       </div>
  //     </div>
  //   );
  // }

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: 'column', height: '1000px'}}>
      <div style={{ flex: 1, display: "flex", height: '530px', flexDirection: 'column', width: '100%'}}>
        <div>
        <div style={{ flex:1, display: 'flex', height: '500px'}}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px",
              maxHeight: "503px"
            }}
          >
            <div
              style={{
                flex:0.01 ,
                borderRadius: "50%",
                marginLeft: "10px",
                marginRight: "10px"
              }}
            >
              <img src={profileImage} alt="Profile" className="user-profile-picture"
              style={{ textAlign: 'center', margin: 'auto', display: 'block' }}/>
              <input type="file" ref={fileInputRef} accept="image/*"
              style={{ display: 'none' }} />
                
            </div>
            <div
              style={{
                flex: 0.2,
                borderRadius: "8px",
                backgroundColor: "black",
                padding: "26px",
                margin: "8px",
                marginTop: "40px",
                marginLeft: "10px",
                marginRight: "10px",
                color: "white"
              }}
            >
              <div className = "user-profile-nickname">{user?.nickname}</div>
              <div className = "user-profile-email">{user?.email}</div>
            </div>
          </div>
    
          <div style={{ flex: 3, display: "flex", height: "502px" }}>
            <div
              style={{
                  flex: 2,
                  border: "5px solid black",
                  borderRadius: "8px",
                  padding: "16px",
                  margin: "8px",
                }}
            >
              {/* 오른쪽 상단 */}
            <UserProfile />
            {/* <UserProfile user={user} /> */}
          
            </div>
          </div>
          </div>
        </div>
        <div style={{ display: "grid", height: "702px", width: '100%'}} >
          <div className="user-profile-user-posts">
          <div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div><div className='user-profile-post-img'>
            <img src="./profile/profile_like_icon.png" alt="post i liked" />
          </div>
          </div> 
          </div>
        </div>
        </div>
      );
}
