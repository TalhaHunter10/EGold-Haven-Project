const ReplyContainer = ({ replies }) => {
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
    <div className="">
      {replies.map((reply) => (
        <div key={reply._id}>
          <div className="flex mt-5">
            <div className="h-12 border-b-2 border-yellow-600 min-[150px]:w-5 md:w-48"></div>
            <div className=" text-stone-200 p-6 text-3xl allusebody text-center border-2 border-yellow-600 rounded-lg bg-neutral-950 w-full">
              <p className="allusebody text-xl pt-2 pb-5 text-justify">
                {reply.content}
              </p>

              <p className="allusebody flex text-base justify-end">
                {reply.userstatus === "jeweler" ? (
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
                {reply.user.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                , {getTimeSinceCreation(reply.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyContainer;
