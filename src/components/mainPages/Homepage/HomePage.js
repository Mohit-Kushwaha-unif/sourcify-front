import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../../services/category'
// import Caraousel from '../../Helper/caraousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [category,setCategory] = useState([])
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
   <div>
     <div className='bg-white sm:mb-1 hidden place-content-center md:grid grid-cols-8 ml-14 '>{
        category.length>0 && category.map((cats)=>{
            return <div className='m-0.5'> <p className='sm:mb-1'>{cats}</p> </div>
        })
     }</div>
     <div className='h-auto py-3'><Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel></div>

     <div className='h-auto p-5'>
     <div className=' px-3 text-3xl  font-semibold'>Browse Contractors by Categories</div>
     <div className='grid-cols-2 md:grid grid-cols-3  p-3'>
     {
        category.map((cats)=>{
            return  <div onClick={()=>navigator('/all_contractors', {state:cats})} className='bg-white m-3 h-56 w-4/5 flex items-center bg-red-400 justify-center rounded-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>{cats}</div>
        })
     } </div>
     </div>

     <div className='h-auto p-5'>
     <div className=' px-3 text-3xl  font-semibold'>Browse Projects by Categories</div>
     <div className='grid-cols-2 md:grid grid-cols-3 p-3'>
     {
        category.map((cats)=>{
            return  <div onClick={()=>navigator('/all_projects', {state:cats})} className='bg-white m-3 h-56 w-4/5 flex items-center bg-red-400 justify-center rounded-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>{cats}</div>
        })
     } </div>

     </div>

     </div>
    
  )
}

export default Dashboard