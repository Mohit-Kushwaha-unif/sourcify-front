import React, { useState } from 'react';

function RadioGroup(props) {
    console.log(props)
  const [value, setValue] = useState(props.defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className={`grid grid-cols-1 gap-6 ${props.cols ? `grid-cols-${props.cols}` : ''}`}>
      {props.options.map((option, index) => (
        
        <label key={index} className="inline-flex items-center">
             <span className={`border-b-2  pb-3 ${option.className} ${value == option.value ? 'border-[#FF5757]  ' : ''}`}>{option.label}</span>
       
               <input
            type="radio"
            value={option.value}
            checked={value == option.value}
            onChange={handleChange}
            className="absolute top-[0] hidden form-radio h-3 w-3 text-[#3182ce] transition duration-150 ease-in-out rounded-full"
          />
         
        </label>
      ))}
    </div>
  );
}
export default RadioGroup