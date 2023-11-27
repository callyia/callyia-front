import React, { useState } from 'react';
import Main from './MainPage'; // Adjust this import path to the location of your Main component

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