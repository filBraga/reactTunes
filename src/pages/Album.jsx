import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    // how to get params
    // https://stackoverflow.com/questions/44318631/how-get-the-value-of-match-params-id-on-react-router
    this.state = {
      isLoadingMessageEnable: false,
      // checked: [],
      id: match.params.id,
      album: [],
      albumInfos: {
        title: '',
        cover: '',
        artist: '',
      },
    };
    this.addFavSongFunc = this.addFavSongFunc.bind(this);
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  getMusicsFromApi = async () => {
    const { id } = this.state;
    const allMusics = await getMusics(id).then((response) => response);
    const infos = allMusics.filter((info) => info.kind !== 'song');
    const songs = allMusics.filter((song) => song.kind === 'song');
    const { artworkUrl100, artistName, collectionName } = infos[0];
    this.setState({
      album: [...songs],
      albumInfos: {
        title: collectionName,
        cover: artworkUrl100,
        artist: artistName,
      },
    });
  };

  addFavSongFunc(item) {
    // this.setState({ checked: item })

    console.log(item);

    // this.setState({ isLoadingMessageEnable: true });
    // addSong(item).then(() => {
    //   this.setState({ isLoadingMessageEnable: false });
    // });
  }

  render() {
    const {
      album,
      albumInfos: { title, artist /* cover */ },
      isLoadingMessageEnable,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {isLoadingMessageEnable ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <h1>Album</h1>
            <h3 data-testid="artist-name">{artist}</h3>
            <h3 data-testid="album-name">{title}</h3>
            <ul>
              {album.map((item) => (
                <div key={ item.trackId }>
                  <li>{`${item.trackName}`}</li>
                  <audio
                    data-testid="audio-component"
                    src={ item.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o
                    elemento
                    <code>audio</code>
                  </audio>
                  <label htmlFor="isGoing">
                    Favorita
                    <input
                      name="isGoing"
                      type="checkbox"
                      data-testid={ `checkbox-music-${item.trackId}` }
                      // checked={ }
                      onChange={ this.addFavSongFunc(item.trackId) }
                    />
                  </label>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};

export default Album;
