import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ProfileContext } from './Main';

const Header = () => {
    const [user, setUser] = useContext(ProfileContext);
    console.log(user)
    return (
        <nav className='dark:bg-gray-700 px-20 py-6'>
            <div className="flex justify-between">
                <Link to='/' className="text-2xl font-bold text-white">
                    Hunder LogIn
                </Link>
                <div>
                    <NavLink className='text-white font-semibold px-8 text-xl' to='/'>Home</NavLink>
                    <NavLink className='text-white font-semibold px-8 text-xl' to='/login'>Log in</NavLink>
                    <NavLink className='text-white font-semibold px-8 text-xl' to="/register" >Register</NavLink>
                    <NavLink className='text-white font-semibold px-8 text-xl' to="/profile" >{user?.displayName}</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;