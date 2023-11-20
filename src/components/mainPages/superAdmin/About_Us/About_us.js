import React, { useState,  useRef } from "react";
import "quill/dist/quill.snow.css";
import Banner from "./Sections/Banner";
import Hero from "./Sections/Hero";
import Founder from "./Sections/Founder";
import Form_Sec from "./Sections/Form_Sec";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
const About_us = () => {
  const [activeTab, setActiveTab] = useState("1")

  function tabKeys(valueOfTab) {

    setActiveTab(valueOfTab)
  }
  return (
    <div className="w-full">
      <div className='flex align-center ml-30 w-full  px-3'>
        {
          <Tabs centered defaultActiveKey="1" onChange={tabKeys} activeKey={activeTab} className='w-full'>
            <TabPane tab="Banner Details" key="1" >
              <Banner  />
            </TabPane>
            <TabPane tab="Who We Are" key="2">
              <Hero  />
            </TabPane>
            <TabPane tab="Founder Details" key="3">
              <Founder  />
            </TabPane>
            <TabPane tab="Form Image" key="4">
              <Form_Sec  />
            </TabPane>
          </Tabs>
        }
      </div>
    </div>
  )
}

export default About_us