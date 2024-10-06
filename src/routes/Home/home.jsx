import Nav from "../Nav/dashboard";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className='grid grid-cols-5 gap-2 h-screen'>
      <Nav />
      <Outlet />
    </div>
  )
}

export default Home;