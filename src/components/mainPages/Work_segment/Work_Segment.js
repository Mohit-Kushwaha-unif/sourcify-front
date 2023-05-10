import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../../services/category'
import carbon_clean from '../../../assests/carbon_clean.png'
const Work_Segment = () => {
    
    return (
        <div className='container mt-3 '>
            
            {/* <h2 className='prime_h2_rale mb-10'>Work Segments</h2>
            {
                category.map((res) => {
                    { console.log(res) }
                    return <div>
                        <p className='rale_text font_32  font_inter font_32 mb-5'>{res.category}</p>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-x-6 mb-10 '>
                            {res.sub_category   &&res.sub_category.map((sub_category)=>{
                               return  <div  className="p-16 shadow-md flex items-center flex-col rounded-[6px] " >
                                    <img src={carbon_clean} className="center_content" />
                                    <p className='text-center'>{sub_category.sub_Category}</p>
                                </div>
                            })
                                
                            }
                        </div>
                    </div>
                })
            } */}

        </div>
    )
}

export default Work_Segment