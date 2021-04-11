import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import MyButton from '../MyButton/MyButton'
import styles from './index.module.scss'

export type MyModalProps = {
  children?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

export type MyModalRef = {
  open: () => void;
  close: () => void;
}

function MyModal (props: MyModalProps, ref: React.Ref<MyModalRef>) {
  const [open, setOpen] = useState(false)
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false)
  }))
  const handleClick = (accept: boolean) => {
    const callback = accept ? props.onOk : props.onCancel
    return () => {
      setOpen(false)
      callback && callback()
    }
  }
  return createPortal(open ? (
    <div className={styles.whole}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          { props.children }
        </div>
        <div className={styles.control}>
          <MyButton title="取 消" onClick={handleClick(false)} />
          <MyButton primary title="确 定" onClick={handleClick(true)} />
        </div>
      </div>
    </div>
  ) : null, document.body)
}

export default forwardRef(MyModal)
