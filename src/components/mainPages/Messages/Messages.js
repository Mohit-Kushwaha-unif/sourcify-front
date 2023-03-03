import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { channel } from "../../../PusherConnection";
import { allMessage, getContacts, send_message } from "../../../services/Messages";
import Avatar from 'react-avatar';

const Messages = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const from_id = localStorage.getItem('user_id')
    const [to_id, set_To_id] = useState(location.state?.contractor_id?._id || location.state._id.listing_user_id)
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([])
    const [header, setHeader] = useState()
    console.log(location.state)
    useEffect(() => {
        var sideContacts = []
        dispatch((getContacts({ from_id }))).then((res) => {

            res.map((msg) => {
                var exist = sideContacts.some(val => val.name == msg.name)
                console.log()
                if (!exist && msg.id != localStorage.getItem("user_id")) {
                    var sideObj = {}
                    sideObj.id = msg.id;
                    sideObj.name = msg.name;
                    sideObj.status = "online"
                    sideContacts.push(sideObj)
                }
            })
            setContacts(prevState => [...prevState, ...sideContacts])

        })

        var obj = {}
        obj.to_id = to_id
        obj.from_id = from_id
        var mssgData = []
        dispatch(allMessage(obj)).then((res) => {
            console.log(res)
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

    }, [])
    useEffect(()=>{
        console.log(location.state._id._id)
        if(contacts.length> 0 ){
            contacts.some((contDet)=>{
                if(contDet.id===location.state._id._id){
                    setHeader(contDet)
                }  
                else{
                    var obj = {}
                    var sideObj = {}
                    sideObj.id = location.state._id.listing_user_id
                    sideObj.name = "new User";
                    sideObj.status = "online"
                    setContacts(prevState=>[...prevState,sideObj])
                }
                
            })
        }
    },[location])
    const [message, setMessage] = useState("");
    useEffect(() => {
        channel.bind('message', function (data) {

            console.log({ header })
            if (data.from_id === header.id && data.to_id === from_id) {
                setMessages((prevState) => [...prevState, { id: messages.length + 1, sender: "other", text: data.message }])
            }

        })
    }, [])
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
        setHeader(contact)
        var obj = {}
        obj.to_id = contact.id
        obj.from_id = from_id
        var mssgData = []
        dispatch(allMessage(obj)).then((res) => {
            console.log(res)
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
                    <div className="flex items-center justify-between bg-[#d1d7db] text-white md:py-4 md:px-8">
                        <h2 className="text-lg font-semibold">{header?.name}</h2>

                    </div>

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

                        <form onSubmit={handleSubmit}>
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
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}




export default Messages