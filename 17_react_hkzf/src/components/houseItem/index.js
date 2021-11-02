import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.css'

function HouseItem({ src, title, desc, tags, price, onClick, style }) {
  return (
    <div className='houseItem' onClick={onClick} style={style}>
      <div className='content'>
        <div className='imgWrap'>
          <img className='img' src={src} alt="" />
        </div>
        <div className='context'>
            <h3 className='title'>{title}</h3>
            <div className='desc'>{desc}</div>
            <div>
              {/* ['近地铁', '随时看房'] */}
              {tags.map((tag, index) => {
                const tagClass = 'houseItem_tag' + (index + 1)
                return (
                  <span
                    className={['houseItem_tag',tagClass].join(' ')}
                    key={tag}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
            <div className='price'>
              <span className='priceNum'>{price}</span> 元/月
            </div>
        </div>
      </div>
    </div>
  )
}

HouseItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  tags: PropTypes.array.isRequired,
  price: PropTypes.number,
  onClick: PropTypes.func
}

export default HouseItem
