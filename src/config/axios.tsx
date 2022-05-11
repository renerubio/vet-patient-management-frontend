import axios from "axios"

const importViteBackendUrl: any = import.meta.env.VITE_BACKEND_URL
const clientAxios = axios.create({
  baseURL: `${importViteBackendUrl}/api`
})

export default clientAxios