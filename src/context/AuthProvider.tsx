import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios"
import { Loading } from "../components"

const AuthContext = createContext<object | undefined>(undefined)

const AuthProvider = ({ children }: PropsJSX) => {

  const [loading, setloading] = useState<boolean>(true)
  const [auth, setauth] = useState<string | object>({})

  const token: string | null = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    const authenticateUser = async () => {
      if (!token) {
        setloading(false)
        return
      }

      try {
        const { data } = await clientAxios.get('/veterinarians/profile', config)
        setauth(data);

      } catch (error: any) {
        console.error(error.response.data.msg)
        setauth({});
      }

      setloading(false)

    }
    authenticateUser()
  }, [])

  const signOff: any = () => {
    localStorage.removeItem('token')
    setauth({})
  }

  const updateProfile: any = async (data: any) => {
    try {
      const url: string = `/veterinarians/profile/${data._id}`
      await clientAxios.put(url, data, config)
      console.log(url, data, config);

      //const { dataAxios }: any = await clientAxios.put(url, data, config)
      return {
        msg: "Successfully saved"
      }

    } catch (error: any) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  const savePassword: any = async (passwordData: PasswordInterface) => {
    try {
      const url: string = "/veterinarians/update-password"
      const { data }: any = await clientAxios.put(url, passwordData, config)

      return {
        msg: data.msg
      }

    } catch (error: any) {
      console.error(error.response.data.msg);

      return {
        msg: error.response.data.msg,
        error: true
      }
    }


  }

  return (
    loading ? <Loading /> : <AuthContext.Provider value={{
      auth,
      setauth,
      loading,
      signOff,
      updateProfile,
      savePassword
    }}>
      {children}

    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext