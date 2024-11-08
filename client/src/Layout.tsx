import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header ></Header>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
