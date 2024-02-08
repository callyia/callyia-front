import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-hot-toast";

import { FaCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import "./ProfilePage.css";

type PlanInfo = {
  pno: number;
  userId: string;
  day: string;
  title: string;
};

const PlanContent = () => {
  const navigate = useNavigate();

  const [hoverStates, setHoverStates] = useState<{ [pno: number]: boolean }>({});
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

  const handleMouseHover = (pno: number, isHovering: boolean) => {
    setHoverStates(prev => ({ ...prev, [pno]: isHovering }));
  };

  const deletePlan = async (pno: number) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/Callyia/planning/delete/${pno}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Plan deleted successfully.");
        setPlanInfo(planInfo.filter(plan => plan.pno !== pno));
      } else {
        toast.error("Failed to delete the plan.");
      }
    } catch (error) {
      console.error("Error deleting the plan:", error);
      toast.error("삭제에 실패했어요.");
    }
    console.log(11111);
    
  };

  return (
    <div className="profile-plan-posts">
      {planInfo?.map((plan) => (
        <div
          key={plan.pno}
          className="profile-plan-div"
          onClick={() => handleClick(plan.pno)}
        > 
        <div onMouseEnter={() => handleMouseHover(plan.pno, true)}  onMouseLeave={() => handleMouseHover(plan.pno, false)}>
          {hoverStates[plan.pno] ? (
            <IoMdCloseCircle className="profile-plan-delete-button"/>
          ) : (
            <FaCircle className="profile-plan-button" onClick={() => deletePlan(plan.pno)}/> 
          )}
        </div>
          <div>
            <div className="profile-plan-title">{formatTitle(plan.title)}</div>
            <div className="profile-plan-day"><span className="profile-plan-day-num">{plan.day}</span>일 동안의 일정</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanContent;
