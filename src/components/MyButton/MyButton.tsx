import React from 'react'
import $$ from '../../utils/className'
import styles from './index.module.scss'

export type MyButtonProps = {
  title?: string;
  primary?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

function MyButton (props: MyButtonProps) {
  const handleClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div className={styles.whole}>
      <button className={$$([props.primary && styles.primary, props.danger && styles.danger])} onClick={handleClick}>{props.title}</button>
    </div>
  )
}

export default MyButton
