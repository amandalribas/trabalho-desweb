import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:mx-10 lg:mx-20">
        <Outlet />
      </div>
    </>
  )
}
export default Layout