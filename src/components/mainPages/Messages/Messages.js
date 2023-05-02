import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { channel } from "../../../PusherConnection";
import { allMessage, getContacts, send_message } from "../../../services/Messages";
import Avatar from 'react-avatar';
import { useMemo } from "react";
import { useRef } from 'react';

const Messages = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const from_id = localStorage.getItem('user_id')
    const [to_id, set_To_id] = useState()
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([])
    const originalContactsRef = useRef([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [header, setHeader] = useState()
    const [run, setRUN] = useState(false)
    const [message, setMessage] = useState("");
    const [didMount, setDidMount] = useState(false);
    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null)
    const chat_id = header?.id ? header.id : "-"


    const contractorId = location.state?.contractor_id?._id;
    const id = location.state?._id._id;
    // console.log(location.state?.contractor_id?.contractor_id, id)
    useEffect(() => {
        if (contractorId || id) {
            set_To_id(contractorId || id);
        }
    }, [])


    // console.log(to_id)
    useEffect(() => {
        var sideContacts = []
        dispatch((getContacts({ from_id }))).then((res) => {

            res.map((msg) => {
                var exist = sideContacts.some(val => val.id == msg.id)
                if (!exist && msg.id != localStorage.getItem("user_id")) {
                    // console.log(msg)
                    var sideObj = {}
                    sideObj.id = msg.id;
                    sideObj.name = msg.name;
                    sideObj.status = "online"
                    sideContacts.push(sideObj)
                }
            })
            
            setContacts(prevState => [...prevState, ...sideContacts])
            originalContactsRef.current = contacts
            setDidMount(true)
        })


    }, [])

    useEffect(() => {
        var obj = {}
        obj.to_id = to_id
        obj.from_id = from_id
        var mssgData = []
        if (to_id != undefined) {
            dispatch(allMessage(obj)).then((res) => {
                res.map((msg) => {
                    var obj = {}
                    if (msg.from_id._id == from_id) {
                        obj.sender = "me"
                    }
                    else {
                        obj.sender = "other"
                    }
                    obj.id = msg._id
                    obj.text = msg.message
                    obj.time = msg.time
                    mssgData.push(obj)
                    // msg = JSON.parse(msg)

                })
                setMessages((prevState) => [...prevState, ...mssgData])
                // set_To_id(header.id)
            })
        }

    }, [contacts])
    const findId = useMemo(() => {
        if (contacts.length > 0)
            setRUN(true)
        return contacts.find((val) => val.id == to_id);
    }, [to_id, contacts]);
    var count = 0


    useEffect(() => {
        if (to_id === undefined) {
            return;
        }
        if (didMount === true && contacts.length > 0) {
            const isExist = contacts.findIndex((val) => val.id === to_id);
            if (isExist === -1) {
                const sideObj = {
                    id: to_id,
                    name:
                        location.state?._id.email?.split("@")[0] ||
                        location.state?.contractor_id.email?.split("@")[0],
                    status: "online",
                    time: new Date(),
                };
                setContacts((prevState) => [...prevState, sideObj]);
                originalContactsRef.current = contacts
                setHeader(sideObj);
                return
            }
        }
        if (didMount === true && contacts.length == 0) {
            var sideObj = {};
            sideObj.id = to_id;
            sideObj.name =
                location.state?._id.email?.split("@")[0] ||
                location.state?.contractor_id.email?.split("@")[0];
            sideObj.status = "online";
            sideObj.time = new Date();

            setContacts((prevState) => [...prevState, sideObj]);
            setHeader(sideObj);
            originalContactsRef.current = contacts
            return
        }
    }, [to_id, contacts.length, contractorId, id, didMount]);



    useEffect(() => {

        if (findId != undefined && to_id != undefined && run == true) {
            var sideObj = {};
            sideObj.id = findId.id;
            sideObj.name = findId.name;
            sideObj.status = "online";
            setHeader(sideObj);
        }
    }, [findId]);
    // console.log(contacts)

    useEffect(() => {
        if (chat_id != "-") {
            set_To_id(chat_id)
            channel.bind('message', function (data) {

                // console.log({ header })
                // console.log(data.from_id === header.id && data.to_id === from_id)
                if (data.from_id === chat_id && data.to_id === from_id) {
                    setMessages((prevState) => [...prevState, { id: messages.length + 1, sender: "other", text: data.message, time: new Date() }])
                }

            })
        }
    }, [chat_id])
    function inputHandler(event) {
        setSearchTerm(event.target.value.toLowerCase());
      }
      const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm)
    );

    const sendMessage = (text) => {
        var obj = {}
        obj.from_id = from_id
        obj.to_id = header?.id || to_id
        obj.message = text
        obj.isSeen = 0
        dispatch((send_message(obj))).then((res) => {
            const date = new Date()
            setMessages([
                ...messages,
                { id: messages.length + 1, sender: "me", text: text, time: date },
            ]);
        })

    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (message !== "") {
            sendMessage(message);
            setMessage("");
        }
    };
    function updateMessages(contact) {
        // console.log({ contact })
        // set_To_id(contact)
        setHeader(contact)
        var obj = {}
        obj.to_id = contact.id
        obj.from_id = from_id
        var mssgData = []
        dispatch(allMessage(obj)).then((res) => {
            res.map((msg) => {
                var obj = {}
                if (msg.from_id._id == from_id) {
                    obj.sender = "me"
                }
                else {
                    obj.sender = "other"
                }
                obj.id = msg._id
                obj.text = msg.message
                obj.time = msg.time
                mssgData.push(obj)
                // msg = JSON.parse(msg)

            })


            setMessages([...mssgData])
            
        
           
        })
    }
    useEffect(()=>{ messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);},[messages])
    function getRelativeTime(timestamp) {
        const now = new Date();
        const diff = (now - new Date(timestamp)) / 1000;

        if (diff < 60) {
            return `${Math.floor(diff)} sec ago`;
        } else if (diff < 60 * 60) {
            return `${Math.floor(diff / 60)} min ago`;
        } else if (diff < 24 * 60 * 60) {
            return `${Math.floor(diff / (60 * 60))} hour ago`;
        } else if (diff < 7 * 24 * 60 * 60) {
            return `${Math.floor(diff / (24 * 60 * 60))} day ago`;
        } else {
            const date = new Date(timestamp);
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 scrollbar   overflow-y-auto">


            <div className="col-span-1  bg-gray-200 ">
                {/* TODO: Implement Contacts Sidebar */}
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Search Bar */}
                    <div className=" p-[0.75rem]  border-b-2 border-slate-100">
                        <input
                            type="text"
                            placeholder="Search contacts"
                            onChange={inputHandler}
                            className="w-full px-5 py-[4.5px] h-auto outline-none rounded-[25px] border-gray-200 border rounded-lg"
                        />

                    </div>

                    {/* Contacts List */}
                    <div className="flex-grow border-b-2 scrollbar border-slate-100 scrollbar overflow-y-auto bg-[#ffffff]">
                        {filteredContacts.length > 0 && filteredContacts.map((contact, index) => (
                            <div
                                key={index}
                                className="flex border-b-2 border-slate-100 items-center py-2 px-4 hover:bg-gray-300 cursor-pointer"
                                onClick={() => updateMessages(contact)}
                            >
                                <Avatar
                                    name={contact.name}
                                    size="40"
                                    round={true}
                                    className="mr-2"
                                />
                                {/* <div
                                        className={`w-2 h-2 rounded-full mr-2 ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                            }`}
                                    ></div> */}
                                <h2 className="text-lg font-medium">{contact.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-span-4 flex-grow bg-gray-100 ">
                {to_id != undefined &&
                    <div className="flex items-center justify-between bg-[#d1d7db] text-white md:py-4 md:px-8">
                        <h2 className="text-lg font-semibold">{header?.name}</h2>

                    </div>
                }
                <div className="flex flex-col overflow-hidden h-[29rem] p-4">
                    <div className="flex-grow h-[300px] scrollbar overflow-y-auto p-4" ref={messageContainerRef}>
                        {messages.map((message,index) => (
                            <div
                                ref={index === messages.length - 1 ? messagesEndRef : null}
                                key={message.id}
                                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"
                                    } mb-4`}
                            >
                                <div className={`flex ${message.sender === "me" ? "justify-start" : "flex-row-reverse"}`}>
                                    <div className={`text-slate-400 text-[12px] ${message.sender === "me" ? "mr-3" : "ml-3"}`}>{getRelativeTime(message.time)} </div>
                                    <div
                                        className={`rounded-lg py-2 px-4 ${message.sender === "me" ? "bg-green-200" : "bg-gray-200"
                                            }`}
                                    >
                                        <p className="text-sm">{message.text} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                         <div ref={messagesEndRef} />
                    </div>

                    {to_id != undefined && <form onSubmit={handleSubmit}>
                        <div className="flex justify-between  " >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message"
                                className="w-full mx-2  py-2 rounded-[25px] border border-gray-200 px-5 outline-none"
                            />
                            <button
                                type="submit"

                                className="primary_btn"
                            >
                                {/* <svg viewBox="0 0 24 24" className="w-6 h-6  text-white" fill="#fffff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.757 11.136l16.486-6.705a.5.5 0 0 1 .757.424v11.149a.5.5 0 0 1-.757.424L3.757 12.864a.5.5 0 0 1 0-.728z" />
                            </svg> */}
                                Send
                            </button>
                        </div>
                    </form>}
                </div>
            </div>

        </div>
    );
}




export default Messages