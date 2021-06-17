import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.scss'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Reposity } from '../../utils/entity'
import MyButton from '../MyButton/MyButton'
import { openWorkspace } from '../../utils/workspace'

export type ReposityCardProps = {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

function ReposityCard (props: Reposity & ReposityCardProps) {
  const [show, setShow] = useState(false)
  const handleToggle = () => {
    setShow(!show)
  }
  return (
    <div className={styles.whole}>
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.title}>{props.description}</div>
        <div className={styles.time}>{props.startTime}</div>
        <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} color="#BBBBBB" rotate="180" />
      </div>
      {show && <>
        <div className={styles.info}>
          <div className={styles.left}>仓库地址</div>
          <div className={styles.right}>{props.gitUrl}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.left}>查询次数</div>
          <div className={styles.right}>{props.queryNum}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.left}>状态</div>
          <div className={styles.right}>{props.state.search(/dev/i) >= 0 ? '开发中' : ('注销于' + props.endTime)}</div>
        </div>
        <div className={`${styles.control} ${styles.info}`}>
          <MyButton danger title="删 除" onClick={() => props.onDelete && props.onDelete(props.id)} />
          <MyButton primary title="编 辑" onClick={() => props.onEdit && props.onEdit(props.id)} />
          <MyButton primary title="工作区" onClick={() => openWorkspace('repositoryId', props.id)} />
        </div>
      </>}
    </div>
  )
}

export default ReposityCard
