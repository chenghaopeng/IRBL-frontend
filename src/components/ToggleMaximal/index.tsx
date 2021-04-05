import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from './index.module.scss'
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons'

export type ToogleMaximalProps = {
  onToggle?: (v: boolean) => void
}

function ToogleMaximal (props: ToogleMaximalProps) {
  const [isMaximal, setIsMaximal] = useState(false)
  const handleClick = () => {
    const target = !isMaximal
    setIsMaximal(target)
    props.onToggle && props.onToggle(target)
  }
  return (
    <div className={styles.whole} onClick={handleClick}>
      <FontAwesomeIcon icon={isMaximal ? faCompressAlt : faExpandAlt} color="#69BBFF" size="2x" />
    </div>
  )
}

export default ToogleMaximal
