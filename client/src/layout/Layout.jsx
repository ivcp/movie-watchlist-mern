import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import utils from '../styles/utils.module.css';
import logo from '../assets/logo.svg';
import { TbMenu2 } from 'react-icons/tb';

const Layout = () => {
  const location = useLocation();
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <>
      {/* TODO:add check if !isDesktop */}
      {location.pathname.includes('/movie/') ? null : (
        <header className={styles.header}>
          <img src={logo} alt="watchlist logo" />
          <button
            className={styles.menu}
            onClick={() => setShowNavigation(prev => !prev)}
          >
            <TbMenu2 size={24} />
            <span className={utils.srOnly}>menu</span>
          </button>
          {showNavigation && <Navigation />}
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
