import React from 'react';
import { moviesData } from '../moviesData';
import MovieItem from './MovieItem';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: moviesData,
    };
  }

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter((item) => item.id !== movie.id);

    this.setState({
      movies: updateMovies,
    });
  };

  render() {
    return (
      <div>
        {this.state.movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} removeMovie={this.removeMovie} />
        ))}
      </div>
    );
  }
}

export default App;
