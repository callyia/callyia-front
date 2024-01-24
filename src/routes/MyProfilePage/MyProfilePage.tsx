import React, { useState } from 'react';

import './ProfilePage.css';
import SelfIntroduction  from './SelfIntroduction';
import CartContent from './CartContent';
import ScheduleContent from './ScheduleContent';
import PlanContent from './PlanContent';
import axios from 'axios';

interface MyProfileProps {
  isEditing: boolean;
  toggleIsEditing: () => void;
  profileImage: string;
  handleProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  aboutMeText: string;
  // handleAboutMeChange: (newText: string) => void;
  // handleUpdateClick: () => void;
  currentContent: string;
  // currentContent: (newContent: string) => void;
}

function formatNumber(num: number) {
  // if (num >= 100000000) {
  //   return (Math.floor(num / 10000000) / 10).toFixed(1) + '억';
  // }
  
  if (num >= 10000) {
    return (Math.floor(num / 1000) / 10).toFixed(1) + '만';
  }
  return num.toString();
}

const MyProfile: React.FC<MyProfileProps> = ({
  isEditing, 
  toggleIsEditing, 
  profileImage, 
  handleProfileImageChange, 
  aboutMeText, 
  // handleAboutMeChange,
  // handleUpdateClick,
  currentContent 
}) => {
  const [text, setText] = useState('');

  const likesCount = 12223243;
  const email = 'aaa@aaa.aaa';

  const handleTextChange = (newText: string) => {
    setText(newText);
  }

  let contentToRender;
  switch (currentContent) {
    case "ScheduleContent":
      contentToRender = <ScheduleContent />;
      break;
    case "CartContent":
      contentToRender = <CartContent />;
      break;  
    case "PlanContent":
      contentToRender = <PlanContent />;
      break;
    default:
      contentToRender = <ScheduleContent />;
      break;
  }

  return (
    <div className="profile-container" >
          <div className ="profile-self-introduction-title">
            자기소개
          </div>
          
      <div className="profile-header">
      
        <div className="profile-left-section">
          <p className="profile-self-introduction"> 
           <SelfIntroduction isEditing = {isEditing} text={text} onTextChange={handleTextChange}/>
            <button className="edit-save-btn"> 
            {/* <button className="edit-save-btn" onClick={isEditing ? handleUpdateClick : toggleIsEditing} >  */}
              {isEditing ? '저장' : '수정'}
            </button>
          </p>
        </div>
        <div className="profile-right-section">
        <div className="profile-stats">
        <div className="profile-post-count"  >
          <div className="profile-icon-number-container">
            <img src='./profile/profile_post_icon.png' alt="Post icon" className="profile-post-icon" />
          </div>
            <span className='profile-post-number'>{formatNumber(likesCount)}</span>
        </div>
      </div>
      </div>
    </div>
        {contentToRender}
    </div>
  );
};

export default MyProfile;
