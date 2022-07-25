import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';

class Albums extends React.Component {
  constructor() {
    super();

    this.state = {
      musicArray: [],
      artistName: '',
      albumName: '',
      favorites: [],
      loading: false,
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

  handleInputChange = (event) => {
    const { target } = event;
    const { checked, value } = target;
    const { favorites, musicArray } = this.state;
    if (checked) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, parseInt(value, 10)],
      }), () => {
        const findFav = musicArray.find((music) => music.trackId === parseInt(value, 10));
        console.log(findFav.trackId);
        this.favHandle(findFav.trackId);
      });
    } else {
      const a = favorites.filter((marked) => marked !== parseInt(value, 10));

      this.setState(() => ({
        favorites: a,
      }));
    }
  }

  favHandle = async (song) => {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { musicArray, artistName, albumName, loading } = this.state;
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
          {loading && <Loading />}
          { musicArray.map((musics, index) => (
            index > 0 && (
              <div
                key={ index }
                data-testid="audio-component"
              >
                <MusicCard musicArray = { musics }/>
              </div> /* */)
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
