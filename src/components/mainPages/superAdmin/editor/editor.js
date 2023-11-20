import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function QuillEditor() {
  const [editorHeading, setEditorHeading] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const quillRef = useRef(null);
  const descRef = useRef(null)
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
  useEffect(() => {
    if (descRef.current) {
      const quill = new Quill(descRef.current, {
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
        setEditorDescription(quill.root.innerHTML);
      });
    }
  }, [descRef]);
  function submitHandler() {
    if (descRef == "" || quillRef == "") {
      alert('Please Fill all the fields')
    }
  }
  return (
    <div className="w-70 p-9 w-full">
      <div className="mb-5">Wite your Heading</div>
      <div className="h-auto" ref={quillRef} />

      <div className="mb-5 mt-5">Wite your description</div>
      <div className="min-h-3" ref={descRef} />

      <button className=" mt-9 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default QuillEditor;