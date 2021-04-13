import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Api from '../../utils/api'
import $$ from '../../utils/className'
import { Record, RecordListItem } from '../../utils/entity'
import styles from './index.module.scss'

function RecordCard (props: RecordListItem) {
  const [show, setShow] = useState(false)
  const [record, setRecord] = useState<Record>()
  const [timer, setTimer] = useState<any>(0)
  const getRecord = () => {
    Api.record.get({ recordId: props.recordId }).then(({ success, content, message }) => {
      if (success) {
        setRecord(content)
        if (content.state !== 'complete') {
          setTimer(setTimeout(getRecord, 1000))
        }
      } else {
        alert('获取记录失败！' + message)
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
        <div className={styles.id}>{ props.recordId }</div>
        <div className={styles.time}>{ props.queryTime }</div>
        {show && <>
          <div className={styles.state}>
            { record?.state === 'complete' ? '已完成' : record?.state === 'querying' ? '检测中' : '初始化中' }
          </div>
          <FontAwesomeIcon
            className={$$([(record?.state !== 'complete') && 'fa-spin'])}
            icon={record?.state === 'complete' ? faCheck : faRedo}
            color="#9DD3FF"
          />
        </>}
      </div>
      {show && <div className={styles.content}>
        {record?.fileScoreList.length && (
          <div className={styles.item}>
            <div className={styles.file}>文件路径</div>
            <div className={styles.score}>相关度</div>
          </div>
        )}
        {record?.fileScoreList.map(item => (
          <div className={styles.item} key={item.filePath}>
            <div className={styles.file}>{item.filePath}</div>
            <div className={styles.score}>{item.score}</div>
          </div>
        ))}
        <div className={styles.origin}>
          代码来自 { record?.gitUrl } 的 { record?.repoCommitId } 提交 
        </div>
      </div>}
    </div>
  )
}

export default RecordCard
