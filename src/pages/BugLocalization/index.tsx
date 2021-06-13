import React, { useRef, useState } from 'react'
import { RouterProps } from 'react-router'
import Dropbox, { DropboxRef } from '../../components/Dropbox'
import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput'
import MyList, { MyListItem } from '../../components/MyList'
import __ from '../../components/MyMessage'
import MyModal, { MyModalRef } from '../../components/MyModal'
import Api from '../../utils/api'
import { getGitReposityName } from '../../utils/workspace'
import styles from './index.module.scss'

function BugLocalization (props: RouterProps) {
  const [report, setReport] = useState(null)
  const [archive, setArchive] = useState(null)
  const [commitId, setCommitId] = useState('')
  const dropbox1 = useRef<DropboxRef>(null)
  const dropbox2 = useRef<DropboxRef>(null)
  const selectCommitIdRef = useRef<MyModalRef>(null)
  const [repositories, setRepositories] = useState<Array<MyListItem>>([])
  const [commits, setCommits] = useState<Array<MyListItem>>([])
  const [selectedCommitId, setSelectedCommitId] = useState('')
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
      __('请选择缺陷报告哦！')
      return
    }
    if (!commitId && !archive) {
      __('请选输入 Commit ID 或选择代码包哦！')
      return
    }
    if (commitId && archive) {
      __('Commit ID 和代码压缩包选一个就行啦！')
      return
    }
    (commitId ? Api.locate.registered({ bugReport: report as any, commitId}) : Api.locate.unregistered({ bugReport: report as any, sourceCode: archive as any }))
    .then(({ content, success, message }) => {
      if (success) {
        __('上传成功了！这次检测的 ID 为 ' + content)
        props.history.push('/record')
      } else {
        __('出了什么问题呢？' + message)
      }
    })
  }
  const handleClear = () => {
    setCommitId('')
    dropbox1.current?.clear()
    dropbox2.current?.clear()
  }
  const showSelectCommitId = () => {
    Api.repository.list().then(res => {
      if (res.success) {
        setRepositories(res.content.map(repository => ({
          title: getGitReposityName(repository.gitUrl),
          value: repository.id
        })))
      } else {
        __(res.message)
      }
    })
    selectCommitIdRef.current?.open()
  }
  const handleSelectRepository = (id: string | number) => {
    Api.repository.commitList(id as number).then(res => {
      if (res.success) {
        setCommits(res.content.map(commit => ({
          title: `${commit.commitId} (${commit.time}): ${commit.message}`,
          value: commit.commitId
        })))
      } else {
        __(res.message)
      }
    })
  }
  const handleSelectCommit = (commitId: string | number) => {
    setSelectedCommitId(commitId as string)
  }
  const handleSelectCommitOk = () => {
    if (selectedCommitId) {
      setCommitId(selectedCommitId)
      setSelectedCommitId('')
    } else {
      __('请先选择一个提交！')
      return false
    }
  }
  const handleSelectCommitClose = () => {
    setRepositories([])
    setCommits([])
    setSelectedCommitId('')
  }
  return (
    <div className={styles.whole}>
      <Dropbox ref={dropbox1} title="在这里上传你的缺陷报告" extension={['txt']} onChange={handleGetReport} />
      <div className={styles.code}>
        <div className={styles.control}>
          <MyInput placeholder="代码对应的 Commit ID" onChange={handleGetCommitId} value={commitId} />
          <MyButton title="选 择" onClick={showSelectCommitId} />
          <div></div>
          <MyButton primary title="检 测" onClick={handleSubmit} />
          <MyButton title="重 置" onClick={handleClear} />
        </div>
        <Dropbox ref={dropbox2} icon={1} title="或者在这里上传你的代码包" extension={['zip']} onChange={handleGetArchive} />
      </div>
      <MyModal ref={selectCommitIdRef} onOk={handleSelectCommitOk} onClose={handleSelectCommitClose}>
        <div className={styles.commit}>
          <span>选择仓库</span>
          <span>选择提交</span>
          <MyList data={repositories} onSelect={handleSelectRepository} />
          <MyList data={commits} onSelect={handleSelectCommit} />
        </div>
      </MyModal>
    </div>
  )
}

export default BugLocalization
