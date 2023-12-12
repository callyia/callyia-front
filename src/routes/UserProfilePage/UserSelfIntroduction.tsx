import React, { useState } from 'react';

interface UserSelfIntroductionProps {
  text: string;
}

const text = '남의 소개글 test 중입니다. my profile에서 45자를 넘지 않습니다';

const UserSelfIntroduction:React.FC<UserSelfIntroductionProps> = ({ text }) => {
  
  return (
    <div className="self-introduction-container">
        <textarea
          className="self-introduction-textarea"
          value={text}
          readOnly={true}
        />
      </div>
  );
};

export default UserSelfIntroduction;
