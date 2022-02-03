import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingMessageEnable: false,
      infos: '',
    };
  }

  componentDidMount() {
    getUser();
    this.setUserInState();
  }

  setUserInState() {
    const infos = JSON.parse(localStorage.getItem('user'));
    // console.log(infos);
    this.setState({ infos });
  }

  render() {
    const {
      isLoadingMessageEnable,
      infos,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />

        <h1>Profile</h1>

        {isLoadingMessageEnable ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <img
              data-testid="profile-image"
              alt="Profile"
              src="url-to-image"
            />
            <h4>{infos.description}</h4>
            <h4>{infos.email}</h4>
            <h4>{infos.image}</h4>
            <h4>{infos.name}</h4>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
