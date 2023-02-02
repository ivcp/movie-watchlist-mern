import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useMovieList from '../../../hooks/useMovieList';
import movieService from '../../../services/movies';
import styles from './styles.module.css';
import useMediaQuery from '../../../hooks/useMediaQuery';

const Navigation = forwardRef(({ setShowNavigation }, ref) => {
  const { user, setUser, movieList, isSuccess } = useMovieList();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 37.5em)');

  useImperativeHandle(ref, () => ({
    slideOut() {
      navRef.current.classList.add('slideOut');
    },
  }));

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
    movieService.resetToken();
    setUser(null);
    toast.info(`${user.name} logged out`);
    navigate('/');
  };
  const removeMobileNav = () => {
    !isDesktop && setShowNavigation(false);
  };
  return (
    <nav className={styles.nav} ref={navRef}>
      <ul role="list" onClick={removeMobileNav}>
        <li>
          <NavLink to="/" className={styles.link}>
            home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/mymovies"
              className={`${styles.link} ${styles.myMovies}`}
            >
              my movies{' '}
              <div className={styles.numberOfMovies}>
                {isSuccess ? `${movieList.length}` : ''}
              </div>
            </NavLink>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={logOut} className={styles.logOut}>
              log out
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className={styles.link}>
              log in
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
