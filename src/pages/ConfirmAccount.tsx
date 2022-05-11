import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loading, Alert } from "../components"
import clientAxios from "../config/axios"

const ConfirmAccount = (): JSX.Element => {
  const [accountConfirmed, setaccountConfirmed] = useState<boolean>(false)
  const [loading, setloading] = useState<boolean>(true)

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false });

  const params: any = useParams<string>()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url: string = `/veterinarians/confirm/${id}`
        const { data } = await clientAxios.get(url)
        setaccountConfirmed(true)
        setalert({
          msg: data.msg,
          error: false
        })

      } catch (error: any) {
        setalert({
          msg: error.response.data.msg,
          error: true
        })
      }
      setloading(false)
    }
    confirmAccount()
  }, [])


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your account and manage <span className="text-black">your patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {loading ? <Loading /> : <Alert {...alert} />}

        {accountConfirmed && (
          <Link to="/"
            className="block text-center my-5 text-gray-500">Login
          </ Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount