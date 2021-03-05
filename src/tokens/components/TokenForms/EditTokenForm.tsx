import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/FormElements/Input";
import { TokenListContext } from "../../../shared/contexts/TokenListContext";
import { IToken } from "../../../shared/contexts/TokenListContext.model";
import { useForm } from "../../../shared/hooks/useForm";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";

interface EditTokenModalProps {
  closeEditModal: () => void;
  token: IToken;
}

const EditTokenModal = (props: EditTokenModalProps) => {
  const { t } = useTranslation(["global"]);
  const { editToken } = useContext(TokenListContext);
  const { closeEditModal, token } = props;
  const { name, price, quantity, symbol, id } = token;

  const [formState, inputHandler] = useForm(
    {
      tokenName: {
        value: name,
        isValid: true,
      },
      tokenPrice: {
        value: price,
        isValid: true,
      },
      tokenSymbol: {
        value: symbol,
        isValid: true,
      },
      tokenQuantity: {
        value: quantity,
        isValid: true,
      },
    },
    true
  );

  const submitEditTokenForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const {
        tokenName,
        tokenPrice,
        tokenSymbol,
        tokenQuantity,
      } = formState.inputs;
      if (
        tokenName?.value &&
        tokenPrice?.value &&
        tokenSymbol?.value &&
        tokenQuantity?.value
      ) {
        editToken(
          {
            id: id,
            name: tokenName?.value as string,
            price: Number(tokenPrice?.value),
            symbol: tokenSymbol?.value as string,
            quantity: Number(tokenQuantity.value),
          },
          Number(tokenQuantity.value)
        );
        closeEditModal();
      }
    },
    [formState.inputs, editToken, id, closeEditModal]
  );
  return (
    <form id="edit-token-form" className="p-2" onSubmit={submitEditTokenForm}>
      <Input
        element="input"
        id="tokenName"
        label={t("Token Name")}
        labelStyles="text-sm font-normal p-1"
        type="text"
        initialValid={true}
        initialValue={name}
        placeholder={t("Token Name")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        errorText={`${t("Please enter a valid token name")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenSymbol"
        label={t("Token Symbol")}
        labelStyles="text-sm font-normal p-1"
        type="text"
        initialValid={true}
        initialValue={symbol}
        placeholder={t("Token Symbol")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        errorText={`${t("Token symbol should be at least 3 characters")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenPrice"
        label={t("Token Price")}
        labelStyles="text-sm font-normal p-1"
        type="number"
        initialValid={true}
        initialValue={price}
        placeholder={t("Token Price")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
        errorText={`${t("Token price should be at least 0")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenQuantity"
        label={t("Token Quantity")}
        labelStyles="text-sm font-normal p-1"
        type="text"
        initialValid={true}
        initialValue={quantity}
        placeholder={t("Token Quantity")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
        errorText={`${t("Token quantity should be at least 0")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
    </form>
  );
};

export default EditTokenModal;
