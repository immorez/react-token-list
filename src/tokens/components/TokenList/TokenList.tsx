import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/UI/Button/Button";
import { LanguageContext } from "../../../shared/contexts/LanguageContext";
import { TokenListContext } from "../../../shared/contexts/TokenListContext";
import { IToken } from "../../../shared/contexts/TokenListContext.model";
import { RiHandCoinLine } from "react-icons/ri";
import TokenItem from "./TokenItem";
import { FiFilter } from "react-icons/fi";
import Tooltip from "../../../shared/components/UI/Tooltip/Tooltip";

interface TokenListProps {
  openAddModal: () => void;
}

const TokenList = (props: TokenListProps) => {
  const { tokenListItems } = useContext(TokenListContext);
  const { t } = useTranslation(["global"]);
  const { isRTL } = useContext(LanguageContext);
  const [tokens, setTokens] = useState(tokenListItems);

  const sortTokens = useCallback(
    (sortBy: string) => {
      let sorted = tokenListItems;
      switch (sortBy) {
        case "BY_NAME":
          sorted = tokenListItems.sort((a, b) =>
            a.name.localeCompare(b.name, ["en-US", "fa-IR"])
          );
          setTokens(sorted);
          break;
        case "BY_PRICE":
          sorted = tokenListItems.sort((a, b) => a.price - b.price);
          setTokens(sorted);
          break;
        case "BY_SYMBOL":
          sorted = tokenListItems.sort((a, b) =>
            a.symbol.localeCompare(b.symbol)
          );
          setTokens(sorted);
          break;
        case "BY_QUANTITY":
          sorted = tokenListItems.sort((a, b) => a.quantity - b.quantity);
          setTokens(sorted);
          break;
        default:
          setTokens(sorted);
      }
    },
    [tokenListItems]
  );

  useEffect(() => {
    console.log(tokens);
  }, [tokens]);

  return (
    <div className="flex flex-col bg-gradient-to-tr from-orange-400 to-orange-300 shadow-inner p-6 rounded-xl justify-center w-1/3">
      <div className="py-2 flex flex-row justify-between">
        <h2 className="text-xl font-bold uppercase text-white">
          {t("My Tokens")}
        </h2>
        <div className="flex flex-row">
          <Button
            onClick={props.openAddModal}
            className="flex flex-row text-sm font-normal border-2 border-white rounded-xl px-2 py-1 my-auto whitespace-nowrap text-white hover:text-white hover:bg-green-500 transition duration-75 hover:border-green-500"
          >
            + {t("Add")}
          </Button>
          <Tooltip
            holder={
              <Button className="flex flex-row text-sm rtl:mr-1 ltr:ml-1 font-normal border-2 border-white rounded-xl px-2 py-1 my-auto whitespace-nowrap text-white hover:text-white hover:bg-gray-400 transition duration-75 hover:border-gray-400">
                <FiFilter className="my-auto" /> {t("Order")}
              </Button>
            }
            content={
              <div className="bg-gray-100 p-2 rounded-lg w-48 shadow-xl border border-gray-300">
                <h3 className="font-bold text-sm">{t("Order By")}:</h3>
                <ul className="font-light text-sm">
                  <li
                    onClick={() => sortTokens("BY_NAME")}
                    className="w-full hover:bg-gray-200 cursor-pointer p-2"
                  >
                    {t("Name")}
                  </li>
                  <li
                    onClick={() => sortTokens("BY_PRICE")}
                    className="w-full hover:bg-gray-200 cursor-pointer p-2"
                  >
                    {t("Price")}
                  </li>
                  <li
                    onClick={() => sortTokens("BY_QUANTITY")}
                    className="w-full hover:bg-gray-200 cursor-pointer p-2"
                  >
                    {t("Quantity")}
                  </li>
                  <li
                    onClick={() => sortTokens("BY_SYMBOL")}
                    className="w-full hover:bg-gray-200 cursor-pointer p-2"
                  >
                    {t("Symbol")}
                  </li>
                </ul>
              </div>
            }
            position="auto"
          />
        </div>
      </div>
      <ul
        className="w-full flex flex-col space-y-2 max-h-168 py-2 overflow-y-auto"
        dir="ltr"
      >
        {tokens.length > 0 ? (
          tokens.map((token: IToken) => (
            <TokenItem
              key={token.id}
              id={token.id}
              name={token.name}
              price={token.price}
              quantity={token.quantity}
              symbol={token.symbol}
            />
          ))
        ) : (
          <div
            className="w-full border-2 border-dashed border-white p-2 rounded-lg text-white text-center"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <RiHandCoinLine className="text-6xl mx-auto" />
            <p className="uppercase font-black">{t("No tokens found!")}</p>
            <p className="text-sm font-light">
              {t("For adding a new token, click on add button")}.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TokenList;
