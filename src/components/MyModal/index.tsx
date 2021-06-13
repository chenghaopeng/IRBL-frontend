import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import MyButton from '../MyButton/MyButton'
import styles from './index.module.scss'

export type MyModalProps = {
  children?: React.ReactNode;
  onOk?: () => void | boolean;
  onCancel?: () => void | boolean;
  onClose?: () => void;
}

export type MyModalRef = {
  open: () => void;
  close: () => void;
}

function MyModal (props: MyModalProps, ref: React.Ref<MyModalRef>) {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
    props.onClose && props.onClose()
  }
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close
  }))
  const handleClick = (accept: boolean) => {
    const callback = accept ? props.onOk : props.onCancel
    return () => {
      const shouldClose = callback && callback()
      if (shouldClose !== false) {
        close()
      }
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
