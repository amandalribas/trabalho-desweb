import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import ToastContainer from "../components/ToastContainer"

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:mx-10 lg:mx-20">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}
export default Layout