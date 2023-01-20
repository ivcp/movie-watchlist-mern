import React from 'react';

const Rating = ({ movie }) => {
  const handleChange = e => {
    console.log(e.target.value);
  };
  return (
    <>
      {!movie.rating && <p>star icon</p>}
      {movie.rating && <p>{movie.rating}/10</p>}
      <label htmlFor="rating">add rating</label>
      <select name="rating" id="rating" onChange={handleChange}>
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

export default Rating;
