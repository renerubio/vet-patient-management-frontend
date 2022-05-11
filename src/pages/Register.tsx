import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components"
import clientAxios from "../config/axios"

const Register = (): JSX.Element => {
  const [name, setname] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [repeatPassword, setrepeatPassword] = useState<string>('')

  const [alert, setalert] = useState<AlertInterface | {}>({ msg: "", error: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([name, email, password, repeatPassword].includes('')) {
      setalert({ msg: 'There are empty fields', error: true })
      return
    }
    if (password !== repeatPassword) {
      setalert({ msg: 'Passwords are different', error: true })
      return
    }
    if (password.length < 6) {
      setalert({ msg: 'Password is to short', error: true })
      return
    }
    setalert({})
    try {
      await clientAxios.post('/veterinarians', { name, email, password })
      setalert({
        msg: "Created correctly, please check your email",
        error: false
      })

    } catch (error: any) {
      setalert({ msg: error.response.data.msg, error: true })
    }

  }
  const { msg }: AlertInterface = alert
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Create your account and manage <span className="text-black">your patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert {...alert} />}
        <form action="" onSubmit={handleSubmit}>

          <div className="my-5">
            <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">name</label>
            <input type="text" name="name" id="name" placeholder="Your name to register" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={name}
              onChange={e => setname(e.target.value)} />
          </div>

          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">email</label>
            <input type="email" name="" id="email" placeholder="email to register" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setemail(e.target.value)} />
          </div>

          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
            <input type="password" name="" id="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setpassword(e.target.value)} />
          </div>

          <div className="my-5">
            <label htmlFor="repeat_password" className="uppercase text-gray-600 block text-xl font-bold">repeat password</label>
            <input type="password" name="" id="repeat_password" placeholder="Repeat your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repeatPassword}
              onChange={e => setrepeatPassword(e.target.value)} />
          </div>

          <input type="submit" value="Signup" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/"
            className="block text-center my-5 text-gray-500">Do you have an account? Login</ Link>
          <Link to="/forgot-password"
            className="block text-center my-5 text-gray-500">I forgot my password</Link>
        </nav>
      </div>
    </>
  )
}

export default Register