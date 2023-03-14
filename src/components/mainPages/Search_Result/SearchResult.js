import React from 'react'
import { useLocation } from 'react-router-dom'
import { Tag, Typography } from 'antd'
const SearchResult = () => {
    const { Title } = Typography
    const location = useLocation()
    console.log(location.state)
    return (

        <div>
            <div className='px-6 py-4 '>
                <Title level={2}> Search Result for <span className='text-color'>{location.state.selected}</span>   which includes <span className='text-color'>{location.state.input} </span></Title>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                    {location.state.selected === 'Listing' && location.state.res.map((detail) => {
                        if (detail.form_status == 0) {
                            return <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                                {/* <img src="image.jpg" alt="Image" className="w-full h-32 object-cover" /> */}
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{detail.project_scope}</h2>
                                    <p>Prefferd state</p>
                                    {detail.prefferd_state.map((state) => {
                                        return <Tag>{state}</Tag>
                                    })}
                                    <p>Work Segment</p>
                                    {
                                        detail.wok_segment.map((state) => {
                                            return <Tag>{state}</Tag>
                                        })
                                    }
                                    <p className="text-gray-600 mt-2">{detail.project_discription}</p>
                                </div>
                            </div>

                        }
                    })}
                    {location.state.selected === 'Vendor' && location.state.res.map((detail) => {
                        return <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                            {/* <img src="image.jpg" alt="Image" className="w-full h-32 object-cover" /> */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">Agency Name - {detail.agency_name}</h2>
                                <h3 className="text-xl font-semibold text-gray-800">Contact Person - {detail.contact_person}</h3>
                                <p className='text-xl font-semibold text-gray-800'>Address :- {" "} </p>
                                <div className='flex'>

                                    <p className="text-gray-600 mt-1">{detail.Address + ", "}</p>
                                    <p className="text-gray-600 mt-1">{detail.City + ", "}</p>
                                    <p className="text-gray-600 mt-1">{detail.State + ", "} {detail.pin_code}</p>
                                </div>
                            </div>
                        </div>
                    })}
                    {location.state.selected === 'Contractor' && location.state.res.map((detail) => {

                        return <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                            {/* <img src="image.jpg" alt="Image" className="w-full h-32 object-cover" /> */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">Name:- {detail.username}</h2>
                                <h2 className="text-xl font-semibold text-gray-800">Designation:- {detail.Designation}</h2>
                                <p>Work Segment</p>
                                {detail.work_area.map((state) => {

                                    return <Tag>{state.work_segment}</Tag>
                                })}
                                <p>Prefferd state</p>
                                {
                                    detail?.prefferd_states.map((state) => {
                                        return <Tag>{state}</Tag>
                                    })
                                }
                                <p className="text-gray-600 mt-2">{detail.entity}</p>
                            </div>
                        </div>


                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchResult