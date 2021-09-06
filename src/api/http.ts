import axios from "axios"

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

// Interceptor that checks for auth token at request time
http.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("AUTH_TOKEN")
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default http
