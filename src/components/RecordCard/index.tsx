import { faCheck, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
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

function RecordCard (props: RecordListItem) {
  const [show, setShow] = useState(false)
  const [record, setRecord] = useState<Record>()
  const [timer, setTimer] = useState<any>(0)
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
      {show && record && <div className={styles.content}>
        {record.fileScoreList && record.fileScoreList.length && (
          <>
            <div className={styles.item}>
              <div className={styles.file}>文件路径</div>
              <div className={styles.score}>相关度</div>
            </div>
            {record.fileScoreList.map(item => (
              <div className={styles.item} key={item.filePath}>
                <div className={styles.file}>{item.filePath}</div>
                <div className={styles.score}>{item.score}</div>
              </div>
            ))}
          </>
        )}
        <div className={styles.origin}>
          <div>{record.gitUrl ? `代码来自 ${getGitReposityName(record.gitUrl)} 的 ${record?.repoCommitId.substring(0, 8)} 提交` : '代码来自上传的压缩包'}</div>
          {record.gitUrl && <MyButton title="工作区" onClick={() => openWorkspace(record.gitUrl)} />}
        </div>
      </div>}
    </div>
  )
}

export default RecordCard
