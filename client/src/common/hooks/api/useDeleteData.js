import axiosBaseUrl from "../../../app/axiosBaseUrl";

export const useDeleteData = async (url) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  };
  const res = await axiosBaseUrl.delete(url, config);
  return res;
};
