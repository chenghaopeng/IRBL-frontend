import openInNewTab from './tab'

export const openWorkspacePath = (path: string) => {
  const entries = path.split('/')
  if (entries.length === 1) {
    path = '/' + path
  } else if (entries.length > 2) {
    path = '/' + entries[1]
  }
  openInNewTab(`http://116.85.66.200:9001/?folder=/root/project${path}`)
}

export const openWorkspace = (gitUrl: string) => {
  openWorkspacePath(getGitReposityName(gitUrl))
}

export const getGitReposityName = (gitUrl: string) => {
  const path = gitUrl.split('/')
  const folder = path[path.length - 1].split('.')[0]
  return folder
}
