import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import styles from './index.module.scss'

export type MyInputProps = {
  placeholder?: string;
  onChange?: (v: string) => void;
  onEnter?: (v: string) => void;
  password?: boolean;
  value?: string;
}

function MyInput (props: MyInputProps) {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
    props.onChange && props.onChange(value)
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onEnter && props.onEnter(value)
    }
  }
  return (
    <div className={styles.whole}>
      <input
        type={props.password ? 'password' : 'text'}
        placeholder={props.placeholder}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={value}
      />
    </div>
  )
}

export default MyInput
