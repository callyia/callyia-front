import React from 'react';

import './ProfilePage.css';

const CartContent = () => {
  return (
    <div className="profile-user-posts">
      일정 장바구니
      <div className='profile-post-img'>
          <img src="./profile/profile_like_icon.png" alt="post i liked" />
        </div>
    </div>
  );
};

export default CartContent;
