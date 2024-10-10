import React, { useState, useContext } from 'react'
import Select from '../../Select'
import Option from '../../Select/Option'
import { ShoppingContent } from '../ShoppingCart/ShoppingContent'

export default function Prods(props) {
  const { card } = props
  const [state, dispatch] = useContext(ShoppingContent);
  const [select, setSelect] = useState(1);
  const handleAddCart = (state) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...state,
        prodQty: select
      }
    })
    setSelect(1)
  }
  const handleSelect = (e) => {
    e.preventDefault();
    const prodQty = parseInt(e.target.value)
    setSelect(prodQty)
    dispatch({
      type: 'CHANGE_PROD_ITEM',
      payload: {
        ...card,
        prodQty: prodQty
      }
    })
  }
  return (
    <div className="card cardProd" key={card.id}>
      <div className="card-img-top">
        <img src={card.img} alt={card.title} />
      </div>
      <div className="card-body">
        <h5 className="card-text h6  d-flex justify-content-between">
          <span className='card-title'><strong>{card.title}</strong></span>
          <span>NT$ {card.price}</span>
        </h5>
        <div className='d-grid'>
          <Select selectState={select === 0 ? 0 : select} handleSelect={(e) => handleSelect(e)}>
            {[...Array(10)].map((value, index) => {
              return (
                <Option key={`_${index + 1}`} optionText={index + 1} />
              )
            })}
          </Select>
        </div>

        <div className='d-grid'>
          <button type='button'
            className="btn btn-primary btn-sm"
            onClick={() => {
              handleAddCart(card)
            }}>Add</button>
        </div>
      </div>
    </div >
  )
}
