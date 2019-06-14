import React from 'react';



const Repos = ({ match }) => {
  const { params: { login } } = match;

  return (
    <section className='repos'>{ login }</section>
  );
}

export default Repos;