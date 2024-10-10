import React from 'react';

import Prods from '../Prods';

const ProdCard = (props) => {
  const { prodData } = props

  return (
    <>
      {prodData.map((prodItem) => {
        return (
          <Prods card={prodItem} key={`${prodItem.id}_${prodItem.name}`} />
        )
      })}
    </>
  )
}
export default ProdCard;