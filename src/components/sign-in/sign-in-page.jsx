import {login, checkAuth} from '../../store/api-actions';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-info-data/selectors';
import {getCityName} from '../../store/main-page-data/selectors';
import Header from '../header/header';

const SignInPage = ({onSubmit, cityName, onCheckAuth}) => {

  useEffect(() => {
    onCheckAuth();
  }, []);

  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleSubmitForm = () => (evt) => {
    evt.preventDefault();
    onSubmit({email, password});
    browserHistory.push(`/`);
  };

  const handleEmailInput = () => (evt) => {
    setEmail(evt.currentTarget.value);
  };

  const handlePasswordInput = () => (evt) => {
    setPassword(evt.currentTarget.value);
  };

  return (
    <>
      <Header authorizationStatus = {false}/>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit = {handleSubmitForm()}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                autoComplete="on"
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleEmailInput()}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                autoComplete="on"
                value={password}
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handlePasswordInput()}
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{cityName}</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};


SignInPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired,
  onCheckAuth: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onSubmit: login,
  onCheckAuth: checkAuth
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    cityName: getCityName(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
