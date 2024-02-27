import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import PrepareMainLayout from './components/Layout/MainLayout';
import SignInLayer from './components/Layout/SignIn/SignInLayer';
import SignUpLayer from './components/Layout/SignUp/SignUpLayer';
import UserComponent from './components/UserComponents/UserComponent';
import CookieService from './services/cookiesService';

function App() {

  const goToMainPage = (Component) => {
    const cookiesService = new CookieService();
    const token = cookiesService.getCookie("token");
    if (!token || token.length === 0) {
      return <SignInLayer/>
    }
    return Component;
  }

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path='/'  element={<PrepareMainLayout/>}></Route>
              <Route path='/sign_in'  Component={SignInLayer}>Sign in</Route>
              <Route path='/sign_up' Component={SignUpLayer}>Sign up</Route>
              <Route path='/main_page' Component={ () => goToMainPage(<UserComponent/>)}> </Route>
            </Routes>      
          </BrowserRouter>
        </header>
      </div>
    </Provider>
  );
}

export default App;
