import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../../store/dispatch-to-props';
import PropTypes from 'prop-types';

const CityList = ({setActiveCity}) => {

  const clickHandler = (city) => (evt) => {
    setActiveCity(city);
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
  setActiveCity: PropTypes.func.isRequired
};

const cityListDispatch = mapDispatchToProps(`CityList`);

export {CityList};
export default connect(null, cityListDispatch)(CityList);
