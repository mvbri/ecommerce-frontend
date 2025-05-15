import Navbar from "../components/Navbar";
import NavTailwind from "../components/NavbarTailwind";

function HomeLayout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <header>
        <NavTailwind />
      </header>
      <main>{children}</main>
    </>
  );
}

export default HomeLayout;
