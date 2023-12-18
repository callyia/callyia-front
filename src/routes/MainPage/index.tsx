import React, { useState } from 'react';
import Main from './MainPage';
export default function MainPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div>
            <Main isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
        </div>
    );
}