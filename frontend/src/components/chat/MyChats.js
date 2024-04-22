import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "./ChatLogics";
import ChatLoading from "./ChatLoading";
import { ChatState } from "./ChatProvider";

const MyChats = ({ fetchAgain }) => {

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get( `${REACT_APP_BACKEND_URL}/api/chat` , config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const getInitials = (content) => {
    if (!content) return "";
  return content
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  };

  return (
    
    <div className={`flex flex-col items-center p-3 bg-zinc-800 rounded-lg ${selectedChat ? 'hidden' : 'flex'} min-[200px]:w-full md:w-2/4`}>
        <div className="md:py-6 px-3 min-[200px]:text-2xl md:text-4xl alluse flex w-full justify-center text-stone-200">
        My Chats
        </div>
       
        <div className="flex flex-col bg-blue w-full h-full rounded-lg overflowy-hidden">

       
        {chats ? (
          <Stack overflowY="scroll" className="max-h-[90%]">
            {chats.map((chat) => (
              
                <div className={`mt-4 cursor-pointer alluse ${selectedChat === chat ? 'bg-yellow-600 text-stone-200' : 'bg-zinc-700 text-stone-200'} ${chat.seen.status === false ? 'bg-primary-600' : ''} px-4 py-3 rounded-lg md:mr-4 md:ml-4 md:text-2xl duration-300 hover:scale-105`} key={chat._id}  onClick={() => setSelectedChat(chat)}>

                <div className="flex">
                <img src="/images/usericon.png" alt="user" className="min-[150px]:h-6 min-[150px]:w-6 md:h-8 md:w-8 mr-2" />
                <p>
                  {getInitials(getSender(user, chat.users))}
                </p>
                </div>

              </div>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </div>
    
    </div>
  );
};

export default MyChats;