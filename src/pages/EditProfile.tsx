import { useEffect, useState } from "react"
import { AdminNav, Alert } from "../components"
import { useAuth } from "../hooks"

const EditProfile = (): JSX.Element => {

  const { auth, updateProfile }: any = useAuth()
  const [profile, setprofile] = useState<VeterinarianInterface | any>({})

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false })
  const { msg, error }: AlertInterface = alert

  useEffect(() => {
    setprofile(auth)
  }, [auth])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { name, email } = profile

    if ([name, email].includes('')) {
      setalert({ msg: 'Name and email fields are required', error: true })
      return
    }

    const result = await updateProfile(profile)
    setalert(result)
  }

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center ">Edit your
        <span
          className="text-indigo-600 font-bold"> Profile here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alert {...alert} />}

          <form action=""
            onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="name"
                className="uppercase font-bold text-gray-500">
                Name
              </label>
              <input type="text" name="name" id="name"
                value={profile?.name || ''}
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                onChange={(e) => {
                  setprofile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })
                }} />
            </div>

            <div className="my-3">
              <label htmlFor="website"
                className="uppercase font-bold text-gray-500">
                Website
              </label>
              <input type="text" name="web" id="web"
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                value={profile?.web || ''}
                onChange={(e) => {
                  setprofile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })
                }} />
            </div>

            <div className="my-3">
              <label htmlFor="phone"
                className="uppercase font-bold text-gray-500">
                Telephone
              </label>
              <input type="text" name="phone" id="phone"
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                value={profile?.phone || ''}
                onChange={(e) => {
                  setprofile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })
                }} />
            </div>

            <div className="my-3">
              <label htmlFor="email"
                className="uppercase font-bold text-gray-500">
                Email
              </label>
              <input type="text" name="email" id="email"
                className="border bg-gray-300 w-full p-2 mt-5 rounded-lg"
                value={profile?.email || ''}
                onChange={(e) => {
                  setprofile({
                    ...profile,
                    [e.target.name]: e.target.value
                  })
                }} />
            </div>

            <input type="submit" value="Save Changes"
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md" />

          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile