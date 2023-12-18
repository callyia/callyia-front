import React, { useState, useRef} from 'react';

import UserProfile from './UserProfilePage';

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState<string>('./dummyimages/image1.jpeg'); // 기본 이미지
  const fileInputRef = useRef<HTMLInputElement>(null);

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
              <div className = "user-profile-id">MYUSER</div>
              <div className = "user-profile-email">MYUSER@EMAIL.COM</div>
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
