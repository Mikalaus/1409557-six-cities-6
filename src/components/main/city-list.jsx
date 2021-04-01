import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ActionCreator from '../../store/actions';
import {getOffersForCurrentCity} from '../../utils';
import {CitiesLocation} from '../../const';

const CityList = ({offers, setActiveCity}) => {

  const clickHandler = (city) => (evt) => {
    setActiveCity(city, offers);
    document.querySelector(`.tabs__item--active`).classList.remove(`tabs__item--active`);
    evt.stopPropagation();
    evt.currentTarget.classList.add(`tabs__item--active`);
  };

  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <a className="locations__item-link tabs__item tabs__item--active" href="#" onClick={clickHandler(`Paris`)}>
          <span>Paris</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#" onClick={clickHandler(`Cologne`)}>
          <span>Cologne</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#" onClick={clickHandler(`Brussels`)}>
          <span>Brussels</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#" onClick={clickHandler(`Amsterdam`)}>
          <span>Amsterdam</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#" onClick={clickHandler(`Hamburg`)}>
          <span>Hamburg</span>
        </a>
      </li>
      <li className="locations__item">
        <a className="locations__item-link tabs__item" href="#" onClick={clickHandler(`Dusseldorf`)}>
          <span>Dusseldorf</span>
        </a>
      </li>
    </ul>
  );
};

CityList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        isFavorite: PropTypes.bool,
        isPremium: PropTypes.bool,
        previewImage: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string
      })
  ),
  setActiveCity: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setActiveCity(city, offers) {
    dispatch(ActionCreator.setCityNameAction(city));
    dispatch(ActionCreator.setCityLocationAction(CitiesLocation.get(city)));
    dispatch(ActionCreator.setSortedOffersAction(getOffersForCurrentCity(city, offers)));
  }
});

const mapStateToProps = (state) => {
  return {
    offers: state.offers
  };
};

export {CityList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
