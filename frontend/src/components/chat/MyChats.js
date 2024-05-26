import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender, getSenderFull } from "./ChatLogics";
import ChatLoading from "./ChatLoading";
import { ChatState } from "./ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    chatType,
    setChatType,
  } = ChatState();

  const toast = useToast();

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchAllJewelerDetails = async (chats) => {
    try {
      const ids = chats
        .filter((chat) => chat.chattype === "jeweler" && user.status === "user")
        .map((chat) => getSenderFull(user, chat.users)._id);

      const responses = await Promise.all(
        ids.map((id) =>
          axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/jeweler/getuserjeweler/${id}`
          )
        )
      );

      const jewelerDetails = responses.map(
        (response) => response.data.storename
      );
      return jewelerDetails;
    } catch (error) {
      console.error("Error fetching jeweler details:", error);
      return [];
    }
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/chat`,
        config
      );
      setChats(data);
      const chatToBeSet = localStorage.getItem("chatId");
      const chat = data.find((chat) => chat._id === chatToBeSet);
      setSelectedChat(chat);
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

  const fetchJewelerChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/chat`,
        config
      );
      const jewelerChats = data.filter((chat) => chat.chattype === "jeweler");
      setChats(jewelerChats);
      const chatToBeSet = localStorage.getItem("chatId");
      const chat = jewelerChats.find((chat) => chat._id === chatToBeSet);
      setSelectedChat(chat);
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

  const fetchUserChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/chat`,
        config
      );
      const userChats = data.filter(
        (chat) =>
          chat.chattype === "user" ||
          (chat.chattype === "jeweler" && chat.users[0]._id === user._id)
      );
      setChats(userChats);
      const chatToBeSet = localStorage.getItem("chatId");
      const chat = userChats.find((chat) => chat._id === chatToBeSet);
      setSelectedChat(chat);
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
    setChatType(localStorage.getItem("chatType"));
    if (user.status === "user") {
      fetchChats();
    } else if (user.status === "jeweler") {
      if (chatType === "jeweler") {
        fetchJewelerChats();
      } else if (chatType === "user") {
        fetchUserChats();
      }
    }

    // eslint-disable-next-line
  }, [fetchAgain]);

  const getInitials = (content) => {
    if (!content) return "";
    return content
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [name, setName] = useState([]);

  const [jewelerDetails, setJewelerDetails] = useState([]);

  useEffect(() => {
    // Fetch all jeweler details initially
    const fetchJewelerDetails = async () => {
      const details = await fetchAllJewelerDetails(chats);
      setJewelerDetails(details);
    };

    fetchJewelerDetails();
  }, [chats]);

  return (
    <div
      className={`flex flex-col items-center p-3 bg-zinc-800 rounded-lg ${
        selectedChat ? "hidden" : "flex"
      } min-[200px]:w-full md:w-2/4`}
    >
      <div className="md:py-6 px-3 min-[200px]:text-2xl md:text-4xl alluse flex w-full justify-center text-stone-200">
        My Chats
      </div>

      <div className="flex flex-col bg-blue w-full h-full rounded-lg overflowy-hidden">
        {chats ? (
          <Stack overflowY="scroll" className="max-h-[90%]">
            {chats.map((chat, index) => (
              <div
                className={`mt-4 cursor-pointer alluse ${
                  selectedChat === chat
                    ? "bg-yellow-600 text-stone-200"
                    : "bg-zinc-700 text-stone-200"
                } ${
                  chat.seen.status === false &&
                  String(chat.seen.receiver) === String(user._id)
                    ? "bg-primary-600"
                    : ""
                } px-4 py-3 rounded-lg md:mr-4 md:ml-4 md:text-2xl duration-300 hover:scale-105`}
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex">
                  {chat.chattype === "jeweler" && user.status === "user" ? (
                    <img
                      src="/images/shopwhite.png"
                      alt="user"
                      className="min-[150px]:h-5 min-[150px]:w-5 md:h-7 md:w-7 mr-3"
                    />
                  ) : (
                    <img
                      src="/images/usericon.png"
                      alt="user"
                      className="min-[150px]:h-6 min-[150px]:w-6 md:h-8 md:w-8 mr-2"
                    />
                  )}
                  <p>
                    {chat.chattype === "jeweler" && user.status === "user"
                      ? getInitials(jewelerDetails[index])
                      : getInitials(getSender(user, chat.users))}
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
