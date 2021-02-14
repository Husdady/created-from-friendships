import './css/header.css';

const Header = () =>{
  return(
    <header>
      <img src={`${process.env.PUBLIC_URL}/img/icon.png`} alt="icon"/>
      &nbsp;&nbsp;<span>SC</span><span>amfie<sup>*</sup></span>
    </header>
  )
}

export default Header;