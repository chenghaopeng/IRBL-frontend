import React from 'react';
import styles from './App.module.scss';
import Sidebar from './components/Sidebar';
import Router from './router';

function App() {
  return (
    <div className={styles.whole}>
      <Sidebar />
      <Router />
    </div>
  );
}

export default App;
