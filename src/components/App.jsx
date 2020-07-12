import React from 'react';
import { moviesData } from '../moviesData';
import MovieItem from './MovieItem';
import MovieTabs from './MovieTabs';
import Pagination from './Pagination';
import { API_KEY_3, API_URL } from '../utils/api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: moviesData,
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      page: 1,
      totalPages: null,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie/?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          totalPages: data.total_pages,
        });
      });
  };

  deleteMovie = (movie) => {
    const updateMovies = this.state.movies.filter((item) => item.id !== movie.id);

    this.setState({
      movies: updateMovies,
    });
  };

  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  deleteMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter((item) => item.id !== movie.id);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  updatePage = (page) => {
    if (page > 0 && page <= this.state.totalPages) {
      this.setState({
        page,
      });
    }
  };

  render() {
    const { movies, sort_by, moviesWillWatch, page, totalPages } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-7">
                <MovieTabs sort_by={sort_by} updateSortBy={this.updateSortBy} />
              </div>

              <div className="col-5">
                <Pagination currentPage={page} totalPages={totalPages} updatePage={this.updatePage} />
              </div>
            </div>

            <div className="row">
              {movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-3">
            <h4>Will Watch: {moviesWillWatch.length} movies</h4>

            <ul className="list-group">
              {moviesWillWatch.map((movie) => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
