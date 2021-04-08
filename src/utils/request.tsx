export type Response<T = any> = Promise<{
  content: T;
  message: string;
  success: boolean;
}>

const server = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4523/mock/381746' : 'http://116.85.66.200:8080'

function request (url: string, data: any = {}, multiPart: boolean = false) {
  const headers = new Headers()
  headers.append('Content-Type', multiPart ? 'multipart/form-data' : 'application/json')
  if (multiPart) {
    headers.append('Content-Type', 'multipart/form-data')
    data = (() => {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      return formData
    })()
  } else {
    headers.append('Content-Type', 'application/json')
    data = JSON.stringify(data)
  }
  return fetch(server + url, {
    method: 'POST',
    body: data,
    headers
  }).then(res => res.json() as Response)
}

export default request
