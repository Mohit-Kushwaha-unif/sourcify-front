import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MenuOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { logout } from '../../services/user'
import { useEffect } from 'react';
const Sidebar = () => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    function logoutHandler() {
        dispatch(logout()).then((res) => {
            localStorage.clear()
            localStorage.setItem("isLoggedIn", false)
            window.location = '/login'

        })
    }
    const [screenSize, getDimension] = useState(window.innerWidth);
    const setDimension = () => {
        getDimension(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', setDimension);
        if (screenSize <= 759) {
            setShowMenu(false)
            //setShowMenu(false)
        } else {
            setShowMenu(true)
        }
    }, [screenSize])
    return (

        <div className="flex relative flex-col bg-[#023047] text-white bg-opacity-80 min-h-screen h-inherit w-[17%] px-4 p-3 rounded-b-lg rounded-tr-lg border-2 border-transparent shadow-lg">

            <div className="space-y-5">
                {<div className='z-10  absolute top-[-19px] left-[50px]'><MenuOutlined onClick={() => setShowMenu(!showMenu)} className='md:hidden flex-end absolute right-[21px] top-[37px] ' /></div>}
                {showMenu && <>
                    <div className="flex items-center mt-3">
                        <h2 className="text-xl font-bold">Menu</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm flex flex-col justify-center ">
                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/dashboard"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/report"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Report</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/contractors-list"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Contractors</span>
                                </NavLink>
                            </li>

                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/companies"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Company</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/category-list"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Work Segment</span>
                                </NavLink>
                            </li>

                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/all-listing"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Projects</span>
                                </NavLink>
                            </li>

                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/post-list"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Push Notification</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <NavLink
                                    to="/admin/email-list"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Push Email</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <NavLink
                                    to="/messages"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    <span>Messages</span>
                                </NavLink>
                            </li>
                            <li className="rounded-sm">
                                <div
                                    onClick={logoutHandler}
                                    className="flex items-center p-2 cursor-pointer space-x-3 rounded-md"
                                >

                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </>
                }
            </div>
        </div>

    )
}

export default Sidebar