import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_category } from '../../services/category'
import { search_db } from '../../services/DB'

const Work_segment_foooter = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState([])

    useEffect(() => {
        dispatch(get_category()).then((res) => {
            dispatch({ type: 'WORK_SEGEMENT', payload: res });
            var data = []
            res.map((cats) => {
                data.push(cats)
            })
            setCategory(data)
        })

    }, [])
    function searchHnadler(sub_cat) {
        dispatch(search_db(sub_cat)).then((res) => {
            navigate('/results/' + sub_cat, { state: { input: sub_cat, res } })
        })

    }
    return (
        <div className='bg-[#00272B10] py-16'>
            <div className='container  '>
                <h3 className='prime_h2_rale mb-8' data-translate="hi">Work Segments</h3>
                {
                    category.map((cat) => {
                        return <>
                            <div className='mb-16' id={cat.name}>
                                <Link to={`/work_segment/#${cat.name}`} className='rale_text my-10 font_24 ' data-translate="hi">{cat.name}</Link>
                                <div className='grid grid-cols-1 md:grid-cols-4 gap-[5px]'>
                                    {
                                        cat.children.length > 0 && cat.children.map((cat_sub) => {
                                            return <div className='mt-3 cursor-pointer' onClick={() => searchHnadler(cat_sub.name)} data-translate="hi">{cat_sub.name}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default Work_segment_foooter