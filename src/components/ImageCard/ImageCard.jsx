const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.slug}
        id={image.id}
        onClick={() => onClick(image.id)}
      />
    </div>
  );
};

export default ImageCard;
