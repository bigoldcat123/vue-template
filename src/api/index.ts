import axios from "axios";
import { useCurrentUserStore } from "@/stores/currentUser";
import { ElMessage } from 'element-plus'

const SHOW_DEFAULT = "0"; // don't show anything
const SHOW_SUCCESS = "1";
const SHOW_ERROR = "2";
const SHOW_WARNING = "3";

const server = axios.create()

server.defaults.baseURL = '/api/'

server.interceptors.request.use(function (config) {
  const currentUser = useCurrentUserStore()
  // Do something before request is sent
  if (currentUser.isLogin()) {
    config.headers.Authorization = 'Bearer ' + currentUser.getToken()
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


server.interceptors.response.use(function (response) {
  switch (response.data.show) {
    case SHOW_SUCCESS:
      ElMessage.success(response.data.message)
      break
    case SHOW_ERROR:
      ElMessage.error(response.data.message)
      break
    case SHOW_WARNING:
      ElMessage.warning(response.data.message)
      break
  }
  if (response.data.code !== '200') {
    return Promise.reject(response.data.message)
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default server