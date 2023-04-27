import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../services/category'
import dropdown_icon from '../../assests/dropdown_icon.png'
import { useNavigate } from 'react-router-dom'
import { search_db } from '../../services/DB'
const SubHeader = ({ filterValue }) => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const [hoverState, setHoverState] = useState({});
    var navigate = useNavigate()
    const filterHandler = (event) => {
        navigate(`/work_segment#${event.target.textContent}`)
    }
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
    const toggleHoverState = (cat) => {
        setHoverState({ ...hoverState, [cat]: !hoverState[cat] });
    }
    function searchHnadler(sub_cat){
        dispatch(search_db(sub_cat)).then((res)=>{
            navigate('/results/'+sub_cat,{state: {input:sub_cat,res}}) 
        })
       
    }
    return (
        <div className=' mt-1  sm:mb-1  flex  '>
            {
                category.length > 0 && category.map((cats) => {
                    return (
                        <div
                            className='p-1 mt-3 mr-10 flex items-baseline place-content-center cursor-pointer'
                            onMouseEnter={() => toggleHoverState(cats)}
                            onMouseLeave={() => toggleHoverState(cats)}
                        >
                            <div className='relative flex items-baseline' >
                                <p onClick={filterHandler} className='header_text  sm:mb-1 mr-3'>{cats.name}</p>
                                <img className='max-h-[50%]' src={dropdown_icon} />

                                {cats.children.length > 0 && hoverState[cats] && (
                                    <div className="dropdown-menu text-sm    scrollbar">
                                        {
                                            cats.children.map((sub_cat) => {
                                                return <ul>
                                                    <li className='py-1 px-5  h-auto  border-b-2 hover:bg-slate-100 ' onClick={()=>{searchHnadler(sub_cat.name)}}>{sub_cat.name}</li>
                                                </ul>
                                            })
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default SubHeader