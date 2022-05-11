import { Link } from "react-router-dom"

const AdminNav = (): JSX.Element => {
  return (
    <nav className="flex gap-3">
      <Link
        to={"/admin/profile"}
        className="font-bold uppercase text-gray-700"
      >
        Profile
      </Link>
      <Link
        to={"/admin/change-password"}
        className="font-bold uppercase text-gray-700"
      >
        Change Password
      </Link>
    </nav>
  )
}

export default AdminNav