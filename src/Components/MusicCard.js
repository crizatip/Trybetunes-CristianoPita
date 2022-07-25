import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

handleInputChange = (event) => {
  const { musicArray: musics } = this.props;
  const { target } = event;
  const { checked } = target;
  if (checked) {
    this.favHandle(musics);
  }
}

  favHandle = async (song) => {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { musicArray: favorite, loading } = this.state;
    const { musicArray: musics } = this.props;
    return (
      <>
        {loading && <Loading />}
        <li>{ musics.trackName }</li>
        <audio data-testid="audio-component" src={ musics.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="favorites"
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${musics.trackId}` }
            type="checkbox"
            value={ musics.trackId }
            checked={ favorite }
            onChange={ this.handleInputChange }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;

export default MusicCard;
