import css from "./MovieListItem.module.css";
const MovieListItem = ({ poster_path, title, vote_average }) => {
  const urlImage = `https://image.tmdb.org/t/p/original${poster_path}`;
  const imageNotFound =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <>
      <img
        src={poster_path ? urlImage : imageNotFound}
        alt={title}
        width="320"
        height="420"
      />
      <div className={css.movieDescription}>
        <h2 className={css.movieTitle}>{title}</h2>
        <p className={css.movieRating}>Rating: {vote_average.toFixed(2)}</p>
        <div>
          <div className={css.starOuter}>
            <div
              className={css.starInner}
              style={{ width: `${(vote_average / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListItem;
