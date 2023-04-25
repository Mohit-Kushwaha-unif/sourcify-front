import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../services/category'

const Work_segment_foooter = () => {
    const dispatch = useDispatch()
  
    const [category, setCategory] = useState([])
    
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            // console.log(res)
            var data = []
            res.map((cats) => {
                data.push(cats)
            })
            setCategory(data)
        })
        
    }, [])

  return (
    <div className='container'>
    <h3 className='prime_h2_rale'>Work Segments</h3>
    {
        category.map((cat)=>{
            return <>
            <div className='mb-16'>
            <p className='rale_text my-10'>{cat.name}</p>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {
                cat.children.length > 0 && cat.children.map((cat_sub)=>{
                  return  <div>{cat_sub.name}</div>
                })
            }
            </div>
            </div>
            </>
        })
    }
</div>
  )
}

export default Work_segment_foooter