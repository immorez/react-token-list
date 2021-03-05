import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Button from "../../shared/components/UI/Button/Button";
import { LanguageContext } from "../../shared/contexts/LanguageContext";

interface HeaderProps {
  openAddModal: () => void;
}

const Header = (props: HeaderProps) => {
  const { t } = useTranslation(["global"]);
  const { toggleLanguage } = useContext(LanguageContext);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-full">
        <h1 className="text-4xl font-black">{t("Token List")}</h1>
        <h4 className="font-light text-gray-700 uppercase p-2">
          {t("All your tokens in one place")}
        </h4>
      </div>
      <ul className="flex flex-row">
        <li className="block">
          <IoLanguage
            onClick={toggleLanguage}
            className="text-xl mt-2 mx-2 hover:text-blue-900 text-gray-800 cursor-pointer"
          />
        </li>
        <li>
          <Button
            onClick={props.openAddModal}
            className="flex flex-row text-sm font-light border border-green-500 rounded-xl px-4 py-2 my-auto whitespace-nowrap text-green-500 hover:text-white hover:bg-green-500 transition duration-75"
          >
            <FiPlus className="my-auto mx-1" />
            {t("Add Token")}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
