import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import RecordCard from '../../components/RecordCard'
import Api from '../../utils/api'
import { RecordListItem } from '../../utils/entity'
import styles from './index.module.scss'

function LocalizationRecord () {
  const [records, setRecords] = useState<Array<RecordListItem>>([])
  const getRecords = () => {
    Api.record.list().then(({ success, content, message }) => {
      if (success) {
        setRecords(content)
      } else {
        alert('获取记录列表失败！' + message)
      }
    })
  }
  useEffect(getRecords, [])
  return (
    <div className={styles.whole}>
      <PageHeader title="定位记录" onRefresh={getRecords} />
      {records.map(record => <RecordCard {...record} key={record.recordId} />)}
    </div>
  )
}

export default LocalizationRecord
