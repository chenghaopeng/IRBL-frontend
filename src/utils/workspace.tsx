import { server } from './request'
import openInNewTab from './tab'

export const openWorkspace = (type: string, id: string | number) => {
  openInNewTab(`${server}/workspace?${type}=${id}`)
}

export const getGitReposityName = (gitUrl: string) => {
  const path = gitUrl.split('/')
  const folder = path[path.length - 1].split('.')[0]
  return folder
}
