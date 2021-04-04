import React, {useState} from 'react';
import {postUserComment} from '../../store/api-actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const CommentForm = ({id, postComment}) => {

  const [rating, setRating] = useState();

  const [comment, setComment] = useState(``);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit = {
      (evt) => {
        evt.preventDefault();
        postComment(id, {rating, comment});
        document.querySelector(`.reviews__form`).reset();
      }
    }>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange = {(evt) => {
          setRating(evt.currentTarget.value);
        }}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange = {(evt) => {
          setRating(evt.currentTarget.value);
        }}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange = {(evt) => {
          setRating(evt.currentTarget.value);
        }}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange = {(evt) => {
          setRating(evt.currentTarget.value);
        }}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange = {(evt) => {
          setRating(evt.currentTarget.value);
        }}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" minLength="50" maxLength="300" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange = {(evt) => {
        setComment(evt.currentTarget.value);
      }}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  postComment: postUserComment
};

export {CommentForm};
export default connect(null, mapDispatchToProps)(CommentForm);
