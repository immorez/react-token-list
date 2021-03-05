import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(["global"]);
  return (
    <div className="flex flex-col w-full py-2">
      <p className="text-center text-xs font-light text-gray-700">{`${t(
        "Token List"
      )} © ${new Date(
        Date.now()
      ).getFullYear()} all rights reserved - By M. Qadamgahi`}</p>
    </div>
  );
};

export default Footer;
