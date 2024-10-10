import React, { useMemo, useContext } from 'react'

import Select from '../../Select'
import Option from '../../Select/Option'
import { ShoppingContent } from '../ShoppingCart/ShoppingContent'

const CartProd = (props) => {
  const { item } = props;
  const [state, dispatch] = useContext(ShoppingContent);
  const memoTotal = useMemo(() => {
    return item.price * item.prodQty;
  }, [state])
  const handleSelect = (e) => {
    e.preventDefault();
    const prodQty = parseInt(e.target.value);
    dispatch({
      type: 'CHANGE_CART_ITEM',
      payload: { ...item, prodQty }
    })
  }
  const handleDelCart = (state) => {
    dispatch({
      type: 'REMOVE_TO_CART',
      payload: {
        ...state,
        prodQty: 1
      }
    })
  }
  const handleAddCart = (state) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...state,
        prodQty: 1
      }
    })
  }
  const handleMinusCart = (state) => {
    dispatch({
      type: 'MINUS_TO_CART',
      payload: {
        ...state,
        prodQty: 1
      }
    })
  }

  return (
    <div className='cartProd d-flex align-items-center flex-nowrap'>
      <button type="button" className="btn btn-sm" onClick={(e) => handleDelCart(item)}><i className="bi bi-trash" aria-hidden="true"></i>      </button>

      <div className='cartProd-img rounded'><img src={item.img} alt={item.title} /></div>
      <div className="cartProd-info">
        <div className='cartProd-text'>
          <div className='cartProd-title'><strong>{item.title}</strong></div>
          <span className='cartProd-price'>NT$ {item.price}</span>
        </div>
        <div className="cartProd-tool">
          <button type='button' className='btn btn-sm rounded'><i className="bi bi-plus-lg" onClick={(e) => handleAddCart(item)}></i></button>
          <Select selectState={item.prodQty === 0 ? 0 : item.prodQty} handleSelect={handleSelect}>
            {[...Array(item.prodQty)].map((value, index) => {
              return (
                <Option key={`${item.id}_${index + 1}`} optionText={index + 1} />
              )
            })}
          </Select>
          <button type='button' className='btn btn-sm rounded'><i className="bi bi-dash" onClick={(e) => handleMinusCart(item)}></i></button>
          {memoTotal > 0 && <div className='cartProd-total'><strong>NT$ {memoTotal}</strong></div>}

        </div>
      </div>
    </div >
  )
}
export default CartProd;