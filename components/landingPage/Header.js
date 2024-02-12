import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import $ from "jquery";
import { IMAGES } from "../../public/images/landingPage";
import product from "../../public/images/landingPage/logo.png";
import USER_IMG from "../../public/images/landingPage/user-img.png";
import SEARCH_IMG from "../../public/images/landingPage/search-img.png";
import HEART_IMG from "../../public/images/landingPage/heart-img.png";
import BUY_IMG from "../../public/images/landingPage/buy-img.png";
import { useSelector } from "react-redux";
import logoutIcon from '../../public/images/logoutIcon.png'
import { signOut } from "next-auth/react";
import useSWR from "swr";
import { fetchData } from "~/lib/clientFunctions";

function Header() {
  const { session } = useSelector((state) => state.localSession);
  const { settingsData } = useSelector((state) => state.settings);
  const [std, setStd] = useState(settingsData);
  const cart = useSelector((state) => state.cart);
  const url = `/api/profile?id=${session?.user?.id}`;
  const { data, error, mutate } = useSWR(session?.user?.id ? url : null, fetchData);
  const [wishlist, setWishlist] = useState([]);

  console.log("cart--->>>", { cart });

  useEffect(() => {
    if (data && data.user) {
      setWishlist(data.user.favorite);
    }
  }, [data]);

  useEffect(() => {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 40) {
        $(".navbar").addClass("modify-navbar");
      } else {
        $(".navbar").removeClass("modify-navbar");
      }
    });
  }, []);

  return (
    <Navbar expand="lg" className="header-navbar topHeaderBar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={product.src} alt="logo" className="img-fluid" />
          {/* <Image src={product.src} alt="logo" className="img-fluid" width={200} height={200} /> */}
        </Navbar.Brand>
        <div className="searchBtn d-lg-none">
          <img src={SEARCH_IMG.src} alt="search-img" className="img-fluid" />
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Shop</Nav.Link>
            {/* <Nav.Link href="/about">About</Nav.Link> */}
            <Nav.Link href="/contact">Contact</Nav.Link>
            {session && (session.user.a || session.user.s.status) && (
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            )}
          </Nav>
          <div className="navbar-right">
            {
              session ? (
                <Nav.Link
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="nav-link"
                >
                  <img
                    src={`..${logoutIcon.src}`}
                    width={28}
                    height={30}
                    alt={std.name}
                    className="img-fluid"

                  />
                </Nav.Link>
              ) : (
                <></>
              )
            }
            {!session ?

              <Nav.Link
                href={"/signin"}
              >
                <img
                  src={USER_IMG.src}
                  alt="user-img"
                  className="img-fluid"
                // onClick={() => {

                // }}
                />
              </Nav.Link> : ''}
            <img src={SEARCH_IMG.src} alt="search-img" className="img-fluid" />
            <Nav.Link href="/wishlist" className="cartLink">
              <span>{wishlist?.length ? wishlist?.length : 0}</span>
              <img src={HEART_IMG.src} alt="heart-img" className="img-fluid" />
            </Nav.Link>
            <Nav.Link href="/cart" className="cartLink">
              <span>{cart?.items.length ? cart?.items.length : 0}</span>
              <img src={BUY_IMG.src} alt="buy-img" className="img-fluid" />
            </Nav.Link>
            {
              session ?

                <Nav.Link
                  href={"/profile"}
                >
                  <img
                    src={USER_IMG.src}
                    alt="user-img"
                    className="img-fluid"
                  // onClick={() => {

                  // }}
                  />
                </Nav.Link> : ''
            }

            {/* <Image src={IMAGES.USER_IMG} alt="user-img" className="img-fluid" /> */}
            {/* <Image
              src={IMAGES.SEARCH_IMG}
              alt="search-img"
              className="img-fluid"
            />

            <Image
              src={IMAGES.HEART_IMG}
              alt="heart-img"
              className="img-fluid"
            />
            <Image src={IMAGES.BUY_IMG} alt="buy-img" className="img-fluid" /> */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
