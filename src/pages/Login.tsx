import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/"
import { Alert } from "../components"
import clientAxios from "../config/axios"

const Login = (): JSX.Element => {

  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false })

  const { setauth }: any = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setalert({ msg: 'All fields are required', error: true })
      return
    }

    try {
      const { data } = await clientAxios.post(
        '/veterinarians/login',
        {
          email,
          password
        }
      )
      localStorage.setItem('token', data.token)
      setauth(data)
      navigate("/admin")

    } catch (error: any) {
      setalert({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg }: AlertInterface = alert

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Login and manage your <span className="text-black">patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert {...alert} />}
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email to login"
              value={email}
              onChange={(e: any) => setemail(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password to login"
              value={password}
              onChange={(e: any) => setpassword(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>
          <input type="submit" value="Login" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/register"
            className="block text-center my-5 text-gray-500">Do you haven't an account?</Link>
          <Link to="/forgot-password"
            className="block text-center my-5 text-gray-500">I forgot my password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login



