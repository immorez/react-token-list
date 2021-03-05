import { IToken } from "../contexts/TokenListContext.model";

const Storage = (tokenListItems: IToken[]) => {
  localStorage.setItem(
    "tokenList",
    JSON.stringify(tokenListItems.length > 0 ? tokenListItems : [])
  );
};

export const sumItems = (tokenListItems: IToken[]) => {
  Storage(tokenListItems);
  let itemCount = tokenListItems.reduce(
    (total: number, token: IToken) => total + token.quantity,
    0
  );
  let total = tokenListItems.reduce(
    (total: number, token: IToken) => total + token.price * token.quantity,
    0
  );
  return { itemCount, total };
};

export const TokenListReducer = (
  state: { tokenListItems: IToken[]; total: number },
  action: { type: string; payload?: IToken | string; value?: number }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (
        !state.tokenListItems.find(
          (item: IToken) => item.id === (action.payload! as IToken).id
        )
      ) {
        state.tokenListItems.push({
          ...(action.payload! as IToken),
          quantity: action.value!,
        });
      }
      return {
        ...state,
        ...sumItems(state.tokenListItems),
        tokenListItems: [...state.tokenListItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.tokenListItems.filter(
            (item: IToken) => item.id !== String(action.payload!)
          )
        ),
        tokenListItems: [
          ...state.tokenListItems.filter(
            (item: IToken) => item.id !== String(action.payload!)
          ),
        ],
      };

    case "EDIT_ITEM":
      const idx = state.tokenListItems.findIndex(
        (t) => t.id === (action.payload as IToken).id
      );
      const token = Object.assign({}, state.tokenListItems[idx]);
      token.name = (action.payload! as IToken).name;
      token.price = (action.payload! as IToken).price;
      token.symbol = (action.payload! as IToken).symbol;
      token.quantity = (action.payload! as IToken).quantity;

      const tokenListItems = Object.assign([], state.tokenListItems);
      tokenListItems.splice(idx, 1, token);
      return {
        ...state,
        ...sumItems(
          state.tokenListItems.filter(
            (item: IToken) => item.id !== String(action.payload!)
          )
        ),
        tokenListItems: tokenListItems,
      };

    case "INCREASE":
      state.tokenListItems[
        state.tokenListItems.findIndex(
          (item: IToken) => item.id === (action.payload! as IToken).id
        )
      ].quantity += action.value!;
      return {
        ...state,
        ...sumItems(state.tokenListItems),
        tokenListItems: [...state.tokenListItems],
      };
    case "DECREASE":
      state.tokenListItems[
        state.tokenListItems.findIndex(
          (item: IToken) => item.id === (action.payload! as IToken).id
        )
      ].quantity -= action.value!;
      return {
        ...state,
        ...sumItems(state.tokenListItems),
        tokenListItems: [...state.tokenListItems],
      };

    case "CLEAR":
      return {
        tokenListItems: [],
        ...sumItems([]),
      };

    default:
      return state;
  }
};
