import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components"
import clientAxios from "../config/axios"


const ForgotPassword = (): JSX.Element => {
  const [email, setemail] = useState<string>('')
  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === '') {
      setalert({ msg: 'The email field is required', error: true })
      return
    }

    try {
      const { data } = await clientAxios.post(
        '/veterinarians/recover-password',
        { email }
      )
      setalert({ msg: data.msg, error: false })

    } catch (error: any) {
      setalert({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg }: AlertInterface = alert

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recover your account and don't lose <span className="text-black">your patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert {...alert} />}
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email to register"
              value={email}
              onChange={(e: any) => setemail(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>

          <input
            type="submit"
            value="Send instructions"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/"
            className="block text-center my-5 text-gray-500">Do you have an account? Login</ Link>
          <Link to="/register"
            className="block text-center my-5 text-gray-500">Do you haven't an account?</Link>
        </nav>

      </div>
    </>
  )
}

export default ForgotPassword