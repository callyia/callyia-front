import React, { useState } from 'react';

interface SelfIntroductionProps {
  isEditing: boolean;
}

const SelfIntroduction:React.FC<SelfIntroductionProps> = ({isEditing}) => {
  const [text, setText] = useState('');
  const maxLength = 45;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const isMaxLengthReached = text.length === maxLength;

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
