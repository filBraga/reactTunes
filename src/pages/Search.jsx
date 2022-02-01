import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHARACTERS = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isBtnDisabled: true,
      searchText: '',
      albums: [],
      albumNotFound: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ artistName: value }, () => this.validationButton());
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;

    searchAlbumsAPI(artistName).then((res) => {
      this.setState({
        albums: [...res],
        searchText: artistName,
        artistName: '',
        albumNotFound: res.length === 0,
      });
    });
  };

  validationButton() {
    const { artistName } = this.state;
    const validateName = artistName.length >= MIN_CHARACTERS;
    this.setState({ isBtnDisabled: !validateName /* || algumacoisa */ });
    // ver na aula do dia 14/01/22 do Moises Santana no discord
  }

  render() {
    const {
      artistName,
      isBtnDisabled,
      albums,
      searchText,
      albumNotFound,
    } = this.state;

    return (
      <main>
        <div data-testid="page-search">
          <Header />
          <h1>Search</h1>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="name">
              Name
              <input
                data-testid="search-artist-input"
                type="Text"
                name="name"
                id=""
                value={ artistName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isBtnDisabled }
            >
              Pesquisar
            </button>
            {albumNotFound && <h1>Nenhum álbum foi encontrado</h1>}
            {albums.length >= 1 && (
              <div>
                <h1>
                  {`Resultado de álbuns de: ${searchText}`}
                </h1>
                {albums.map((album) => (
                  <div key={ album.collectionId }>
                    <Link
                      to={ `album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                      />
                      <h2>{album.collectionName}</h2>
                      <span>{album.artistName}</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </main>
    );
  }
}

export default Search;
