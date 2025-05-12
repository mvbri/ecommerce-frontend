import Navbar from "../components/Navbar";
import NavTailwind from "../components/NavbarTailwind";

function HomeLayout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <NavTailwind />
      <main>{children}</main>
    </>
  );
}

export default HomeLayout;
