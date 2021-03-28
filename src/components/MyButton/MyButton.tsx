import React from 'react'
import styles from './index.module.scss'

export type MyButtonProps = {
  title?: string;
  primary?: boolean;
  onClick?: () => void;
}

function MyButton (props: MyButtonProps) {
  const handleClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div className={styles.whole}>
      <button className={props.primary ? styles.primary : ''} onClick={handleClick}>{props.title}</button>
    </div>
  )
}

export default MyButton
