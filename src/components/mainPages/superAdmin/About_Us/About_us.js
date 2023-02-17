import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { add_content } from "../../../../services/content";
const About_us = () => {
    const quillRef = useRef(null);
    const dispatch = useDispatch()
    const [editorHeading, setEditorHeading] = useState()

    useEffect(() => {
        if (quillRef.current) {
          const quill = new Quill(quillRef.current, {
            theme: "snow",
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                ["link"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["clean"],
              ],
            },
          });
    
          quill.on("text-change", () => {
            setEditorHeading(quill.root.innerHTML);
          });
        }
      }, [quillRef]);
    function submitHandler(){
        if( quillRef =="" ){
            alert('Please Fill all the fields')
        }
        let formData = {}
        formData["heading"] = "About Us" 
        formData["description"] = editorHeading
        formData["media_type"] = "text"
        formData["section_type"] = "About Us"
        formData["image"] = "N/A"
        formData["video"] ="N/A"
        dispatch(add_content(formData)).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
      }
  return (
    <div className="w-70 p-9 w-full">
    <div className="mb-5">Wite your About Us</div>
  <div className="h-auto min-h-[40%] bg-zinc-100" ref={quillRef} />
  


  <button className=" mt-9 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
  onClick={submitHandler}>Submit</button>
</div>
  )
}

export default About_us