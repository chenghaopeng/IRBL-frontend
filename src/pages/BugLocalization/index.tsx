import React, { useRef, useState } from 'react'
import Dropbox, { DropboxRef } from '../../components/Dropbox'
import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput'
import Api from '../../utils/api'
import styles from './index.module.scss'

function BugLocalization () {
  const [report, setReport] = useState(null)
  const [archive, setArchive] = useState(null)
  const [commitId, setCommitId] = useState('')
  const dropbox1 = useRef<DropboxRef>(null)
  const dropbox2 = useRef<DropboxRef>(null)
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
    if (commitId && archive) {
      alert('Commit ID 和代码压缩包选一个就行啦！')
      return
    }
    (commitId ? Api.locate.registered({ bugReport: report as any, commitId}) : Api.locate.unregistered({ bugReport: report as any, sourceCode: archive as any }))
    .then(({ content, success, message }) => {
      if (success) {
        alert('上传成功了！这次检测的 ID 为 ' + content)
      } else {
        alert('出了什么问题呢？' + message)
      }
    })
  }
  const handleClear = () => {
    setCommitId('')
    dropbox1.current?.clear()
    dropbox2.current?.clear()
  }
  return (
    <div className={styles.whole}>
      <Dropbox ref={dropbox1} title="在这里上传你的缺陷报告" extension={['txt']} onChange={handleGetReport} />
      <div className={styles.code}>
        <div className={styles.control}>
          <MyInput placeholder="代码对应的 Commit ID" onChange={handleGetCommitId} value={commitId} />
          <div></div>
          <MyButton primary title="检 测" onClick={handleSubmit} />
          <MyButton title="重 置" onClick={handleClear} />
        </div>
        <Dropbox ref={dropbox2} icon={1} title="或者在这里上传你的代码包" extension={['zip']} onChange={handleGetArchive} />
      </div>
    </div>
  )
}

export default BugLocalization
