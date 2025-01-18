import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_CAT_KEY,
  },
})

export default axiosInstance
