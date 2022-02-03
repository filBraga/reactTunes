import React from 'react';
import Header from '../components/Header';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    // const { match } = this.props;
    // how to get params
    // https://stackoverflow.com/questions/44318631/how-get-the-value-of-match-params-id-on-react-router
    this.state = {
      isLoadingMessageEnable: false,
      favoriteSongs: [],
      // id: match.params.id,
      // album: [],
      // albumInfos: {
      //   title: '',
      //   cover: '',
      //   artist: '',
      // },
    };
    this.addFavSongFunc = this.addFavSongFunc.bind(this);
  }

  componentDidMount() {
    // this.getMusicsFromApi();
    this.loadingLocalStorage();
    getFavoriteSongs();
  }

  loadingLocalStorage() {
    const array = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({
      isLoadingMessageEnable: false,
      favoriteSongs: array,
    });
  }

  checkIfHasInFavorite(item) {
    const { favoriteSongs } = this.state;
    const resultado = favoriteSongs.some((ele) => ele.trackId === item.trackId);
    return resultado;
  }

  addFavSongFunc(item) {
    const array = JSON.parse(localStorage.getItem('favorite_songs'));
    const check = array.some((ele) => ele.trackId === item.trackId);

    if (check) {
      this.setState({ isLoadingMessageEnable: true });
      removeSong(item).then(() => {
        this.loadingLocalStorage();
      });
    } else {
      this.setState({ isLoadingMessageEnable: true });
      addSong(item).then(() => {
        this.loadingLocalStorage();
      });
    }
  }

  render() {
    const {
      favoriteSongs,
      // albumInfos: { title, artist  cover },
      isLoadingMessageEnable,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        <h1>Favorites</h1>
        {isLoadingMessageEnable ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {favoriteSongs.map((item) => (
              <div key={ item.trackId }>
                <li>{`${item.trackName}`}</li>
                <audio
                  data-testid="audio-component"
                  src={ item.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor="Favorita">
                  Favorita
                  <input
                    name="Favorita"
                    id="Favorita"
                    type="checkbox"
                    data-testid={ `checkbox-music-${item.trackId}` }
                    checked={ this.checkIfHasInFavorite(item) }
                    onChange={ () => {
                      this.addFavSongFunc(item);
                    } }
                    // onChange={ () => { this.checkIfHasInFavorite(item.trackId); } }
                  />
                </label>
              </div>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Favorites;
