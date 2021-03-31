import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFileArchive, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { DragEvent, useState } from 'react'
import $$ from '../../utils/className'

export type DropboxProps = {
  title?: string;
  extension?: string[];
  icon?: number;
  onFile?: (f: any) => void;
}

function Dropbox (props: DropboxProps) {
  const [dragCount, setDragCount] = useState(0)
  const [stage, setStage] = useState(0)
  const [fileName, setFileName] = useState('')

  const prehandleDragEvent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    prehandleDragEvent(e)
    setDragCount(dragCount + 1)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    prehandleDragEvent(e)
    setDragCount(dragCount - 1)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    prehandleDragEvent(e)
    setDragCount(0)
    const { files } = e.dataTransfer
    if (files.length === 0) {
      alert('宝贝，要传文件哦！')
    } else if (files.length > 1) {
      alert('宝贝，只能传一个哦！')
    } else {
      const file = files[0]
      if (props.extension?.length && props.extension.some(ext => file.name.endsWith(ext))) {
        props.onFile && props.onFile(file)
        setFileName(file.name)
        setStage(1)
      } else {
        alert('宝贝，有文件扩展名限制哦！')
      }
    }
  }

  const handleCancel = () => {
    props.onFile && props.onFile(null)
    setFileName('')
    setStage(0)
  }

  return (
    <div className={$$([styles.whole, (dragCount || stage) && styles.draging])} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={prehandleDragEvent}>
      <FontAwesomeIcon icon={!props.icon ? faFileUpload : faFileArchive} color="#69BBFF" size="5x" />
      {stage === 0 && <div className={styles.title} data-description={props.extension?.length ? `(${props.extension.map(ext => '*.' + ext).join(', ')})` : ''}>{props.title}</div>}
      {stage === 1 && <div className={styles.title}>
        {fileName}
        <FontAwesomeIcon className={styles.cancel} icon={faTimesCircle} color="#69BBFF" size="1x" onClick={handleCancel} />
      </div>}
    </div>
  )
}

export default Dropbox
