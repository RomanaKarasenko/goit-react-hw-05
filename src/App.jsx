import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";
import Layout from "./components/layout/Layout";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import MoviesPage from "./pages/moviesPage/MoviesPage";
import HomePage from "./pages/homePage/HomePage";
import "./App.css";

const MovieDetailsPage = lazy(() =>
  import("./pages/movieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
