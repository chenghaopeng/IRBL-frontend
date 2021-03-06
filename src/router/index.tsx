import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BugLocalization from '../pages/BugLocalization'
import LocalizationRecord from '../pages/LocalizationRecord'
import Login from '../pages/Login'
import RepositoryManage from '../pages/RepositoryManage'

export const routes = [
  {
    name: '登录',
    path: '/',
    component: Login
  },
  {
    name: '缺陷定位',
    path: '/locate',
    component: BugLocalization
  },
  {
    name: '定位记录',
    path: '/record',
    component: LocalizationRecord
  },
  {
    name: '仓库管理',
    path: '/repository',
    component: RepositoryManage,
    admin: true
  }
]

function Router () {
  return (
    <Switch>
      {routes.map(route => <Route exact path={route.path} component={route.component} key={route.name}></Route>)}
    </Switch>
  )
}

export default Router
