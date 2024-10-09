import React, { useContext } from 'react';
import { ShoppingContent } from '../ShoppingCart/ShoppingContent'
import Select from '../../Select'
import Option from '../../Select/Option'

const ProdCard = (props) => {
  let count = 1
  const { prodData } = props;
  const [state, dispatch] = useContext(ShoppingContent);
  const handleAddCart = (state) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...state, prodQty: count
      }
    })
    console.log(state)
  }
  return (
    <>
      {prodData.map((prodItem) => {
        return (
          <div className="card cardProd" key={prodItem.id}>
            <div className="card-img-top">
              <img src={prodItem.img} alt={prodItem.title} />
            </div>
            <div className="card-body">
              <h5 className="card-text h6  d-flex justify-content-between">
                <span className='card-title'><strong>{prodItem.title}</strong></span>
                <span>NT$ {prodItem.price}</span>
              </h5>
              <div className='d-grid'>
                <Select selectState={state.prodQty} handleSelect={(e) => {
                  e.preventDefault();
                  count = parseInt(e.target.value);
                  dispatch({
                    type: 'CHANGE_PROD_ITEM',
                    payload: { ...prodItem, prodQty: count }
                  })
                  return count
                }}>
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
                  onClick={(e) => {
                    handleAddCart(prodItem)
                  }}>Add</button>
              </div>
            </div>
          </div >
        )
      })}
    </>
  )
}
export default ProdCard;