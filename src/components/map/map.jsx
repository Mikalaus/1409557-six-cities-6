import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getActivePoint, getOffers} from '../../store/main-page-data/selectors';
import {getActiveOfferId} from '../../store/room-info-page-data/selectors';

import 'leaflet/dist/leaflet.css';

const INITIAL_SETTINGS = {
  zoom: 12,
  zoomControl: false,
  marker: true
};

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 39]
});

const setMarkers = (map, cards, activeCardId) => {
  cards.forEach((card) => {
    leaflet
      .marker({
        lat: card.location.latitude,
        lon: card.location.longitude
      }, {icon: card.id === activeCardId ? ACTIVE_ICON : ICON})
      .addTo(map)
      .bindPopup(card.title);
  });
};

const removeMarkers = (map) => {
  map.eachLayer(function (layer) {
    if (layer instanceof leaflet.Marker) {
      layer.remove();
    }
  });
};

const Map = ({city, cards, activePoint = {}, activeCardId}) => {

  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.latitude,
        lng: city.longitude
      },
      ...INITIAL_SETTINGS
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    mapRef.current.flyTo(new leaflet.LatLng(city.latitude, city.longitude), INITIAL_SETTINGS.zoom);
    removeMarkers(mapRef.current);
    setMarkers(mapRef.current, cards, activeCardId);
  }, [activeCardId]);

  useEffect(() => {
    removeMarkers(mapRef.current);
    setMarkers(mapRef.current, cards, activeCardId);
  }, [activeCardId]);

  return (
    <div id="map" style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  city: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  activePoint: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
  points: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        name: PropTypes.string
      })
  )
};

const mapStateToProps = (state) => {
  return {
    activePoint: getActivePoint(state),
    activeCardId: getActiveOfferId(state),
    cards: getOffers(state)
  };
};

export {Map};
export default connect(mapStateToProps, null)(Map);
