import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_category } from '../../services/category'
import dropdown_icon from '../../assests/dropdown_icon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { search_db } from '../../services/DB'
const SubHeader = ({ filterValue }) => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const [hoverState, setHoverState] = useState({});
    const [language, setLanguage] = useState(); // Default language is English
    const location = useLocation()
    const [screenSize, getDimension] = useState(window.innerWidth);
    const [mobilView,setMobileView] = useState(false)
    const setDimension = () => {
        getDimension(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', setDimension);
        if (screenSize <= 759) {
          // setShowMenu(true)
          setMobileView(true)
         
        } else {
          setMobileView(false)
        
        }
      }, [screenSize])
    useEffect(() => {
        setLanguage(localStorage.getItem("lan"))
    }, [localStorage])
    const WORK_SEGMENT = useSelector(state => state.User.Work_segment)
    console.log(WORK_SEGMENT)
    var navigate = useNavigate()
    const filterHandler = (event) => {
        navigate(`/work_segment#${event.target.textContent}`)
    }



    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem("lan", event.target.value)
        window.location = location.pathname
    };

    useEffect(() => {

        var data = []
        if (WORK_SEGMENT != undefined && WORK_SEGMENT.length > 0) {
            WORK_SEGMENT.map((cats) => {
                data.push(cats)
            })
        }
        setCategory(data)

    }, [WORK_SEGMENT])
    const toggleHoverState = (cat) => {
        setHoverState({ ...hoverState, [cat]: !hoverState[cat] });
    }
    function searchHnadler(sub_cat) {
        dispatch(search_db(sub_cat)).then((res) => {
            navigate('/results/' + sub_cat, { state: { input: sub_cat, res } })
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
                                <p onClick={filterHandler} className='header_text  sm:mb-1 mr-3' data-translate="hi">{cats.name}</p>
                                <img className='max-h-[50%]' src={dropdown_icon} />

                                {cats.children.length > 0 && hoverState[cats] && (
                                    <div className="dropdown-menu text-sm    scrollbar">
                                        {
                                            cats.children.map((sub_cat) => {
                                                return <ul>
                                                    <li className='py-1 px-5  h-auto  border-b-2 hover:bg-slate-100 ' onClick={() => { searchHnadler(sub_cat.name) }} ><span data-translate="hi">{sub_cat.name}</span></li>
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

          {!mobilView &&  <div className='container relative'>
          <div className='float-right'>
                <label htmlFor="language">Language:</label>
                <select id="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                </select>

            </div>
            </div>}


        </div>

    )
}

export default SubHeader