const adaptOffer = (offer) => {
  const adaptedOffer = Object.assign(
      {},
      {
        bedrooms: offer.bedrooms,
        city: {
          location: {
            latitude: offer.city.location.latitude,
            longitude: offer.city.location.longitude,
            zoom: offer.city.location.zoom
          },
          name: offer.city.name
        },
        description: offer.description,
        goods: offer.goods,
        host: {
          id: offer.host.id,
          name: offer.host.name,
          avatarUrl: offer.host.avatar_url,
          isPro: offer.host.is_pro
        },
        id: offer.id,
        images: offer.images,
        isFavorite: offer.is_favorite,
        isPremium: offer.is_premium,
        location: {
          latitude: offer.location.latitude,
          longitude: offer.location.longitude,
          zoom: offer.location.zoom
        },
        maxAdults: offer.max_adults,
        previewImage: offer.preview_image,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        type: offer.type
      }
  );
  return adaptedOffer;
};

const adaptOffersToClient = (offers) => {
  const adaptedOffers = offers.map(adaptOffer);

  return adaptedOffers;
};

const adaptReview = (review) => {
  const adaptedReview = Object.assign(
      {},
      {
        comment: review.comment,
        date: review.date,
        id: review.id,
        rating: review.rating,
        user: {
          avatarUrl: review.user.avatar_url,
          id: review.user.id,
          isPro: review.user.is_pro,
          name: review.user.name,
        }
      }
  );
  return adaptedReview;
};

export {adaptOffersToClient, adaptOffer, adaptReview};
