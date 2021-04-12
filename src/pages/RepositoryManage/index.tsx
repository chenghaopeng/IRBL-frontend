import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ReposityList from '../../components/ReposityList'

function RepositoryManage () {
  return (
    <div className={styles.whole}>
      <div className={styles.header}>
        <div className={styles.title}>
          仓库管理
        </div>
        <div className={styles.add}>
          <FontAwesomeIcon icon={faPlus} color="#9DD3FF" size="2x" />
        </div>
      </div>
      <ReposityList />
    </div>
  )
}

export default RepositoryManage
