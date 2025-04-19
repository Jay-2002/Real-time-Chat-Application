import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ( {children} ) => {
    const [roomId, setRoomId] = useState("");
    const [currentUserName, setCurrentUserName] = useState("");
    const [connected, setConnected] = useState(false);

    return (
        <ChatContext.Provider 
            value={ 
                {roomId,currentUserName,connected,setRoomId,setCurrentUserName,setConnected} 
            }
        > 
            {children}
        </ChatContext.Provider>
    );
}

const useChatContext = () => useContext(ChatContext);
export default useChatContext;

// We did thid so that from both the pages we will have acces to these 4 parameters.