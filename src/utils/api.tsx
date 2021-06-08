import { Record, RecordListItem, Reposity, User } from "./entity"
import request, { Response } from "./request"

const Api = {
  user: {
    login: (data: { username: string, password: string }) => request('/user/login', data) as Response<User>,
    register: (data: { username: string, password: string }) => request('/user/register', data)
  },
  reposity: {
    list: () => request('/manageRepo/show') as Response<Array<Reposity>>,
    register: (data: { description: string, gitUrl: string }) => request('/manageRepo/register', data),
    update: (data: { description: string, repoId: number }) => request('/manageRepo/modify', data),
    delete: (data: { repoId: number }) => request('/manageRepo/delete', data)
  },
  locate: {
    registered: (data: { bugReport: File, commitId: string }) => request('/queryDefects/uploadRegister', data, true) as Response<string>,
    unregistered: (data: { bugReport: File, sourceCode: File }) => request('/queryDefects/uploadUnRegister', data, true) as Response<string>
  },
  record: {
    list: () => request('/record/getUserAllRecord') as Response<Array<RecordListItem>>,
    get: (data: { recordId: string }) => request('/record/queryRecord', data) as Response<Record>
  }
}

export default Api
