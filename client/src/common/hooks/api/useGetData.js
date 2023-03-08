import axiosBaseUrl from "../../../app/axiosBaseUrl";

export const useGetData = async (url) => {
  const res = await axiosBaseUrl.get(url);
  return res.data;
};

export const useGetDataProtected = async (url) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const res = await axiosBaseUrl.get(url, config);
  return res.data;
};
