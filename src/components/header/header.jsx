import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {logout} from '../../store/api-actions';
import {connect} from 'react-redux';
import {getUserInfo} from '../../store/user-info-data/selectors';


const Header = ({authorizationStatus, logoutUser, userInfo}) => {

  const logoutUserCallback = () => {
    logoutUser();
  };

  const checkIsUserAuthorized = () => {
    if (authorizationStatus) {
      return (
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style = {{backgroundImage: `url(${userInfo.avatarUrl})`}}
          />
          <Link
            to="/favorites"
            className="header__user-name user__name">
            {userInfo.email}
          </Link>
          <span
            style={{marginLeft: `30px`, cursor: `pointer`}}
            onClick = {logoutUserCallback}
          >logout</span>
        </a>
      );
    }

    return (
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <Link to="/login" className="header__nav-link header__nav-link--profile" href="#">
          Sign in
        </Link>
      </a>
    );
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
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

const mapStateToProps = (state) => {
  return {
    userInfo: getUserInfo(state)
  };
};


Header.propTypes = {
  authorizationStatus: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
  })
};

export {Header};
export default memo(connect(mapStateToProps, mapDispatchToProps)(Header));
