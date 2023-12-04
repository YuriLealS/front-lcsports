import React from "react";

import FormContent from "./FormContent";

import "./cadastro.css";

import NavLoginCadastro from "../components/HeaderComponent/NavTypes/NavLoginCadastro";
import Header from "../components/HeaderComponent";

const Cadastro = () => {
  return (
    <div className="cadastro-root">
      <Header>
        <NavLoginCadastro cadastroPage />
      </Header>
      <FormContent />
    </div>
  );
};

export default Cadastro;
