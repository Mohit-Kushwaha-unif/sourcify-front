import React, { useState } from 'react'
import sourciyfwork from '../../../assests/sourciyfwork.png'

const SourcifyWork = () => {
   
    return (
        <>
            <div className='image_section relative mb-24 h-[500px] ' style={{ backgroundImage: `url(${sourciyfwork})` }}>

                <div className='content container' >
                    <h2 className='brand_text mb-5 pt-16  md:pt-32'>How Sourcify Works</h2>
                    <div className='md:max-w-[50%]'>
                        <p className='white_desc mb-5'>Sourcify's platform is designed to streamline the sourcing process and make it more efficient for businesses and contractors.</p>
                        <p className='white_desc'> Whether you're a business looking for contractors or a contractor looking for new opportunities, Sourcify is here to help you achieve your goals</p>
                    </div>
                </div>
            </div>
            <div className='contractor_section container mb-24'>
                <h2 className='prime_h2_rale font_32 mb-16'> For Contractors Looking for Projects </h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-16'>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter'>1</div>
                            <div className=' headings'>Register as Contractor</div>
                        </div>
                        <div className='content'>
                            Contractors looking for the projects from companies can register their account to access the top projects posted by the companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter'>2</div>
                            <div className=' headings'>Update your Profile</div>
                        </div>
                        <div className='content'>
                            Post signing up contractors need to fill in their Basic Details, Financial Details, Past Projects, and other relevant details. We suggest to fill in all the details to stand out.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter'>3</div>
                            <div className=' headings'>Share Interest</div>
                        </div>
                        <div className='content'>
                            Once the profile is completed, contractors can submit their proposals to the projects listed by the Companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter'>4</div>
                            <div className=' headings'>Finalize the Deal</div>
                        </div>
                        <div className='content'>
                            Post submission of the proposal company will connect with you through our in-built chat feature and contractors can finalize the deal and start working on the project.
                        </div>
                    </div>
                
                </div>
                <div className='center_content'>
                    <button className='prime_button_sec '>Register as Contractor</button>
                </div>
            </div>
            <div className='container company_section mb-24'>
            <h2 className='brand_h2_rale font_32 mb-16 '> For Companies Looking for Contractors</h2>
            <div className='grid grid-cols-1 md:grid-cols-4  gap-4 mb-16'>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter new_color' >1</div>
                            <div className=' headings'>Register as Contractor</div>
                        </div>
                        <div className='content'>
                            Contractors looking for the projects from companies can register their account to access the top projects posted by the companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter new_color'>2</div>
                            <div className=' headings'>Update your Profile</div>
                        </div>
                        <div className='content'>
                            Post signing up contractors need to fill in their Basic Details, Financial Details, Past Projects, and other relevant details. We suggest to fill in all the details to stand out.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter new_color'>3</div>
                            <div className=' headings'>Share Interest</div>
                        </div>
                        <div className='content'>
                            Once the profile is completed, contractors can submit their proposals to the projects listed by the Companies on our platform.
                        </div>
                    </div>
                    <div className='border-2 p-4'>
                        <div className='flex items-center  mb-5'>
                            <div className=' mr-1 brand_text font_64 font_inter new_color'>4</div>
                            <div className=' headings'>Finalize the Deal</div>
                        </div>
                        <div className='content'>
                            Post submission of the proposal company will connect with you through our in-built chat feature and contractors can finalize the deal and start working on the project.
                        </div>
                    </div>
                    
                </div>
                <div className='center_content'>
                    <button className='brand_button '>Register as Company to Post Projects</button>
                </div>
            </div>
           
        </>
    )
}

export default SourcifyWork