import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationMobile from "../nav/navMobile";
import classes from "./header.module.scss";
import NavModal from "../modal/navModal";
import Navigation from "../nav/nav";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  let domWidth = window.innerWidth;
  const [visible, setIsVisible] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handlerMobilemenu = () => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    setIsVisible(true);
    console.log(visible);
  };

  useEffect(() => {
    const isSticky = () => {
      if (window.scrollY >= 107) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <header className={sticky ? classes.sticky : classes.header}>
      <div className={classes.header__container}>
        {(domWidth >= 767 && <Navigation />) ||
          (domWidth <= 767 && !visible && <NavigationMobile />)}
        {domWidth <= 767 && !visible
          ? !visible && (
              <div className={classes.header__bars__container}>
                <FontAwesomeIcon
                  onClick={handlerMobilemenu}
                  style={{ color: "white", font: "20px", cursor: "pointer" }}
                  icon={solid("bars")}
                />
              </div>
            )
          : visible && (
              <>
                <NavigationMobile />
                <div className={classes.header__bars__container}>
                  <FontAwesomeIcon
                    onClick={handlerMobilemenu}
                    style={{ color: "white", font: "20px", cursor: "pointer" }}
                    icon={solid("bars")}
                  />
                </div>
                <NavModal />
              </>
            )}
      </div>
    </header>
  );
};

export default Header;
