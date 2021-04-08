import React, { useState } from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton/MyButton'
import { routes } from '../../router'
import { RouterProps, withRouter } from 'react-router-dom'
import Api from '../../utils/api'
import store from '../../utils/store'

export interface LoginProps extends RouterProps {}

function Login (props: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    Api.user.login({ username, password }).then(res => {
      if (res.success) {
        store.set('user', res.content)
        alert(res.content.username + '，你好呀～！')
        props.history.push(routes[1].path)
      } else {
        alert('登录失败！' + res.message)
      }
    })
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
