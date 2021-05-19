import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home                           from './pages/Home';
import Products                       from './pages/Products';
import Container                      from 'react-bootstrap/Container';
import Pricing2                       from './pages/Pricing2';
import Orders                         from './pages/Orders';
import Success                        from './pages/Success'; 
import Canceled                       from './pages/Canceled';
import SignUpPage                     from './pages/SignUpPage';
import Header                         from './components/Header';
import { UserContext, StateProvider } from './context/ContextProvider';
import { useAuth } from './hooks/auth-hook';
import reducer, { initialState} from './hooks/reducer';
import './App.css'; 

function App() {
  const {login, logout, token, userId, firstname, lastname, username}= useAuth();
  return (
    <UserContext.Provider value={{
      userId,
      firstname,
      lastname,
      username,
      token,
      login,
      logout
    }}>
      <StateProvider reducer={reducer} initialState={initialState} >
      <Router>
        <div className="App">
          <Switch>
            <Route path='/home'> 
              <Container fluid>
              <Header/>
              <Home/>
              </Container>
            </Route>
            <Route path='/success'>
              <Header/>
              <Success />
            </Route>
            <Route path='/canceled'>
              <Header/>
              <Canceled />
            </Route>
            <Route path='/pricing2'>
              <Header/>
              <Pricing2 />
            </Route>
            <Route path='/orders/:userId'>
              <Header/>
              <Orders/>
            </Route>
            <Route path='/signup'>
              <Header/>
              <SignUpPage />
            </Route>
            <Route path='/products'>
              <Header/>
              <Products />
            </Route>
            <Route path='/'>
            <Container fluid>
              <Header/>
              <Home/>
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
      </StateProvider>
    </UserContext.Provider>
  );
}

export default App;
