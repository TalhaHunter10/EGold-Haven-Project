
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "./ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    const getTimeString = (createdAt) => {
        const date = new Date(createdAt);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };


    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div key={m._id}>
                        {((i === 0) ||
                            (messages[i - 1].createdAt && m.createdAt &&
                                formatDate(messages[i - 1].createdAt) !== formatDate(m.createdAt))) && (
                                <div className="date-divider text-center text-stone-200 alluse text-lg border-b mr-[20%] ml-[20%] border-yellow-600 my-5">{formatDate(m.createdAt)}</div>
                            )}
                        <div style={{ display: "flex" }}  >
                            <p className="text-stone-200 content-end ml-1 mr-1">{m.sender._id != user._id ? getTimeString(m.createdAt) : <span></span>}</p>
                            <p
                                className={`rounded-lg p-3 allusebody font-semibold ${m.sender._id === user._id ? 'bg-yellow-200' : 'bg-stone-200'} ${m.sender._id === user._id ? 'ml-auto' : 'mr-auto'} mt-2 mr-2  ml-2 }`}
                                style={{ maxWidth: "75%" }}
                            >
                                {m.content}
                            </p>
                            <p className="text-stone-200 content-end">{m.sender._id === user._id ? getTimeString(m.createdAt) : <span></span>}</p>
                        </div>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;