import React from 'react'
import Dropbox from '../../components/Dropbox'
import MyButton from '../../components/MyButton/MyButton'
import MyInput from '../../components/MyInput'
import styles from './index.module.scss'

function BugLocalization () {
  return (
    <div className={styles.whole}>
      <Dropbox title="在这里上传你的缺陷报告" extension={['txt']} />
      <div className={styles.code}>
        <div className={styles.control}>
          <MyInput placeholder="代码对应的 Commit ID" />
          <div></div>
          <MyButton primary title="检 测" />
          <MyButton title="重 置" />
        </div>
        <Dropbox icon={1} title="或者在这里上传你的代码包" extension={['zip', '7z']} />
      </div>
    </div>
  )
}

export default BugLocalization
