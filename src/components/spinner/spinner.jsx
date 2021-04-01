import React from 'react';

const Spinner = () => {
  return (
    <section className="spiner">
      <div className="spiner__wrapper">
        <div className="spiner__spiner">
          <p>Please wait</p>
          <p>Offers are loading...</p>
        </div>
      </div>
    </section>
  );
};

export default Spinner;
