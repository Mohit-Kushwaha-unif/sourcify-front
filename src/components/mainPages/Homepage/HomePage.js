import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../../services/category'
// import Caraousel from '../../Helper/caraousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { get_carausel } from '../../../services/Carausle';

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [category, setCategory] = useState([])
    const [caraousel, setCarausel_img] = useState([])
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            // console.log(res)
            var data = []
            res.map((cats) => {
                data.push(cats.category)
            })
            setCategory(data)
        })
        dispatch(get_carausel()).then((res) => {
            setCarausel_img(res)
        })
    }, [])


    return (
        <div>
            <div className='bg-white mt-1  sm:mb-1  hidden place-content-center md:grid grid-cols-8 ml-14 '>{
                category.length > 0 && category.map((cats) => {
                    return <div className='p-1 mt-3  place-content-center cursor-pointer'> <p className='sm:mb-1'>{cats}</p> </div>
                })
            }</div>
            <div className='w-full py-3'><Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
                {
                    caraousel.length > 0 && caraousel.map((caraous) => {
                        return <div className='w-full h-96'>
                            <img className='w-full h-full object-cover' src={caraous.legend_image} />
                            <p className="legend">{caraous.legend}</p>
                        </div>
                    })
                }
            </Carousel>
            </div>

            <div className='h-auto p-5'>
                <div className=' px-3 text-3xl  font-semibold'>Browse Contractors by Categories</div>
                <div className='grid-cols-2 md:grid grid-cols-3  p-3'>
                    {
                        category.map((cats) => {
                            return <div onClick={() => navigator('/all_contractors', { state: cats })} className='bg-white m-3 h-56 w-4/5 flex items-center bg-red-400 justify-center rounded-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>{cats}</div>
                        })
                    } </div>
            </div>

            <div className='h-auto p-5'>
                <div className=' px-3 text-3xl  font-semibold'>Browse Projects by Categories</div>
                <div className='grid-cols-2 md:grid grid-cols-3 p-3'>
                    {
                        category.map((cats) => {
                            return <div onClick={() => navigator('/all_projects', { state: cats })} className='bg-white m-3 h-56 w-4/5 flex items-center bg-red-400 justify-center rounded-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>{cats}</div>
                        })
                    } </div>

            </div>

        </div>

    )
}

export default Dashboard