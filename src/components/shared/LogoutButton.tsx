'use client';

import { logoutUser } from '../../services/auth/logoutUser';

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutButton;
