import React from 'react';
import { TbChecks } from 'react-icons/tb';
import PropTypes from 'prop-types';

const DetailsTag = ({ detail, text }) => {
  return (
    <div>
      {detail.includes('icon') ? (
        <TbChecks
          style={{
            color: `${detail === 'icon-watched' ? 'orangered' : 'black'}`,
          }}
        />
      ) : (
        <strong>{detail}</strong>
      )}
      <p>{text}</p>
    </div>
  );
};

export default DetailsTag;

DetailsTag.propTypes = {
  detail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
