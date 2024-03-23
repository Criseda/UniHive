import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid rounded-start rounded-end"
            src={image.image_path}
            alt="Item"
            style={{
              objectFit: "contain",
              maxHeight: "400px",
              minHeight: "400px",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;