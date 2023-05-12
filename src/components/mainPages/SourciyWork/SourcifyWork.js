import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import sourciyfwork from '../../../assests/sourciyfwork.png'

const SourcifyWork = () => {
   
    return (
        <>
            <div className='image_section relative mb-24 h-[400px] ' style={{ backgroundImage: `url(${sourciyfwork})` }}>

                <div className='content container' >
                    <h2 className='brand_text mb-5 pt-16  'data-translate="hi">How Sourcify Works</h2>
                    <div className='md:max-w-[50%]'>
                        <p className='white_desc mb-5'data-translate="hi">Sourcify's platform is designed to streamline the sourcing process and make it more efficient for businesses and contractors.</p>
                        <p className='white_desc font_18'data-translate="hi"> Whether you're a business looking for contractors or a contractor looking for new opportunities, Sourcify is here to help you achieve your goals</p>
                    </div>
                </div>
            </div>
            <div className='contractor_section container mb-24'>
                <h2 className='prime_h2_rale font_32 mb-16' data-translate="hi"> For Contractors Looking for Projects </h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-16'>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter 'data-translate="hi">1</div>
                            <div className=' headings font_24'data-translate="hi">Register as Contractor</div>
                        </div>
                        <div className='content'data-translate="hi">
                            Contractors looking for the projects from companies can register their account to access the top projects posted by the companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter'data-translate="hi">2</div>
                            <div className=' headings font_24'data-translate="hi">Update your Profile</div>
                        </div>
                        <div className='content'data-translate="hi">
                            Post signing up contractors need to fill in their Basic Details, Financial Details, Past Projects, and other relevant details. We suggest to fill in all the details to stand out.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter'data-translate="hi">3</div>
                            <div className=' headings font_24'data-translate="hi">Share <br/> Interest</div>
                        </div>
                        <div className='content'data-translate="hi">
                            Once the profile is completed, contractors can submit their interest to the projects listed by the Companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter'data-translate="hi">4</div>
                            <div className=' headings font_24'data-translate="hi">Take it <br/>further</div>
                        </div>
                        <div className='content'data-translate="hi">
                            Post sharing your intreset  company will connect with you through our in-built chat feature and contractors can take it further and start working on the project.
                        </div>
                    </div>
                
                </div>
                <div className='center_content'>
                    <Link to='/register' className='prime_button_sec 'data-translate="hi">Register as Contractor</Link>
                </div>
            </div>
            <div className='container company_section mb-24'>
            <h2 className='brand_h2_rale font_32 mb-16 ' data-translate="hi"> For Companies Looking for Contractors</h2>
            <div className='grid grid-cols-1 md:grid-cols-4  gap-4 mb-16'>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter new_color' >1</div>
                            <div className=' headings font_24'data-translate="hi">Register as Contractor</div>
                        </div>
                        <div className='content'data-translate="hi">
                        Companies looking to hire contractors can create their company account. To create your account select “I’m a Company looking for Contractors” on signup page.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter new_color'>2</div>
                            <div className=' headings font_24'data-translate="hi">Update your Profile</div>
                        </div>
                        <div className='content'data-translate="hi">
                        Post signing up update your profile and complete the onboarding process. We suggest companies to fill in all the details.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter new_color'>3</div>
                            <div className=' headings font_24'data-translate="hi">Share <br/>Interest</div>
                        </div>
                        <div className='content'data-translate="hi">
                        Now, companies can post their projects on our platform. Click on “Post Project” button and provide the required details. Once the project is approved on the platform you’ll start receiving interest from the contractors
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-5 brand_text font_64 font_inter new_color'>4</div>
                            <div className=' headings font_24'data-translate="hi">Take it <br/>further</div>
                        </div>
                        <div className='content'data-translate="hi">
                        Companies can now connect with the contractors who has shown their interest. Companies can connect with the contractors with our in-built chat feature and take it further.
                        </div>
                    </div>
                    
                </div>
                <div className='center_content'>
                    <Link to='/register' className='brand_button 'data-translate="hi">Register as Company to Post Projects</Link>
                </div>
            </div>
           
        </>
    )
}

export default SourcifyWork