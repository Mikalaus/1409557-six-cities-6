
const mapStateToProps = (component) => {
  switch (component) {
    case `MainPage`: {
      return (state) => {
        return {
          offers: state.offers,
          cityLocation: state.cityLocation,
          cityName: state.cityName
        };
      };
    }

    case `Map`: {
      return (state) => {
        return {
          activePoint: state.activePoint,
        };
      };
    }

    case `SortingOptionsForm`: {
      return (state) => {
        return {
          offers: state.offers,
          city: state.cityName
        };
      };
    }

    case `PlaceCardsList`: {
      return (state) => {
        return {
          offers: state.offers
        };
      };
    }

    default: return undefined;
  }
};

export default mapStateToProps;
