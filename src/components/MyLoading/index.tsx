import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.scss'
import './index.scss'

export type MyLoadingRef = {
  show: () => void;
  hide: () => void;
}

const MyLoading = forwardRef((_: {}, ref: React.Ref<MyLoadingRef>) => {
  const [show, setShow] = useState(false)
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide: () => setShow(false)
  }))
  return (
    <CSSTransition in={show} timeout={500} classNames="MyLoading" unmountOnExit>
      <div className={styles.whole}>
        <FontAwesomeIcon size="3x" icon={faRedo} spin color="#69BBFF" />
      </div>
    </CSSTransition>
  )
})

const ref = React.createRef<MyLoadingRef>()

function install () {
  const myLoading = document.createElement('div')
  document.body.append(myLoading)
  ReactDOM.render(<MyLoading ref={ref} />, myLoading)
}

install()

let count = 0

const loading = (delay = 1000) => {
  count++
  const timer = setTimeout(() => ref.current?.show(), delay)
  return () => {
    clearTimeout(timer)
    count--
    if (count === 0) {
      ref.current?.hide()
    }
  }
}

export default loading
