import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { logout } from '../../services/user'
const Sidebar = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const selecor = useSelector(state => state)
    function logoutHandler() {
        dispatch(logout()).then((res) => {
            localStorage.clear()
            localStorage.setItem("isLoggedIn", false)
            window.location = '/login'

        })
    }
    return (

        <div className="flex flex-col min-h-screen h-inherit p-3 bg-white shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm ">
                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/contractors-list"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" className="w-6 h-6">
                                    <g>
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M19 7h5v2h-5V7zm-2 5h7v2h-7v-2zm3 5h4v2h-4v-2zM2 22a8 8 0 1 1
                                 16 0h-2a6 6 0 1 0-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685
                                  6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                    </g> </svg>
                                <span>Contractors</span>
                            </NavLink>
                        </li>
                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/about-us"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg fill="#000000"
                                    viewBox="0 -32 576 576"
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier"
                                        stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0
                                 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 
                                 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 
                                 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 
                                 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 
                                 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 
                                 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 
                                 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 
                                 4.4 3.6 8 8 8z"></path></g></svg>
                                <span>About US</span>
                            </NavLink>
                        </li>
                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/companies"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    className='w-6 h-6'
                                    fill='#00000'>
                                    <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 
                                48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 
                                0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 
                                7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8
                                .8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2
                                 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7
                                 .2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7
                                 .2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 
                                 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 
                                 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 
                                 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-
                                 8.8 7.2-16 16-16z"/></svg>
                                <span>Company</span>
                            </NavLink>
                        </li>
                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/category-list"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor"
                                    className="bi bi-grid-1x2-fill w-6 h-6" viewBox="0 0 16 16">
                                    <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 
                                1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 
                                1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 
                                1 0 0 1-1-1v-5z"/>
                                </svg>
                                <span>Category</span>
                            </NavLink>
                        </li>

                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/all-listing"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    class="bi bi-grid-1x2-fill w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                                    <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
                                </svg>   <span>Listings</span>
                            </NavLink>
                        </li>
                        <li className="rounded-sm">
                            <NavLink
                                to="/admin/feedbacks"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-grid-1x2-fill w-6 h-6" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M21.59,3.59C20.92,3.22 20.17,3 19.41,3H4C2.9,3 2,3.9 2,5V17C2,18.1 2.9,19 4,19H18L22,23V5C22,4.24 21.76,3.53 21.59,3.59M18,7V5.5L19.5,7H18M8,10H16V12H8V10M8,14H14V16H8V14Z" />
                                </svg>
                                <span>Feedbacks</span>
                            </NavLink>
                        </li>
                        <li className="rounded-sm">
                            <div
                                onClick={logoutHandler}
                                className="flex items-center p-2 cursor-pointer space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar