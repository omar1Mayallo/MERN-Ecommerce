import axiosBaseUrl from "../../../app/axiosBaseUrl";

export const useUpdateData = async (url, data) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  };
  const res = await axiosBaseUrl.patch(url, data, config);
  return res;
};

export const useUpdateDataWithImg = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axiosBaseUrl.patch(url, data, config);
  return res;
};
