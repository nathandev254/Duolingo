import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";



function Layout() {
  return (
    <div>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Layout;
