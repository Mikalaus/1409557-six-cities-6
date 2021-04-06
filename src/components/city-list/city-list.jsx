import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setCityNameAction, setCityLocationAction, setSortedOffersAction} from '../../store/actions';
import {getOffersForCurrentCity} from '../../utils';
import {CitiesLocation} from '../../constants';

const CityList = ({offers, setActiveCity, cityName}) => {

  const clickHandler = (city) => (evt) => {
    setActiveCity(city, offers);
    document.querySelector(`.tabs__item--active`).classList.remove(`tabs__item--active`);
    evt.stopPropagation();
    evt.currentTarget.classList.add(`tabs__item--active`);
  };

  return (
    <ul className="locations__list tabs__list">
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Paris` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Paris`)}
        >
          <span>Paris</span>
        </a>
      </li>
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Cologne` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Cologne`)}
        >
          <span>Cologne</span>
        </a>
      </li>
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Brussels` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Brussels`)}
        >
          <span>Brussels</span>
        </a>
      </li>
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Amsterdam` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Amsterdam`)}
        >
          <span>Amsterdam</span>
        </a>
      </li>
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Hamburg` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Hamburg`)}
        >
          <span>Hamburg</span>
        </a>
      </li>
      <li className="locations__item">
        <a
          className={
            `locations__item-link tabs__item ${cityName === `Dusseldorf` ? `tabs__item--active` : ``}`
          }
          href="#"
          onClick={clickHandler(`Dusseldorf`)}
        >
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
  setActiveCity: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setActiveCity(city, offers) {
    dispatch(setCityNameAction(city));
    dispatch(setCityLocationAction(CitiesLocation.get(city)));
    dispatch(setSortedOffersAction(getOffersForCurrentCity(city, offers)));
  }
});

const mapStateToProps = ({MAIN}) => {
  return {
    offers: MAIN.offers,
    cityName: MAIN.cityName
  };
};

export {CityList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
