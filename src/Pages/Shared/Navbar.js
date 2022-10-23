import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CgProfile } from 'react-icons/cg';
import { BsCartCheckFill } from 'react-icons/bs';


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    // logout function
    const handleSignOut = () => {
        signOut(auth);
    }
    const menuLists = <>
        <div className="flex relative">
            <span onClick={() => navigate('/cart')} ><BsCartCheckFill className='cursor-pointer text-2xl' /></span>
            <span className="absolute top-[-11px] left-[13px] bg-[#669900]  rounded-full w-[20px] h-[20px] flex items-center justify-center p-[3px]">1</span>
        </div>
        <div>
            <div className="dropdown dropdown-end">
                <label tabIndex="0" className="">
                    <CgProfile className='text-3xl cursor-pointer mt-1' />
                </label>
                <div tabIndex="0" className="card compact dropdown-content shadow bg-white rounded-box w-32">
                    <div className="flex flex-col py-4">
                        <Link to='profile' className='hover:bg-gray-200 p-2'>Profile</Link>

                        {
                            user && <Link to='/dashboard' className='cursor-pointer hover:bg-gray-200 p-2'>
                                <label htmlFor="dashboardDrawer" className=" drawer-button">Dashboard</label>
                            </Link>
                        }
                        {
                            user ?
                                <button onClick={handleSignOut} className='cursor-pointer hover:bg-gray-200 p-2'>Sign out</button>
                                :
                                <Link to='/login' className='cursor-pointer hover:bg-gray-200 p-2'>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    return (
        <div className='bg-white border'>
            <div className='max-w-7xl mx-auto px-2 '>
                <div className=' flex items-center h-14 justify-between text-black  relative z-50'>
                    <FontAwesomeIcon
                        icon={open ? faTimes : faBars}
                        onClick={() => setOpen(!open)}
                        className="text-black w-6 h-6 cursor-pointer md:hidden" />
                    <div className=''>
                        <span className='cursor-pointer' onClick={() => navigate('/home')}>StarTech</span>
                    </div>
                    <div className='flex gap-5 items-center hidden md:flex mt-2'>
                        {menuLists}
                    </div>
                    {open && (
                        <div className="bg-slate-600 absolute top-full left-0 flex flex-col w-full pb-8 md:hidden">
                            <div className=" flex gap-4 flex-col items-center text-xl">
                                {menuLists}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;