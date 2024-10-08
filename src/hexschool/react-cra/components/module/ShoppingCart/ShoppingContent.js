import { createContext } from 'react';

export const cartInit = {
  cartList: [],
  stateQty: 1
}

function CALCULATIONAL(cartList) {
  return cartList.map((prod) => prod.price * prod.prodQty).reduce((a, b) => a + b, 0);
}

export const ShoppingContent = createContext({});

export const cartReducer = (state, action) => {
  let statItem = state.statItem || action.payload
  let stateQty = action.payload.prodQty ? action.payload.prodQty : 1;
  const cartList = [...state.cartList];
  // 當前索引
  const index = state.cartList.findIndex((item) => item.id === action.payload.id)
  console.log(state)
  console.log(action)
  switch (action.type) {
    case "ADD_TO_CART":
      if (index === -1) {
        // 未加入購物車
        cartList.push(statItem)
      }
      else {
        cartList[index].prodQty += action.payload.prodQty
      }

      return {
        ...state, //包含預設狀態
        cartList,
        statItem: '',
        stateQty: 1,
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
      statItem = action.payload
      stateQty = action.payload.prodQty
      return {
        ...state, //包含預設狀態
        statItem,
        stateQty,
        checkTotal: CALCULATIONAL(cartList),
      };
    /* falls through */
    default: return state;
  }
}