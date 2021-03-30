import React from 'react';
import nanoid from 'nanoid';
import PropTypes from 'prop-types';

const PhotoGallery = ({images}) => {

  const [id] = React.useState(nanoid);
  return (
    <div className="property__gallery">
      {
        images.map((image) => {
          return (
            <div key={id} className="property__image-wrapper">
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
