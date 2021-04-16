import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import Api from '../../utils/api'
import ReposityCard from '../../components/ReposityCard'
import { Reposity } from '../../utils/entity'
import MyModal, { MyModalRef } from '../MyModal'
import MyInput from '../MyInput'
import __ from '../MyMessage'

export type ReposityListRef = {
  update: () => void;
}

function ReposityList (props: {}, ref: React.Ref<ReposityListRef>) {
  const [reposities, setReposities] = useState<Array<Reposity>>([])
  const [id, setId] = useState(0)
  const [description, setDescription] = useState('')
  const editModal = useRef<MyModalRef>(null)
  const deleteModal = useRef<MyModalRef>(null)
  const getReposities = () => {
    Api.reposity.list().then(res => {
      if (res.success) {
        setReposities(res.content)
      } else {
        __('咦？')
      }
    })
  }
  useEffect(() => getReposities(), [])
  useImperativeHandle(ref, () => ({
    update: getReposities
  }))
  const show = (modal: React.RefObject<MyModalRef>) => {
    return (id: number) => {
      const reposity = reposities.find(value => value.id === id)
      if (reposity) {
        setId(id)
        setDescription(reposity.description)
        modal.current?.open()
      }
    }
  }
  const handleEdit = () => {
    const desc = description.trim()
    if (!desc) {
      __('仓库描述不能为空！')
      return false
    }
    Api.reposity.update({ id, description }).then(({ success, content, message }) => {
      if (success) {
        __('修改成功！')
      } else {
        __('修改失败！' + message)
      }
      getReposities()
    })
  }
  const handleDelete = () => {
    Api.reposity.delete({ repoId: id }).then(({ success, content, message }) => {
      if (success) {
        __('删除成功！')
      } else {
        __('删除失败！' + message)
      }
      getReposities()
    })
  }
  return (
    <>
      {reposities.map(reposity => <ReposityCard key={reposity.id} {...reposity} onEdit={show(editModal)} onDelete={show(deleteModal)} />)}
      <MyModal ref={editModal} onOk={handleEdit}>
        <div>修改描述：</div>
        <MyInput value={description} onChange={setDescription} />
      </MyModal>
      <MyModal ref={deleteModal} onOk={handleDelete}>
        确定要删除仓库 [{description}] 吗？
      </MyModal>
    </>
  )
}

export default forwardRef(ReposityList)
