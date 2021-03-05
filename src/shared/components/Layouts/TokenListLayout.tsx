import React from "react";
import Footer from "../../../tokens/components/Footer";
import Header from "../../../tokens/components/Header";

interface TokenListLayoutProps {
  children: React.ReactNode;
  openAddModal: () => void;
}

const TokenListLayout = (props: TokenListLayoutProps) => {
  return (
    <div className="flex flex-col container w-full min-h-screen bg-white mx-auto md:px-16 px-4 md:py-8 py-2 justify-between">
      <Header openAddModal={props.openAddModal} />
      <div className="flex flex-row justify-center w-full">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default TokenListLayout;
