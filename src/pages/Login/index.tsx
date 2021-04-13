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
  const [login, setLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const handleLogin = () => {
    if (login) {
      Api.user.login({ username, password }).then(res => {
        if (res.success) {
          store.set('user', res.content)
          alert(res.content.username + '，你好呀～！')
          props.history.push(routes[1].path)
        } else {
          alert('登录失败！' + res.content)
        }
      })
    } else {
      if (password !== repeat) {
        alert('两次密码输入要一致！')
        return
      }
      Api.user.register({ username, password }).then(res => {
        if (res.success) {
          alert('注册成功！')
          setLogin(true)
          setRepeat('')
        } else {
          alert('注册失败！' + res.content)
        }
      })
    }
  }
  const loginText = (flag: boolean) => {
    return flag === login ? '登 录' : '注 册'
  }
  return (
    <div className={styles.whole}>
      <div className={styles.avatar}>
        <FontAwesomeIcon icon={faUser} color="#69BBFF" size="5x" />
      </div>
      <div className={styles.input}>
        <MyInput placeholder="账号" value={username} onChange={setUsername} />
        <MyInput placeholder="密码" password value={password} onChange={setPassword} />
        {login || <MyInput placeholder="重复密码" password value={repeat} onChange={setRepeat} />}
      </div>
      <div className={styles.control}>
        <MyButton primary title={loginText(true)} onClick={handleLogin} />
        <MyButton title={loginText(false)} onClick={() => setLogin(!login)} />
      </div>
    </div>
  )
}

export default withRouter(Login)
