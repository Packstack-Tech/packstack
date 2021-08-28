import axios from "axios"

const getAuthToken = () => localStorage.getItem("AUTH_TOKEN") || ""

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
})

export default http
