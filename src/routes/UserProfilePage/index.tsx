import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UserProfile from "./UserProfilePage";

export default function UserProfilePage() {
  const location = useLocation();

  const [profileImage] = useState<string>("./dummyimages/image1.jpeg"); // 기본 이미지
  const fileInputRef = useRef<HTMLInputElement>(null);

  const urlParams = new URLSearchParams(location.search);
  const userid = urlParams.get("userid");

  const [user, setUser] = useState<any>();
  const [scheduleDTOs, setScheduleDTOs] = useState<any>();

  // var user;
  // var scheduleDTOs;

  // const user = dummyUser.find((user) => user.userid === userid);

  const navigate = useNavigate();

  const scheduleClick = (sno: any) => {
    navigate(`../SchedulePage/${sno.sno}`);
  };

  const fetchMember = async (email: any) => {
    const url = `http://localhost:8080/Callyia/member/getMember?email=${userid}`;

    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // user = data.memberDTO;
        // scheduleDTOs = data.scheduleDTOs;
        setUser(data.memberDTO);
        setScheduleDTOs(data.scheduleDTOs);

        // console.log(user);
        // console.log(scheduleDTOs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchMember(userid);
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  // useEffect(() => {
  //   console.log(scheduleDTOs);
  // }, [scheduleDTOs]);

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-search-keyword-header">
          <span className="user-profile-search-keyword">
            USER를 찾을 수 없습니다. 다시 한번 더 확인바랍니다.
          </span>
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
                {/* <div className="user-profile-id">{user.userid}</div>
                <div className="user-profile-email">{user.useremail}</div> */}
                <div className="user-profile-id">{user.nickname}</div>
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
        <div style={{ display: "grid", height: "702px", width: "100%" }}>
          <div className="user-profile-user-posts">
            {scheduleDTOs.map((scheduleDTO: any, index: any) => (
              <div
                className="border-2 user-profile-post-img"
                onClick={() => scheduleClick({ sno: scheduleDTO.sno })}
              >
                {scheduleDTO.sno} | {scheduleDTO.total_Day} |{" "}
                {scheduleDTO.member_email} | {scheduleDTO.sName}
              </div>
            ))}
            {/* <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div>
            <div className="user-profile-post-img">
              <img src="./profile/profile_like_icon.png" alt="post i liked" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
