import React, { useState } from 'react'
import { faPlus, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.scss'
import { easeOutBounce } from '../../utils/animation'
import $$ from '../../utils/className'

export type PageHeaderProps = {
  hasAdd?: boolean;
  hasRefresh?: boolean;
  onAdd?: () => void;
  onRefresh?: () => void;
  title?: string;
}

function PageHeader (props: PageHeaderProps) {
  const [degree, setDegree] = useState(0)
  const [rotating, setRotating] = useState(false)
  const handleRefresh = () => {
    props.onRefresh && props.onRefresh()
    if (rotating) {
      return
    }
    setRotating(true)
    let x = 0
    const animate = () => {
      if (x === 100) {
        setRotating(false)
        setDegree(0)
        return
      }
      x += 1
      setDegree(easeOutBounce(x / 100) * 360)
      window.requestAnimationFrame(animate)
    }
    window.requestAnimationFrame(animate)
  }
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        { props.title }
      </div>
      <div className={styles.controls}>
        {props.onAdd && <div className={$$([styles.control, styles.scale])} onClick={props.onAdd}>
          <FontAwesomeIcon icon={faPlus} color="#9DD3FF" size="2x" />
        </div>}
        {props.onRefresh && <div className={styles.control} onClick={handleRefresh}>
          <FontAwesomeIcon icon={faRedo} color="#9DD3FF" size="2x" style={{ transform: `rotate(${degree}deg)` }} />
        </div>}
      </div>
    </div>
  )
}

export default PageHeader
