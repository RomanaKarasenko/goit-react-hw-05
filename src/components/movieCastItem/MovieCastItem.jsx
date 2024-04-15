import css from "./MovieCastItem.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
const MovieCastItem = ({ profile_path, name, character }) => {
  const urlImg = `https://image.tmdb.org/t/p/w500/${profile_path}`;

  return (
    <div>
      <img
        className={css.castItemImg}
        src={profile_path ? urlImg : defaultImg}
        alt={name}
        width="200"
        height="300"
      />
      <div className={css.castItemCont}>
        <h3 className={css.castItemTitle}>{name}</h3>
        <p className={css.castItemCharacter}>
          <span className={css.castItemSpan}>Character:</span> {character}
        </p>
      </div>
    </div>
  );
};

export default MovieCastItem;
