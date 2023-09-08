import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, Outlet } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import Heading from '../components/Heading';

const Main = () => {
    // const [menu, setMenu] = useState(false)

    return (

        <div className='max-w-[2520px] mx-auto'>
            <div className="drawer lg:drawer-open h-screen">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              
                <div className="drawer-content">
                
                    <div className='flex flex-col items-center justify-center'>
                        {/* <label htmlFor="my-drawer-2" className="btn btn-primary  drawer-button bg-rose-500 lg:hidden">Open drawer</label> */}
                    </div>

                    <div className=' lg:px-10'>
                        <Header></Header>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side bg-base-200 hidden lg:block ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div>
                        <h2 className='flex items-center justify-center gap-5 mt-5 text-3xl'><FaTasks> </FaTasks> <span>Easy-Manage</span></h2>
                    </div>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/'>Dashboard</Link></li>
                        <li><Link to='addTask'>Add New Task</Link></li>
                        <li><Link to='allTasks'>All Tasks</Link></li>
                        <li><Link to='teamRequest'>Team Request</Link></li>
                        <li><Link to='teams'>Teams</Link></li>
                        <li><Link to='employee'>Employee</Link></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Main;