import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { ChatState } from "./ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className={` ${selectedChat ? 'flex' : 'hidden'} md:flex align-center flex-col p-3 bg-zinc-800 w-full md:w-[68%] rounded-lg border-1`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
   
    </div>
  );
};

export default Chatbox;