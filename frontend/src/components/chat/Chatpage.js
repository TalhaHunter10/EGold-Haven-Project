
import { useEffect, useState } from "react";
import MyChats from "./MyChats";
import { ChatState } from "./ChatProvider";
import Chatbox from "./Chatbox";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const status = await getloginStatus();
            if (status.verified) {
               
            }
            else{
                navigate('/login');
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    checkLoginStatus();
}, [user]);

  return (
    <div style={{ width: "100%" }}>
      <div className="flex justify-between w-full h-[80vh] p-3 md:space-x-4" >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chatpage;