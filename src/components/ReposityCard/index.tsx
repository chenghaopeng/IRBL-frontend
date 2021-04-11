import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './index.module.scss'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { Reposity } from '../../utils/entity'
import MyButton from '../MyButton/MyButton'
import MyModal, { MyModalRef } from '../MyModal'
import MyInput from '../MyInput'
import Api from '../../utils/api'

function ReposityCard (props: Reposity) {
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')
  const editModal = useRef<MyModalRef>(null)
  const deleteModal = useRef<MyModalRef>(null)
  useEffect(() => {
    setDescription(props.description)
  }, [props])
  const handleToggle = () => {
    setShow(!show)
  }
  const handleEdit = () => {
    Api.reposity.update({ id: props.id, description }).then(({ success, content }) => {
      if (success) {
        alert('修改成功！')
      } else {
        alert('修改失败！' + content)
      }
    })
  }
  const handleDelete = () => {
    Api.reposity.delete({ repoId: props.id }).then(({ success, content }) => {
      if (success) {
        alert('删除成功！')
      } else {
        alert('删除失败！' + content)
      }
    })
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
          <MyButton danger title="删 除" onClick={() => deleteModal.current?.open()} />
          <MyButton primary title="编 辑" onClick={() => editModal.current?.open()} />
        </div>
      </>}
      <MyModal ref={editModal} onOk={handleEdit} onCancel={() => setDescription(props.description)}>
        <div>修改描述：</div>
        <MyInput value={description} onChange={setDescription} />
      </MyModal>
      <MyModal ref={deleteModal} onOk={handleDelete}>
        确定要删除仓库 [{props.description}] 吗？
      </MyModal>
    </div>
  )
}

export default ReposityCard
