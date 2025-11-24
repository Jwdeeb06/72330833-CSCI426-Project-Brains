import React, { createContext, useState, useContext } from 'react';
// create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
// simple login function to have cardinalities 
  const login = (username, password) => {

    if (username === 'jawaddeeb' && password === '123456') {
      setUser({ username });
      return true;
    }
    return false;
  };
  // clear user info on logout
  const logout = () => {
    setUser(null);
  };
// share user, login and logout across app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//  hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};