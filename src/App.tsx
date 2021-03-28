import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styles from './App.module.scss';
import Login from './pages/Login'

function App() {
  return (
    <div className={styles.whole}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
