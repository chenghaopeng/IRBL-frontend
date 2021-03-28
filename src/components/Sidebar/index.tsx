import React from 'react'
import { RouterProps, withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../router'

export interface SidebarProps extends RouterProps {}

const ignorePath = ['/']

function Sidebar (props: SidebarProps) {
  const { pathname } = props.history.location
  const hidden = ignorePath.includes(pathname)
  const handleRouteClick = (path: string) => {
    props.history.push(path)
  }
  const handleExit = () => {
    // TODO: 退出登录
    props.history.push(routes[0].path)
  }
  return (
    <div className={`${styles.whole} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <FontAwesomeIcon icon={faUser} color="#69BBFF" size="2x" />
        </div>
        <div className={styles.name}>
          皮鼓打
        </div>
      </div>
      {routes.filter(({path}) => !ignorePath.includes(path)).map(({path, name}) => (
        <div className={`${styles.entry} ${pathname === path ? styles.active : ''}`} onClick={handleRouteClick.bind(null, path)}>
          <div className={styles.name}>{name}</div>
        </div>
      ))}
      <div className={styles.exit} onClick={handleExit}>退出</div>
    </div>
  )
}

export default withRouter(Sidebar)
