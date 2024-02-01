import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import './ProfilePage.css';
import SelfIntroduction  from './SelfIntroduction';
import CartContent from './CartContent';
import ScheduleContent from './ScheduleContent';
import PlanContent from './PlanContent';

interface MyProfileProps {
  isEditing: boolean;
  toggleIsEditing: (isEditing?: boolean) => void;
  profileImage: String;
  handleProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  aboutMeText: string;
  currentContent: string;
}

function formatNumber(num: number) {
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
  currentContent 
}) => {
  const [text, setText] = useState('');
  const [postCount, setPostCount] = useState(0);

  const handleTextChange = (newText: string) => {
    setText(newText);
  }

  const handleEditButtonClick = async () => {
    
    const willSave = await swal({
      title: "프로필 변경", 
      text: "이 내역들을 변경하시겠습니까?", 
      icon: "warning", 
      buttons: {
        confirm: {
          text: "변경", 
          value: true, 
          visible: true, 
          className: "", 
          closeModal: true, 
        }, cancel: {
          text: "취소",
          value: false, 
          visible: true, 
          className: "", 
          closeModal: true, 
        }
      },
      dangerMode: true,
    });
    
    if (willSave) {
      swal({
        text: "Change.",
        icon: "success",
        buttons: [false], 
        timer: 500, 
      });
      setTimeout(handleUpdateClick, 500);
    } 
  };

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

  useEffect(() => {
    const email = localStorage.getItem('email');
    axios.get(`http://localhost:8080/Callyia/Schedule/getScheduleCount?email=${email}`)
        .then(response => {
            console.log(response.data);
            
            setPostCount(response.data); 
        })
        .catch(error => {
            console.error('Error fetching post count:', error);
        });
    }, []);


  const handleUpdateClick = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token || !email) {
      console.error('No token or email found');
      return;
    }
  
    axios.put(`http://localhost:8080/Callyia/member/updateMember?email=${email}`, {
      email: email,
      aboutMe: text,
      // profileImage: profileImage
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mount_Everest%2C_Himalayas.jpg'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      toggleIsEditing(); 
      // console.log(response.data);
      window.location.reload();
    })

    .catch(error => {
      console.error('Error updating user info:', error);
    });
  };
  
  return (
    <div className="profile-container" >
          <div className ="profile-self-introduction-title">
            자기소개
          </div>
          
      <div className="profile-header">
      
        <div className="profile-left-section">
          <div className="profile-self-introduction"> 
           <SelfIntroduction isEditing = {isEditing} text={text} onTextChange={handleTextChange}/>
           <button className="edit-save-btn" onClick={isEditing ? handleEditButtonClick : () => toggleIsEditing()}>
            {/* <button className="edit-save-btn"   onClick={isEditing ? handleUpdateClick : handleEditButtonClick}> */}
              {isEditing ? '저장' : '수정'}
            </button>
          </div>
        </div>
        <div className="profile-right-section">
        <div className="profile-stats">
        <div className="profile-post-count"  >
          <div className="profile-icon-number-container">
            <img src='./profile/profile_post_icon.png' alt="Post icon" className="profile-post-icon" />
          </div>
            <span className='profile-post-number'>{formatNumber(postCount)}</span>
        </div>
      </div>
      </div>
    </div>
        {contentToRender}
    </div>
  );
};

export default MyProfile;
