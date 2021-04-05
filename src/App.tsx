import React, { useState } from 'react';
import styles from './App.module.scss';
import Sidebar from './components/Sidebar';
import ToggleMaximal from './components/ToggleMaximal';
import Router from './router';

function App() {
  const [isMaximal, setIsMaximal] = useState(false)
  const base = isMaximal ? 300 : 200
  const style = {
    width: 4 * base + 'px',
    height: 3 * base + 'px'
  }
  return (<>
    <ToggleMaximal onToggle={setIsMaximal} />
    <div className={styles.whole} style={style}>
      <Sidebar />
      <Router />
    </div>
  </>);
}

export default App;
