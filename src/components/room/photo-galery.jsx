import React from 'react';
import nanoid from 'nanoid';

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

export default PhotoGallery;
