import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Api from '../../utils/api'
import ReposityCard from '../../components/ReposityCard'
import { Reposity } from '../../utils/entity'

function RepositoryManage () {
  const [reposities, setReposities] = useState<Array<Reposity>>([])
  useEffect(() => {
    Api.reposity.list().then(res => {
      if (res.success) {
        setReposities(res.content)
      } else {
        alert('咦？')
      }
    })
  }, [])
  return (
    <div className={styles.whole}>
      <div className={styles.header}>
        <div className={styles.title}>
          仓库管理
        </div>
        <div className={styles.add}>
          <FontAwesomeIcon icon={faPlus} color="#9DD3FF" size="2x" />
        </div>
      </div>
      {reposities.map(reposity => <ReposityCard key={reposity.id} {...reposity} />)}
    </div>
  )
}

export default RepositoryManage
