import { createContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  loginUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //TODO:check local state on load
  const loginUser = user => {
    setUser(user);
    window.localStorage.setItem('loggedWatchlistUser', JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
