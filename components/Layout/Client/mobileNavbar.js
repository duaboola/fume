import { List, Search, XSquare } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageLoader from "~/components/Image";
import c from "./mobileNav.module.css";
import SearchBar from "./searchbar";
import Sidebar from "./sidebar";
import logo from './../../../public/images/logo.png'

export default function MobileNav() {
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const settings = useSelector((state) => state.settings);
  const toggleSidebar = () => setShow(!show);
  const toggleSearchbar = () => setShowSearch(!showSearch);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShow(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className={c.nav}>
        <div className={c.start}>
          <div className={c.brand}>
            <Link className="ps-2" href="/">
              {settings.settingsData.logo[0] && (
                <img
                src={`..${logo.src}`}
                height={40}
                style={{objectFit: 'contain'}}
                alt={'logo'}
              />
              )}
            </Link>
          </div>
          <div className="d-flex align-items-center">
          <button
            className={c.sidebar_button}
            onClick={() => toggleSidebar()}
            title="Menu"
          >
            <List width={51} height={35} />
          </button>
          <div className={c.end}>
            <Search width={25} height={25} onClick={toggleSearchbar} />
          </div>
          </div>
        </div>
      </nav>
      {showSearch && (
        <div className={c.searchbar}>
          <SearchBar />
          <XSquare width={25} height={25} onClick={toggleSearchbar} />
        </div>
      )}
      <Sidebar show={show} toggle={toggleSidebar} />
    </>
  );
}
