import React, { useState } from 'react'
import SelectType from './selectType/SelectType'

const Pages = () => {
    const [routeId, setRouteId] = useState()
    const employee_Route_value =(value) =>{
        setRouteId(value.route_id)
    }

  return (
    <div>
        <SelectType employee_route_value= {employee_Route_value}/>  
    </div>
  )
}

export default Pages