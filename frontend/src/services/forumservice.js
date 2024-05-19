import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//create post
export const createPost = async (title, content) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/forum/createpost`, {
      title,
      content,
    });
    if (response.status === 200) {
      toast.success("Post created successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//get all posts
export const getPosts = async (search) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/forum/getposts`, {
      params: { search },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//get my posts
export const getMyPosts = async (search) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/forum/getmyposts`, {
      params: { search },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//get post details and replies
export const getPostDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/forum/getpostdetails/${id}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//create reply
export const createReply = async (postId, reply) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/forum/createreply`, {
      postId,
      reply,
    });
    if (response.status === 200) {
      toast.success("Reply submitted successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
