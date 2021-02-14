const Icon = props =>{
  const { onClick, className, title, id } = props;
  return(
    <i
    onClick={onClick}
    className={className}
    title={title}
    id={id}
    ></i>
  )
}

export default Icon;