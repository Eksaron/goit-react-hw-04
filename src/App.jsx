import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchUnsplashPhotos } from "./components/Api/fetchimages-api";

function App() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (serchQuery) => {
    setQuery(serchQuery);
    setError(null);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const itemsPerPage = 15;
  useEffect(() => {
    if (!query) return;
    async function getImages() {
      try {
        setLoading(true);

        const response = await fetchUnsplashPhotos({
          query,
          page,
          itemsPerPage,
        });

        const images = response.data.results;

        setImages((prevImages) => [...prevImages, ...images]);
        setHasMore(response.data.total_pages > page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar submit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        isOpen={!!modalImage}
        onRequestClose={closeModal}
        image={modalImage}
      />
    </>
  );
}

export default App;
