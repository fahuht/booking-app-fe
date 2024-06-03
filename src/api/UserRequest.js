import axios from 'axios'

const API = axios.create({ baseURL: `http://localhost:5000` })

export const addPermission = (data) => API.post('/user/add-permission', data)
export const deleteUser = (data) => API.post('/user/delete', data)
export const getListUser = (data) =>
  API.post(`/user/search?${data.page && `page=${data.page}`  || ""}&&${data.size && `size=${data.size}`  || ""}`, data)