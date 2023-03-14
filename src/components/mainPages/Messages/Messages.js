import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { channel } from "../../../PusherConnection";
import { allMessage, getContacts, send_message } from "../../../services/Messages";
import Avatar from 'react-avatar';
import { useMemo } from "react";

const Messages = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    // console.log({ location })
    const from_id = localStorage.getItem('user_id')
    const [to_id, set_To_id] = useState()
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([])
    const [header, setHeader] = useState()
    const [run,setRUN] = useState(false)
    const [message, setMessage] = useState("");
    const chat_id = header?.id ? header.id : "-"

    useEffect(() => {
        const contractorId = location.state?.contractor_id?._id;
        const id = location.state?._id._id;
        // console.log(location.state?.contractor_id?.contractor_id, id)
        if (contractorId || id) {
            set_To_id(contractorId || id);
        }

    }, [location]);
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

        })


    }, [])

    useEffect(() => {
        var obj = {}
        obj.to_id = to_id
        obj.from_id = from_id
        var mssgData = []
        if (to_id != undefined) {
            dispatch(allMessage(obj)).then((res) => {
                // console.log(res)
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
                    mssgData.push(obj)
                    // msg = JSON.parse(msg)

                })
                setMessages((prevState) => [...prevState, ...mssgData])
                // set_To_id(header.id)
            })
        }

    }, [to_id])
    const findId = useMemo(() => {
        if (contacts.length > 0)
        // console.log(contacts,to_id)
        setRUN(true)
            return contacts.find((val) => val.id == to_id);
    }, [to_id,contacts]);
    useEffect(() => {
        // console.log(to_id)
        if (to_id != undefined && contacts.length >0) {
            // console.log("im htee")
            const isExist = contacts.findIndex(val => val.id === to_id)
            // console.log(isExist)
            if (isExist == -1) {
                var sideObj = {};
                sideObj.id = to_id
                sideObj.name = location.state?._id.email?.split('@')[0] || location.state?.contractor_id.email?.split('@')[0];
                sideObj.status = "online"
                // console.log("im here", to_id)
                setContacts(prevState => [...prevState, sideObj])
                setHeader(sideObj)
            }
        }

    }, [to_id])

    useEffect(() => {
        console.log(findId,run,to_id)
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
                    setMessages((prevState) => [...prevState, { id: messages.length + 1, sender: "other", text: data.message }])
                }

            })
        }
    }, [chat_id])
    const sendMessage = (text) => {
        var obj = {}
        obj.from_id = from_id
        obj.to_id = header?.id || to_id
        obj.message = text
        obj.isSeen = 0
        dispatch((send_message(obj))).then((res) => {
            setMessages([
                ...messages,
                { id: messages.length + 1, sender: "me", text: text },
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
            // console.log(res)
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
                mssgData.push(obj)
                // msg = JSON.parse(msg)

            })


            setMessages([...mssgData])
        })
    }
    return (
        <div className="flex flex-col h-[500px] overflow-y-auto">

            <main className="flex-grow flex">
                <div className="w-72 bg-gray-200 p-4">
                    {/* TODO: Implement Contacts Sidebar */}
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-4">
                            <Input
                                type="text"
                                placeholder="Search or Start A New Chat"
                                className="w-full px-2 py-1 border-gray-200 border rounded-lg"
                            />

                        </div>

                        {/* Contacts List */}
                        <div className="flex-grow overflow-y-auto">
                            {contacts.length > 0 && contacts.map((contact, index) => (
                                <div
                                    key={index}
                                    className="flex items-center py-2 px-4 hover:bg-gray-300 cursor-pointer"
                                    onClick={() => updateMessages(contact)}
                                >
                                    <Avatar
                                        name={contact.name}
                                        size="40"
                                        round={true}
                                        className="mr-2"
                                    />
                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                            }`}
                                    ></div>
                                    <h2 className="text-lg font-medium">{contact.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-grow bg-gray-100 ">
                    {to_id != undefined &&
                        <div className="flex items-center justify-between bg-[#d1d7db] text-white md:py-4 md:px-8">
                            <h2 className="text-lg font-semibold">{header?.name}</h2>

                        </div>
                    }
                    <div className="flex flex-col overflow-hidden h-[29rem] p-4">
                        <div className="flex-grow h-[300px] overflow-y-auto p-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"
                                        } mb-4`}
                                >
                                    <div
                                        className={`rounded-lg py-2 px-4 ${message.sender === "me" ? "bg-green-200" : "bg-gray-200"
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {to_id != undefined && <form onSubmit={handleSubmit}>
                            <div className="bg-gray-100 p-4 h-[80px]" >
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message"
                                    className="w-3/4 ml-2 py-2 border border-gray-200 px-4 outline-none"
                                />
                                <button
                                    type="submit"

                                    className="w-1/7 flex-shrink-0 px-4 py-2  text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
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
            </main>
        </div>
    );
}




export default Messages