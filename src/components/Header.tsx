import { Link } from "react-router-dom"
import { useAuth } from "../hooks/"

const Header = (): JSX.Element => {
  const { signOff }: any = useAuth()
  return (
    <header className="p-10 bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">

        <h1 className="font-bold text-indigo-200 text-2xl text-center">
          <span className="text-white font-black">Veterinary </span> Patient Manager
        </h1>

        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link
            to={"/admin"}
            className="text-white text-sm uppercase font-bold">Patients</Link>
          <Link
            to={"/admin/profile"}
            className="text-white text-sm uppercase font-bold">Profile</Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={signOff}
          >
            Sign off
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header