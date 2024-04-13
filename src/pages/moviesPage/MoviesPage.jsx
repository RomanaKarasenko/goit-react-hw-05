import { useSearchParams } from "react-router-dom";
import { fetchMoviesSearch } from "../../api/API";
import { useEffect, useMemo, useState } from "react";

import SearchBar from "../../components/searchBar/SearchBar";
import Loader from "../../components/loader/Loader";
import MovieList from "../../components/movieList/MovieList";
import Pagination from "../../components/pagination/Pagination";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const { query, page } = params;

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchParams({ query, page: !page ? 1 : page });
  };

  useEffect(() => {
    if (query && page) {
      const fetchData = async () => {
        try {
          setError(null);
          setLoading(true);
          setMovies(null);
          const data = await fetchMoviesSearch(query, page);
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query, page]);

  const loadSelectedPage = ({ selected: selectedPage }) => {
    setSearchParams({
      query: !query ? "" : query,
      page: parseInt(selectedPage) + 1,
    });
  };

  return (
    <section>
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {loading && <Loader />}
        {!error && !loading && movies && page && (
          <>
            <MovieList movies={movies} />
            {totalPages > 1 && (
              <Pagination
                onClick={loadSelectedPage}
                pageCount={totalPages}
                forcePage={page}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MoviesPage;
