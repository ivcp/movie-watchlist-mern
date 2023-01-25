import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useMovieList from '../../hooks/useMovieList';
import movieService from '../../services/movies';

const Navigation = () => {
  const { user, setUser, movieList, isSuccess } = useMovieList();
  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
    movieService.resetToken();
    setUser(null);
    //TODO: set notification
    console.log(`${user.name} logged out`);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          {/* //use navlinks */}
          <Link to="/">home</Link>
        </li>
        {user && (
          <li>
            <Link to="/mymovies">
              my movies{isSuccess ? `(${movieList.length})` : ''}
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={logOut}>log out</button>
          </li>
        ) : (
          <li>
            <Link to="/login">log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
