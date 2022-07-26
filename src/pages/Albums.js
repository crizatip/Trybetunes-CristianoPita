import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Albums extends React.Component {
  constructor() {
    super();

    this.state = {
      musicArray: [],
      artistName: '',
      albumName: '',
      loading: false,
      getFavoritesArray: [],
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
    this.getfavoriteHandle();
  }

  getfavoriteHandle = async () => {
    const getFav = await getFavoriteSongs();
    this.setState({ getFavoritesArray: getFav });
  }

  handleInputChange = (event, trackId) => {
    const { target } = event;
    const { checked } = target;
    const { musicArray } = this.state;
    if (checked) {
      const [a] = musicArray.filter((song) => song.trackId === trackId);
      console.log(trackId);
      this.favHandle(a);
    }
  }

  favHandle = async (trackId) => {
    this.setState({ loading: true });
    console.log(trackId);
    await addSong(trackId);
    this.getfavoriteHandle();
    this.setState({ loading: false });
  }

  render() {
    const { musicArray, artistName, albumName, loading, getFavoritesArray } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <div data-testid="artist-name">
              {!artistName && <p>Artist Name</p> }
            </div>
            <div data-testid="album-name">
              {!albumName && <p>Collection Name</p>}
            </div>
            {musicArray.map((musics, index) => (
              index > 0 && (
                <div
                  key={ index }
                  data-testid="audio-component"
                >
                  <MusicCard
                    musicArray={ musics }
                    favorited={ getFavoritesArray }
                    handleInputChange={ this.handleInputChange }
                  />
                </div> /* */)
            ))}

          </div>)}
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
