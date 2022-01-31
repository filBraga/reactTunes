import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const MIN_CHARACTERS = 3;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isBtnDisabled: true,
      isLoadingMessageEnable: false,
      redirect: false,
    };

    this.changeRoute = this.changeRoute.bind(this);
  }

  handleChange = (event) => {
    // usamos o event.target.name para identificar a tag
    const { name, value } = event.target;
    // acessando o objeto state dinamicamente, utilizando [ ] e a variavel name
    this.setState({ [name]: value }, () => this.validationButton());
  }

  handleSubmit = () => {
    // Código baseado na resoluçao do Breno Santos
    // https://github.com/tryber/sd-017-project-trybetunes/pull/1/files
    // https://github.com/breno5g
    // Criou um state para isLoadingMessage e redirect. Assim manipulando o state, conseguimos enviar para o browser a mensagem
    const { name } = this.state;
    this.setState({ isLoadingMessageEnable: true });
    createUser({ name }).then(() => {
      this.setState({ isLoadingMessageEnable: false, redirect: true });
    });
    // this.changeRoute();
  }

  validationButton() {
    const { name } = this.state;
    const validateName = name.length >= MIN_CHARACTERS;
    this.setState({ isBtnDisabled: !validateName /* || algumacoisa */ });
    // ver na aula do dia 14/01/22 do Moises Santana no discord
  }

  changeRoute() {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, isBtnDisabled, isLoadingMessageEnable, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {redirect && <Redirect to="/search" />}
        {isLoadingMessageEnable ? <p>Carregando...</p> : (
          <section className="register-form">
            <h1>Login</h1>
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="name">
                Name
                <input
                  data-testid="login-name-input"
                  type="Text"
                  name="name"
                  id=""
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ isBtnDisabled }
              >
                Entrar
              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
