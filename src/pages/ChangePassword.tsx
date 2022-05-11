import { useState } from "react"
import { AdminNav, Alert } from "../components"
import { useAuth } from "../hooks"

const ChangePassword = (): JSX.Element => {

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false })
  const { msg, error }: AlertInterface = alert
  const [password, setpassword] = useState<PasswordInterface>({
    currentPassword: "",
    newPassword: ""
  })

  const { savePassword }: any = useAuth()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (Object.values(password).some(field => field === '')) {
      setalert({
        msg: "All fields are required",
        error: true
      })
      return
    }

    if (password.newPassword.length < 6) {
      setalert({
        msg: "Password must have at least 6 characters ",
        error: true
      })
      return
    }

    const response = await savePassword(password)

    setalert(response)

  }

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
      <p className="text-xl mt-5 mb-10 text-center ">Change your
        <span
          className="text-indigo-600 font-bold"> password here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alert {...alert} />}

          <form action=""
            onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="currentPassword"
                className="uppercase font-bold text-gray-500">
                Current password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Write your current password"
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                onChange={e => setpassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="newPassword"
                className="uppercase font-bold text-gray-500">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Write your new password"
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                onChange={e => setpassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Update password"
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md" />

          </form>
        </div>
      </div>

    </>
  )
}

export default ChangePassword