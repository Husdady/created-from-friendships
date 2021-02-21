import './css/header.css';
import Icon from '../assets/Icon';

const Header = props => {
  const { themeColor, setThemeColor } = props;
  return (
    <header>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/img/icon.png`} alt="icon" />&nbsp;&nbsp;<span>SC</span><span>amfie<sup>*</sup></span>
      </div>
      <button onClick={() => setThemeColor(!themeColor)}>
        <Icon className="fas fa-sun" />
        <Icon className="fas fa-moon-stars" />
      </button>
    </header>
  )
}

export default Header;