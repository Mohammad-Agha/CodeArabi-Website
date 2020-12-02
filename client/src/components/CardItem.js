import React from 'react';
import { Link } from 'react-router-dom';
import img from '../images/logo.jpg'
function CardItem(props) {
  let { id, tag, title, description, created_at } = props.data
  if (description.length > 200) {
    description = description.substring(0, 170) + '...'
  }
  const date = new Date(created_at)
  const tagArray = tag.split(',')
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={`/blogs/${id}`}>
          <img
            className='cards__item__img'
            alt='coding blog'
            src={img}
          />
          <div className="cards__item__labels">
            {tagArray.map((value, key) => <span key={key} className="cards__item__label">{value}</span>)}

          </div>
          <div className="cards__item__title">
            <p>{title}</p>
          </div>
          <div className='cards__item__info'>
            <p className='cards__item__text'>{description}</p>
            <p className='cards__item__date'>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</p>
          </div>

        </Link>
      </li>

    </>

  );
}

export default CardItem;