import NavTailwind from "../components/NavbarTailwind";

function HomeLayout({ children }) {
  return (
    <>
      <header>
        <NavTailwind />
      </header>
      <main>{children}</main>
    </>
  );
}

export default HomeLayout;
