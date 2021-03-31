import React, { useState } from 'react'
import Dropbox from '../../components/Dropbox'
import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput'
import styles from './index.module.scss'

function BugLocalization () {
  const [report, setReport] = useState(null)
  const [archive, setArchive] = useState(null)
  const [commitId, setCommitId] = useState('')
  const handleGetReport = (f: any) => {
    setReport(f)
  }
  const handleGetArchive = (f: any) => {
    setArchive(f)
  }
  const handleGetCommitId = (value: string) => {
    setCommitId(value.trim())
  }
  const handleSubmit = () => {
    if (!report) {
      alert('请选择缺陷报告哦！')
      return
    }
    if (!commitId && !archive) {
      alert('请选输入 Commit ID 或选择代码包哦！')
      return
    }
    const form = new FormData()
    form.append('bugReport', report as any)
    form.append('sourceCode', archive as any)
    form.append('commitID', commitId)
    const headers = new Headers()
    headers.append('Content-Type', 'multipart/form-data')
    fetch('/', {
      method: 'POST',
      headers,
      body: form
    })
  }
  return (
    <div className={styles.whole}>
      <Dropbox title="在这里上传你的缺陷报告" extension={['txt']} onFile={handleGetReport} />
      <div className={styles.code}>
        <div className={styles.control}>
          <MyInput placeholder="代码对应的 Commit ID" onChange={handleGetCommitId} />
          <div></div>
          <MyButton primary title="检 测" onClick={handleSubmit} />
          <MyButton title="重 置" />
        </div>
        <Dropbox icon={1} title="或者在这里上传你的代码包" extension={['zip', '7z']} onFile={handleGetArchive} />
      </div>
    </div>
  )
}

export default BugLocalization
