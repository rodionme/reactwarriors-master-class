import React from 'react';

class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      willWatch: false,
    };
  }

  render() {
    const { movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props;

    return (
      <div>
        <div className="card">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_movie || movie.poster_path}`}
            alt=""
          />
        </div>

        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>

          <div className="d-flex justify-content-between align-items">
            <p className="mb-0">Rating: {movie.vote_average}</p>

            {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({
                    willWatch: false,
                  });
                  removeMovieFromWillWatch(movie);
                }}
              >
                Remove Will watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({
                    willWatch: true,
                  });
                  addMovieToWillWatch(movie);
                }}
              >
                Add Will watch
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                removeMovie(movie);
              }}
            >
              Delete movie
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
