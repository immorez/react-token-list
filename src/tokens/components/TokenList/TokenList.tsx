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
import { AnimatePresence, motion } from "framer-motion";

interface TokenListProps {
  openAddModal: () => void;
}

const TokenList = (props: TokenListProps) => {
  const { tokenListItems, total } = useContext(TokenListContext);
  const { t } = useTranslation(["global"]);
  const { isRTL } = useContext(LanguageContext);
  const [tokens, setTokens] = useState(tokenListItems);
  const [toggleOrderFlag, setToggleOrderFlag] = useState(1);

  const toggleOrderFlagHandler = useCallback(() => {
    setToggleOrderFlag(-toggleOrderFlag);
  }, [toggleOrderFlag]);

  useEffect(() => {
    setTokens(tokenListItems);
  }, [tokenListItems]);

  const sortTokens = useCallback(
    (sortBy: string) => {
      let sorted = [...tokenListItems];
      switch (sortBy) {
        case "BY_NAME":
          sorted = sorted.sort(
            (a, b) =>
              a.name.localeCompare(b.name, ["en-US", "fa-IR"]) * toggleOrderFlag
          );
          setTokens(sorted);
          toggleOrderFlagHandler();
          break;
        case "BY_PRICE":
          sorted = sorted.sort((a, b) => (a.price - b.price) * toggleOrderFlag);
          setTokens(sorted);
          toggleOrderFlagHandler();
          break;
        case "BY_SYMBOL":
          sorted = sorted.sort(
            (a, b) => a.symbol.localeCompare(b.symbol) * toggleOrderFlag
          );
          setTokens(sorted);
          toggleOrderFlagHandler();
          break;
        case "BY_QUANTITY":
          sorted = sorted.sort(
            (a, b) => (a.quantity - b.quantity) * toggleOrderFlag
          );
          setTokens(sorted);
          toggleOrderFlagHandler();
          break;
        default:
          setTokens(sorted);
      }
    },
    [toggleOrderFlag, toggleOrderFlagHandler, tokenListItems]
  );

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col md:w-1/3 w-full">
      <div className="flex flex-wrap w-full justify-between p-2">
        <span className="md:text-xl text-sm font-light my-auto">
          {t("My Balance")}
        </span>
        <span className="md:text-5xl text-xl font-semibold my-auto py-2">
          ${Number(total).toLocaleString(isRTL ? "fa-IR" : "en-US")}
        </span>
      </div>
      <div className="flex flex-col w-full bg-gradient-to-tr from-orange-400 to-orange-300 shadow-inner p-6 rounded-xl justify-center">
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
                <div className="bg-gray-100 p-2 rounded-lg w-48 shadow-xl border border-gray-300 ltr:-ml-6">
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
              position={"right"}
            />
          </div>
        </div>

        {tokens.length > 0 ? (
          <motion.ul
            className="w-full flex flex-col space-y-2 max-h-192 py-2 overflow-y-auto"
            dir="ltr"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {tokens.map((token: IToken) => (
                <motion.li
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: 20,
                    opacity: 0,
                  }}
                  key={token.id}
                >
                  <TokenItem
                    id={token.id}
                    key={token.id}
                    name={token.name}
                    price={token.price}
                    quantity={token.quantity}
                    symbol={token.symbol}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
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
      </div>
    </div>
  );
};

export default TokenList;
