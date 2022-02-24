import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-elections.glitch.me",
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
