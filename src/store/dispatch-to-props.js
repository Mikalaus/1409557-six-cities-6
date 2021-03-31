import ActionCreator from './action';
import {getOffersForCurrentCity} from '../utils';

const mapDispatchToProps = (component) => {
  switch (component) {
    case `CityList`: return (dispatch) => ({
      setActiveCity(city) {
        dispatch(ActionCreator.setCityNameAction(city));
        dispatch(ActionCreator.setCityLocationAction({ // здесь будет список ключ-значение по которому я буду получать объект через название города
          latitude: 52.38333,
          longitude: 4.9,
          zoom: 10
        }));
        dispatch(ActionCreator.setOffersAction(getOffersForCurrentCity(city)));
      }
    });

    default: return undefined;
  }
};

export default mapDispatchToProps;
