import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useMovieList from '../../hooks/useMovieList';
import movieService from '../../services/movies';

const Navigation = () => {
  const { user, setUser, movieList, isSuccess } = useMovieList();
  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
    movieService.resetToken();
    setUser(null);
    toast.info(`${user.name} logged out`);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          {/* //use navlinks */}
          <NavLink to="/">home</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/mymovies">
              my movies{isSuccess ? `(${movieList.length})` : ''}
            </NavLink>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={logOut}>log out</button>
          </li>
        ) : (
          <li>
            <NavLink to="/login">log in</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
