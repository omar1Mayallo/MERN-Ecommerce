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
export const usePostDataWithImg = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axiosBaseUrl.post(url, data, config);
  return res;
};
