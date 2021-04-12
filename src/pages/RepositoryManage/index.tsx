import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ReposityList, { ReposityListRef } from '../../components/ReposityList'
import { useRef, useState } from 'react'
import MyModal, { MyModalRef } from '../../components/MyModal'
import MyInput from '../../components/MyInput'
import Api from '../../utils/api'

function RepositoryManage () {
  const [newDescription, setNewDescription] = useState('')
  const [newGitUrl, setNewGitUrl] = useState('')
  const addModal = useRef<MyModalRef>(null)
  const reposityList = useRef<ReposityListRef>(null)
  const showAdd = () => {
    setNewDescription('')
    setNewGitUrl('')
    addModal.current?.open()
  }
  const handleAdd = () => {
    const params = [newDescription, newGitUrl].map(v => v.trim())
    if (params.some(v => !v)) {
      alert('请输入仓库描述和地址！')
      return false
    }
    const [description, gitUrl] = params
    Api.reposity.register({ description, gitUrl }).then(({ success, content }) => {
      if (success) {
        alert('注册成功！')
        reposityList.current?.update()
      } else {
        alert('注册失败！' + content)
        return false
      }
    })
  }
  return (
    <div className={styles.whole}>
      <div className={styles.header}>
        <div className={styles.title}>
          仓库管理
        </div>
        <div className={styles.add} onClick={showAdd}>
          <FontAwesomeIcon icon={faPlus} color="#9DD3FF" size="2x" />
        </div>
      </div>
      <ReposityList ref={reposityList} />
      <MyModal ref={addModal} onOk={handleAdd}>
        <MyInput value={newDescription} onChange={setNewDescription} placeholder="仓库描述" />
        <MyInput value={newGitUrl} onChange={setNewGitUrl} placeholder="仓库地址" />
      </MyModal>
    </div>
  )
}

export default RepositoryManage
