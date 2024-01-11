import React from 'react';

interface UserSelfIntroductionProps {
  text: string;
}

const UserSelfIntroduction:React.FC<UserSelfIntroductionProps> = ({ text }) => {
  
  return (
    <div className="user-self-introduction-container">
        <textarea
          className="user-self-introduction-textarea"
          value={text}
          readOnly={true}
        />
      </div>
  );
};

export default UserSelfIntroduction;
