
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ProfilePage.css';
import { dummyPlan } from '../UserProfilePage/dummyPlan';

interface dummyPlanResult {
  day: number, 
  pno: number, 
  title: string, 
  user_id: string
}

// onclick 설정
// fetch 설정

const PlanContent = () => {
  const navigate = useNavigate();

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
