import React, { ChangeEvent, useState, useRef} from 'react';

import UserProfile from './UserProfilePage';

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState<string>('./dummyimages/image1.jpeg'); // 기본 이미지
  const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div style={{ flex:1, display: 'flex', height: '1200px'}}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px",
              maxHeight: "1200px",
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
              <img src={profileImage} alt="Profile" className="my-profile-picture"
              style={{ cursor: 'pointer', textAlign: 'center', margin: 'auto', display: 'block' }}/>
              <input type="file" ref={fileInputRef} accept="image/*"
              style={{ display: 'none' }} />
                
            </div>
            <div
              style={{
                flex: 0.2,
                border: "2px",
                borderRadius: "8px",
                backgroundColor: "black",
                padding: "16px",
                margin: "8px",
                marginTop: "40px",
                marginLeft: "10px",
                marginRight: "10px",
                color: "white"

              }}
            >
              {/* font h2 사이즈로 맞춰서 닉네임 받아오기 */}
              <div className = "profile-id">MYUSER</div>
              <div className = "profile-email">MYUSER@EMAIL.COM</div>
            </div>
            {/* <div style={{ flex: 1 }}> */}
            <div
              style={{
                flex: 1.2,
                border: "2px",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "white",
                margin: "8px",
                marginTop: "20px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
            </div>
          </div>
    
          <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                  flex: 2,
                  border: "5px solid red",
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
      );
}
