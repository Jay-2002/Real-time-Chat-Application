import React, { useEffect, useRef, useState} from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessages } from "../services/RoomService";
import { timeAgo } from "../config/helper";


const ChatPage = () => {

    const {roomId, currentUserName, connected, setConnected, setRoomId, setCurrentUserName} = useChatContext();
    
    const navigate = useNavigate();
    useEffect(() => {
        if(!connected) {
            navigate("/");
        } 
    }, [connected, roomId, currentUserName]); // function that will run when any of those change

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    // in our page init itself we need to load all the messages
    // stompclient also needs init
    // then we need to subscribe
    // send message handle

    useEffect(() => { //stomp client
        const connectWebSocket = () => {
            // sockjs
            const sock = new SockJS(`${baseURL}/chat`);
            const client = Stomp.over(sock);

            client.connect({}, () => {
                setStompClient(client);
                toast.success("Connected");

                // subscribe on the server side where messages will come
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                })
            });
        }

        if(connected) {
            connectWebSocket();
        } 
    }, [roomId]);

    useEffect(() => {
        async function loadMessages() {
            try {
                const messages = await getMessages(roomId);
                setMessages(messages);
            } catch (error) {
                toast.error("Failed to get messages")
            }
        }

        if(connected) {
            loadMessages();
        } 
    }, []);

    // scroll down event whenver we change any message
    useEffect(() => {
        if(chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top:chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // send message handler
    const sendMessage = async () => {
        if(stompClient && connected && input.trim()) {
            const message = {sender:currentUserName, content:input, roomId:roomId};
            stompClient.send(`/app/sendMessage/${roomId}`,
                {}, 
                JSON.stringify(message),
            );
            setInput("");
        }
    }

    function handleLogout() {
        stompClient.disconnect();
        setConnected(false);
        setRoomId("");
        setCurrentUserName("");
        navigate("/");
    }

    return (
        <div className="">

            {/* Header portion */}
            <header className="dark:border-gray-700 dark:bg-gray-900 fixed h-20 w-full shadow flex justify-around items-center py-5">
                {/* Room Id */}
                <div>
                    <h1 className="text-xl font-semibold">
                        Room : <span>{roomId}</span>
                    </h1>
                </div>

                {/* User Name */}
                <div>
                    <h1 className="text-xl font-semibold">
                        User : <span>{currentUserName}</span>
                    </h1>
                </div>

                {/* Leave Room Button */}
                <div>
                    <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 rounded px-3 py-2">Leave Room</button>
                </div>
            </header>

            {/* Main section where chats would appear */}
            <main ref={chatBoxRef} className="h-screen py-20 px-5 border w-2/3 dark:bg-slate-600 mx-auto overflow-auto">
                {
                    messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender==currentUserName ? "justify-end" : "justify-start" }`}>
                            <div className={`my-2 ${message.sender==currentUserName ? "bg-blue-600" : "bg--300"} p-2 max-w-xs rounded`}>
                                <div className="flex flex-row gap-2">
                                    <img className="h-10 w-10" src="https://avatar.iran.liara.run/public/48"></img>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-bold">{message.sender}</p>
                                        <p>{message.content}</p>
                                        <p className="text-sm text-gray-400">{timeAgo(message.timeStamp)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </main>

            {/* Input Container to type our messages */}
            <div className="fixed bottom-0 w-full h-16">
                <div className="h-full w-2/3 mx-auto flex justify-between items-center px-5 py-2 gap-4 rounded-full dark:bg-gray-900">
                    <input 
                        value={input}
                        onChange={ (e) => {setInput(e.target.value)} }
                        type="text" 
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                sendMessage()
                            }
                        }}
                        placeholder="Type your message here..." 
                        className="dark:border-gray-700 dark:bg-gray-800 px-5 py-2 rounded-full w-full h-full focus:ring-0 focus:outline-none" 
                    />  
                    <div className="flex gap-2">
                        <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
                            <MdAttachFile size={20}/>    
                        </button>  
                        <button onClick={sendMessage} className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full">
                            <MdSend size={20}/>    
                        </button>    
                    </div>  
                </div>
            </div>

        </div>
    );
}

export default ChatPage;

