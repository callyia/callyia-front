import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UserProfile from "./UserProfilePage";

export default function UserProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>("./dummyimages/image1.jpeg"); 

  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get("userid");

  const [user, setUser] = useState<any>();
  const [scheduleThumbnailDTOs, setScheduleThumbnailDTOs] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [redirectCountdown, setRedirectCountdown] = useState(2);

  const scheduleClick = (sno: any) => {
    navigate(`../SchedulePage/${sno.sno}`);
  };

  const fetchMember = async (email: any) => {
    setIsLoading(true);
    try {
      const url = `http://localhost:8080/Callyia/member/getMember?email=${email}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUser(data.memberDTO);
      setProfileImage(data.memberDTO.profileImage);
      setScheduleThumbnailDTOs(data.scheduleThumbnailDTOs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (email) {
      fetchMember(email);
    }
  }, [email]);
  
  useEffect(() => {
    if (!isLoading && !user) {
      const timer = setInterval(() => {
        setRedirectCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [isLoading, user]);
  
  useEffect(() => {
    if (redirectCountdown === 0) {
      navigate('/');
    }
  }, [redirectCountdown, navigate]);
  
  if (!user && isLoading) {
    return (<div className="user-profile-page">
    </div>);
  }
  
  if (!user) {
    return (
      <div className="user-from-list-page">
        <div className='user-from-list-search-keyword-header'>
          <span className='user-from-list-search-user'>
            잘못된 접근입니다. {redirectCountdown} 초후 메인페이지로 이동합니다.
          </span>
          URL을 조작하지 마세요 
        </div>
      </div>
    );
  }


  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "1000px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          height: "530px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          <div style={{ flex: 1, display: "flex", height: "500px" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
                maxHeight: "503px",
              }}
            >
              <div
                style={{
                  flex: 0.01,
                  borderRadius: "50%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="user-profile-picture"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    display: "block",
                  }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <div
                style={{
                  flex: 0.2,
                  borderRadius: "8px",
                  backgroundColor: "black",
                  padding: "26px",
                  margin: "8px",
                  marginTop: "40px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  color: "white",
                }}
              >
                <div className="user-profile-nickname">{user.nickname}</div>
                <div className="user-profile-email">{user.email}</div>
              </div>
            </div>

            <div style={{ flex: 3, display: "flex", height: "502px" }}>
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
                <UserProfile user={user} />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "grid", height: "702px", width: "100%" }}
          key="1">
          <div className="user-profile-user-posts">
            {scheduleThumbnailDTOs &&
              scheduleThumbnailDTOs.map(
                (scheduleThumbnailDTO: any, index: any) => (
                  <div
                    className="flex-col border-2 user-profile-post-img"
                    onClick={() =>
                      scheduleClick({
                        sno: scheduleThumbnailDTO.scheduleDTO.sno,
                      })
                    }
                  >
                    <img
                      src={scheduleThumbnailDTO.image}
                      alt="이미지"
                      className="w-6 h-6"
                    />
                    <div className="mt-2 mb-2">
                      <span className="mr-2 text-xl font-bold">
                        {scheduleThumbnailDTO.scheduleDTO.sno}
                      </span>
                      <span className="text-xl text-slate-500">
                        {scheduleThumbnailDTO.scheduleDTO.sName}
                      </span>
                    </div>
                    <div>
                      Day : {scheduleThumbnailDTO.scheduleDTO.total_Day}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
