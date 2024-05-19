import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import ModalDynamic from "../modaldynamic";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Input } from "antd";
import { createPost, getMyPosts, getPosts } from "../../services/forumservice";
import PostContainer from "./postcontainer";
import { FileAnimationsmall } from "../loader/loader";
import { getloginStatus } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Forum = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [myposts, setMyPosts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [showMyPosts, setShowMyPosts] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchdata();
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLogged = getloginStatus();
    if (!isLogged) {
      toast.error("Please login to create a post !!");
      navigator("/login");
    }

    const validationErrors = {};

    if (title === "") {
      validationErrors.title = "Title is required !";
    }
    if (content === "") {
      validationErrors.content = "Content is required !";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createPost(title, content);
        setOpenModal(false);
        setShowMyPosts(true);
        fetchdata();
      } catch (error) {
        console.error("Error submitting request:", error);
      }
    } else {
      toast.error("Please remove the field error !!");
    }
  };

  const [limit, setLimit] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchdata = async () => {
    setIsFetched(false);
    setLoading(true);
    try {
      const res = await getPosts(search);
      setPosts(res.posts);
      if (res.posts && res.posts >= 8) {
        setLimit(res.posts.splice(0, 8));
      } else {
        setLimit(res.posts);
      }
      setLoading(false);
      if (showMyPosts) {
        const res2 = await getMyPosts(search);
        setMyPosts(res2.posts);
      }
      setIsFetched(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsFetched(true);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [showMyPosts]);

  const loadMore = () => {
    if (posts.length - limit.length > 8) {
      const newlimit = limit.length + 8;
      setLimit(posts.splice(0, newlimit));
    } else {
      setLimit(posts);
    }
  };

  return (
    <div className="pb-20">
      <form onSubmit={handleSearch}>
        <div className="md:flex md:flex-wrap md:justify-between min-[150px]:text-center mt-10">
          <div className="text-stone-200 min-[150px]:text-4xl md:text-5xl min-[150px]:text-center md:text-left md:pl-8 alluse mb-8 ">
            <span
              onClick={() => {
                setShowMyPosts(false);
              }}
              className="cursor-pointer duration-200 hover:scale-105 hover:text-yellow-600"
            >
              Forum
            </span>
          </div>

          <div className="min-[150px]:w-80 md:w-1/2 md:mt-3 mb-5 min-[150px]:mx-auto md:mx-0 flex">
            <input
              className="m-auto min-[150px]:w-80 w-full h-12 block  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              type="text"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Posts, discussions etc."
            />
            <button
              onClick={handleSearch}
              className="relative z-[2] flex items-center rounded-r bg-warning-600 px-6 py-3 text-xs font-medium uppercase leading-tight text-black hover:text-white shadow-md transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-lg focus:bg-warning-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-lg hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)]"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="bg-neutral-900 rounded-lg min-[150px]:py-1 md:py-3 px-3">
        <div
          className={`flex flex-wrap  ${
            isLoggedIn ? "justify-between" : "justify-center"
          }  mt-5`}
        >
          <div
            className={`text-stone-200 min-[150px]:text-3xl md:text-4xl min-[150px]:text-center md:text-left ${
              isLoggedIn ? "md:pl-8" : ""
            } alluse`}
          >
            {" "}
            Posts{" "}
          </div>
          {isLoggedIn ? (
            <div className="flex flex-wrap space-x-1">
              <button
                className="bg-danger-600 text-neutral-900 rounded-lg h-10 min-[150px]:w-28 md:w-48 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Create Post
              </button>
              {showMyPosts ? (
                <button
                  className="bg-primary-600 text-neutral-900 rounded-lg h-10 min-[150px]:w-28 md:w-48 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
                  onClick={() => {
                    setShowMyPosts(false);
                  }}
                >
                  All Posts
                </button>
              ) : (
                <button
                  className="bg-yellow-600 text-neutral-900 rounded-lg h-10 min-[150px]:w-28 md:w-48 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto"
                  onClick={() => {
                    setShowMyPosts(true);
                  }}
                >
                  My Posts
                </button>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex flex-wrap justify-between pr-2 pb-0 min-[150px]:space-y-3 min-[350px]:space-y-0 mt-3">
          <div className="text-stone-200 md:text-2xl allusebody min-[150px]:text-lg md:pl-8">
            Search for "{search !== "" ? `${search}` : "All"}"
          </div>
          {posts.length > 0 && isFetched ? (
            <div className="allusebody text-lg font-bold text-stone-300">
              {showMyPosts ? `${myposts.length}` : `${posts.length}`} Results
              Found
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {!showMyPosts ? (
          <div className="text-stone-200 mb-5 min-[150px]:mt-3 sm:mt-0">
            <h1 className="alluse text-4xl text-center">All Posts</h1>
            <div className="">
              {!isFetched ? (
                <FileAnimationsmall />
              ) : posts && posts.length === 0 && isFetched ? (
                <p className="w-full allusebody min-[150px]:text-2xl md:text-4xl text-center text-stone-200 min-[150px]:mt-4  md:mt-10">
                  No Posts Found !!
                </p>
              ) : (
                <div className="md:px-20 sm:px-10 min-[150px]:px-3 md:mt-10">
                  {<PostContainer posts={limit} />}
                </div>
              )}
            </div>
            {posts.length > limit.length ? (
              <div
                onClick={loadMore}
                className="allusebody text-stone-200 hover:text-yellow-600 duration-300 hover:scale-110 text-center cursor-pointer -mt-5"
              >
                Load More
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className="text-stone-200 mb-5 min-[150px]:mt-3 sm:mt-0">
            <h1 className="alluse text-4xl text-center">My Posts</h1>
            <div className="">
              {!isFetched ? (
                <FileAnimationsmall />
              ) : myposts && myposts.length === 0 && isFetched ? (
                <p className="w-full allusebody min-[150px]:text-2xl md:text-4xl text-center text-stone-200 min-[150px]:mt-4  md:mt-10">
                  You have not created any post yet !!
                </p>
              ) : (
                <div className="md:px-20 sm:px-10 min-[150px]:px-3 md:mt-10">
                  {<PostContainer posts={myposts} />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ModalDynamic isOpen={openModal} className="overflow-auto ">
        <div className="flex justify-end">
          <div className="cursor-pointer" onClick={() => setOpenModal(false)}>
            <XMarkIcon
              className="text-neutral-900 h-5 w-5 cursor-pointer my-auto"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className=" text-neutral-900">
          <p className="text-center alluse text-4xl sm:px-48 min-[150px]:px-20">
            Create Post
          </p>

          <p className="field-heading pb-2 pt-10 font-semibold">Title</p>
          <Input
            placeholder="Write title here..."
            style={{
              width: "100%",
              height: 50,
              fontSize: "18px",
              marginBottom: 20,
            }}
            onChange={onTitleChange}
          />
          {errors.title && (
            <h1 className="text-danger mt-[-15px] mb-6 font-semibold">
              {errors.title}
            </h1>
          )}

          <p className="field-heading pb-2 pt-5 font-semibold">Content</p>
          <TextArea
            placeholder="Write content here..."
            allowClear
            style={{
              width: "100%",
              height: 120,
              fontSize: "18px",
              marginBottom: 20,
            }}
            onChange={onContentChange}
          />
          {errors.content && (
            <h1 className="text-danger mt-[-15px] mb-6 font-semibold">
              {errors.content}
            </h1>
          )}

          <div className="text-center">
            <div
              onClick={handleSubmit}
              className="w-auto cursor-pointer mt-4 text-center px-10 alluse inline-block rounded bg-yellow-600 pb-2.5 pt-3 text-base font-semibold leading-normal text-white hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
            >
              <p className="my-auto">Create Post</p>
            </div>
          </div>
        </div>
      </ModalDynamic>

      <ModalDynamic isOpen={open} onClose={() => setOpen(false)}>
        <div className="m-auto bg-gradient-to-br from-slate-300 to-yellow-200 p-5">
          <div className="rounded-lg text-center sm:w-3/4 m-auto">
            <div className=" min-[150px]:text-3xl md:text-5xl alluse pb-1">
              {" "}
              Welcome to <span className="text-yellow-600">
                EGold Haven
              </span>{" "}
              Forum{" "}
            </div>
            <div className="border-b-2 border-yellow-600 m-auto w-2/4  mb-3"></div>

            <div className=" md:text-2xl allusebody min-[150px]:text-lg">
              <span className="md:text-3xl">
                Before engaging in discussions, we kindly ask all members to
                adhere to our community guidelines.
              </span>
              <br />
              <ul className="list-disc text-justify m-10 space-y-2 font-semibold">
                <li>
                  Ensure that all posts and replies are written in simple
                  English to facilitate effective communication.{" "}
                </li>
                <li>
                  Maintain a respectful and courteous tone towards fellow
                  members; constructive discussions are encouraged, while any
                  form of harassment or disrespectful behavior will not be
                  tolerated.
                </li>
                <li>
                  Prioritize authenticity in your contributions by sharing only
                  accurate and genuine information. Be mindful of privacy
                  concerns and refrain from sharing personal information
                  publicly.{" "}
                </li>
                <li>
                  Avoid posting any content that may be considered offensive,
                  inappropriate, or harmful. This includes but is not limited to
                  spam, hate speech, or any form of discrimination.
                </li>
              </ul>

              <span className="md:text-3xl">
                <b>Thank you</b> for being a part of the{" "}
                <b>EGold Haven community!</b> Let's foster meaningful
                discussions and share valuable insights together.
              </span>
            </div>
          </div>
        </div>
      </ModalDynamic>
    </div>
  );
};

export default Forum;
