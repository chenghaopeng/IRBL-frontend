import React, { useState } from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton/MyButton'
import { routes } from '../../router'
import { RouterProps, withRouter } from 'react-router-dom'

export interface LoginProps extends RouterProps {}

function Login (props: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    // TODO 登录
    props.history.push(routes[1].path)
  }
  return (
    <div className={styles.whole}>
      <div className={styles.avatar}>
        <FontAwesomeIcon icon={faUser} color="#69BBFF" size="5x" />
      </div>
      <div className={styles.input}>
        <MyInput placeholder="账号" onChange={setUsername} />
        <MyInput placeholder="密码" password onChange={setPassword} />
      </div>
      <MyButton primary title="登 录" onClick={handleLogin} />
    </div>
  )
}

export default withRouter(Login)
