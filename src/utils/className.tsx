function $$ (classNames: (string | null | undefined | boolean | number)[]) {
  return classNames.filter(Boolean).join(' ')
}

export default $$
