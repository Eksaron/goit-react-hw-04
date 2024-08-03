import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

import SearchBar from "./compnents/SearchBar/SearchBar";
import ErrorMessage from "./compnents/ErrorMessage/ErrorMessage";
import ImageGallery from "./compnents/ImageGallery/ImageGallery";
import Loader from "./compnents/Loader/Loader";
import LoadMoreBtn from "./compnents/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./compnents/ImageModal/ImageModal";
import { fetchUnsplashPhotos } from "./Api/fetchimages-api";

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
