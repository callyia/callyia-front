
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ProfilePage.css';

type PlanInfo = {
  pno: number;
  user_id: string;
  day: string;
  title: string;
}

const PlanContent = () => {
  const navigate = useNavigate();

  const [planInfo, setPlanInfo] = useState<PlanInfo[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
  
    if (!token || !email) {
      return;
    }

    // Fetch user info
    axios.get(`http://localhost:8080/Callyia/member/user?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      fetchPlans(token, response.data.email);
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
  }, []);

  const fetchPlans = (token: string, email:string) => {
    
    axios.get(`http://localhost:8080/Callyia/plan?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    .then(response => {
      setPlanInfo(response.data.plans); 
    })

    .catch(error => {
      console.error('Error fetching plans:', error);
    });
  };

  
  const handleClick = (pno:number) => {
    navigate(`/PlanningPage?pno=${pno}`);
  }

  return (
    // <div className="profile-edited-plan" style={{border: "1px black solid"}}>
      <div className="profile-common-posts">
        {planInfo?.map(plan => (
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
