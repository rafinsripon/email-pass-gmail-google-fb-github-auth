import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const ProfileContext = createContext([]);

const Main = () => {
    const [user, setUser] = useState('');
    return (
        <ProfileContext.Provider value={[user, setUser]}>
            <Header />
            <Outlet />
        </ProfileContext.Provider>
    );
};

export default Main;