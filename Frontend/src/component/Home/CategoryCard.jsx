import React from 'react';
import { Link } from 'react-router-dom'

const CategoryCard = ({ image }) => {
  return <>
    <div>
      <Link className='imageText' to="/products">
        <img src={image.url} style={{ maxHeight: '6.5rem', height: '6rem', width: '7rem', minWidth: '6rem', maxWidth: '10rem' }} />
        <p  >{image.text}</p>
      </Link>
    </div>
  </>
}

export default CategoryCard