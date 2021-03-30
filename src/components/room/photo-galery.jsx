import React from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';

const PhotoGallery = ({images}) => {

  return (
    <div className="property__gallery">
      {
        images.map((image) => {
          return (
            <div key={nanoid()} className="property__image-wrapper">
              <img className="property__image" src={image} alt="Photo studio" />
            </div>
          );
        })
      }
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.array.isRequired
};

export default PhotoGallery;
