import React, { createContext, useReducer, useCallback } from "react";
import { TokenListReducer, sumItems } from "../reducers/TokenListReducer";
import {
  IAddToken,
  IClearTokenList,
  IDecrease,
  IEditToken,
  IIncrease,
  IRemoveToken,
  ITokenListContext,
} from "./TokenListContext.model";

export const TokenListContext = createContext<ITokenListContext>({
  tokenListItems: [],
  total: 0,
  addToken: () => {},
  editToken: () => {},
  increase: () => {},
  decrease: () => {},
  removeToken: () => {},
  clearTokenList: () => {},
});

const TokenListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storage = localStorage.getItem("tokenList")
    ? JSON.parse(localStorage.getItem("tokenList") || "")
    : [];

  const initialState = {
    tokenListItems: storage,
    ...sumItems(storage),
  };
  const [state, dispatch] = useReducer(TokenListReducer, initialState);

  const increase: IIncrease = (payload, value) => {
    dispatch({ type: "INCREASE", payload, value });
  };

  const decrease: IDecrease = (payload, value) => {
    dispatch({ type: "DECREASE", payload, value });
  };

  const addToken: IAddToken = useCallback((payload, value) => {
    dispatch({ type: "ADD_ITEM", payload, value });
  }, []);

  const editToken: IEditToken = useCallback((payload, value) => {
    dispatch({ type: "EDIT_ITEM", payload, value });
  }, []);

  const removeToken: IRemoveToken = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearTokenList: IClearTokenList = () => {
    dispatch({ type: "CLEAR" });
  };

  const contextValues = {
    addToken,
    editToken,
    increase,
    decrease,
    removeToken,
    clearTokenList,
    ...state,
  };

  return (
    <TokenListContext.Provider value={contextValues}>
      {children}
    </TokenListContext.Provider>
  );
};

export default TokenListContextProvider;
