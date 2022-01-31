import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

// import TrybeLogo from '../img/logo.svg';
// import ToggleButtonImage from '../img/list.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingMessageEnable: false,
      userName: '',
    };
    this.carregandoScreen = this.carregandoScreen.bind(this);
  }

  componentDidMount() {
    this.carregandoScreen();
  }

  carregandoScreen = async () => {
    this.setState({ isLoadingMessageEnable: true });
    getUser().then((res) => {
      this.setState({ isLoadingMessageEnable: false });
      this.setState({ userName: res.name });
    });
  }

  render() {
    const { isLoadingMessageEnable, userName } = this.state;

    return (
      <div data-testid="header-component">
        {isLoadingMessageEnable ? (
          <p>Carregando...</p>
        ) : (
          <header className="Header">
            <h4
              data-testid="header-user-name"
            >
              {userName}
            </h4>
            <h4>Curso</h4>
            <Link to="/search" data-testid="link-to-search">Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile">Profile </Link>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
