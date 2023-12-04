import React from "react";

import "./formContent.css";
import Card from "./components/Card";
import SvgLogin from "./components/SvgLogin";

const FormContent = () => {
  return (
    <div className="form-content">
      <div className="container">
        <div className="content-login">
          <Card />
          <SvgLogin />
        </div>
      </div>
    </div>
  );
};

export default FormContent;
