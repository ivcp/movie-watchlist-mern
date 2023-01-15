import React, { useContext } from 'react';
import UserContext from '../../store/user-context';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.removeItem('loggedWatchlistUser');
    ctx.setUser(null);
    //TODO: set notification
    console.log(`${ctx.user.name} logged out`);
  };

  return (
    <nav>
      <ul>
        <li>home</li>
        <li>my movies</li>
        {ctx.user ? (
          <li onClick={logOut}>log out</li>
        ) : (
          <li onClick={() => navigate('/login')}>log in</li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
