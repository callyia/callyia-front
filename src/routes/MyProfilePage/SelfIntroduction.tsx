import React, { useState } from 'react';
// import { useEffect } from 'react';

interface SelfIntroductionProps {
  isEditing: boolean;
}

const SelfIntroduction:React.FC<SelfIntroductionProps> = ({isEditing}) => {
  const [text, setText] = useState('');
  const maxLength = 45;
  const alertMessage = text.length === maxLength ? '최대 글자수입니다' : '';

  // useEffect(() => {
  //   const savedText = localStorage.getItem('self-introduction');
  //   if (savedText) {
  //     setText(savedText);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('selfIntroduction', text);
  // }, [text]); //일단 로컬 스토리지 저장

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <div className="self-introduction-container">
        <textarea
          className="self-introduction-textarea"
          value={text}
          onChange={isEditing ? handleChange : undefined}
          placeholder= {isEditing ? "자기소개를 입력하세요..." : ''}
          maxLength={maxLength}
          readOnly={!isEditing}
        />
      {isEditing && (<div className="self-introduction-character-count">
        {text.length} / {maxLength}자
      </div>
      )}
      {alertMessage && isEditing && <div className="self-introduction-alert-message">{alertMessage}</div>}
    </div>
  );
};

export default SelfIntroduction;
