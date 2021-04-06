import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './review-item';

const ReviewList = ({reviewList}) => {

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviewList.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviewList.slice(-10).reverse().map((review) => {
            return (
              <ReviewItem
                key={review.id}
                reviewInfo={review}
              />
            );
          })
        }
      </ul>
    </>
  );
};

ReviewList.propTypes = {
  reviewList: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        user: PropTypes.shape({
          avatarUrl: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          isPro: PropTypes.bool.isRequired,
          name: PropTypes.string.isRequired,
        })
      })
  )
};

export default ReviewList;
