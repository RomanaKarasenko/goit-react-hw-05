import { useState, useEffect, Suspense, lazy, useRef } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/API";
import { format } from "date-fns";
import clsx from "clsx";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import imageNotFound from "../../assets/not-found.jpg";
import { FaBackspace } from "react-icons/fa";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/movieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/movieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  const locationRef = useRef(location.state);
  const formatDate = (date) => {
    return format(new Date(date), "MMMM dd yyyy");
  };

  const userScore = movie ? Number(movie.vote_average).toFixed(2) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  useEffect(() => {
    locationRef.current = location.state;
  }, [location.state]);

  const getNavLinkClassNames = ({ isActive }) =>
    clsx(css.link, {
      [css.active]: isActive,
    });

  return (
    <section>
      <div className={`container ${css.movieDetails}`}>
        <div className={css.backLinkContainer}>
          <Link to={backLinkHref}>
            <button className={css.backButton}>
              <FaBackspace size="20" />
              Back
            </button>
          </Link>
        </div>
        {error && <ErrorMessage message={error} />}
        {loading && <Loader />}
        {movie && (
          <div className={css.movieDetailsContiner}>
            <div className={css.movieDetailsThumb}>
              <img
                className={css.movieDetailsImg}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : imageNotFound
                }
                alt={movie.original_title}
                width="350"
                height="525"
              />
              <div>
                <h2 className={css.movieDetailsTitle}>
                  {movie.original_title}
                </h2>
                <p className={css.movieDetailsTagline}>{movie.tagline}</p>
                <p className={css.movieDetailsText}>
                  <span className={css.spanAccent}>Release date: </span>
                  {movie.release_date
                    ? formatDate(movie.release_date)
                    : "unknown"}
                </p>
                <div className={css.movieDetailsScore}>
                  <p className={css.movieDetailsText}>
                    <span className={css.spanAccent}>User Score: </span>
                    {userScore}
                  </p>
                </div>
                <h3 className={css.movieDetailsTitleFilm}>Overview</h3>
                <p className={`${css.movieDetailsText} ${css.forLaptop}`}>
                  {movie.overview}
                </p>
                <h3 className={css.movieDetailsTitleFilm}>Genres</h3>
                <ul className={css.movieDetailsGenresList}>
                  {movie.genres.map((genre) => (
                    <li className={css.movieDetailsText} key={genre.id}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={css.moreInfo}>
              <NavLink
                className={getNavLinkClassNames}
                to={`/movies/${movieId}/cast`}
                state={location.state}
              >
                Cast
              </NavLink>
              <NavLink
                className={getNavLinkClassNames}
                to={`/movies/${movieId}/reviews`}
                state={location.state}
              >
                Reviews
              </NavLink>
            </div>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieDetailsPage;
