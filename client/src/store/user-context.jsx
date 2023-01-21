import { createContext, useEffect, useState } from 'react';
import movieService from '../services/movies';
import jwt_decode from 'jwt-decode';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loginUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWatchlistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const token = jwt_decode(user.token);
      const currentTime = Date.now().valueOf() / 1000;
      if (typeof token.exp !== 'undefined' && token.exp < currentTime) {
        return;
      }
      movieService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const loginUser = user => {
    movieService.setToken(user.token);
    setUser(user);
    window.localStorage.setItem('loggedWatchlistUser', JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
