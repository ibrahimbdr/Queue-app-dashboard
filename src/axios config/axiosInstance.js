import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

axiosInstance.interceptors.response.use(
  function (response) {
    //     if (response.data[0].name || response.data[0].number) {
    //       console.log(response.data);
    //       console.log(sliceIntoChunks(response.data));
    //       return sliceIntoChunks(response.data);
    //     } else {
    return response;
    // }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
