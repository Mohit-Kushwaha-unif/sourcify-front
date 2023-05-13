import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../../services/category'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { search_db } from '../../../services/DB'
const Work_Segment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.hash.split('#')[1].replaceAll("%20"," "))
    const [category, setCategory] = useState([])
    
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            // console.log(res)
             var data = []
            res.map((cats) => {
                if(cats.name ===location.hash.split('#')[1].replace("%20"," "))
                console.log(cats)
                data.push(cats)
            })
            
            setCategory(data)
        })
        
    }, [])
    function searchHnadler(sub_cat){
        dispatch(search_db(sub_cat)).then((res)=>{
            navigate('/results/'+sub_cat,{state: {input:sub_cat,res}}) 
        })
       
    }
    return (
        <div className='container mt-3 '>
            
            <h2 className='prime_h2_rale mb-10'>Work Segments</h2>
            {
        category.map((cat)=>{
            return <>
            <div className='mb-16' id={cat.name}>
            <Link to={`/work_segment/#${cat.name}`} className='rale_text my-10 font_24 'data-translate="hi">{cat.name}</Link>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-[5px]'>
            {
                cat.children.length > 0 && cat.children.map((cat_sub)=>{
                  return  <div className='mt-3 cursor-pointer' onClick={()=>searchHnadler(cat_sub.name)} data-translate="hi">{cat_sub.name}</div>
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

export default Work_Segment