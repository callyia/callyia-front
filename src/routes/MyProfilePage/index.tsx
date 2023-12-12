import React, { ChangeEvent, useState, useRef} from 'react';

import MyProfile from './MyProfilePage';

export default function MyProfilePage() { 
  const [isEditing, setIsEditing] = useState(false); 
  const [profileImage, setProfileImage] = useState<string>('./dummyimages/image1.jpeg'); // 기본 이미지
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (event:ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (typeof fileReader.result === 'string') {
          setProfileImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
              <img src={profileImage} alt="Profile" className={`my-profile-picture ${isEditing ? 'my-profile-picture-hover' : ''}`} onClick={handleImageClick}
              style={{ cursor: 'pointer', textAlign: 'center', margin: 'auto', display: 'block' }}/>
              <input type="file" ref={fileInputRef} onChange={handleProfileImageChange} accept="image/*"
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
              <div className="profile-actions">
                <div className='profile-action-div'>
                <button className="profile-action-button"><img src="./profile/profile_calender_icon.png" alt="my calender" /></button>
                <h3>나의 일정 바로가기</h3>
                </div>
                <div className='profile-action-div'>
                <button className="profile-action-button"><img src="./profile/profile_shop_bag_basket_icon.png" alt="my scuedule cart" /></button>
                <h3>나의 일정 장바구니</h3>
                </div>
                <div className='profile-action-div'>
                <button className="profile-action-button"><img src="./profile/profile_like_icon.png" alt="post i liked" /></button>
                <h3>내가 좋아요 한 글</h3>
                </div>
              </div>
            {/* </div> */}
            </div>
          </div>
    
          <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
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
              <MyProfile 
              isEditing={isEditing}
              toggleIsEditing={() => setIsEditing(!isEditing)}
              profileImage={profileImage} 
              handleProfileImageChange={handleProfileImageChange}/>
            </div>
            
          </div>
        </div>
      );
}
