import React from 'react';
import mapStateToProps from '../../store/state-to-props';
import mapDispatchToProps from '../../store/dispatch-to-props';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getOffersForCurrentCity} from '../../utils';

const SortTypes = {
  popular: (city) => (
    getOffersForCurrentCity(city)
  ),
  priceLowToHigh: (offers) => {
    offers.sort((a, b) => {
      return a.price - b.price;
    });

    return offers;
  },
  priceHighToLow: (offers) => {
    offers.sort((a, b) => {
      return b.price - a.price;
    });

    return offers;
  },
  topRated: (offers) => {
    offers.sort((a, b) => {
      return b.rating - a.rating;
    });

    return offers;
  }
};

const SortingOptionsForm = ({offers, city, setSortedOffers}) => {

  const clickHandler = (sortedOffers) => (evt) => {
    setSortedOffers(sortedOffers);
    document.querySelector(`.places__option--active`).classList.remove(`places__option--active`);
    evt.currentTarget.classList.add(`places__option--active`);
  };

  return (
    <>
      <form className="places__sorting" action="#" method="get">
        <div onClick={() => {
          const popup = document.querySelector(`.places__options--custom`);
          popup.classList.toggle(`places__options--closed`);
          popup.classList.toggle(`places__options--opened`);
        }}>
          <span className="places__sorting-caption" >Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
        </div>

        <ul className="places__options places__options--custom places__options--closed">
          <li className="places__option places__option--active" tabIndex="0" onClick={clickHandler(SortTypes.popular(city))}>Popular</li>
          <li className="places__option" tabIndex="0" onClick={clickHandler(SortTypes.priceHighToLow([...offers]))}>Price: high to low</li>
          <li className="places__option" tabIndex="0" onClick={clickHandler(SortTypes.priceLowToHigh([...offers]))}>Price: low to high</li>
          <li className="places__option" tabIndex="0" onClick={clickHandler(SortTypes.topRated([...offers]))}>Top rated first</li>
        </ul>

      </form>
    </>
  );
};

SortingOptionsForm.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
  ),
  city: PropTypes.string,
  setSortedOffers: PropTypes.func
};

const sortState = mapStateToProps(`SortingOptionsForm`);
const sortDispatch = mapDispatchToProps(`SortingOptionsForm`);

export {SortingOptionsForm};
export default connect(sortState, sortDispatch)(SortingOptionsForm);
