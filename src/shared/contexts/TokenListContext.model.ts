export interface IToken {
  id: string | number;
  name: string;
  symbol: string;
  price: number;
  quantity: number;
}

export type IIncrease = (payload: IToken, value: number) => void;
export type IDecrease = (payload: IToken, value: number) => void;
export type IAddToken = (payload: IToken, value: number) => void;
export type IEditToken = (payload: IToken, value: number) => void;
export type IRemoveToken = (payload: string) => void;
export type IClearTokenList = () => void;

export interface ITokenListContext {
  tokenListItems: IToken[];
  total: number;
  increase: IIncrease;
  decrease: IDecrease;
  addToken: IAddToken;
  editToken: IEditToken;
  removeToken: IRemoveToken;
  clearTokenList: () => void;
}
