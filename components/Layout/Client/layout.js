import { useEffect, useState } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import useWindowDimensions from "~/lib/useWindowDimensions";
// import Footer from "./footer";
import c from "./layout.module.css";
// import MobileNav from "./mobileNavbar";
// import NavBar from "./navbar";
import FooterMobile from "./mobileFooterNav";
import Header from "~/components/landingPage/Header";
import Footer from "~/components/landingPage/Footer";
import FooterNormal from "~/components/landingPage/FooterNormal";
import { usePathname } from "next/navigation";

const ClientLayout = (props) => {
  const footerVisibility = typeof props.footer == "undefined" ? true : props.footer;
  const [mobileNav, setMobileNav] = useState(false);
  const dimension = useWindowDimensions();
  const pathname = usePathname();

  console.log(pathname, "aaa")

  useEffect(() => {
    if (dimension.width !== 0 && dimension.width <= 991) {
      return setMobileNav(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      {/* {mobileNav ? <MobileNav /> : <Header />} */}
      <Header />
      {/* {mobileNav ? <MobileNav /> : <NavBar />} */}
      <main className={c.main}>{props.children}</main>
      {/* <Footer visibility={footerVisibility} /> */}
      {pathname === "/" ? <Footer/> : <FooterNormal />}
      <ScrollToTop />
      {mobileNav && <FooterMobile />}
    </>
  );
};

export default ClientLayout;
