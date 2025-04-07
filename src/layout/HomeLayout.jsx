import Navbar from "../components/Navbar";

function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default HomeLayout;
