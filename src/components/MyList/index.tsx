import { MouseEvent, useEffect, useState } from 'react'
import $$ from '../../utils/className'
import styles from './index.module.scss'

export type MyListItem = {
  title: string;
  value: string | number;
}

export type MyListProps = {
  data: Array<MyListItem>;
  onSelect?: (value: string | number) => void;
}

function MyList (props: MyListProps) {
  const [selected, setSelected] = useState(-1)
  useEffect(() => {
    setSelected(-1)
  }, [props.data])
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { index, value } = (e.target as HTMLDivElement).dataset
    if (index !== undefined && value !== undefined) {
      setSelected(parseInt(index))
      props.onSelect && props.onSelect(value)
    }
  }
  return (
    <div className={styles.whole} onClick={handleClick}>
      {props.data.length ? props.data.map((item, index) => (
        <div className={$$([styles.item, index === selected && styles.selected])} data-index={index} data-value={item.value} key={item.value}>
          { item.title }
        </div>
      )) : <div className={styles.item}>暂无数据</div>}
    </div>
  )
}

export default MyList
