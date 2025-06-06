import React, { useState } from "react";
import chatIcon from "../assets/speak.png"
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {

    const [detail, setDetail] = useState(
        {roomId:"", userName:""}
    );

    const {roomId,currentUserName,setRoomId,setCurrentUserName,setConnected} = useChatContext();
    const navigate = useNavigate();

    // function to call whenever we do any change 
    function handleFormInputChange(event) {
        setDetail({
            ...detail,
            [event.target.name]: event.target.value,
        });
    }

    function validateForm() {
        if(detail.roomId === "" || detail.userName === "") {
            toast.error("Invalid Input");
            return false;
        }
        else return true;
    }

     async function joinChat() {
        if(validateForm()) {
            
            try {
                const response = await joinChatApi(detail.roomId);
                
                setCurrentUserName(detail.userName);
                setRoomId(response.roomId);
                setConnected(true);

                toast.success("Joined...");

                // forward to chat page
                navigate("/chat");

            } catch (error) {
                if(error.status === 400) {
                    toast.error(error.response.data);
                }
                else {
                    toast.error("Error Occurred While Joining Chat");
                }
            }
        }
    }

    async function createRoom() {
        if(validateForm()) {
            try {
                const response = await createRoomApi(detail.roomId);
                toast.success("Room Created Successfully");
                
                setCurrentUserName(detail.userName);
                setRoomId(response.roomId);
                setConnected(true);

                // forward to chat page
                navigate("/chat");

            } catch (error) {
                if(error.status === 400) {
                    toast.error("Room Already Exists");
                }
                else {
                    toast.error("Error In Creating Room");
                }
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border p-10 dark:border-gray-700 border flex flex-col gap-5 w-full max-w-md rounded dark:bg-gray-900 shadow">
                
                <div>
                    <img src={chatIcon} className="w-20 mx-auto"/>
                </div>
                
                <h1 className="text-2xl font-semibold text-center">
                    Join Room / Create Room
                </h1>

                {/* Div for Name field  */}
                <div className="">
                    <label htmlFor="" className="block font-medium mb-2">
                        Enter Your Name
                    </label>
                    <input 
                        onChange={handleFormInputChange}
                        value={detail.userName}
                        name="userName"
                        placeholder="Enter Your Name"
                        type="text" 
                        id="name" 
                        className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>

                {/* Div for RoomId field  */}
                <div className="">
                    <label htmlFor="" className="block font-medium mb-2">
                        Enter Room ID / New Room ID
                    </label>
                    <input 
                        name="roomId"
                        onChange={handleFormInputChange}
                        value={detail.roomId}
                        placeholder="Enter Room ID"
                        type="text" 
                        id="name" 
                        className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </input>
                </div>

                {/* Buttoons */}
                <div className="flex justify-center gap-2">
                    <button onClick={joinChat} className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full">
                        Join Room
                    </button>

                    <button onClick={createRoom} className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full">
                        Create Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinCreateChat;