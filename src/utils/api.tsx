import request, { Response } from "./request"

const Api = {
  user: {
    login: (data: { username: string, password: string }) => request('/user/login', data) as Response<{
      username: string;
      role: 'Admin' | 'Developer';
      queryNum: number;
      token: string;
    }>,
    register: (data: { username: string, password: string }) => request('/user/register', data)
  },
  reposity: {
    list: () => request('/manageRepo/show') as Response<Array<{
      id: number;
      gitUrl: string;
      description: string;
      state: 'Dev' | 'Abandon';
      queryNum: number;
      startTime: string;
      endTime: string;
    }>>,
    register: (data: { description: string, gitUrl: string }) => request('/manageRepo/register', data),
    update: (data: { description: string, id: number }) => request('/manageRepo/modify', data),
    delete: (data: { repoId: number }) => request('/manageRepo/delete', data)
  },
  locate: {
    registered: (data: { bugReport: File, commitId: string }) => request('/queryDefects/uploadRegister', data, true) as Response<string>,
    unregistered: (data: { bugReport: File, sourceCode: File }) => request('/queryDefects/uploadUnRegister', data, true) as Response<string>
  },
  record: {
    list: () => request('/record/getUserAllRecord') as Response<Array<{
      recordId: number;
      queryTime: string;
    }>>,
    get: (data: { recordId: string }) => request('/record/queryRecord', data) as Response<{
      id: number;
      repoCommitId: string;
      userId: number;
      gitUrl: string;
      fileScoreList: Array<{
        score: number;
        filepath: string;
      }>;
      queryTime: string;
      state: 'initializing' | 'querying' | 'complete';
    }>
  }
}

export default Api
