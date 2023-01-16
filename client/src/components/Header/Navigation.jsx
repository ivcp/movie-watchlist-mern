import React, { useContext } from 'react';
import UserContext from '../../store/user-context';
import { Link } from 'react-router-dom';
const Navigation = () => {
  const ctx = useContext(UserContext);

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
    ctx.setUser(null);
    //TODO: set notification
    console.log(`${ctx.user.name} logged out`);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        {ctx.user && (
          <li>
            <Link to="/mymovies">my movies</Link>
          </li>
        )}
        {ctx.user ? (
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
