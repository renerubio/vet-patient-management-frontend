import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Alert } from "../components"
import clientAxios from "../config/axios"

const NewPassword = (): JSX.Element => {
  const [password, setpassword] = useState<string>('')
  const params = useParams()
  const { token } = params

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false });
  const [validToken, setValidToken] = useState<boolean>(false)
  const [passwordUpdated, setpasswordUpdated] = useState<boolean>(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/veterinarians/recover-password/${token}`)
        setalert({
          msg: 'Please write your new password'
        })
        setValidToken(true)
      } catch (error) {
        setalert({
          msg: 'there was a error on link',
          error: true
        })
        setValidToken(false)
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 6) {
      setalert({
        msg: 'The password must be at least 6 characters',
        error: true
      })
      return
    }

    try {
      const url = `/veterinarians/recover-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      setalert({
        msg: data.msg
      })
      setpasswordUpdated(true)

    } catch (error: any) {
      setalert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg }: AlertInterface = alert

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restart your password and manage <span className="text-black">your patients</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alert {...alert} />}

        {validToken && (<>
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="newpassword"
                className="uppercase text-gray-600 block text-xl font-bold">New password</label>
              <input type="password" name="" id="newpassword"
                placeholder="Your new password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setpassword(e.target.value)} />
            </div>

            <input
              type="submit"
              value="Save your new Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>

          {passwordUpdated && (
            <nav className="mt-10 lg:flex lg:justify-between">
              <Link to="/"
                className="block text-center my-5 text-gray-500">Do you have an account? Login</ Link>
            </nav>)}
        </>
        )}


      </div>
    </>
  )
}

export default NewPassword