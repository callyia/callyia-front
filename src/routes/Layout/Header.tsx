import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const goToSignInPage = () => {
    navigate("/SignInPage");
  };

  const goToSignUpPage = () => {
    navigate("/SignUpPage");
  };

  const goToMyProfilePage = () => {
    navigate("/MyProfilePage");
  };

  const goToUserProfilePage = () => {
    navigate("/UserProfilePage");
  };

  const toggleBtn = () => {
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  const handleProfileButtonClick = () => {
    if (isLoggedIn) {
      goToMyProfilePage();
    } else {
      goToSignInPage();
    }
  };

  return (
    <header className="header">
      <div className="top-bar">
        <a href="/">
          <img src="/topbar-logo.png" alt="Logo" className="logo" />
        </a>
      </div>
      <button className="action-button" onClick={toggleBtn}>
        toggle btn
      </button>
      <button className="action-button" onClick={handleProfileButtonClick}>
      {isLoggedIn ? "My Profile" : "Sign In"}
      </button>
      <button className="action-button" onClick={goToUserProfilePage}>
        User Profile
      </button>
      <button className="action-button" onClick={goToSignUpPage}>
        Sign Up
      </button>
    </header>
  );
}
