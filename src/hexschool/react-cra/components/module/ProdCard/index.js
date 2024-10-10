import React from 'react';

import Prods from '../Prods';

const ProdCard = (props) => {
  const { prodData } = props

  return (
    <>
      {prodData.map((prodItem) => {
        return (
          <Prods card={prodItem} />
        )
      })}
    </>
  )
}
export default ProdCard;