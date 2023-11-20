import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { get_category } from '../../services/category'
import { Dropdown, Space } from 'antd'
const Cat_Sidebar = ({ filterValue }) => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])

    useEffect(() => {
        dispatch(get_category()).then((res) => {
            var data = []
            res.map((cats) => {
                data.push(cats.category)
            })
            setCategory(data)
        })
    }, [])
    const filterHandler = (event) => {
        filterValue(event.target.textContent)
    }
    return (
        <div className="flex flex-col min-h-screen h-inherit p-3 bg-white shadow w-44">
            <label className='text-base font-semibold mb-3'>Filter By Categories</label>
            <div id="dropdown" class="  bg-white divide-y divide-gray-100 rounded-lg  w-auto dark:bg-gray-700">
                <ul class=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {category.map((cats) => {
                        return <li>
                            <span onClick={filterHandler} class="block cursor-pointer border:none focus:border-2 border-red-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{cats}</span>
                        </li>
                    })}


                </ul>
            </div>

        </div>
    )
}

export default Cat_Sidebar