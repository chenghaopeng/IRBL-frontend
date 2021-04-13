import React from 'react'
import { RouterProps, withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../router'
import store from '../../utils/store'
import { User } from '../../utils/entity'
import $$ from '../../utils/className'

export interface SidebarProps extends RouterProps {}

const ignorePath = ['/']

function Sidebar (props: SidebarProps) {
  const { pathname } = props.history.location
  const hidden = ignorePath.includes(pathname)
  const handleRouteClick = (path: string) => {
    props.history.push(path)
  }
  const handleExit = () => {
    props.history.push(routes[0].path)
    store.remove('user')
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
      {routes.filter(({ path, admin }) => {
        if (ignorePath.includes(path)) return false
        if (admin && (store.get('user') as User)?.role !== 'Admin') return false
        return true
      }).map(({ path, name }) => (
        <div key={name} className={$$([styles.entry, pathname === path && styles.active])} onClick={handleRouteClick.bind(null, path)}>
          <div className={styles.name}>{name}</div>
        </div>
      ))}
      <div className={styles.exit} onClick={handleExit}>退出</div>
    </div>
  )
}

export default withRouter(Sidebar)
