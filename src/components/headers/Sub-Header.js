import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../services/category'
import dropdown_icon from '../../assests/dropdown_icon.png'
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
    <div className=' mt-1  sm:mb-1  flex  '>{
        category.length > 0 && category.map((cats) => {
            return <div className='p-1 mt-3 mr-10 flex items-baseline place-content-center cursor-pointer'> <p onClick={filterHandler} className='header_text sm:mb-1 mr-3'>{cats}</p> <img className='max-h-[50%]' src={dropdown_icon} /> </div>
        })
    }</div>
    
  )
}

export default SubHeader