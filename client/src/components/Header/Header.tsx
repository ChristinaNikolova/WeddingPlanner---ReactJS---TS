import { useCallback, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import HamburgerHeader from "./HamburgerHeader/HamburgerHeader";
import { useAuth } from "../../hooks/useAuth";
import { displayStyles } from "../../utils/constants/global";
import styles from "./Header.module.css";

const Header = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const ulHamburgerRef = useRef<HTMLUListElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const setInitialCssStyles = useCallback(() => {
    if (ulHamburgerRef.current) {
      ulHamburgerRef.current.style.display = displayStyles.NONE;
    }

    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      if (ulRef.current) {
        ulRef.current.style.height = "3vh";
      }
      if (headerRef.current) {
        headerRef.current.style.height = "3vh";
      }
    } else {
      if (ulRef.current) {
        ulRef.current.style.height = "16vh";
      }
      if (headerRef.current) {
        headerRef.current.style.height = "16vh";
      }
    }
  }, []);

  useEffect(() => {
    setInitialCssStyles();
    window.addEventListener("resize", setInitialCssStyles);
    return () => window.removeEventListener("resize", setInitialCssStyles);
  }, [setInitialCssStyles]);

  const setNavStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }): string | undefined => {
    return isActive ? styles["header-active-li"] : undefined;
  };

  const showMenu = (): void => {
    if (!ulHamburgerRef.current || !ulRef.current || !headerRef.current) return;

    if (ulHamburgerRef.current.style.display === displayStyles.NONE) {
      ulHamburgerRef.current.style.display = displayStyles.BLOCK;
      ulRef.current.style.height = "unset";
      ulRef.current.style.marginBottom = "12px";
      headerRef.current.style.height = "unset";
    } else {
      setInitialCssStyles();
    }
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles["header-nav"]}>
        <ul ref={ulRef} className={styles["header-nav-ul"]}>
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
        <HamburgerHeader
          ref={ulHamburgerRef}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          setNavStyle={setNavStyle}
          setInitialCssStyles={setInitialCssStyles}
        />
      </nav>
    </header>
  );
};

export default Header;
