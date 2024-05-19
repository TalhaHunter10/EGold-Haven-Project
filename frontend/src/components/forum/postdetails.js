import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { createReply, getPostDetails } from "../../services/forumservice";
import { FileAnimationsmall } from "../loader/loader";
import { toast } from "react-toastify";
import ReplyContainer from "./replycontainer";

const PostDetails = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFetched, setIsFetched] = useState(false);

  const fetchPost = async () => {
    setIsFetched(false);
    setLoading(true);
    try {
      const res = await getPostDetails(id);
      setPost(res.post);
      setReplies(res.replies);
      setLoading(false);
      setIsFetched(true);
    } catch (error) {
      setError("An error occurred while fetching post details");
      setLoading(false);
      setIsFetched(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const [reply, setReply] = useState("");

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (reply.trim() === "") {
      validationErrors.reply = "Reply field is empty !!";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const data = await createReply(id, reply);
        if (data) {
          fetchPost();
          setReply("");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.error("Please remove the field error !!");
    }
  };

  const getTimeSinceCreation = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = now.getTime() - createdDate.getTime();

    // Convert milliseconds to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else {
      // Calculate hours difference if less than a day
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div>
      <div className="pb-20">
        <div className=" text-stone-200 min-[150px]:text-3xl text-center md:text-5xl alluse mb-8 mt-10 hover:text-yellow-600 cursor-pointer duration-300">
          <Link to="/forum"> Forum </Link>
        </div>

        <div className="bg-neutral-900 rounded-lg pt-4">
          <div className="px-6 pt-6 pb-2 bg-neutral-950 mx-6 border-2 border-yellow-600 rounded-t-lg rounded-r-lg">
            <p className="text-right text-stone-200 allusebody text-base pb-3">
              <span className="text-yellow-600">Post Id: </span>
              {post._id}{" "}
            </p>
            <div className="text-stone-200 text-4xl alluse">{post.title}</div>
            <div className="text-stone-200 text-2xl allusebody text-justify py-3">
              {post.content}
            </div>

            <p className="allusebody flex text-base justify-end text-stone-200 text-lg">
              {post.userstatus === "jeweler" ? (
                <img
                  className="w-6 h-6"
                  src="/images/shopwhite.png"
                  alt="seller"
                />
              ) : (
                <img
                  className="w-6 h-6"
                  src="/images/usericon.png"
                  alt="seller"
                />
              )}
              &nbsp;
              {post.user &&
                post.user.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </p>

            <p className="allusebody flex text-base justify-end text-stone-200 text-lg">
              {getTimeSinceCreation(post.createdAt)}
            </p>

            <p className="text-right text-stone-200 allusebody text-lg">
              <span className="text-yellow-600">Replies - </span>
              {replies.length}{" "}
            </p>
          </div>

          <div className="px-6 flex ">
            <div className=" border-l-2 border-yellow-600"></div>

            <div className="overflow-y-auto max-h-[70vh] w-full">
              {!isFetched ? (
                <FileAnimationsmall />
              ) : replies && replies.length === 0 && isFetched ? (
                <div className="flex mt-5">
                  <div className="h-8 border-b-2 border-yellow-600 min-[150px]:w-5 md:w-48"></div>
                  <div className="h-16 text-stone-200 p-6 text-3xl allusebody text-center py-3 border-2 border-yellow-600 rounded-lg bg-neutral-950 w-full align-center">
                    No replies yet
                  </div>
                </div>
              ) : (
                <ReplyContainer replies={replies} />
              )}
            </div>
          </div>

          <div className="flex px-6 pb-6 ">
            <div className=" border-l-2 border-yellow-600"></div>
            <div className="w-full">
              {isLoggedIn && (
                <div className="flex mt-5 ">
                  <div className="h-8 border-b-2 border-primary-600 min-[150px]:w-5 md:w-48"></div>
                  <div className="w-full text-stone-200 min-[150px]:p-2 sm:p-6 text-3xl allusebody py-3 border-2 border-primary-600 rounded-lg bg-neutral-950 min-[150px]:justify-center sm:justify-start">
                    <p className="w-full min-[150px]:text-center sm:text-left alluse text-3xl ">
                      Add Reply{" "}
                    </p>
                    <div className="w-full  md:mt-3 mb-5  flex  my-2 min-[150px]:justify-center sm:justify-start">
                      <input
                        className="m-auto w-full  h-12 block  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        type="text"
                        name="reply"
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder="Enter your reply .."
                      />
                      <button
                        onClick={handleSubmitReply}
                        className="relative z-[2] flex items-center rounded-r bg-primary-600 px-4 py-3 text-xs font-medium uppercase leading-tight text-black hover:text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg "
                        type="submit"
                      >
                        <img
                          src="/images/send.png"
                          className="w-8 h-6"
                          alt="send"
                        />
                      </button>
                    </div>
                    {error.reply && (
                      <h1 className="text-danger text-left text-base mt-[-15px] mb-6">
                        {error.reply}
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
