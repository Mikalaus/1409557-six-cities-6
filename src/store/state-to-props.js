
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

    default: return undefined;
  }
};

export default mapStateToProps;
