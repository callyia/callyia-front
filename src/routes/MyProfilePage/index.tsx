import MyProfile from './MyProfilePage';

export default function MyProfilePage() {
    return (
      // <div style={{ display: "grid", border: "2px solid green"}}>
        <div style={{ flex:1,display: "flex" , height: '1500px'}}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              border: "2px solid black",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px"
            }}
          >
            <div
              style={{
                flex:0.01 ,
                border: "2px solid red",
                borderRadius: "8px",
                padding: "0px",
                margin: "0px",
                marginLeft: "10px",
                marginRight: "10px"
              }}
            >
              {/* data image 받아오고 dnd + 이미지 안쪽으로 넣기*/}
              <img src="./dummyimages/image1.jpeg" alt="Profile" className="profile-picture" 
              style={{
                cursor:"pointer", 
                textAlign: "center", 
                margin: "auto", 
                display: "block"
                }}/>
            </div>
            <div
              style={{
                flex: 0.01,
                border: "2px solid blue",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
                marginLeft: "10px",
                marginRight: "10px"
              }}
            >
              {/* font h2 사이즈로 맞춰서 닉네임 받아오기 */}
              <h2 style={{textAlign: "center"}}>MYUSER</h2>
              <h6 style={{textAlign: "center"}}>MYUSER@EMAIL.COM</h6>
            </div>
            {/* <div style={{ flex: 1 }}> */}
            <div
              style={{
                flex: 0.49,
                border: "2px solid green",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <div className="profile-actions">
                <button className="profile-action-button">내 일정 바로가기</button>
                <button className="profile-action-button">일정 장바구니</button>
                <button className="profile-action-button">내가 좋아요한 글</button>
              </div>
            {/* </div> */}
            </div>
          </div>
    
          <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 2,
                border: "2px solid black",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
              }}
            >
              {/* 오른쪽 상단 */}
              <MyProfile />
            </div>
            
          </div>
        </div>
      );
}
