import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const movie = {
  title: 'Avengers: Infinity War',
  vote_average: 8.5,
  image: 'https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
  overview:
    'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
};

function Image(props) {
  return <img width="100%" src={props.src} alt={props.alt} />;
}

class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      like: false,
    };
  }

  toggleOverview = () => {
    this.setState({ show: !this.state.show });
  };

  handleLike = () => {
    this.setState({ like: !this.state.like });
  };

  render() {
    const {
      data: { title, vote_average, image, overview },
    } = this.props;

    return (
      <div style={{ width: 300 }}>
        <Image src={image} alt={title} />
        <p>{title}</p>
        <p>{vote_average}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" onClick={this.toggleOverview}>
            {this.state.show ? 'hide' : 'show'}
          </button>

          <button type="button" onClick={this.handleLike} className={this.state.like ? 'btn--like' : ''}>
            Like
          </button>
        </div>

        {this.state.show ? <p>{overview}</p> : null}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <MovieItem data={movie} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
