import { useContext, useState } from "react";
import { IToken } from "../../../shared/contexts/TokenListContext.model";
import { FaCoins } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useCallback } from "react";
import { TokenListContext } from "../../../shared/contexts/TokenListContext";
import Modal from "../../../shared/components/UI/Modal/Modal";
import { useTranslation } from "react-i18next";
import EditTokenModal from "../TokenForms/EditTokenForm";

type TokenItemProps = IToken;

const TokenItem = (props: TokenItemProps) => {
  const { t } = useTranslation(["global"]);
  const { id, name, symbol, price, quantity } = props;
  const { removeToken } = useContext(TokenListContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const removeTokenHandler = useCallback(() => {
    removeToken(id as string);
  }, [id, removeToken]);

  const openEditModal = useCallback(() => {
    setShowEditModal(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  return (
    <>
      <li className="p-2 bg-white rounded-lg shadow-lg w-full hover:bg-gray-100 cursor-pointer">
        <div className="flex flex-row p-2 justify-between">
          <div className="w-2/3 flex flex-col justify-between">
            <h3 className="font-bold text-gray-800 md:text-2xl text-xl flex flex-row">
              <FaCoins className="my-auto mr-1 mt-1 md:text-xl text-lg text-orange-500" />
              {name}
            </h3>
            <h5 className="font-thin text-gray-600 text-sm uppercase">
              {symbol}
            </h5>
          </div>
          <div className="w-1/3 flex flex-col justify-between">
            <span className="font-normal md:text-2xl text-lg text-gray-700 ml-auto">
              ${Number(price).toLocaleString("en-US")}
            </span>
            <span className="font-normal text-sm text-gray-400 ml-auto uppercase">
              {Number(quantity).toLocaleString("en-US")} {symbol}
            </span>
            <span className="flex flex-row pt-2 ml-auto space-x-2">
              <FiEdit
                className="text-blue-500 hover:text-blue-800 text-sm cursor-pointer"
                onClick={openEditModal}
              />
              <FiTrash
                onClick={removeTokenHandler}
                className="text-red-500 hover:text-red-800 text-sm cursor-pointer"
              />
            </span>
          </div>
        </div>
      </li>

      {showEditModal && (
        <Modal
          modalTitle={t("Edit Token") as string}
          content={
            <EditTokenModal
              token={{
                name: name,
                price: price,
                quantity: quantity,
                symbol: symbol,
                id: id,
              }}
              closeEditModal={closeEditModal}
            />
          }
          size="big"
          setShow={setShowEditModal}
          cancelText={t("CANCEL")! as string}
          confirmButtonForm="edit-token-form"
          confirmText={t("APPLY") as string}
        />
      )}
    </>
  );
};
export default TokenItem;
