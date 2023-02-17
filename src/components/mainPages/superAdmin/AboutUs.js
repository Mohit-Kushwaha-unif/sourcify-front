import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_content } from '../../../services/content'
import useDocumentTitle from '../../Helper/useDocumentTitle'

const AboutUs = () => {
  const dispatch = useDispatch()
  useDocumentTitle('About Us')
  const [about,setAbout] = useState()
  dispatch(get_content()).then((res)=>{
    res.map((content)=>{
      if(content.section_type ===  "About Us"){
        setAbout(content.description)
      }
    }) }).catch((err)=>{console.log(err)})
  return (
    <div className='flex flex-col w-full'>
    <header class=" bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold">About Us</h1>
  </div>
</header>
<main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <p class="text-xl mb-6" dangerouslySetInnerHTML={{__html:about}}>
    </p>
    <p class="text-xl mb-6">
     
    </p>
  </div>
</main>
{/* <footer class="fixed bottom-0 w-full b bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <p class="text-center">&copy; 2023 My Company. All rights reserved.</p>
  </div>
</footer> */}
  </div>
  )
}

export default AboutUs