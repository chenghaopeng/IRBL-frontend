import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Api from '../../utils/api'
import $$ from '../../utils/className'
import { Record, RecordListItem } from '../../utils/entity'
import styles from './index.module.scss'

function RecordCard (props: RecordListItem) {
  const [show, setShow] = useState(false)
  const [record, setRecord] = useState<Record>()
  const getRecord = () => {
    if (!show) {
      return
    }
    Api.record.get({ recordId: props.recordId }).then(({ success, content }) => {
      if (success) {
        setRecord(content)
      } else {
        alert('获取记录失败！' + content)
      }
    })
  }
  useEffect(getRecord, [props, show])
  return (
    <div className={$$([styles.whole, show && styles.active])}>
      <div className={styles.header} onClick={() => setShow(!show)}>
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
        <div className={styles.origin}>
          代码来自 { record?.gitUrl } 的 { record?.repoCommitId } 提交 
        </div>
      </div>}
    </div>
  )
}

export default RecordCard
