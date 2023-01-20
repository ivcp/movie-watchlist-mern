import React from 'react';

const Watched = ({ movie }) => {
  const handleChange = e => {
    console.log(e.target.checked);
  };
  return (
    <>
      {/* icon watched */}
      <label htmlFor={movie.id}>watched:</label>
      <input
        type="checkbox"
        name="watched"
        id={movie.id}
        defaultChecked={movie.watched}
        onChange={handleChange}
      />
    </>
  );
};

export default Watched;
