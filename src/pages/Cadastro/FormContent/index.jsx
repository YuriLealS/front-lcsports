import React from "react";

import "./formContent.css";
import Card from "./components/Card";
import SvgCadastro from "./components/SvgCadastro";

const FormContent = () => {
  return (
    <div className="form-content">
      <div className="container">
        <div className="content-cadastro">
          <SvgCadastro />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default FormContent;
