const LoadImage = props => {
  const {onChange, id} = props;
  return (
    <div className="edit-image">
      <input onChange={onChange} type="file" id={id} accept="image/*" />
      <label htmlFor={id} className="load-image"></label>
    </div>
  )
}

export default LoadImage;