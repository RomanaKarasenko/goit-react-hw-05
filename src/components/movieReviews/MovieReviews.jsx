import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews} from "../../api/API";

import Loader from "../loader/Loader";
import MovieReviewsItem from "../movieReviewsItem/MovieReviewsItem";

import css from "./MovieReviews.module.css";
import ErrorMessage from "../errorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
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
      <div>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && reviews !== null && reviews.length === 0 && (
          <ErrorMessage message="We don't have any reviews for this movie" />
        )}
        {reviews && (
          <ul>
            {reviews.map((review) => (
              <li className={css.reviewItem} key={review.id}>
                <MovieReviewsItem dataReviews={review} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MovieReviews;
