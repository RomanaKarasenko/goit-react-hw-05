import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { fetchMovieCredits } from "../../api/API";
import MovieCastItem from "../movieCastItem/MovieCastItem";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <section>
      <div className="container">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {casts && (
          <ul className={css.castList}>
            {casts.map((cast) => {
              return (
                <li className={css.castItem} key={cast.id}>
                  <MovieCastItem {...cast} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MovieCast;
