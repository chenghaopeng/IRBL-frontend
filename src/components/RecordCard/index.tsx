import { faArrowUp, faBars, faCheck, faFolder, faFolderOpen, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, MouseEvent, CSSProperties } from 'react'
import Api from '../../utils/api'
import $$ from '../../utils/className'
import { Record, RecordListItem } from '../../utils/entity'
import styles from './index.module.scss'
import __ from '../MyMessage'
import MyButton from '../MyButton/MyButton'
import { getGitReposityName, openWorkspace } from '../../utils/workspace'

const DescOfState = {
  preprocessing: '预处理',
  querying: '定位中',
  fail: '错误',
  complete: '完成',
}

const IconOfState = {
  preprocessing: faRedo,
  querying: faRedo,
  fail: faTimes,
  complete: faCheck
}

const SpinOfState = {
  preprocessing: true,
  querying: true,
  fail: false,
  complete: false
}

export type RecordCardProps = {
  hook?: (code: string) => void;
} & RecordListItem

function RecordCard (props: RecordCardProps) {
  const [show, setShow] = useState(false)
  const [record, setRecord] = useState<Record>()
  const [timer, setTimer] = useState<any>(0)
  const [tree, setTree] = useState(false)
  const [prefix, setPrefix] = useState('/')
  const getRecord = () => {
    Api.record.get({ recordId: props.recordId }).then(({ success, content, message }) => {
      if (success) {
        setRecord(content)
        if (SpinOfState[content.queryRecordState]) {
          setTimer(setTimeout(getRecord, 1000))
        }
      } else {
        __('获取记录失败！' + message)
      }
    })
  }
  const handleToggle = () => {
    if (show) {
      setShow(false)
      clearTimeout(timer)
    } else {
      setShow(true)
      getRecord()
    }
  }
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { path, folder } = (e.target as HTMLDivElement).dataset
    if (!path || !record) {
      return
    }
    if (folder === 'true') {
      setPrefix(prefix + path + '/')
    } else {
      const [func, id] = record.repoCommitId ? [Api.repository.file, record.repoCommitId] : [Api.record.file, record.id]
      const truePath = tree ? (prefix + path) : path
      func(id, truePath).then(res => {
        if (res.success) {
          props.hook && props.hook(`/*\n  ${truePath}\n*/\n\n${res.content}`)
        } else {
          __('出现了一些小问题，' + res.message)
        }
      })
    }
  }
  const handleToggleMode = () => {
    setTree(!tree)
  }
  let fileList = [] as Array<{filePath: string, score: number, folder: boolean}>
  if (record?.fileScoreList && record.fileScoreList.length) {
    if (tree) {
      const prefixEntries = prefix.split('/')
      const folderList = [] as string[]
      fileList = record.fileScoreList
        .filter(file => file.filePath.startsWith(prefix))
        .filter(file => {
          const fileEntries = file.filePath.split('/')
          if (prefixEntries.length !== fileEntries.length) {
            folderList.push(fileEntries[prefixEntries.length - 1])
            return false
          }
          return true
        })
        .map(file => {
          const fileEntries = file.filePath.split('/')
          return {
            filePath: fileEntries[prefixEntries.length - 1],
            score: file.score,
            folder: false
          }
        })
      fileList = (Array.from(new Set(folderList)).map(folder => ({
        filePath: folder,
        score: 0,
        folder: true
      }))).concat(fileList)
    } else {
      fileList = record.fileScoreList.map(file => ({ ...file, folder: false }))
    }
  }
  const handleTreeUp = () => {
    if (prefix !== '/') {
      const entries = prefix.split('/')
      entries.pop()
      entries.pop()
      entries.push('')
      setPrefix(entries.join('/'))
    }
  }
  return (
    <div className={$$([styles.whole, show && styles.active])}>
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.id}>{ props.name || props.recordId}</div>
        <div className={styles.time}>{ new Date(props.queryTime).toLocaleString() }</div>
        {show && record && <>
          <div className={styles.state}>
            { DescOfState[record.queryRecordState] }
          </div>
          <FontAwesomeIcon
            className={$$([SpinOfState[record.queryRecordState] && 'fa-spin'])}
            icon={IconOfState[record.queryRecordState]}
            color="#9DD3FF"
          />
        </>}
      </div>
      {show && record && <div className={styles.content} onClick={handleClick}>
        { fileList.length > 0 && 
          <div className={styles.control}>
            <FontAwesomeIcon icon={faBars} size="lg" className={$$([styles.mode, !tree && styles.checked])} onClick={handleToggleMode} />
            <FontAwesomeIcon icon={faFolder} size="lg" className={$$([styles.mode, tree && styles.checked])} onClick={handleToggleMode} />
            {tree && <>
              <div className={styles.path}>
                <div className={styles.prefix}>
                  { prefix }
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowUp} size="lg" className={styles.mode} onClick={handleTreeUp} />
            </>}
          </div>
        }
        {fileList.map((item, index) => (
            <div
              className={styles.item}
              key={item.filePath}
              data-path={item.filePath}
              data-folder={item.folder}
              style={{
                '--size': item.score * 100 + '%',
                '--opacity': 0.2 + item.score * 0.8,
                '--delay': index * 0.05 + 's'
              } as CSSProperties }
            >
              {tree && item.folder && <FontAwesomeIcon icon={faFolderOpen} size="sm" color="#69BBFF" style={{transform: 'translateX(-4px)'}} />}
              {item.filePath}
            </div>
          ))
        }
        <div className={styles.origin}>
          <div>{record.gitUrl ? `代码来自 ${getGitReposityName(record.gitUrl)} 的 ${record?.repoCommitId.substring(0, 8)} 提交` : '代码来自上传的压缩包'}</div>
          {record.gitUrl && <MyButton title="工作区" onClick={() => openWorkspace(record.gitUrl)} />}
        </div>
      </div>}
    </div>
  )
}

export default RecordCard
