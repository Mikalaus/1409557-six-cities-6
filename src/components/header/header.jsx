import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {logout} from '../../store/api-actions';
import {connect} from 'react-redux';

const Header = ({authorizationStatus, logoutUser}) => {

  const checkIsUserAuthorized = () => {
    if (authorizationStatus) {
      return (
        <>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <Link to="/favourites" className="header__user-name user__name">Oliver.conner@gmail.com</Link>
          <span style={{marginLeft: `30px`}} onClick = {
            () => {
              logoutUser();
            }
          }>logout</span>
        </>
      );
    }

    return (
      <Link to="/login" className="header__nav-link header__nav-link--profile" href="#">
        Sign in
      </Link>
    );
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {checkIsUserAuthorized()}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

const mapDispatchToProps = {
  logoutUser: logout
};

Header.propTypes = {
  authorizationStatus: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export {Header};
export default connect(null, mapDispatchToProps)(Header);
