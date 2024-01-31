import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "./ProfilePage.css";
import UserSelfIntroduction from "./UserSelfIntroduction";

function formatNumber(num: number) {
  // if (num >= 100000000) {
  //   return (Math.floor(num / 10000000) / 10).toFixed(1) + '억';
  // }

  if (num >= 10000) {
    return (Math.floor(num / 1000) / 10).toFixed(1) + "만";
  }
  return num.toString();
}

interface UserProps {
  user: any;
}

const UserProfile: React.FC<UserProps> = ({ user }) => {
  const location = useLocation();

  const [postCount, setPostCount] = React.useState(0);

  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get("userid");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/Callyia/Schedule/getScheduleCount?email=${email}`)
        .then(response => {
          setPostCount(response.data); 
        })
        .catch(error => {
          console.error('Error fetching post count:', error);
        });
    }
  }, [email]);
  // 쿼리로 담아온 친구의 정보

  return (
    <div className="user-profile-container">
      <div className="user-profile-self-introduction-title">자기소개</div>
      <div className="user-profile-header">
        <div className="user-profile-left-section">
          <div className="user-profile-self-introduction">
            <UserSelfIntroduction text={user.aboutMe || ""} />
          </div>
        </div>
        <div className="user-profile-right-section">
          <div className="user-profile-stats">
            <div className="user-profile-post-count">
              <div className="user-profile-icon-number-container">
                <img
                  src="./profile/profile_post_icon.png"
                  alt="Post icon"
                  className="user-profile-post-icon"
                />
              </div>
              <span className="user-profile-post-number">
                {formatNumber(postCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
