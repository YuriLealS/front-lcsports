import React from "react";
import { Link } from "react-router-dom";

const NavLoginCadastro = ({ loginPage = false, cadastroPage = false }) => {
  return (
    <>
      {loginPage && (
        <div className="navbar">
          <a href="/login" className="button">
            Entrar
          </a>

          <a href="/cadastro" className="button">
            Cadastrar
          </a>
        </div>
      )}
      {cadastroPage && (
        <div className="navbar">
          <a href="/login" className="button">
            Entrar
          </a>

          <a href="/cadastro" className="button">
            Cadastrar
          </a>
        </div>
      )}
    </>
  );
};

export default NavLoginCadastro;
