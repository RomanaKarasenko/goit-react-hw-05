import { Link, useLocation } from "react-router-dom";
import MovieListItem from "../movieListItem/MovieListItem";
import ErrorMessage from "../errorMessage/ErrorMessage";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li className={css.movieItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <MovieListItem {...movie} />
            </Link>
          </li>
        ))
      ) : (
        <ErrorMessage message="Nothing found, please try reloading the page." />
      )}
    </ul>
  );
};

export default MovieList;
