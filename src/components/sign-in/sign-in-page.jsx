import {login} from '../../store/api-actions';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';

const SignInPage = ({onSubmit}) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  return (
    <>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit = {
            (evt) => {
              evt.preventDefault();
              onSubmit({email, password});
              browserHistory.push(`/`);
            }
          }>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" autoComplete="on" value={email} type="email" name="email" placeholder="Email" required onChange={
                (evt) => {
                  setEmail(evt.currentTarget.value);
                }
              }/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" autoComplete="on" value={password} type="password" name="password" placeholder="Password" required onChange={
                (evt) => {
                  setPassword(evt.currentTarget.value);
                }
              }/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};


SignInPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onSubmit: login
};

export default connect(null, mapDispatchToProps)(SignInPage);
