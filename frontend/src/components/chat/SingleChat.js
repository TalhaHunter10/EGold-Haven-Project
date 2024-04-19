import { FormControl } from "@chakra-ui/form-control";
import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "./typinganimation.json";

import io from "socket.io-client";
import { ChatState } from "./ChatProvider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getSender } from "./ChatLogics";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();

    const navigate = useNavigate();

    const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { selectedChat, setSelectedChat, user } =
        ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    const fetchMessagesagain = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (event) => {

        try {
            const status = await getloginStatus();
            if (!status.verified) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error checking login status:', error);

        }

        if ((event.key === "Enter" || event.type === "click") && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/api/message/send`,
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    useEffect(() => {
        socket = io(REACT_APP_BACKEND_URL);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => {
                setIsTyping(true);
            }
        );
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line

    }, [selectedChat]);


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
              
                
            } else {

                if(messages.length>10)
                {
                setMessages([...messages, newMessageRecieved]);
                }
            else
            fetchMessagesagain();
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const getInitials = (content) => {
        if (!content) return "";
        return content
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };


    return (
        <>
            {selectedChat ? (
                <>
                    <div className="flex justify-between md:p-5">
                        <div className="flex">
                            <img src="/images/usericon.png" alt="user" className="min-[150px]:h-8 min-[150px]:w-8 md:h-12 md:w-12" />
                            <p className="min-[150px]:text-lg md:text-4xl pb-3 px-2 text-stone-200 alluse pt-1"> {getInitials(getSender(user, selectedChat.users))}</p>
                        </div>
                        <p className="text-3xl pb-3 px-2 text-stone-200 alluse " onClick={() => setSelectedChat('')}>
                            <span className="cursor-pointer"><XMarkIcon className="min-[150px]:h-6 min-[150px]:w-6 md:h-8 md:w-8" strokeWidth={2} /></span>
                        </p>
                    </div>

                    <div className="flex flex-col justify-end p-3 bg-zinc-900 w-full h-[85%] rounded-lg overflowy-hidden">

                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            className="mt-3"
                        >
                            {istyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        height={50}
                                        width={70}
                                        style={{ marginBottom: 0, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="flex flex-between mt-2">
                                <input
                                    className="bg-#E0E0E0 w-full h-12 rounded-lg p-3"
                                    placeholder="Enter a message.."
                                    value={newMessage}
                                    onChange={typingHandler}
                                />
                                <p className=" w-12 text-center  cursor-pointer" onClick={sendMessage}>
                                    <img src="/images/send.png" alt="send" className="h-10 w-10 m-auto mt-1 ml-1 duration-300 hover:scale-105" />
                                </p>
                            </div>
                        </FormControl>
                    </div>
                </>
            ) : (
                // to get socket.io on same page
                <div className="flex align-center justify-center h-full">

                    <p className="text-3xl pb-3 allusebody text-stone-200 m-auto">
                        Select a Chat to start messaging
                    </p>

                </div>
            )}
        </>
    );
};

export default SingleChat;