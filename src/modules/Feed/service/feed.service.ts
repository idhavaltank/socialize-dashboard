// ** Packages **
import { VITE_APP_API_URL } from "../../../config";
import { useAxiosGet } from "../../../hooks/useAxios";

const POST_API_BASE_PATH = "/posts";
const COMMENT_API_BASE_PATH = "/comments";

export const useGetPostsAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const getPosts = async (data: object) => {
    return callApi(`${POST_API_BASE_PATH}`, data);
  };
  return { getPosts, isLoading, isError, isSuccess };
};

export const useGetCommentsAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getComments = async (postId: number) => {
    return callApi(`${COMMENT_API_BASE_PATH}?postId=${postId}`);
  };

  return { getComments, isLoading, isError, isSuccess };
};
