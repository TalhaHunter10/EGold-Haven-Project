import { Link } from "react-router-dom";

const PostContainer = ({ posts }) => {
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

  const shortenText = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + " . . . . .";
    }
    return title;
  };

  return (
    <div className=" space-y-4  ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full  min-[150px]:p-4 sm:p-6 rounded-lg bg-stone-950 border-2 border-yellow-600 hover:scale-105 cursor-pointer duration-500 ease-in-out transition-all"
        >
          <Link to={`/post/${post._id}`} className="w-full">
            <div className="">
              <h1 className="alluse text-3xl">{post.title}</h1>

              <p className="allusebody text-xl pt-2 pb-5 text-justify">
                {shortenText(post.content, 250)}
              </p>

              <p className="allusebody flex text-base justify-end">
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
                {post.user.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                , {getTimeSinceCreation(post.createdAt)}
              </p>

              <p className="allusebody flex text-base justify-end">
                Replies - {post.replies.length}
              </p>

              <p className="allusebody flex text-base justify-center pt-4">
                <span className="text-yellow-600"> Post ID - </span> &nbsp;
                {post._id}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostContainer;
