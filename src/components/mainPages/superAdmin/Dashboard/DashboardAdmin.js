import { Button, Card, Checkbox, Form, Select, Space, Table, Tag } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import state_cites from '../../../../assests/state_city.'
import { get_category } from '../../../../services/category'
import { get_contractor } from '../../../../services/contractor'
import { adminSearch } from '../../../../services/DB'
import { get_listing } from '../../../../services/listing'
import { get_Vendor } from '../../../../services/Vendor'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { useRef } from 'react'


const DashboardAdmin = () => {
  const tableRef = useRef(null);
  const dispatch = useDispatch()
  const [contractor, setContractor] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [companie, setCompanie] = useState([])
  const [workSegment, setWorkSegment] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [state, setState] = useState([])
  const [tableData, setTableData] = useState([])
  const [entity, setEntity] = useState([])
  const [category, setCategory] = useState()
  const [sub_cat,setSubCat] = useState([])
  useEffect(() => {
    var cont_data = []
    var vend_data = []
    var proj_data = []
    var work_segment = []
    dispatch(get_contractor()).then((res) => {
      res.map((conts) => {
        cont_data.push(conts)
      })
      setContractor([...cont_data])
    })
    dispatch(get_Vendor()).then((res) => {
      res.map((conts) => {
        vend_data.push(conts)
      })
      setCompanie([...vend_data])
    })
    dispatch(get_listing()).then((res) => {
      res.map((conts) => {
        proj_data.push(conts)
      })
      setProjects([...proj_data])
    })
    dispatch(get_category()).then((res) => {
      res.map((work) => {
        work_segment.push(work)
      })
      setWorkSegment(work_segment)
      setSubCat(work_segment)
    })
  }, [])
  function countrySelectHandler(country) {
    setState(state_cites[country])
  }

  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const column = Object.keys(tableData[0]);

    const tableWidth = 180;
    const tableHeight = 15;
    const tableX = 15;
    const tableY = 20;

    // map through the data to create an array of rows
    const rows = tableData.map((item) => Object.values(item));
    doc.autoTable({
      head: [column],
      body: rows,
      startY: tableY,
      margin: { top: tableY },
      tableWidth: tableWidth,
      columnWidth: "wrap",
      cellHeight: tableHeight,
      styles: { overflow: "linebreak", fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
    });
    doc.save("table.pdf");
  };






  function onFinish(val) {
    var work_area= []
    setCategory(val.Category)
    Object.keys(val).map((val_item) => {
     val.work_segment!=undefined && val.work_segment.map((work) => {
          if (val_item === work) {

              work_area.push({ [val_item]: val[val_item] })
          }
      })
  })

  val["work_area_types"] = [...work_area]
    dispatch(adminSearch(val)).then((res) => {
      setShowTable(true)
      if (val.Category == "Contractor") { tableDataMaker(res) }
      else if (val.Category == "Companies") {
        tableDataMakerC(res)
      } else {
        tableDataMakers(res)
      }

    })
  }

  const tableDataMakerC = (res) => {
    var tableDataFilter = []
    var data = []
    res.reverse().map((tableData, index) => {
      console.log(tableData);


      if (tableData != undefined) {
        var tableCont = {}
        tableCont.text = tableData.agency_name
        tableCont.value = tableData.agency_name
        tableDataFilter.push(tableCont)
        if (tableData.user_id) {
          data.push({
            'user_id': tableData.user_id,
            '_id': tableData._id,
            'key': index,
            'entity': tableData.agency_name,
            'username': tableData.contact_person,
            'number': tableData.user_id?.number.toString(),
            'email': tableData.user_id?.email,
            'status': tableData.status === 1 ? 'Under Review' : tableData.status === 0 ? 'Approved' : 'Rejected'

          })
        }
      }
    })
    setEntity([...tableDataFilter])
    console.log("hit")
    setTableData(data)

  }

  const tableDataMaker = (res) => {
    var data = []
    var work_segment = []
    var dataTable = []
    res.reverse().map((tableData, index) => {
      tableData.work_area.map((segment) => {
        work_segment.push(segment.work_segment)
      })
      var dataText = {}
      dataText.text = tableData.entity
      dataText.value = tableData.entity
      dataTable.push(dataText)
      console.log(tableData)
      if (tableData.user_id) {
        data.push({
          'user_id': tableData.user_id,
          '_id': tableData._id,
          'key': index,
          'entity': tableData.entity,
          'username': tableData.username,
          'number': tableData.user_id?.number.toString(),
          'email': tableData.user_id?.email,
          'status': tableData.status === 1 ? 'Under Review' : tableData.status === 0 ? 'Approved' : 'Rejected'
        })
      }
    })
    console.log({ data })
    setTableData(data)
    setEntity(dataTable)

  }
  const tableDataMakers = (res) => {
    var data = []
    res = res.reverse()
    var dataTable = []
    res.map((tableData, index) => {
      var dataText = {}
      dataText.text = tableData.wok_segment
      dataText.value = tableData.wok_segment
      dataTable.push(dataText)
      data.push({
        '_id': tableData._id,
        'key': index,
        'entity': tableData.project_discription,
        'work_segment': tableData.wok_segment,
        'status': tableData.status === 1 ? "Under Review" : tableData.status === 0 ? "Approved" : "Rejected"
      })
    })
    setEntity([...dataTable])
    setTableData(data)

  }



  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',

      render: (text) => <p>{text + 1}</p>,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend'],

    },
    {
      title: 'Name of Contractor',
      dataIndex: 'entity',
      key: 'entity',
      render: (_, record) => (console.log(record), <Link to='/admin/edit-contractors' state={{ _id: record?._id }}>{record.entity}</Link>),
      filters: [
        ...entity
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.entity.includes(value),
    },
    {
      title: 'Contact Person',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',


    },
    {
      title: 'Mobile Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'Green'
        if (text === "Under Review") {
          color = 'yellow'

        }
        if (text === "Approved") {
          color = 'green'
        }
        if (text === "Rejected") {
          color = 'volcano'
        }
        return <Tag color={color}>{text}</Tag>
      },
      filters: [
        {
          text: "Approved",
          value: "Approved"
        },
        {
          text: "Under Review",
          value: "Under Review"
        },
        {
          text: "Rejected",
          value: "Rejected"
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, data) => (
        <Space size="middle">
          <Link to='/admin/edit-contractors' state={{ _id: data?._id }}>Edit </Link>
          <Link to='/messages' state={{ _id: data?.user_id }}>Messages </Link>
          {/* <Link onClick={() => deleteHandler(data?._id)}>Delete</Link> */}
        </Space>
      ),

    },
  ];
  const columnsL = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <p>{text + 1}</p>,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Project Description',
      dataIndex: 'entity',
      key: 'entity',
      render: (_, record) => <Link to='/edit-listing' state={{ _id: record?._id }}>{record.entity}</Link>,
      sorter: (a, b) => a.entity.length - b.entity.length,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Work Segment',
      dataIndex: 'work_segment',
      key: 'work_segment',
      render: (_, work_segment) => (
        <>
          {Array.isArray(work_segment?.work_segment) ? work_segment?.work_segment.map((tag, index) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag key={index}>
                {tag}
              </Tag>
            );
          }) : "None"}
        </>
      ),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.work_segment.find((val) => val == value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'Green'
        if (text === "Under Review") {
          color = 'yellow'

        }
        if (text === "Approved") {
          color = 'green'
        }
        if (text === "Rejected") {
          color = 'volcano'
        }
        return <Tag color={color}>{text}</Tag>
      },
      filters: [
        {
          text: "Approved",
          value: "Approved"
        },
        {
          text: "Under Review",
          value: "Under Review"
        },
        {
          text: "Rejected",
          value: "Rejected"
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status.includes(value),

      showOnResponse: true,
      showOnDesktop: true
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>
    //       {record?.status === 'Approved' && <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>}

    //     </Space>

    //   ),
    //   showOnResponse: true,
    //   showOnDesktop: true
    // },
  ];
  const columnsC = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <p>{text + 1}</p>,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend'],
    },
    {
      title: 'Name of Contractor',
      dataIndex: 'entity',
      key: 'entity',
      render: (_, record) => (console.log(record), <Link to='/admin/edit-company' state={{ _id: record?._id }}>{record.entity}</Link>),
      filters: [
        ...entity
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.entity.includes(value),
    },
    {
      title: 'Contact Person',
      dataIndex: 'username',
      key: 'username',

    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',

    },
    {
      title: 'Mobile Number',
      dataIndex: 'number',
      key: 'number',

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'Green'
        if (text === "Under Review") {
          color = 'yellow'

        }
        if (text === "Approved") {
          color = 'green'
        }
        if (text === "Rejected") {
          color = 'volcano'
        }
        return <Tag color={color}>{text}</Tag>
      },
      filters: [
        {
          text: "Approved",
          value: "Approved"
        },
        {
          text: "Under Review",
          value: "Under Review"
        },
        {
          text: "Rejected",
          value: "Rejected"
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        console.log(_, record),
        <Space size="middle">
          <Link to='/admin/edit-company' state={{ _id: record?._id }}>Edit </Link>
          <Link to='/messages' state={{ _id: record?.user_id }}>Messages </Link>

        </Space>
      ),

    },
  ];

  return (
    <section className="min-h-screen flex  flex-col w-full  py-6 sm:px-6 lg:px-3" >
      <div className="px-2 h-auto text-gray-800">
        <div
          className=" w-full   "
        >
          <div className='grid grid-cols-1 md:gap-x-6  mb-5 md:grid-cols-3'>
            <Card title="Contractors " bordered={false}>

              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {contractor?.length}</p>

            </Card>

            <Card title="Companies " bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {companie?.length}</p>
            </Card>

            <Card title="Total Projects" bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'>{projects.length} </p>
            </Card>
          </div>

          <div>Generate Report</div>
          <div className='flex w-full mb-8 '>

            <Form layout="vertical" className='w-full mt-5 px-16 ' onFinish={onFinish}>
              <Form.Item name="Category" label="Select for whom you want to generate report" >
                <Select placeholder="Select for whom you want to generate report">
                  <Select.Option value="Contractor">Contractor</Select.Option>
                  <Select.Option value="Companies">Companies</Select.Option>
                  <Select.Option value="Projects">Projects</Select.Option>
                </Select>
              </Form.Item>
              <div className='grid md:grid-cols-2 gap-y-6 md:gap-x-6 md:gap-y-0'>
                <Form.Item name="State" label="Select Location ">

                  <Select id="country-state"
                    name="State" placeholder="Select state" onSelect={countrySelectHandler}
                    showSearch // enable search functionality
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                    }>
                    {Object.keys(state_cites).map((state) => {
                      return (<Select.Option value={state}>{state}</Select.Option>)
                    }
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="City" label="City " >
                  <Select id="country-state"
                    name="City" placeholder="Select city"
                    showSearch // enable search functionality
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                    }>
                    {state.length > 0 && state.map((state) => {
                      return (<Select.Option value={state}>{state}</Select.Option>)
                    }
                    )}
                  </Select>
                </Form.Item>
                <Form.Item name="work_segment" label="Select Work Segment">


                  <Select placeholder="select work segments" mode='multiple' onChange={setSelectedItems} >
                    {
                      workSegment?.length > 0 && workSegment?.map((cats) => {
                        return (<Select.Option value={cats.name}>{cats.name}</Select.Option>)
                      })
                    }
                  </Select>

                </Form.Item>
                
              </div>
              {selectedItems.length > 0 && selectedItems.map((sub_item) => {
                                return sub_cat.map((sub_category) => {
                                    return sub_item === sub_category.name && sub_category.name != 'N/A' && <>
                                        <Form.Item name={sub_item} label={`Select Sub Category For ${sub_item}`}>
                                            <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                                                {sub_category.children.map((item, index) => {

                                                    return (
                                                        <Checkbox
                                                            key={item.sub_Category}
                                                            className={`ml-${index === 0 ? 2 : 0} `}
                                                            value={item.name}
                                                        >
                                                            <span>{item.name}</span>
                                                        </Checkbox>
                                                    );
                                                })}
                                            </Checkbox.Group>

                                        </Form.Item>
                                    </>


                                })
                            })
                            }
              <div className='grid md:grid-cols-2'>
                <button   type="submit"  className='  brand_button w-[30%]' > Report</button>
               { showTable&& <div className='grid place-items-end'>
                  <button className='prime_button_sec w-[40%]  ' onClick={downloadPDF}>Download PDF</button>
                </div>}
              </div>
            </Form>

          </div>
         {showTable&& <div>
            {
              category == "Contractor" ?
                <div style={{ height: "800px" }}>
                  <Table
                    ref={tableRef}
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 5 }}
                  /> </div> : category == "Companies" ?
                  <div style={{ height: "800px" }}>
                    <Table
                      ref={tableRef}
                      columns={columnsC}
                      dataSource={tableData}
                      pagination={{ pageSize: 5 }} />
                  </div>
                  :
                  <div style={{ height: "800px" }}>
                    <Table
                      ref={tableRef}
                      columns={columnsL}
                      dataSource={tableData}
                      pagination={{ pageSize: 5 }} />
                  </div>
            }
          </div>}
        </div>
      </div>
    </section>
  )
}

export default DashboardAdmin