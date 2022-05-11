import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/"
import { Header, Footer, Loading } from "../components"

const PrivateLayout = (): JSX.Element => {
  const { auth, loading }: any = useAuth()
  if (loading) return <Loading />
  return (
    <>
      <Header />
      {
        auth?._id ? (
          <main className="container p-10 items-center">
            <Outlet />
          </main>
        ) : (
          <Navigate to={"/"} />
        )
      }
      <Footer />
    </>
  )
}

export default PrivateLayout