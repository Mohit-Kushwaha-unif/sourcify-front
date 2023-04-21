import { Input } from 'antd'
import React from 'react'
import blog_image from '../../../assests/blog_image.png'
import search_icon from '../../../assests/search_icon.png'
const Blog = () => {
    return (
        <div className='container my-16 grid md:gap-6 gap-y-6 grid-cols-1 md:grid-cols-6 '>
            <div className='col-span-4 p-6 border-2 order-2 md:order-1'>
                <h2 className='prime_h2_rale default_text_color mb-5'> Lorem ipsum dolor sit amet consectetur. </h2>
                <img src={blog_image} className="mb-10" />
                <p>
                    Lorem ipsum dolor sit amet consectetur. Mi consequat in habitant porttitor
                    malesuada non eu turpis gravida. Diam pulvinar vitae faucibus cras et eget
                    egestas purus amet. Hendrerit scelerisque dapibus pharetra orci venenatis
                    justo consequat quam. Vulputate id sed dictumst id. Enim nibh gravida eget
                    ullamcorper elit sollicitudin arcu semper ipsum. At aenean magna auctor
                    arcu sit hac tincidunt sem.
                </p>
                <h3 className='headings my-5'>Morbi arcu suspendisse metus </h3>
                <p className='mb-5'>in consectetur molestie sed lacus morbi. Venenatis amet scelerisque gravida morbi vitae diam vel in. Ut volutpat dis tristique rhoncus interdum sit. Rhoncus platea orci neque et nibh at. Amet adipiscing quis in sed viverra. Lobortis aenean vivamus pellentesque eu imperdiet nulla enim. Egestas cras turpis gravida aliquet tellus lectus diam mauris.</p>

                <p className='mb-5'> Mattis nunc viverra lacus nisi mauris. Vulputate dignissim non ultrices id faucibus quam sed orci augue. Dolor est ultrices viverra vel lectus in ut proin bibendum. Sed tempor lorem interdum a rhoncus morbi sit risus turpis. Tincidunt pellentesque nunc nulla sit facilisi ut non. Hendrerit euismod odio vitae egestas mattis volutpat scelerisque. Nisi vel </p>

                <p className='mb-5'>tellus eu cras orci. Non non quam magna diam cras diam ipsum elementum in. Scelerisque egestas a scelerisque arcu. Sed pellentesque interdum amet egestas laoreet egestas. Bibendum eget auctor curabitur integer dolor luctus ut. Non magna etiam faucibus in. </p>

                <p className='mb-5'>Adipiscing aliquet sem nulla aliquam ut sem nullam. Diam vitae lorem dapibus lectus imperdiet massa lacus curabitur. Sed ullamcorper massa pellentesque libero cursus nisi ullamcorper bibendum. Maecenas vehicula nam ut odio et.</p>
            </div>
            <div className='col-span-2 p-6 border-2 order-1 md:order-2 h-auto md:h-[42%] overflow-y-scroll scrollbar'>
                <div className='mt-3 mb-10'>
                <Input placeholder='Search for contractors or projects ' className='input_radius' suffix={<img src={search_icon} />} />
                </div>
                <p className='font-bold text-lg'>Categories</p>
                <ul className='mt-5'>
                    <li className='mb-3'>Insights</li>
                    <li className='mb-3'>News</li>
                    <li className='mb-3'>What's New</li>
                </ul>
            </div>
        </div >
    )
}

export default Blog