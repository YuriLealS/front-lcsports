import React from "react";

import FormContent from "./FormContent";

import "./login.css";
import Header from "../components/HeaderComponent";
import NavLoginCadastro from "../components/HeaderComponent/NavTypes/NavLoginCadastro";

const Login = () => {
  return (
    <div className="login-root">
      <Header>
        <NavLoginCadastro loginPage />
      </Header>
      <FormContent />
    </div>
  );
};

export default Login;
