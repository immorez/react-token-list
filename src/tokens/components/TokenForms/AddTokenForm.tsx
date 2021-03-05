import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/FormElements/Input";
import { TokenListContext } from "../../../shared/contexts/TokenListContext";
import { useForm } from "../../../shared/hooks/useForm";
import { uuidv4 } from "../../../shared/utils/uuid";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";

interface AddTokenModalProps {
  closeAddModal: () => void;
}

const AddTokenModal = (props: AddTokenModalProps) => {
  const { t } = useTranslation(["global"]);
  const { addToken } = useContext(TokenListContext);
  const { closeAddModal } = props;

  const [formState, inputHandler] = useForm(
    {
      tokenName: {
        value: "",
        isValid: false,
      },
      tokenPrice: {
        value: "",
        isValid: false,
      },
      tokenSymbol: {
        value: "",
        isValid: false,
      },
      tokenQuantity: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitAddTokenForm = useCallback(
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
        addToken(
          {
            id: uuidv4(),
            name: tokenName?.value as string,
            price: Number(tokenPrice?.value),
            symbol: tokenSymbol?.value as string,
            quantity: Number(tokenQuantity.value),
          },
          Number(tokenQuantity.value)
        );
        closeAddModal();
      }
    },
    [addToken, closeAddModal, formState.inputs]
  );
  return (
    <form id="add-token-form" className="p-4" onSubmit={submitAddTokenForm}>
      <Input
        element="input"
        id="tokenName"
        type="text"
        placeholder={t("Token Name")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        errorText={`${t("Please enter a valid token name")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black my-1"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenSymbol"
        type="text"
        placeholder={t("Token Symbol")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        errorText={`${t("Token symbol should be at least 3 characters")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black my-1"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenPrice"
        type="number"
        placeholder={t("Token Price")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
        errorText={`${t("Token price should be at least 0")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black my-1"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="tokenQuantity"
        type="text"
        placeholder={t("Token Quantity")}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
        errorText={`${t("Token quantity should be at least 0")}.`}
        className="form-input rounded-lg border border-gray-200 leading-tight focus:outline-none focus:shadow-outline w-full text-black my-1"
        errorTextStyle="block text-red-500 text-sm font-light"
        onInput={inputHandler}
      />
    </form>
  );
};

export default AddTokenModal;
