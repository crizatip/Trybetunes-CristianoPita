import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';

class Albums extends React.Component {
  constructor() {
    super();

    this.state = {
      musicArray: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musicArray: musics });
    const { musicArray } = this.state;
    let artist = '';
    if (musicArray[2] !== undefined) {
      [, artist] = Object.values(musicArray);
    }
    console.log(artist);
    this.setState({ artistName: artist.artistName, albumName: artist.collectionName });
  }

  render() {
    const { musicArray, artistName, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <div data-testid="artist-name">
            {!artistName && <p>Artist Name</p> }
          </div>
          <div data-testid="album-name">
            {!albumName && <p>Collection Name</p>}
          </div>
          { musicArray.map((musics, index) => (
            index > 0
           && <div
             key={ index }
             data-testid="audio-component"
           >
             <p>{`Track Name ${index}`}</p>
             <audio
               src={ musics.previewUrl }
               controls
             >
               <track kind="captions" />
               O seu navegador não suporta o elemento
               {' '}
               {' '}
               <code>audio</code>
             </audio>
           </div>
          ))}

        </div>
      </>
    );
  }
}

Albums.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Albums;
