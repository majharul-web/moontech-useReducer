import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { actionTypes } from "../state/ProductState/actionTypes";
import { initialState, productReducer } from "../state/ProductState/productReducer";

export const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("https://raw.githubusercontent.com/mir-hussain/moon-tech-starter-pack/main/products.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: actionTypes.FETCHING_ERROR }));
  }, []);

  const value = {
    state,
    dispatch,
  };

  return <PRODUCT_CONTEXT.Provider value={value}>{children}</PRODUCT_CONTEXT.Provider>;
};

export default ProductProvider;
