import React, { useContext } from 'react';
import UserContext from '../../context/user-context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navigation = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
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
            <Link to="/mymovies">my movies</Link>
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
