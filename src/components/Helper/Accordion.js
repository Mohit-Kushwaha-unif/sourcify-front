import React, { useState } from "react";
import add from '../../assests/add.png'
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion mb-16">
      <div className="accordion__header bg-[#023047] w-full px-6 py-4" onClick={toggleAccordion}>
          <div className="flex items-center">
          <img src={add} className="mr-3"/> <h3 className="normal_text font_32 text-white"> {title}</h3>
            </div>  
        <span className={`icon ${isOpen ? "rotate-icon" : ""}`} />
      </div>
      {isOpen && <div className="accordion__content bg-[#D9D9D9] px-6 py-4">{children}</div>}
    </div>
  );
};

export default Accordion;
