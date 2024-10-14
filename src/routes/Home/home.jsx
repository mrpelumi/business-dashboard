import Nav from "../Nav/dashboard";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className='flex gap-2 h-dvh'>
      <Nav />
      <Outlet />
    </div>
  )
}

export default Home;