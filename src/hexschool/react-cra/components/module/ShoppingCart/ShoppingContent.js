import { createContext } from 'react';

export const cartInit = {
  cartList: []
}

function CALCULATIONAL(cartList) {
  return cartList.map((prod) => prod.price * prod.prodQty).reduce((a, b) => a + b, 0);
}
export const cartReducer = (state, action) => {
  const cartList = [...state.cartList]
  // 當前索引
  const index = state.cartList.findIndex((item) => item.id === action.payload.id)
  let statQty = state.cartList.prodQty
  console.log(state)
  console.log(action)
  switch (action.type) {
    case "ADD_TO_CART":
      if (index === -1) {
        // 未加入購物車
        cartList.push(action.payload)
      } else {
        cartList[index].prodQty += action.payload.prodQty
      }
      return {
        ...state, //包含預設狀態
        cartList,
        checkTotal: CALCULATIONAL(cartList),
      };
    case "MINUS_TO_CART":
      if (cartList[index].prodQty === 1) {
        cartList.splice(index, 1)
      } else {
        cartList[index].prodQty -= action.payload.prodQty
      }
      return {
        ...state, //包含預設狀態
        cartList,
        checkTotal: CALCULATIONAL(cartList),

      };
    case "REMOVE_TO_CART":
      cartList.splice(index, 1)
      return {
        ...state, //包含預設狀態
        cartList,
        checkTotal: CALCULATIONAL(cartList),
      };
    case "CHANGE_CART_ITEM":
      cartList[index].prodQty = action.payload.prodQty;
      return {
        ...state, //包含預設狀態
        cartList,
        checkTotal: CALCULATIONAL(cartList),
      };
    case "CHANGE_PROD_ITEM":
      statQty = action.payload.prodQty
      return {
        ...state, //包含預設狀態
        cartList,
        statQty,
        checkTotal: CALCULATIONAL(cartList),
      };
    /* falls through */
    default: return state;
  }
}

export const ShoppingContent = createContext({});