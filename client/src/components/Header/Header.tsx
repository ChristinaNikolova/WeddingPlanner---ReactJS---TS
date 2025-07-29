import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { displayStyles } from "../../utils/constants/global";

// import HamburgerHeader from "./HamburgerHeader/HamburgerHeader";
import styles from "./Header.module.css";

function Header() {
  const { isAuthenticated, isAdmin } = useAuth();

  //   const ulHamburgerRef = useRef<HTMLElement | null>(null);
  //   const ulRef = useRef<HTMLUListElement | null>(null);
  //   const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.addEventListener("resize", setInitialCssStyles);
    return () => window.removeEventListener("resize", setInitialCssStyles);
  }, []);

  const setNavStyle = ({ isActive }: { isActive: boolean }) => {
    return isActive ? styles["header-active-li"] : undefined;
  };

  const showMenu = () => {
    const ulHamburgerElement = document.getElementsByClassName(
      "header-nav-ul-hamburger"
    )[0] as HTMLElement;
    const ulElement = document.getElementsByTagName("ul")[0];

    if (ulHamburgerElement.style.display === displayStyles.NONE) {
      ulHamburgerElement.style.display = displayStyles.BLOCK;
      ulElement.style.height = "unset";
      ulElement.style.marginBottom = "12px";
      document.getElementsByTagName("header")[0].style.height = "unset";
    } else {
      setInitialCssStyles();
    }
  };

  const setInitialCssStyles = () => {
    (
      document.getElementsByClassName(
        "header-nav-ul-hamburger"
      )[0] as HTMLElement
    ).style.display = displayStyles.NONE;
    document.getElementsByTagName("ul")[0].style.height = "16vh";
    document.getElementsByTagName("header")[0].style.height = "16vh";
  };

  return (
    <header className={styles.header}>
      <nav className={styles["header-nav"]}>
        <ul className={styles["header-nav-ul"]}>
          <li className={styles["header-nav-li"]}>
            <NavLink className={setNavStyle} to="/plan">
              Plan your wedding
            </NavLink>
          </li>
          <li className={styles["header-nav-li"]}>
            <NavLink className={setNavStyle} to="/blog?page=1&category=all">
              Wedding's blog
            </NavLink>
          </li>
          <li className={`${styles["header-nav-li"]} logo gold-underline`}>
            <Link to="/">Wedding Planner</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className={styles["header-nav-li"]}>
                <NavLink className={setNavStyle} to="/user/favourite-article">
                  Favourite
                </NavLink>
              </li>
              {isAdmin && (
                <li className={styles["header-nav-li"]}>
                  <NavLink className={setNavStyle} to="/administration">
                    Administration
                  </NavLink>
                </li>
              )}
              <li className={styles["header-nav-li"]}>
                <NavLink className={setNavStyle} to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className={styles["header-nav-li"]}>
                <NavLink className={setNavStyle} to="/login">
                  Login
                </NavLink>
              </li>
              <li className={styles["header-nav-li"]}>
                <NavLink className={setNavStyle} to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          <li className={styles["header-nav-li-hamburger"]} onClick={showMenu}>
            <i className="fa-solid fa-bars"></i>
          </li>
        </ul>
        {/* <HamburgerHeader
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          setNavStyle={setNavStyle}
          setInitialCssStyles={setInitialCssStyles}
        /> */}
      </nav>
    </header>
  );
}

export default Header;
