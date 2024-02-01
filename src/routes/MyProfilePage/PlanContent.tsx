import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./ProfilePage.css";

type PlanInfo = {
  pno: number;
  userId: string;
  day: string;
  title: string;
};

const PlanContent = () => {
  const navigate = useNavigate();

  const [planInfo, setPlanInfo] = useState<PlanInfo[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      return;
    }

    // Fetch user info
    axios
      .get(`http://localhost:8080/Callyia/member/user?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        fetchPlans(token, response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  const fetchPlans = (token: string, email: string) => {
    axios
      .get(
        `http://localhost:8080/Callyia/member/getMemberPlan?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        console.log(response.data);
        setPlanInfo(response.data);
      })

      .catch((error) => {
        console.error("Error fetching plans:", error);
      });
  };

  const handleClick = (pno: number) => {
    navigate(`/PlanningPage?pno=${pno}`);
  };

  const formatTitle = (title: string) => {
    return title.length > 7 ? title.substring(0, 7) + "..." : title;  
  }
  return (
    <div className="profile-plan-posts">
      {planInfo?.map((plan) => (
        <div
          key={plan.pno}
          className="profile-plan-div"
          onClick={() => handleClick(plan.pno)}
        > 
          <div>
            <div className="profile-plan-title">{formatTitle(plan.title)}</div>
            <div className="profile-plan-day"><span className="profile-plan-day-num">{plan.day}</span>일의 일정</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanContent;
