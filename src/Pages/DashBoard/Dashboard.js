import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../Hooks/UseAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className='mt-6 max-w-7xl mx-auto px-2'>
            <div className="drawer drawer-mobile">
                <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  text-center mt-7">
                    <h2 className='text-2xl font-bold text-purple-500'>Welcome to your Dashboard</h2>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        {
                            !admin && <>
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                                <li><Link to='/dashboard/addReview'>Add a Reviews</Link></li>
                            </>
                        }



                        {
                            admin && <>
                                <li><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                                <li><Link to='/dashboard/allPurchase'>Manage All Purchase</Link></li>
                                <li><Link to='/dashboard/addParts'>Add A Parts</Link></li>
                                <li><Link to='/dashboard/manageParts'>Manage Parts</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
