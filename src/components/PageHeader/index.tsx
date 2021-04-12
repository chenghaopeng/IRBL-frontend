import React from 'react'
import { faPlus, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.scss'

export type PageHeaderProps = {
  hasAdd?: boolean;
  hasRefresh?: boolean;
  onAdd?: () => void;
  onRefresh?: () => void;
  title?: string;
}

function PageHeader (props: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        { props.title }
      </div>
      <div className={styles.controls}>
        {props.onAdd && <div className={styles.control} onClick={props.onAdd}>
          <FontAwesomeIcon icon={faPlus} color="#9DD3FF" size="2x" />
        </div>}
        {props.onRefresh && <div className={styles.control} onClick={props.onRefresh}>
          <FontAwesomeIcon icon={faRedo} color="#9DD3FF" size="2x" />
        </div>}
      </div>
    </div>
  )
}

export default PageHeader
