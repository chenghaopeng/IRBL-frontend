import React, { useState } from 'react'
import styles from './index.module.scss'
import MyInput from '../../components/MyInput'
import MyButton from '../../components/MyButton/MyButton'
import { routes } from '../../router'
import { RouterProps, withRouter } from 'react-router-dom'
import Api from '../../utils/api'
import store from '../../utils/store'
import __ from '../../components/MyMessage'

export interface LoginProps extends RouterProps {}

function Login (props: LoginProps) {
  const [login, setLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const handleLogin = () => {
    if (login) {
      Api.user.login({ username, password }).then(({success, content, message}) => {
        if (success) {
          store.set('user', content)
          __(content.username + '，你好呀～！')
          props.history.push(routes[1].path)
        } else {
          __('登录失败！' + message)
        }
      })
    } else {
      if (password !== repeat) {
        __('两次密码输入要一致！')
        return
      }
      Api.user.register({ username, password }).then(({success, content, message}) => {
        if (success) {
          __('注册成功！')
          setLogin(true)
          setRepeat('')
        } else {
          __('注册失败！' + message)
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
        <img src="logo.png" alt="logo" />
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
