import { useEffect, useRef, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import RecordCard from '../../components/RecordCard'
import Api from '../../utils/api'
import { RecordListItem } from '../../utils/entity'
import styles from './index.module.scss'
import __ from '../../components/MyMessage'
import CodeDrawer, { CodeDrawerRef } from '../../components/CodeDrawer'

function LocalizationRecord () {
  const [records, setRecords] = useState<Array<RecordListItem>>([])
  const codeDrawerRef = useRef<CodeDrawerRef>(null)
  const getRecords = () => {
    Api.record.list().then(({ success, content, message }) => {
      if (success) {
        setRecords(content.sort((a, b) => (new Date(b.queryTime).getTime() - new Date(a.queryTime).getTime())))
      } else {
        __('获取记录列表失败！' + message)
      }
    })
  }
  useEffect(getRecords, [])
  return (
    <div className={styles.whole}>
      <PageHeader title="定位记录" onRefresh={getRecords} />
      {records.map(record => <RecordCard {...record} key={record.recordId} hook={codeDrawerRef.current?.open} />)}
      <CodeDrawer ref={codeDrawerRef} />
    </div>
  )
}

export default LocalizationRecord
