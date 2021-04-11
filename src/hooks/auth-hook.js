import {useState, useEffect, useCallback} from 'react';
let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [username, setUsername] = useState(false);
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false)
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const login = useCallback((uid, token,  username, firstname, lastname, expirationDate) => {
      if(!uid){
        return; 
      }
      setUserId(uid);
      setToken(token);
      setUsername(username);
      setFirstname(firstname);
      setLastname(lastname);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 );
       setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({ userId: uid, username: username, firstname: firstname, lastname: lastname,  token: token, expiration:tokenExpirationDate.toISOString() })
      );
    }, []);
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
    useEffect(() => {
        if(token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }else {
            clearTimeout(logoutTimer); 
        }
    }, [token, logout, tokenExpirationDate])
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
        login(storedData.userId, storedData.token, storedData.username, storedData.firstname, storedData.lastname,  new Date(storedData.expiration));
      }
    }, [login]);
    return {login, logout, token, userId, username, firstname, lastname};
}