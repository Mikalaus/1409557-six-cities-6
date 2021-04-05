import React from 'react';
import PropTypes from 'prop-types';

const PropertiesList = ({goods}) => {

  return (
    <>
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {
          goods.map((good) => {
            return (
              <li key={`${good}`} className="property__inside-list">
                {good}
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

PropertiesList.propTypes = {
  goods: PropTypes.array
};

export default PropertiesList;
