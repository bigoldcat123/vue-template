import axios from "axios";
import { useCurrentUserStore } from "@/stores/currentUser";
import { ElMessage } from 'element-plus'


const server = axios.create()

server.defaults.baseURL = '/api/'

server.interceptors.request.use(function (config) {
    const currentUser = useCurrentUserStore()
    // Do something before request is sent
    if(currentUser.isLogin()) {
        config.headers.Authorization = 'Bearer ' + currentUser.getToken()
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


server.interceptors.response.use(function (response) {
    if(response.data.code !== '200') {
        ElMessage.error(response.data.msg)
        return Promise.reject(response.data.msg)
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  export default server