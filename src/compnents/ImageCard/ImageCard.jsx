const ImageCard = ({ image }) => {
  return (
    <div>
      <img src={image.urls.small} alt={image.slug} id={image.id} />
    </div>
  );
};

export default ImageCard;
