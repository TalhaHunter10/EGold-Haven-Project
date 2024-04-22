
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getloginStatus } from "../../services/authservice";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chatType, setChatType] = useState();
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {

        try {
            const status = await getloginStatus();
            if (!status.verified) {
                navigate('/login');
            }
            else if (status.verified) {
                setUser(status.user);
                setUser(prevUser => ({ ...prevUser, token: status.token }));

            }
        } catch (error) {
            console.error('Error checking login status:', error);

        }
    };
    checkLoginStatus();
}, []);


  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chatType,
        setChatType,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;