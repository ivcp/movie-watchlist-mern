import { useState, useMemo, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import utils from '../styles/utils.module.css';
import logo from '../assets/logo.svg';
import { TbMenu2, TbX } from 'react-icons/tb';
import debounce from '../helpers/debounce';

const Layout = () => {
  const location = useLocation();
  const [showNavigation, setShowNavigation] = useState(false);
  const navigationRef = useRef(null);

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
      {/* TODO:add check if !isDesktop */}
      {location.pathname.includes('/movie/') ? null : (
        <header className={styles.header}>
          <img src={logo} alt="watchlist logo" />
          <button className={styles.menu} onClick={handleMenuClick}>
            {showNavigation ? <TbX size={24} /> : <TbMenu2 size={24} />}
            <span className={utils.srOnly}>menu</span>
          </button>
          {showNavigation && (
            <Navigation
              ref={navigationRef}
              setShowNavigation={setShowNavigation}
            />
          )}
          {showNavigation && (
            <div onClick={handleMenuClick} className={styles.overlay}></div>
          )}
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
