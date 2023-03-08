import axiosBaseUrl from "../../../app/axiosBaseUrl";

export const usePostData = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axiosBaseUrl.post(url, data, config);
  return res;
};
