import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import TokenListLayout from "../../shared/components/Layouts/TokenListLayout";
import Modal from "../../shared/components/UI/Modal/Modal";
import { useTitle } from "../../shared/hooks/useTitle";
import AddTokenForm from "../components/TokenForms/AddTokenForm";
import TokenList from "../components/TokenList/TokenList";

const Tokens: React.FC = () => {
  const { t } = useTranslation(["global"]);
  useTitle(t("Token List"));
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const openAddModal = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const closeAddModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  return (
    <TokenListLayout openAddModal={openAddModal}>
      <TokenList openAddModal={openAddModal} />
      {showAddModal && (
        <Modal
          modalTitle={t("Add Token") as string}
          setShow={setShowAddModal}
          content={<AddTokenForm closeAddModal={closeAddModal} />}
          size="big"
          cancelText={t("CANCEL") as string}
          confirmText={t("ADD") as string}
          confirmButtonForm="add-token-form"
        />
      )}
    </TokenListLayout>
  );
};

export default Tokens;
