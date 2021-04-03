import request from "./request"

const Api = {
  user: {
    login: (data: { username: string, password: string }) => request('/user/login', data),
    register: (data: { username: string, password: string }) => request('/user/register', data)
  },
  reposity: {
    list: () => request('/manageRepo/show'),
    register: (data: { description: string, gitUrl: string }) => request('/manageRepo/register', data),
    update: (data: { description: string, id: number }) => request('/manageRepo/modify', data),
    delete: (data: { repoId: number }) => request('/manageRepo/delete', data)
  },
  locate: {}
}

export default Api
