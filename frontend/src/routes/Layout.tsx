import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:mx-10 lg:mx-20">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
export default Layout