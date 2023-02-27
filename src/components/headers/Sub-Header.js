import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../services/category'
const SubHeader = ({filterValue}) => {
    const dispatch = useDispatch()
    const [category,setCategory] = useState([])
    // const [filter,setFilter] = useState()
    const filterHandler=(event)=>{
        filterValue(event.target.textContent)
    }
    useEffect(() => {
        dispatch(get_category()).then((res)=>{
            // console.log(res)
            var data = []
            res.map((cats)=>{
                data.push(cats.category)
            })
            setCategory(data)
        })
    }, [])
  return (
    <div className='bg-white p-3 sm:mb-1 hidden md:grid grid-cols-8 '>{
        category.length>0 && category.map((cats)=>{
            return <div className='m-0.5'> <p onClick={filterHandler} className='sm:mb-1 cursor-pointer'>{cats}</p> </div>
        })
     }</div>
  )
}

export default SubHeader