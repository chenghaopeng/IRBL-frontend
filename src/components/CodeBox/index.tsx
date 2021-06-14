import styles from './index.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

export type CodeBoxProps = {
  code?: string;
}

function CodeBox (props: CodeBoxProps) {
  return (
    <div className={styles.whole}>
      <SyntaxHighlighter
        language="java"
        showLineNumbers
        lineNumberStyle={{ webkitUserSelect: 'none', minWidth: '2em' }}
        style={style}
      >
        { props.code }
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBox
