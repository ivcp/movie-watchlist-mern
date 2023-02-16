import { useState, useMemo, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import utils from '../styles/utils.module.css';
import logo from '../assets/logo.svg';
import logoDektop from '../assets/logo-desktop.svg';
import { TbMenu2, TbX } from 'react-icons/tb';
import debounce from '../helpers/debounce';
import useMediaQuery from '../hooks/useMediaQuery';

const Layout = () => {
  const location = useLocation();
  const [showNavigation, setShowNavigation] = useState(false);
  const navigationRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 37.5em)');
  const debounceCloseMenu = useMemo(
    () => debounce(() => setShowNavigation(false), 400),
    []
  );
  const handleMenuClick = () => {
    if (!showNavigation) {
      setShowNavigation(true);
      return;
    }
    navigationRef.current.slideOut();
    debounceCloseMenu();
  };

  return (
    <>
      {location.pathname.includes('/movie/') && !isDesktop ? null : (
        <header className={styles.header}>
          <Link to="/">
            <img src={isDesktop ? logoDektop : logo} alt="watchlist logo" />
          </Link>
          {!isDesktop && (
            <button className={styles.menu} onClick={handleMenuClick}>
              {showNavigation ? <TbX size={24} /> : <TbMenu2 size={24} />}
              <span className={utils.srOnly}>menu</span>
            </button>
          )}
          {showNavigation && !isDesktop && (
            <Navigation
              ref={navigationRef}
              setShowNavigation={setShowNavigation}
            />
          )}
          {showNavigation && !isDesktop && (
            <div onClick={handleMenuClick} className={styles.overlay}></div>
          )}
          {isDesktop && <Navigation />}
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
