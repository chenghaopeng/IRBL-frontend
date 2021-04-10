import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Sidebar from './components/Sidebar';
import ToggleMaximal from './components/ToggleMaximal';
import Router from './router';
import store from './utils/store';

function App() {
  const [isMaximal, setIsMaximal] = useState(false)
  const base = isMaximal ? 300 : 200
  const style = {
    width: 4 * base + 'px',
    height: 3 * base + 'px'
  }
  const handleToggle = (value: boolean) => {
    setIsMaximal(value)
    store.set('maximal', value)
  }
  useEffect(() => {
    const unsubscribe = store.subscribe((data: { maximal: boolean }) => {
      setIsMaximal(data.maximal)
    })
    return () => unsubscribe()
  }, [])
  return (<>
    <ToggleMaximal value={isMaximal} onToggle={handleToggle} />
    <div className={styles.whole} style={style}>
      <Sidebar />
      <Router />
    </div>
  </>);
}

export default App;
