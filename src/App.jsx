import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

import "./App.css";

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" />
          <Route path="/movies" />
          <Route path="/movies/:movieId/*" />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
