import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} onClick={() => onClick(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
