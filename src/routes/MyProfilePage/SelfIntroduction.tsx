import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SelfIntroductionProps {
  isEditing: boolean;
  text: string;
  onTextChange: (newText: string) => void;
}


const SelfIntroduction:React.FC<SelfIntroductionProps> = ({isEditing, text, onTextChange}) => {
  const maxLength = 45;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      return;
    }

    axios.get(`http://localhost:8080/Callyia/member/user?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    
    .then(response => {
      onTextChange(response.data.aboutMe);
    })

    .catch(error => {
      console.error('Error fetching user info:', error);
    });
  }, []); 

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      onTextChange(newText);
    }
  }

  const isMaxLengthReached = text.length >= maxLength;

  return (
    <div className="self-introduction-container">
        <textarea
          className="self-introduction-textarea"
          value={text}
          onChange={handleInputChange}
          placeholder= {isEditing ? "자기소개를 입력하세요..." : ''}
          maxLength={maxLength}
          readOnly={!isEditing}
        />
      {isEditing && (<div className="self-introduction-character-count">
        {text.length} / {maxLength}
      </div>
      )}
      {isEditing && <div className={isMaxLengthReached ? "self-introduction-max-reached-alert-message" : "self-introduction-alert-message"}>
        {isMaxLengthReached ? '최대 글자수에 도달했습니다!' : '자기소개 수정 중'}
      </div>}
      </div>
  );
};

export default SelfIntroduction;
