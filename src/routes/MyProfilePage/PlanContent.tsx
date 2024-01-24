
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ProfilePage.css';
import { dummyPlan } from '../UserProfilePage/dummyPlan';

type UserInfo = {
  email: string;
  nickname: string;
  name: string;
  profileImage: string;
  aboutMe: string;
}

// onclick 설정
// fetch 설정

const PlanContent = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    // const email = localStorage.getItem('email');
    const email = 'aaa@aaa.aaa'; // 임시로 넣어둠 수정해야 함
  
    if (!token || !email) {
      return;
    }
  
    axios.get(`http://localhost:8080/Callyia/member/getMember?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    .then(response => {
      setUserInfo(response.data.memberDTO);
      console.log(response.data.memberDTO.aboutMe);
      console.log(response.data.memberDTO.email);
      console.log(response.data.memberDTO.aboutMe);
    })
  
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
  }, []); 

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleClick = (pno:number) => {
    navigate(`/PlanningPage?pno=${pno}`);
  }

  return (
    <div className="profile-edited-plan">
        {dummyPlan.map(plan => (
        <div key={plan.pno} className='profile-plan-div' onClick={() => handleClick(plan.pno)}>
          <div>
            <div className='profile-plan-id'>id : {plan.user_id} </div>
            <div className='profile-plan-pno'>pno : {plan.pno}</div>
            <div className='profile-plan-day'>day : {plan.day}</div>
            <div className='profile-plan-title'>title : {plan.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanContent;
