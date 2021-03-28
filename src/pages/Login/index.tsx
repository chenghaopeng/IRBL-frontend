import React from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Login () {
  return (
    <div className={styles.whole}>
      <FontAwesomeIcon icon={faUser} />
    </div>
  )
}

export default Login
