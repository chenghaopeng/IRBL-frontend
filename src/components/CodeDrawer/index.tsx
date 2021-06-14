import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CodeBox from '../CodeBox'
import styles from './index.module.scss'

export type CodeDrawerRef = {
  open: (code: string) => void;
}

function CodeDrawer (props: {}, ref: React.Ref<CodeDrawerRef>) {
  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const handleClose = () => {
    setShow(false)
  }
  useImperativeHandle(ref, () => ({
    open: (code: string) => {
      setShow(true)
      setCode(code)
    },
    close: handleClose
  }))
  return createPortal(show ? <>
    <div className={styles.whole}>
      <CodeBox code={code} />
      <FontAwesomeIcon
        className={styles.close}
        icon={faTimes}
        color="#FFB0B0"
        size="3x"
        onClick={handleClose}
      />
    </div>
    <div className={styles.mask}></div>
  </> : null, document.body)
}

export default forwardRef(CodeDrawer)
